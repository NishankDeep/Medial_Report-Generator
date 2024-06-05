import React, { useState, useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './App.css';
import MainLogo from './MainLogo.jpeg';
import Microscope from './Microscope.png';
import ManishSign from './ManishSign.jpg';
import DoctorSign from './DoctorSign.PNG';
import TestNameDropdown from './Select.js';
import PatientInfoBox from './PatientInfo.js';
import ResultTableContent from './ResultTable.js';
import { formatCellContent, changeStartingLetter, changeDollarToSpace, setInitialTestDetail } from './Helper.js';

const initialData = {
  name: '',
  age: '',
  prn: 'JHSCD',
  gender: 'M',
  Sample_Collected_On: '',
  Sample_Out_On: '',
  referredBy: '',
  mainTestName: '',
  salutation: '',
}

function App() {
  const [formData, setFormData] = useState({...initialData});

  const [testDetails, setTestDetails] = useState([]);
  const [reports, setReports] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);
  const previewRef = useRef();
  const modalRef = useRef();

  // use to set the data to current date.
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setFormData(prevFormData => ({
      ...prevFormData,
      Sample_Collected_On: formattedDate,
      Sample_Out_On: formattedDate
    }));

  }, [formData])

  // simply use to load the list of testname on change of maintestname
  useEffect(() => {
    setTestDetails([...setInitialTestDetail(formData.mainTestName)]);
  }, [formData.mainTestName])

  const handleInputChange = (e) => {
    if (e.target != null && e.target.name != null) {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleTestNameChange = (value) => {
    setFormData({
      ...formData,
      mainTestName: value,
    });
  };

  const handleAddTestDetail = () => {
    setTestDetails([...testDetails, { testName: '', result: '', units: '', bioRefInterval: '' }]);
  };

  const handleTestDetailChange = (index, e) => {
    const { name, value } = e.target;
    const newTestDetails = [...testDetails];
    newTestDetails[index][name] = value;
    setTestDetails(newTestDetails);
  };

  const handleRemoveTestDetail = (index) => {
    const newTestDetails = testDetails.filter((_, i) => i !== index);
    setTestDetails(newTestDetails);
  };

  const deleteReport = (index) => {
    const newReports = reports.filter((_, i) => i !== index);
    setReports(newReports);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReport = { ...formData, tests: [...testDetails] };
    setReports([...reports, newReport]);
    setFormData({...initialData});
    setTestDetails([]);
  };

  const previewReport = (index) => {
    setCurrentReport(reports[index]);
    setShowPreview(true);
  };


  const downloadReport = (index) => {
    const report = reports[index];
    setCurrentReport(report);
    setShowPreview(true);

    setTimeout(() => {
      const input = previewRef.current;
      if (input) {
        html2canvas(input, { scale: 2 }).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const imgWidth = 210;
          const pageHeight = 295;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          let heightLeft = imgHeight;
          let position = 0;

          // Custom header
          const addHeader = (pdf, pageNumber) => {
            pdf.addImage(MainLogo, 'JPEG', 10, 5, 25, 25);
            pdf.setFontSize(40);
            pdf.setFont('helvetica', 'bold');
            pdf.text('SPARSH LAB', 40, 15);
            pdf.setFontSize(10);
            pdf.text('Sahitya Samaj Chowk, Jail road', 40, 20);
            pdf.text('Daltonganj, 822101', 40, 25);
            pdf.text('Email : sparshclinicdaltonganj@gmail.com', 40, 30);
            pdf.addImage(Microscope, 'PNG', 183.5, 10.5, 15, 15);
            pdf.text('Sparsh Clinic Daltonganj', 142, 25);
            pdf.text('PHARMACY, LAB, CLINIC', 142, 30);
            pdf.setLineWidth(1.5);
            pdf.line(10, 35, 200, 35);
            // pdf.setFontSize(10);
            // pdf.text('aa', 10, 45);
          };

          // Custom footer
          const addFooter = (pdf, pageNumber) => {
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(12);
            pdf.text('SAHITYA SAMAJ CHOWK, Dr. ARUN SHUKLA ROAD, DALTONGANJ', 105, pageHeight - 15, { align: 'center' });
            pdf.text('PHONE NO - 9470944040, 9470944422', 105, pageHeight - 10, { align: 'center' });
            pdf.setTextColor(255, 0, 0);
            pdf.text('WISHING YOU A GOOD LIFE AND BE HEALTHY', 105, pageHeight - 5, { align: 'center' });
            pdf.setTextColor(0, 0, 0);
            pdf.setFontSize(10);
            // pdf.text(':- END OF REPORT :-', 105, pageHeight - 20, { align: 'center' });
          };

          addHeader(pdf, 1);
          pdf.addImage(imgData, 'PNG', 0, 35, imgWidth, imgHeight);
          heightLeft -= pageHeight;

          addFooter(pdf, 1);

          let pageNumber = 2;
          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            addHeader(pdf, pageNumber);
            pdf.addImage(imgData, 'PNG', 0, position + 35, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            addFooter(pdf, pageNumber);
            pageNumber++;
          }


          pdf.save('report.pdf');
          setShowPreview(false);
        });
      }
    }, 500);
  };


  useEffect(() => {
    if (showPreview) {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          setShowPreview(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showPreview]);


  const isValueOutOfRange = (result, bioRefInterval) => {
    const [min, max] = bioRefInterval.split('-').map(Number);
    return result < min || result > max;
  };

  return (
    <>
      <div className="App p-8">
        <h1 className="text-2xl font-bold mb-4">Medical Report Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Salutation:</label>
              <select
                name="salutation"
                value={formData.salutation}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select</option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Miss">Miss</option>
                <option value="Master">Master</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block mb-1">PRN No.:</label>
              <input
                type="text"
                name="prn"
                value={formData.prn}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Age:</label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>
            <div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Sample Date:</label>
              <input
                type="date"
                name="Sample_Collected_On"
                value={formData.Sample_Collected_On}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Report Date:</label>
              <input
                type="date"
                name="Sample_Out_On"
                value={formData.Sample_Out_On}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Referred By:</label>
              <select
                name="referredBy"
                value={formData.referredBy}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select</option>
                <option value="Dr.Anupam kr.singh">Dr.Anupam kr.singh</option>
                <option value="Dr.Tusar Arya">Dr.Tusar Arya</option>
                <option value="Dr.Kumar Prateek">Dr.Kumar Prateek</option>
                <option value="Dr.Self">Dr.Self</option>
              </select>
            </div>
            <div>
              <TestNameDropdown formData={formData} onTestNameChange={handleTestNameChange} />
              <div>Selected Test Name: <strong>{formData.mainTestName}</strong></div>
            </div>
          </div>
          <div id="testDetailsContainer" className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Test Details</h3>
            {testDetails.map((test, index) => (
              <div key={index} className="grid grid-cols-5 gap-4 mb-2">
                <input
                  type="text"
                  name="testName"
                  value={test.testName}
                  onChange={(e) => handleTestDetailChange(index, e)}
                  placeholder="Test Name"
                  required
                  className="p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="result"
                  value={test.result}
                  onChange={(e) => handleTestDetailChange(index, e)}
                  placeholder="Result"
                  required
                  className="p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="units"
                  value={test.units}
                  onChange={(e) => handleTestDetailChange(index, e)}
                  placeholder="Units"
                  required
                  className="p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="bioRefInterval"
                  value={test.bioRefInterval}
                  onChange={(e) => handleTestDetailChange(index, e)}
                  placeholder="Bio Ref Interval"
                  required
                  className="p-2 border border-gray-300 rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveTestDetail(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddTestDetail}
            className="mb-2 mr-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Test Detail
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Submit
          </button>
        </form>
        <div id="reportsContainer" className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Submitted Reports</h2>
          {reports.map((report, index) => (
            <div
              key={index}
              className="border border-gray-300 p-4 rounded mb-4 bg-gray-50"
            >
              <h3 className="text-lg font-semibold mb-2">{report.salutation} {report.name}</h3>
              <p>Age: {report.age}</p>
              <p>PRN No.: {report.prn}</p>
              <p>Gender: {report.gender}</p>
              <p>Sample Collected On: {report.Sample_Collected_On}</p>
              <p>Report Out On: {report.Sample_Out_On}</p>
              <p>Referred By: {report.referredBy}</p>
              <p>{report.mainTestName}</p>
              <table className="w-full mt-4 border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Test Name</th>
                    <th className="border border-gray-300 p-2">Result</th>
                    <th className="border border-gray-300 p-2">Units</th>
                    <th className="border border-gray-300 p-2">Bio Ref Interval</th>
                  </tr>
                </thead>
                <tbody>
                  {report.tests.map((test, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">
                        <strong>{test.testName}</strong>
                      </td>
                      <td
                        className={`border border-gray-300 p-2 ${isValueOutOfRange(test.result, test.bioRefInterval) ? 'bg-red-200' : ''}`}
                      >
                        {test.result}
                      </td>
                      <td className="border border-gray-300 p-2">{test.units}</td>
                      <td className="border border-gray-300 p-2">{changeDollarToSpace(test.bioRefInterval)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => previewReport(index)}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Preview
                </button>
                <button
                  onClick={() => downloadReport(index)}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Download PDF
                </button>
                <button
                  onClick={() => deleteReport(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {showPreview && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 mb-8" >
            <div ref={modalRef} className="bg-white p-8 rounded-lg w-full max-w-4xl overflow-y-auto max-h-screen">
              <div ref={previewRef} className="preview-content">
                {currentReport && (
                  <>
                    {/* component that contain the info of patient */}
                    <PatientInfoBox currentReport={currentReport} />
                    <div className=" font-semibold text-center pb-4" style={{ marginBottom: '0', fontSize: '1rem', lineHeight: '0' }}>{currentReport.mainTestName}</div>
                    {/* Result Table */}
                    <ResultTableContent currentReport={currentReport} isValueOutOfRange={isValueOutOfRange} />
                  </>
                )}
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="bg-red-500 text-white p-2 rounded mt-4"
              >
                Close Preview
              </button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default App;
