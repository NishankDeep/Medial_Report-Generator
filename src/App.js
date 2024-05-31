import React, { useState, useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './App.css';
import MainLogo from './MainLogo.jpeg';
import Microscope from './Microscope.png';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    prn: '',
    gender: 'M',
    Sample_Colleted_On: '',
    Sample_Out_On: '',
    referredBy: '',
    mainTestName: '',
  });

  const [testDetails, setTestDetails] = useState([]);
  const [reports, setReports] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);
  const previewRef = useRef();
  const modalRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReport = { ...formData, tests: [...testDetails] };
    setReports([...reports, newReport]);
    setFormData({
      name: '',
      age: '',
      prn: '',
      gender: 'M',
      Sample_Colleted_On: '',
      Sample_Out_On: '',
      referredBy: '',
      mainTestName: '',
    });
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
            pdf.addImage(Microscope, 'PNG', 187, 12, 15, 15);
            pdf.text('sparsh clinic daltonganj', 150, 25);
            pdf.text('PHARMACY, LAB, CLINIC', 150, 30);
            pdf.setLineWidth(1.5);
            pdf.line(10, 35, 200, 35); 
          };
  
          // Custom footer
          const addFooter = (pdf, pageNumber) => {
            pdf.setFont('helvetica', 'bold');
            pdf.text('SAHITYA SAMAJ CHOWK, JAIL ROAD, DALTONGANJ', 105, pageHeight - 15, { align: 'center' });
            pdf.text('PHONE NO - 9470944040, 9470944422', 105, pageHeight - 10, { align: 'center' });
            pdf.setTextColor(255, 0, 0);
            pdf.text('WISHING YOU A GOOD LIFE AND BE HEALTHY', 105, pageHeight - 5, { align: 'center' });
            pdf.setTextColor(0, 0, 0);
            pdf.setFontSize(10);
            pdf.text(':- END OF REPORT :-', 105, pageHeight - 20, { align: 'center' });
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
    <div className="App p-8">
      <h1 className="text-2xl font-bold mb-4">Medical Report Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
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
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block mb-1">Age:</label>
            <input
              type="number"
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
            <label className="block mb-1">Sample Colleted On : </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Report Out On ::</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Referred By:</label>
            <input
              type="text"
              name="referredBy"
              value={formData.referredBy}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Test Name:</label>
            <input
              type="text"
              name="mainTestName"
              value={formData.mainTestName}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        <div id="testDetailsContainer" className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Test Details</h3>
          <button
            type="button"
            onClick={handleAddTestDetail}
            className="mb-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Test Detail
          </button>
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
            <h3 className="text-lg font-semibold mb-2">{report.name}</h3>
            <p>Age: {report.age}</p>
            <p>PRN No.: {report.prn}</p>
            <p>Gender: {report.gender}</p>
            <p>Date: {report.date}</p>
            <p>Date: {report.date}</p>
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
                    <td className="border border-gray-300 p-2">{test.bioRefInterval}</td>
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
            </div>
          </div>
        ))}
      </div>

      {showPreview && currentReport && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 "
          ref={modalRef}
        >
          <div
            ref={previewRef}
            className="bg-white p-8 rounded shadow-lg w-3/4 max-h-full overflow-auto relative "
          >
            <div className="header flex justify-between items-center mb-4 ml-8 mr-8">


</div>
<div className="flex justify-between mb-4 ml-4 mr-4">  {/* Reduced ml and mr to 4 */}
  {/* <h2 className="text-xl font-semibold  mr-8">Final Report</h2> */}
  {/* <button
    onClick={() => setShowPreview(false)}
    className="px-4 py-2 bg-red-500 text-white rounded"
  >
    Close
  </button> */}
</div>
<div className="flex flex-col-2 justify-center space-x-96 mb-4 font-bold text-xl p-4">

  <div>
    <p>
      <strong>Name:</strong> {currentReport.name}
    </p>
    <p>
      <strong>Age:</strong> {currentReport.age}
    </p>
    <p>
      <strong>Gender:</strong> {currentReport.gender}
    </p>
    <p>
      <strong>Referred By:</strong> {currentReport.referredBy}
    </p>
  </div>
  <div className="text-right">
    <p>
      <strong>PRN No:</strong> {currentReport.prn}
    </p>
    <p>
      <strong>Sample Colleted On:</strong> {currentReport.date}
    </p>
    <p>
      <strong>Report Out On:</strong> {currentReport.date}
    </p>
  </div>
</div>

            
            {/* <div className="border border-gray-300 p-2 font-semibold text-2xl text-center">Main Test Name</div> */}
            <div className=" mt-8 p-2 font-semibold text-5xl text-center">{currentReport.mainTestName}</div>

            
{/* Result Table */}
<div className="overflow-x-auto ml-8 mr-8">
  {/* <table className="w-full mt-16 border-collapse border-collapse border-gray-300"> */}
  <table className="w-full mt-8 ">
    <thead>
      <tr>
        <th className="border border-gray-300 p-2">Test Name</th>
        <th className="border border-gray-300 p-2">Result</th>
        <th className="border border-gray-300 p-2">Units</th>
        <th className="border border-gray-300 p-2">Bio Ref Interval</th>
      </tr>
    </thead>
    <tbody>
      {currentReport.tests.map((test, index) => (
        <tr key={index}>
          <td className="border border-gray-300 p-2">{test.testName}</td>
          <td className={`border border-gray-300 p-2 ${isValueOutOfRange(test.result, test.bioRefInterval) ? 'bg-red-200 font-bold' : ''}`}>
            {test.result}
          </td>
          <td className="border border-gray-300 p-2">{test.units}</td>
          <td className="border border-gray-300 p-2">{test.bioRefInterval}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

<div className="flex justify-end  mt-8 space-x-28">
      <div className="flex flex-col items-center">
        <img src="ManishSign.jpg" alt="Lab Technician" className="w-16 h-16 object-cover mb-2"/>
        <p className="font-bold">LAB TECHNICIAN</p>
      </div>
      <div className="flex flex-col items-center">
        <img src="DoctorSign.PNG" alt="Dr. Aubhuti Choudhary" className="w-16 h-16 object-cover mb-2"/>
        <p className="font-bold">DR. Aubhuti Choudhary</p>
        <p>M.D Pathology</p>
      </div>
    </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

