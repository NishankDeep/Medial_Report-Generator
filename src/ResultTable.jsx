import React from "react";
import './App.css';

import ManishSign from './ManishSign.jpg';
import DoctorSign from './DoctorSign.PNG';
import { formatCellContent } from "./Helper";
import { UrineOputut } from "./UrineInput";
import { OptimalTestOputut } from "./OptimalTest";

export const WidalTestBody = ({ data }) => {
    return (
        <>
            <h2 className="text-center font-bold">Agglutinin Titre</h2>
            {/* <div className="overflow-x-auto"> */}
            <table className="w-full h-full text-xl " style={{ height: '100%', border: 'none', lineHeight: '0.45rem', fontSize: '1rem' }} >
                <thead>
                    <tr >
                        <th className="p-2" style={{ border: 'none', textAlign: 'center' }} > </th>
                        <th className=" p-2" style={{ border: 'none', textAlign: 'center' }} >1:20</th>
                        <th className=" p-2" style={{ border: 'none', textAlign: 'center' }} >1:40</th>
                        <th className=" p-2" style={{ border: 'none', textAlign: 'center' }} >1:80</th>
                        <th className=" p-2" style={{ border: 'none', textAlign: 'center' }} >1:160</th>
                        <th className=" p-2" style={{ border: 'none', textAlign: 'center' }} >1:320</th>
                    </tr>
                </thead>
                <tbody>
                    {data.tests.map((test, index) => (
                        test.testName.includes('The Test is :') ?
                            (<><tr className="result-row" style={{ fontSize: '0.9rem' }}>
                                <td className=" p-2 font-bold" style={{ border: 'none' }} >{test.testName}</td>
                                <td className=" p-2 font-bold" style={{ border: 'none' }} colSpan="5">
                                    {test.result}
                                </td>
                            </tr></>) :
                            (<>
                                <tr key={index} style={{ fontSize: '1rem' }}>
                                    <td className="border" style={{ border: 'none' }}>{formatCellContent(test.testName)}</td>
                                    <td className="border" style={{ border: 'none', textAlign: 'center' }}>{test.test1}</td>
                                    <td className="border" style={{ border: 'none', textAlign: 'center' }}>{test.test2}</td>
                                    <td className="border" style={{ border: 'none', textAlign: 'center' }}>{test.test3}</td>
                                    <td className="border" style={{ border: 'none', textAlign: 'center' }}>{test.test4}</td>
                                    <td className="border" style={{ border: 'none', textAlign: 'center' }}>{test.test5}</td>
                                </tr></>)
                    ))}

                </tbody>
            </table>
            {/* </div> */}
            <div className="mt-4 ml-2" >
                <p>Agglutination titre of greater than 1:80, considered significant & usually suggestive of infection.</p>
                <p>A single positive result has less significance than the rising agglutination titre.</p>
                <p >Note:- TEST RUN WITH NEGATIVE AND POSITIVE CONTROL</p>
            </div>
        </>
    );
}

export const ResultTableContent = ({ currentReport, isValueOutOfRange }) => {
    const isThyroidTest = currentReport.mainTestName.toLowerCase().includes("widal test (slide method)");
    const isUrineTest = currentReport.mainTestName.toLowerCase().includes("urine");
    const isOptimalTest = currentReport.mainTestName.toLowerCase().includes("optimal test");
    return (
        <>
            {/* <div style={{ paddingBottom: '2rem' }}> */}
            <div className="overflow-x-auto overflow-y-auto ml-8 mr-8" style={{ paddingBottom: '2rem' }} >
                {isUrineTest &&
                    <>
                        <UrineOputut
                            report={currentReport}
                        />
                    </>
                }

                {isOptimalTest &&
                    <>
                        <OptimalTestOputut report={currentReport} />
                    </>
                }

                {!isUrineTest && !isOptimalTest && <table className="w-full text-1xl" style={{ border: 'none', marginTop: '0' }}>
                    <thead style={{ borderBottom: '3px solid', borderTop: '3px solid' }}>
                        <tr>
                            {isThyroidTest && <>
                                <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px' }}>
                                    <span>Test Name</span>
                                    <span style={{ marginLeft: "190px" }}>Result</span>
                                </th>
                            </>}
                            {!isThyroidTest && <>
                                <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px' }}>Test Name</th>
                                <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px' }}>Result</th>
                                <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px' }}>Units</th>
                                <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px' }}>Bio Ref Interval</th>
                            </>}
                        </tr>
                    </thead>
                    {isThyroidTest && (
                        <WidalTestBody
                            data={currentReport}
                        />
                    )}
                    {!isUrineTest && !isThyroidTest &&
                        <tbody>
                            {currentReport.tests.map((test, index) => (
                                <tr key={index} style={{ lineHeight: '0.4rem' }}>
                                    <td className="border border-gray-300 p-2 font-bold" style={{ border: 'none', whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '200px',lineHeight: '1rem' }}>{formatCellContent(test.testName)}</td>
                                    <td className={`border border-gray-300 p-2 ${isValueOutOfRange(test.result, test.bioRefInterval, currentReport.gender, currentReport.age) ? 'font-bold' : ''}`} style={{ border: 'none', whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '200px' }}>
                                        {test.result}
                                    </td>
                                    <td className="border border-gray-300 p-2 font-bold" style={{ border: 'none', whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '200px' }}>{test.units}</td>
                                    <td className="border border-gray-300 p-2" style={{ border: 'none', whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '200px' }}>{formatCellContent(test.bioRefInterval)}</td>
                                </tr>
                            ))}
                        </tbody>}
                </table>}


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
            {/* </div> */}
        </>
    );
}

