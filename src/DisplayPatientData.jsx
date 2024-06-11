import React from 'react';
import './App.css'
import { changeDollarToSpace } from "./Helper";
import { WidalTestBody } from './ResultTable';
import { UrineOputut } from './UrineInput';

const DisplayPatientData = (prop) => {
    const {reports, previewReport, downloadReport, deleteReport, isValueOutOfRange} = prop;
    return (
        <>
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
                        {report.mainTestName.toLowerCase().includes("urine") &&
                            <UrineOputut report={report}/>
                        }
                        {report.mainTestName.toLowerCase().includes("widal test (slide method)") &&
                            <WidalTestBody data={report}/>
                        }
                        { !report.mainTestName.toLowerCase().includes("urine") &&  !report.mainTestName.toLowerCase().includes("widal test (slide method)") &&
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
                        }
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
        </>
    );
}

export default DisplayPatientData;