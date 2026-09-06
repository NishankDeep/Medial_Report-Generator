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
import { todayDate, setInitialTestDetail, genderForSalutation } from './Helper.jsx';
import { UrineInput } from './UrineInput.jsx';
import { OptimalTestInput } from './OptimalTest.jsx';

const initialData = {
  name: '',
  age: '',
  prn: 'JHSCD',
  gender: 'M',
  Sample_Collected_On: todayDate(),
  Sample_Out_On: todayDate(),
  referredBy: 'Dr.',
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
      setFormData(prevFormData => {
        const nextFormData = { ...prevFormData, [name]: value };

        // Mr./Master mean male, Mrs./Miss mean female - still editable afterwards
        if (name === 'salutation') {
          const gender = genderForSalutation(value);
          if (gender) {
            nextFormData.gender = gender;
          }
        }

        return nextFormData;
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

    if(formData.mainTestName.toLowerCase().includes('hba1c')){
      let val = parseFloat(value);
      val = (val*35.6)-77.3;
      newTestDetails[1]["result"] = val.toFixed(2);
    }

    if(formData.mainTestName.toLowerCase().includes("kft")){
      if(newTestDetails[1]["result"]!= null && newTestDetails[1]["result"].length > 0){
        let val = parseFloat(newTestDetails[1]["result"]);
        val = val/2.14;
        newTestDetails[2]["result"] = val.toFixed(2);
      }
    }

    if(formData.mainTestName.toLowerCase().includes("flp")){
      if(newTestDetails[4]["result"]!= null && newTestDetails[4]["result"].length > 0){
        let val = parseFloat(newTestDetails[4]["result"]);
        val = val/5;
        newTestDetails[3]["result"] = val.toFixed(2);
      }

      if(newTestDetails[0]["result"]!= null && newTestDetails[1]["result"]!=null  && newTestDetails[3]["result"]!=null &&  newTestDetails[0]["result"].length > 0 && newTestDetails[1]["result"].length>0 && newTestDetails[3]["result"].length>0){
        let total = parseFloat(newTestDetails[0]["result"]);
        let hdl = parseFloat(newTestDetails[1]["result"]);
        let vldl = parseFloat(newTestDetails[3]["result"]);
        newTestDetails[2]["result"] = (total - hdl -vldl).toFixed(2);
        newTestDetails[5]["result"] = (total/hdl).toFixed(2);
      }
      
      if(newTestDetails[1]["result"]!= null && newTestDetails[2]["result"]!=null && newTestDetails[1]["result"].length>0 && newTestDetails[2]["result"].length>0){
        let hdl = parseFloat(newTestDetails[1]["result"]);
        let ldl = parseFloat(newTestDetails[2]["result"]);
        newTestDetails[6]["result"] = (ldl/hdl).toFixed(2);
      }
      
    }

    if(formData.mainTestName.toLowerCase().includes("lft")){
      if(newTestDetails[1]["result"]!= null && newTestDetails[0]["result"]!=null && ((newTestDetails[1]["result"].length > 0 && newTestDetails[0]["result"].length > 0))){
        let total = parseFloat(newTestDetails[1]["result"]);
        let direct =  parseFloat(newTestDetails[0]["result"]);
        let ans = Math.abs(total-direct)
        newTestDetails[2]["result"] = (ans).toFixed(2);
      }
    }
    
    if(formData.mainTestName.toLowerCase().includes("cbc")){
      // hct
      if(newTestDetails[7]["result"]!= null && newTestDetails[9]["result"]!=null && (newTestDetails[7]["result"].length > 0 && newTestDetails[9]["result"].length > 0)){
        // 6 -( 5 * 7 )/10
        let rbcCount = parseFloat(newTestDetails[7]["result"]);
        let hct =  parseFloat(newTestDetails[9]["result"]);
        let ans = (rbcCount*hct)/10
        newTestDetails[8]["result"] = (ans).toFixed(2);
      }
      
      // mch
      if(newTestDetails[7]["result"]!= null && newTestDetails[0]["result"]!=null && (newTestDetails[0]["result"].length > 0 && newTestDetails[9]["result"].length>0)){
        // 8 -( 0 * 10)/5
        let hb = parseFloat(newTestDetails[0]["result"]);
        let rbcCount =  parseFloat(newTestDetails[7]["result"]);
        let ans = (hb*10)/rbcCount
        newTestDetails[10]["result"] = (ans).toFixed(1);
      }

      // mchc
      if(newTestDetails[8]["result"]!= null && newTestDetails[0]["result"]!=null && (newTestDetails[0]["result"].length > 0 && newTestDetails[8]["result"].length>0)){
        // 8 -( 0 * 10)/5
        let hb = parseFloat(newTestDetails[0]["result"]);
        let hct =  parseFloat(newTestDetails[8]["result"]);
        let ans = (hb*100)/hct
        newTestDetails[11]["result"] = (ans).toFixed(1);
      }
    }
    
    
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
            pdf.addImage(MainLogo, 'JPEG', 10, 8, 25, 25,undefined, 'SLOW'); // Shifted down by 3 units
            pdf.setFontSize(40);
            pdf.setFont('helvetica', 'bold');
            pdf.text('SPARSH LAB', 40, 18); // Shifted down by 3 units
            pdf.setFontSize(10);
            pdf.text('POLICE LINE, MAJOR MORE ROAD', 40, 23); // Shifted down by 3 units
            pdf.text('HAMIDGANJ, DALTONGANJ, 822101', 40, 28); // Shifted down by 3 units
            pdf.text('EMAIL : sparshclinicdaltonganj@gmail.com', 40, 33); // Shifted down by 3 units
            pdf.addImage(Microscope, 'PNG', 183.5, 13.5, 15, 15,undefined, 'SLOW'); // Shifted down by 3 units
            pdf.text('SPARSH CLINIC DALTONGANJ', 181, 28, { align: 'right' });
            pdf.text('PHARMACY, LAB, CLINIC', 181, 33, { align: 'right' });
            pdf.setLineWidth(1.5);
            pdf.line(10, 38, 200, 38); // Shifted down by 3 units
          };
          

          // Custom footer
          const addFooter = (pdf, pageNumber) => {
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(12);
            pdf.text('POLICE LINE, MAJOR MORE ROAD, HAMIDGANJ, DALTONGANJ, 822101', 105, pageHeight - 15, { align: 'center' });
            pdf.text('PHONE NO - 9470944040, 9470944422', 105, pageHeight - 10, { align: 'center' });
            pdf.setTextColor(255, 0, 0);
            pdf.text('WISHING YOU A GOOD LIFE AND BE HEALTHY', 105, pageHeight - 5, { align: 'center' });
            pdf.setTextColor(0, 0, 0);
            pdf.setFontSize(10);
            // pdf.text(':- END OF REPORT :-', 105, pageHeight - 20, { align: 'center' });
          };

          addHeader(pdf, 1);
          pdf.addImage(imgData, 'PNG', 0, 35, imgWidth, imgHeight,undefined,"SLOW");
          heightLeft -= pageHeight;

          addFooter(pdf, 1);

          let pageNumber = 2;
          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            addHeader(pdf, pageNumber);
            pdf.addImage(imgData, 'PNG', 0, position + 35, imgWidth, imgHeight,undefined,"SLOW");
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

  const parseBioRefInterval = (bioRefInterval) => {
    const intervals = {
        male: [],
        female: [],
        men: [],
        women: [],
        general: [],
    };

    const parseRange = (range) => {
        // strip thousands separators, e.g. '4,100-11,100'
        range = range.trim().toLowerCase().replace(/,/g, '');
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

    const parts = bioRefInterval.split(/(?<=\d)\s(?=[a-zA-Z])/); // Split at space between numeric and non-numeric segments
    parts[0].split('$').forEach(part => {
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

// where a result sits relative to its bio ref range.
// status: 'H' above, 'L' below, '' inside.
// percent is only meaningful below the range: the upper bound counts as 100%,
// so 10.2 against a 12.0-15.0 range reads as 68%. Above the range there is no
// percentage, only the (H) marker.
const getRangeDeviation = (result, bioRefInterval, gender, age) => {
    const inRange = { status: '', percent: null };
    if (bioRefInterval == null || bioRefInterval === '') return inRange;

    const value = parseFloat(String(result).replace(/,/g, ''));
    if (isNaN(value)) return inRange;

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
        if (min != null && !isNaN(min) && value < min) {
            const hasUpperBound = max != null && !isNaN(max) && max !== 0;
            return { status: 'L', percent: hasUpperBound ? (value / max) * 100 : null };
        }
        if (max != null && !isNaN(max) && value > max) {
            return { status: 'H', percent: null };
        }
    }
    return inRange;
};

const getRangeStatus = (result, bioRefInterval, gender, age) => {
    return getRangeDeviation(result, bioRefInterval, gender, age).status;
};

const isValueOutOfRange = (result, bioRefInterval, gender, age) => {
    return getRangeStatus(result, bioRefInterval, gender, age) !== '';
};


  
  return (
    <div className="App app-shell">
      <header className="app-topbar">
        <div className="app-topbar-inner">
          <div className="app-brand">
            <img src={MainLogo} alt="Sparsh Lab" className="app-brand-logo" />
            <div>
              <div className="app-brand-name">Sparsh Lab</div>
              <div className="app-brand-sub">Medical Report Generator</div>
            </div>
          </div>
          <div className="app-topbar-meta">
            {reports.length} {reports.length === 1 ? 'report' : 'reports'} ready
          </div>
        </div>
      </header>

      <main className="app-main">
        <form onSubmit={handleSubmit} className="stack">
          <section className="card">
            <h2 className="card-title">Patient &amp; Test</h2>
            <FormMainInfo formData={formData} handleInputChange={handleInputChange} handleTestNameChange={handleTestNameChange} />
          </section>

          {formData.mainTestName.toLowerCase().includes('urine') &&
            <section className="card">
              <h2 className="card-title">Urine Examination</h2>
              <UrineInput urineTestDetails={urineTestDetails} setUrineTestDetails={setUrineTestDetails} formData={formData} />
            </section>
          }

          {formData.mainTestName.toLowerCase().includes('optimal test') &&
            <section className="card">
              <h2 className="card-title">Optimal Test</h2>
              <OptimalTestInput optimalTestDetails={optimalTestDetails} setOptimalTestDetails={setOptimalTestDetails} formData={formData} />
            </section>
          }

          {!formData.mainTestName.toLowerCase().includes('urine') && !formData.mainTestName.toLowerCase().includes('optimal test') && <>
            <section className="card">
              <div className="card-title-row">
                <h2 className="card-title">Test Details</h2>
                <button
                  type="button"
                  onClick={handleAddTestDetail}
                  className="btn btn-secondary"
                >
                  + Add Row
                </button>
              </div>

              <TestDetailInput
                testDetails={testDetails}
                formData={formData}
                handleTestDetailChange={handleTestDetailChange}
                handleRemoveTestDetail={handleRemoveTestDetail}
              />
            </section>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Save Report
              </button>
            </div>
          </>}

        </form>

        <DisplayPatientData reports={reports} previewReport={previewReport} downloadReport={downloadReport} deleteReport={deleteReport} isValueOutOfRange={isValueOutOfRange} getRangeStatus={getRangeStatus} getRangeDeviation={getRangeDeviation} />
      </main>

      {showPreview && (
        <div className="modal-backdrop">
          <div ref={modalRef} className="modal-panel">
            <div className="modal-head">
              <span>Report Preview</span>
              <button
                onClick={() => setShowPreview(false)}
                className="btn btn-secondary"
              >
                Close
              </button>
            </div>
            <div className="modal-body">
              <div ref={previewRef} className="preview-content">
                {currentReport && (
                  <>
                    {/* component that contain the info of patient */}
                    <PatientInfoBox currentReport={currentReport} />
                    <div className='transparent-bg'>
                      <div className=" font-semibold text-center pb-4" style={{ marginBottom: '0', fontSize: '1rem', lineHeight: '0', paddingTop:'1rem' }}>{!currentReport.mainTestName.toLowerCase().includes('optimal test') && currentReport.mainTestName}</div>
                  {/* Result Table */}
                      <ResultTableContent currentReport={currentReport} isValueOutOfRange={isValueOutOfRange} getRangeStatus={getRangeStatus} getRangeDeviation={getRangeDeviation} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

