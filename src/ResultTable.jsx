// import React from "react";
// import './App.css'

// import ManishSign from './ManishSign.jpg';
// import DoctorSign from './DoctorSign.PNG';
// import { formatCellContent } from "./Helper";

// const ResultTableContent = ({currentReport,isValueOutOfRange}) => {
//     return (
//         <>
//             <div className='transparent-bg'>
//                 <div className="overflow-x-auto ml-8 mr-8" style={{ paddingBottom: '0' }}>
//                     <table className="w-full text-1xl" style={{ border: 'none', marginTop: '0' }}>
//                         <thead style={{ borderBottom: '3px solid', borderTop: '3px solid' }}>
//                             <tr>
//                                 <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px' }}>Test Name</th>
//                                 <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px' }}>Result</th>
//                                 <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px' }}>Units</th>
//                                 <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px' }}>Bio Ref Interval</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {currentReport.tests.map((test, index) => (
//                                 <tr key={index}>
//                                     <td className="border border-gray-300 p-2 font-bold" style={{ border: 'none', whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '200px' }}>{formatCellContent(test.testName)}</td>
//                                     <td className={`border border-gray-300 p-2 ${isValueOutOfRange(test.result, test.bioRefInterval) ? 'font-bold' : ''}`} style={{ border: 'none', whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '200px' }}>
//                                         {test.result}
//                                     </td>
//                                     <td className="border border-gray-300 p-2 font-bold" style={{ border: 'none', whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '200px' }}>{test.units}</td>
//                                     <td className="border border-gray-300 p-2" style={{ border: 'none', whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '200px' }}>{formatCellContent(test.bioRefInterval)}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//                 <h4 className='endLine'>-----End Of Report----</h4>
//                 <div className="flex justify-end  mt-2 space-x-40" style={{ marginRight: '4rem' }}>
//                     <div className="flex flex-col items-center" style={{ lineHeight: '0rem' }}>
//                         <img src={ManishSign} alt="Lab Technician" className="w-27 h-10" />
//                         <p className="font-bold" style={{ fontSize: '0.7rem' }}>Lab Technician</p>
//                     </div>
//                     <div className="flex flex-col items-center h-40" style={{ lineHeight: '1rem' }}>
//                         <img src={DoctorSign} alt="Dr. Aubhuti Choudhary" className="w-28 h-10 z-50" />
//                         <p className="font-bold" style={{ fontSize: '0.7rem' }}>DR. Aubhuti Choudhary</p>
//                         <p className="font-bold" style={{ fontSize: '0.7rem', lineHeight: '0.2rem' }}>M.D Pathology</p>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default ResultTableContent

// import React from "react";
// import './App.css';

// import ManishSign from './ManishSign.jpg';
// import DoctorSign from './DoctorSign.PNG';
// import { formatCellContent, setInitialAgglutininTitreData } from "./Helper";


// const WidalTestBody = ({ data, handleChange, testResult, handleTestResultChange }) => {
//     return (
//         <>
//             <h2 style={{textAlign:'center'}}><strong>Agglutinin Titre</strong></h2>
//                     <table className="w-full text-1xl" style={{ border: 'none', marginTop: '0', width:'50px' }}>
//             <thead>
//                             <tr style={{width:'100rem' , backgroundColor:'red'}}>
//                                 <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px',width:'100rem' }}> </th>
//                                 <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px',width:'20px' }}>2</th>
//                                 <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px',width:'20px' }}>3</th>
//                                 <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px',width:'20px' }}>4</th>
//                                 <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px',width:'20px' }}>5</th>
//                                 <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px',width:'20px' }}>6</th>
//                             </tr>
//                         </thead>
//                 <tbody>
//                     {data.map((test, rowIndex) => (
//                         <tr key={rowIndex}>
//                             <td style={{ border: 'none'}}>{test.testName}</td>
//                             {test.titres.map((titre, colIndex) => (
//                                 <td style={{ border: 'none'}} key={colIndex}>
//                                     <input type="text" value={titre} onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)} />
//                                 </td>
//                             ))}
//                         </tr>
//                     ))}
//                     <tr className="result-row">
//                         <td style={{ border: 'none'}}>THIS TEST IS:</td>
//                         <td  style={{ border: 'none'}} colSpan="5">
//                             <input type="text" value={testResult} onChange={handleTestResultChange} />
//                         </td>
//                     </tr>
//                 </tbody>
//             </table>
//             <div className="note">
//                 <p>Agglutination titre of greater than 1:80, considered significant & usually suggestive of infection.</p>
//                 <p>A single positive result has less significance than the rising agglutination titre.</p>
//                 <p>Note:- TEST RUN WITH NEGATIVE AND POSITIVE CONTROL</p>
//             </div>
//         </>
//     );
// }

// const ResultTableContent = ({ currentReport, isValueOutOfRange }) => {
//     const [agglutininData, setAgglutininData] = React.useState(setInitialAgglutininTitreData());
//     const [testResult, setTestResult] = React.useState("");

//     const handleChange = (rowIndex, colIndex, value) => {
//         const updatedData = [...agglutininData];
//         updatedData[rowIndex].titres[colIndex] = value;
//         setAgglutininData(updatedData);
//     }

//     const handleTestResultChange = (e) => {
//         setTestResult(e.target.value);
//     }

//    // const isThyroidTest = currentReport.tests.some(test => test.testName.toLowerCase().includes("widal test (slide method)"));
//    const isThyroidTest = currentReport.mainTestName.toLowerCase().includes("widal test (slide method)");

//     return (
//         <>
//             <div className='transparent-bg'>
//                 <div className="overflow-x-auto ml-8 mr-8" style={{ paddingBottom: '0' }}>
//                     {isThyroidTest ? (
//                         <WidalTestBody
//                             data={agglutininData}
//                             handleChange={handleChange}
//                             testResult={testResult}
//                             handleTestResultChange={handleTestResultChange}
//                         />
//                     ) : (
//                         <table className="w-full text-1xl" style={{ border: 'none', marginTop: '0' }}>
//                             <thead style={{ borderBottom: '3px solid', borderTop: '3px solid' }}>
//                                 <tr>
//                                     <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px' }}>Test Name</th>
//                                     <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px' }}>Result</th>
//                                     <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px' }}>Units</th>
//                                     <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px' }}>Bio Ref Interval</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {currentReport.tests.map((test, index) => (
//                                     <tr key={index}>
//                                         <td className="border border-gray-300 p-2 font-bold" style={{ border: 'none', whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '200px' }}>{formatCellContent(test.testName)}</td>
//                                         <td className={`border border-gray-300 p-2 ${isValueOutOfRange(test.result, test.bioRefInterval) ? 'font-bold' : ''}`} style={{ border: 'none', whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '200px' }}>
//                                             {test.result}
//                                         </td>
//                                         <td className="border border-gray-300 p-2 font-bold" style={{ border: 'none', whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '200px' }}>{test.units}</td>
//                                         <td className="border border-gray-300 p-2" style={{ border: 'none', whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '200px' }}>{formatCellContent(test.bioRefInterval)}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     )}
//                 </div>
//                 <h4 className='endLine'>-----End Of Report----</h4>
//                 <div className="flex justify-end mt-2 space-x-40" style={{ marginRight: '4rem' }}>
//                     <div className="flex flex-col items-center" style={{ lineHeight: '0rem' }}>
//                         <img src={ManishSign} alt="Lab Technician" className="w-27 h-10" />
//                         <p className="font-bold" style={{ fontSize: '0.7rem' }}>Lab Technician</p>
//                     </div>
//                     <div className="flex flex-col items-center h-40" style={{ lineHeight: '1rem' }}>
//                         <img src={DoctorSign} alt="Dr. Aubhuti Choudhary" className="w-28 h-10 z-50" />
//                         <p className="font-bold" style={{ fontSize: '0.7rem' }}>DR. Aubhuti Choudhary</p>
//                         <p className="font-bold" style={{ fontSize: '0.7rem', lineHeight: '0.2rem' }}>M.D Pathology</p>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default ResultTableContent;



import React from "react";
import './App.css';

import ManishSign from './ManishSign.jpg';
import DoctorSign from './DoctorSign.PNG';
import { formatCellContent, setInitialAgglutininTitreData } from "./Helper";

const WidalTestBody = ({ data, testResult}) => {
    return (
        <>
            <h2 className="text-center font-bold">Agglutinin Titre</h2>
            {/* <div className="overflow-x-auto"> */}
                <table className="w-full h-full text-xl " style={{ height:'100%',border: 'none' }} >
                    <thead>
                        <tr >
                            <th className="p-2" style={{ border: 'none' }} > </th>
                            <th className=" p-2" style={{ border: 'none' }} >2</th>
                            <th className=" p-2" style={{ border: 'none' }} >3</th>
                            <th className=" p-2" style={{ border: 'none' }} >4</th>
                            <th className=" p-2" style={{ border: 'none' }} >5</th>
                            <th className=" p-2" style={{ border: 'none' }} >6</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.tests.map((test, index) => (
                            test.testName.includes('The Test is :') ?
                             (<><tr className="result-row">
                                <td className=" p-2 font-bold" style={{ border: 'none' }} >{test.testName}</td>
                                <td className=" p-2 font-bold" style={{ border: 'none' }} colSpan="5">
                                    {test.result}
                                </td>
                            </tr></>) : 
                            ( <><tr key={index}>
                                <td className="border" style={{ border: 'none' }}>{formatCellContent(test.testName)}</td>
                                <td className="border" style={{ border: 'none' }}>{test.test1}</td>
                                <td className="border" style={{ border: 'none' }}>{test.test2}</td>
                                <td className="border" style={{ border: 'none' }}>{test.test3}</td>
                                <td className="border" style={{ border: 'none' }}>{test.test4}</td>
                                <td className="border" style={{ border: 'none' }}>{test.test5}</td>
                               </tr></>)
                        ))}
                        
                    </tbody>
                </table>
            {/* </div> */}
            <div className="mt-8" >
                <p>Agglutination titre of greater than 1:80, considered significant & usually suggestive of infection.</p>
                <p>A single positive result has less significance than the rising agglutination titre.</p>
                <p >Note:- TEST RUN WITH NEGATIVE AND POSITIVE CONTROL</p>
            </div>
        </>
    );
}

export const ResultTableContent = ({ currentReport, isValueOutOfRange }) => {
    const isThyroidTest = currentReport.mainTestName.toLowerCase().includes("widal test (slide method)");

    return (
        <>
            <div >
                <div className="overflow-x-auto ml-8 mr-8" style={{ paddingBottom: '0' }}>
                    {isThyroidTest && (
                        <WidalTestBody
                            data={currentReport}
                            testResult={currentReport.result}
                        />
                    )}
                    {!isThyroidTest && (
                        <table className="w-full text-1xl" style={{ border: 'none', marginTop: '0' }}>
                            <thead style={{ borderBottom: '3px solid', borderTop: '3px solid' }}>
                                <tr>
                                    <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px' }}>Test Name</th>
                                    <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px' }}>Result</th>
                                    <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px' }}>Units</th>
                                    <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px' }}>Bio Ref Interval</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentReport.tests.map((test, index) => (
                                    <tr key={index} style={{lineHeight:'0.3rem'}}>
                                        <td className="border border-gray-300 p-2 font-bold" style={{ border: 'none', whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '200px' }}>{formatCellContent(test.testName)}</td>
                                        <td className={`border border-gray-300 p-2 ${isValueOutOfRange(test.result, test.bioRefInterval) ? 'font-bold' : ''}`} style={{ border: 'none', whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '200px' }}>
                                            {test.result}
                                        </td>
                                        <td className="border border-gray-300 p-2 font-bold" style={{ border: 'none', whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '200px' }}>{test.units}</td>
                                        <td className="border border-gray-300 p-2" style={{ border: 'none', whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '200px' }}>{formatCellContent(test.bioRefInterval)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {/* {isThyroidTest ? (
                        <WidalTestBody
                            data={currentReport}
                            testResult={currentReport.result}
                        />
                    ) : (
                        <table className="w-full text-1xl" style={{ border: 'none', marginTop: '0' }}>
                            <thead style={{ borderBottom: '3px solid', borderTop: '3px solid' }}>
                                <tr>
                                    <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px' }}>Test Name</th>
                                    <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px' }}>Result</th>
                                    <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px' }}>Units</th>
                                    <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px' }}>Bio Ref Interval</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentReport.tests.map((test, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 p-2 font-bold" style={{ border: 'none', whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '200px' }}>{formatCellContent(test.testName)}</td>
                                        <td className={`border border-gray-300 p-2 ${isValueOutOfRange(test.result, test.bioRefInterval) ? 'font-bold' : ''}`} style={{ border: 'none', whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '200px' }}>
                                            {test.result}
                                        </td>
                                        <td className="border border-gray-300 p-2 font-bold" style={{ border: 'none', whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '200px' }}>{test.units}</td>
                                        <td className="border border-gray-300 p-2" style={{ border: 'none', whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '200px' }}>{formatCellContent(test.bioRefInterval)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )} */}
                </div>
                <h4 className='endLine'>-----End Of Report----</h4>
                <div className="flex justify-end mt-2 space-x-40" style={{ marginRight: '4rem' }}>
                    <div className="flex flex-col items-center" style={{ lineHeight: '0rem' }}>
                        <img src={ManishSign} alt="Lab Technician" className="w-27 h-10" />
                        <p className="font-bold" style={{ fontSize: '0.7rem' }}>Lab Technician</p>
                    </div>
                    <div className="flex flex-col items-center h-40" style={{ lineHeight: '1rem' }}>
                        <img src={DoctorSign} alt="Dr. Aubhuti Choudhary" className="w-28 h-10 z-50" />
                        <p className="font-bold" style={{ fontSize: '0.7rem' }}>DR. Aubhuti Choudhary</p>
                        <p className="font-bold" style={{ fontSize: '0.7rem', lineHeight: '0.2rem' }}>M.D Pathology</p>
                    </div>
                </div>
            </div>
        </>
    );
}

