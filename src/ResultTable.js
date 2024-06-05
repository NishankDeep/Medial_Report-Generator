import React from "react";
import './App.css'

import ManishSign from './ManishSign.jpg';
import DoctorSign from './DoctorSign.PNG';
import { formatCellContent } from "./Helper";

const ResultTableContent = ({currentReport,isValueOutOfRange}) => {
    return (
        <>
            <div className='transparent-bg'>
                <div className="overflow-x-auto ml-8 mr-8" style={{ paddingBottom: '0' }}>
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
                </div>
                <h4 className='endLine'>-----End Of Report----</h4>
                <div className="flex justify-end  mt-2 space-x-40" style={{ marginRight: '4rem' }}>
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

export default ResultTableContent