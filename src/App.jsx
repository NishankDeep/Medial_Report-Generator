import React, { useState, useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './App.css';
import MainLogo from './MainLogo.png';
import Microscope from './Microscope.png';
import PatientInfoBox from './PatientInfo.jsx';
import FormMainInfo from './FormMainInfo.jsx';
import TestDetailInput from './TestDetailInput.jsx';
import DisplayPatientData from './DisplayPatientData.jsx';
import { ResultTableContent } from './ResultTable.jsx';
import { todayDate, setInitialTestDetail } from './Helper.jsx';
import { UrineInput } from './UrineInput.jsx';
import { OptimalTestInput } from './OptimalTest.jsx';

const initialData = {
  name: '',
  age: '',
  prn: 'JHSCD',
  gender: 'M',
  Sample_Collected_On: todayDate(),
  Sample_Out_On: todayDate(),
  referredBy: '',
  mainTestName: '',
  salutation: '',
}


const initialUrineInput = {
  test1: [],
  test2: [],
  test3: []
}

const initialOptimalInput = {
  test1: [],
  test2: []
}

function App() {
  const [formData, setFormData] = useState({ ...initialData });

  const [testDetails, setTestDetails] = useState([]);
  const [urineTestDetails, setUrineTestDetails] = useState(initialUrineInput);
  const [optimalTestDetails, setOptimalTestDetails] = useState(initialOptimalInput);
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

  }, [])

  // simply use to load the list of testname on change of maintestname
  useEffect(() => {
    if (formData.mainTestName != null && !formData.mainTestName.toLowerCase().includes('urine') && !formData.mainTestName.toLowerCase().includes('optimal test')) {
      setTestDetails([...setInitialTestDetail(formData.mainTestName)]);
    }
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
    setTestDetails([...testDetails, { testName: '', result: '', units: '', bioRefInterval: '', test1: '', test2: '', test3: '', test4: '', test5: '' }]);
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
    console.log("optimal", optimalTestDetails);
    let newReport = { ...formData, tests: [...testDetails], urineTests: { ...urineTestDetails }, optimalTests: { ...optimalTestDetails } };
    setReports([...reports, newReport]);
    setFormData({ ...initialData });
    setTestDetails([]);
    setUrineTestDetails(initialUrineInput);
    setOptimalTestDetails(initialOptimalInput);
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

          const pdfName = report.name + '.pdf'
          pdf.save(`${pdfName}`);
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


  // const isValueOutOfRange = (result, bioRefInterval) => {
  //   if(bioRefInterval!=null && bioRefInterval!=''){
  //     const [min, max] = bioRefInterval.split('-').map(Number);
  //     return result < min || result > max;
  //   }
  //   return result;
  // };

  const parseBioRefInterval = (bioRefInterval) => {
    const intervals = {
      male: [],
      female: [],
      men: [],
      women: [],
      general: [], // To handle generic range
    };
  
    const parseRange = (range) => {
      range = range.trim().toLowerCase();
      let min = null;
      let max = null;
  
      if (range.startsWith('upto <')) {
        max = parseFloat(range.slice(6).trim());
      } else if (range.startsWith('upto >')) {
        min = parseFloat(range.slice(6).trim());
      } else if (range.startsWith('upto')) {
        max = parseFloat(range.slice(4).trim());
      } else if (range.startsWith('<')) {
        max = parseFloat(range.slice(1).trim());
      } else if (range.startsWith('>')) {
        min = parseFloat(range.slice(1).trim());
      } else {
        [min, max] = range.split('-').map(str => parseFloat(str.trim()));
      }
      return { min, max };
    };
  
    const parts = bioRefInterval.split(/(?<=\d)\s(?=\d)/); // Split at space between numeric segments
    parts.forEach(part => {
      const lowerPart = part.toLowerCase();
      if (lowerPart.startsWith('male:')) {
        intervals.male.push(parseRange(part.slice(5)));
      } else if (lowerPart.startsWith('female:')) {
        intervals.female.push(parseRange(part.slice(7)));
      } else if (lowerPart.startsWith('men:')) {
        intervals.men.push(parseRange(part.slice(4)));
      } else if (lowerPart.startsWith('women:')) {
        intervals.women.push(parseRange(part.slice(6)));
      } else {
        intervals.general.push(parseRange(part));
      }
    });
  
    return intervals;
  };
  
  const normalizeGender = (gender) => {
    const lowerGender = gender.toLowerCase();
    if (lowerGender === 'm' || lowerGender === 'male') return 'male';
    if (lowerGender === 'f' || lowerGender === 'female') return 'female';
    return null;
  };
  
  const isValueOutOfRange = (result, bioRefInterval, gender, age) => {
    if (bioRefInterval != null && bioRefInterval !== '') {
      const normalizedGender = normalizeGender(gender);
  
      const intervals = parseBioRefInterval(bioRefInterval);
      let ranges = [];
  
      if (normalizedGender === 'male') {
        ranges = intervals.male.length ? intervals.male : intervals.men.length ? intervals.men : intervals.general;
      } else if (normalizedGender === 'female') {
        ranges = intervals.female.length ? intervals.female : intervals.women.length ? intervals.women : intervals.general;
      } else {
        ranges = intervals.general;
      }
  
      for (const { min, max } of ranges) {
        if ((min != null && result < min) || (max != null && result > max)) {
          return true;
        }
      }
    }
    return false;
  };
  
  // Assuming `initialData` is defined elsewhere in your code
  const checkHbA1cResults = (initialData, gender) => {
    let isHbA1cOutOfRange = false;
  
    initialData.forEach(item => {
      if (item.testName.includes('Glycosylated Haemoglobin-HbA1c$Method: Latex Immunoturbidometry-NGSP/IFCC Standardized')) {
        if (isValueOutOfRange(parseFloat(item.result), item.bioRefInterval, gender)) {
          isHbA1cOutOfRange = true;
        }
      }
    });
  
    if (isHbA1cOutOfRange) {
      initialData = initialData.map(item => {
        if (item.testName.includes('Glycosylated Haemoglobin-HbA1c$Method: Latex Immunoturbidometry-NGSP/IFCC Standardized') || item.testName.includes('Mean Blood Glucose (calculated from HbA1c)')) {
          return {
            ...item,
            bold: true, // Set a property to indicate it should be bold
            color: 'red' // Set a property to indicate it should be red
          };
        }
        return item;
      });
    }
  
    return initialData;
  };
   
  return (
    <>
      <div className="App p-8">
        <h1 className="text-2xl font-bold mb-4">Medical Report Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormMainInfo formData={formData} handleInputChange={handleInputChange} handleTestNameChange={handleTestNameChange} />
          {formData.mainTestName.toLowerCase().includes('urine') &&
            <UrineInput urineTestDetails={urineTestDetails} setUrineTestDetails={setUrineTestDetails} formData={formData} />
          }

          {formData.mainTestName.toLowerCase().includes('optimal test') &&
            <OptimalTestInput optimalTestDetails={optimalTestDetails} setOptimalTestDetails={setOptimalTestDetails} formData={formData} />
          }

          {!formData.mainTestName.toLowerCase().includes('urine') && !formData.mainTestName.toLowerCase().includes('optimal test') && <>

            <TestDetailInput
              testDetails={testDetails}
              formData={formData}
              handleTestDetailChange={handleTestDetailChange}
              handleRemoveTestDetail={handleRemoveTestDetail}
            />
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
          </>}

        </form>

        <DisplayPatientData reports={reports} previewReport={previewReport} downloadReport={downloadReport} deleteReport={deleteReport} isValueOutOfRange={isValueOutOfRange} />

        {showPreview && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 mb-8" >
            <div ref={modalRef} className="bg-white p-8 rounded-lg w-full max-w-4xl overflow-y-auto max-h-screen">
              <div ref={previewRef} className="preview-content">
                {currentReport && (
                  <>
                    {/* component that contain the info of patient */}
                    <PatientInfoBox currentReport={currentReport} />
                    <div className='transparent-bg' >
                      <div className=" font-semibold text-center pb-4" style={{ marginBottom: '0', fontSize: '1rem', lineHeight: '0' }}>{!currentReport.mainTestName.toLowerCase().includes('optimal test') && currentReport.mainTestName}</div>
                      {/* Result Table */}
                      <ResultTableContent currentReport={currentReport} isValueOutOfRange={isValueOutOfRange} />
                    </div>
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

