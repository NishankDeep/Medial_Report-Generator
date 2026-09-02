import React from 'react';
import './App.css'
import { changeDollarToSpace, showRangeFlag, showDeficiencyPercent, isPositiveResult } from "./Helper";
import { WidalTestBody } from './ResultTable';
import { UrineOputut } from './UrineInput';
import { OptimalTestOputut } from './OptimalTest';

const DisplayPatientData = (prop) => {
    const { reports, previewReport, downloadReport, deleteReport, isValueOutOfRange, getRangeStatus, getRangeDeviation } = prop;

    const resultSuffix = (test, report) => {
        if (showRangeFlag(report.mainTestName, test.testName) && getRangeStatus) {
            const status = getRangeStatus(test.result, test.bioRefInterval, report.gender, report.age);
            return status ? ` (${status})` : '';
        }
        return '';
    };

    // HB%: the percentage sits on its own line under the result
    const deviationLabel = (test, report) => {
        if (!showDeficiencyPercent(report.mainTestName, test.testName) || !getRangeDeviation) return '';
        const { status, percent } = getRangeDeviation(test.result, test.bioRefInterval, report.gender, report.age);
        if (!status || percent == null) return '';
        return <div style={{ marginTop: '0.35rem' }}>({percent.toFixed(1)}%)</div>;
    };

    return (
        <div id="reportsContainer" style={{ marginTop: '2rem' }}>
            <h2 className="card-title">Submitted Reports</h2>

            {reports.length === 0 &&
                <div className="empty-state">No reports yet. Fill the form above and save one.</div>
            }

            {reports.map((report, index) => (
                <div key={index} className="report-card">
                    <div className="report-card-head">
                        <div>
                            <h3 className="report-name">{report.salutation} {report.name}</h3>
                            <div className="report-meta">
                                <span>PRN <strong>{report.prn}</strong></span>
                                <span>Age <strong>{report.age}</strong></span>
                                <span>Gender <strong>{report.gender}</strong></span>
                                <span>Collected <strong>{report.Sample_Collected_On}</strong></span>
                                <span>Reported <strong>{report.Sample_Out_On}</strong></span>
                                <span>Referred by <strong>{report.referredBy}</strong></span>
                            </div>
                        </div>
                        <span className="badge">{report.mainTestName}</span>
                    </div>

                    {report.mainTestName.toLowerCase().includes('optimal test') &&
                        <OptimalTestOputut report={report} />
                    }
                    {report.mainTestName.toLowerCase().includes("urine") &&
                        <UrineOputut report={report} />
                    }
                    {report.mainTestName.toLowerCase().includes("widal test (slide method)") &&
                        <WidalTestBody data={report} />
                    }
                    {!report.mainTestName.toLowerCase().includes('optimal test') && !report.mainTestName.toLowerCase().includes("urine") && !report.mainTestName.toLowerCase().includes("widal test (slide method)") &&
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Test Name</th>
                                    <th>Result</th>
                                    <th>Units</th>
                                    <th>Bio Ref Interval</th>
                                </tr>
                            </thead>
                            <tbody>
                                {report.tests.map((test, index) => (
                                    <tr key={index}>
                                        <td><strong>{test.testName}</strong></td>
                                        <td className={`${isValueOutOfRange(test.result, test.bioRefInterval, report.gender, report.age) ? 'out-of-range' : ''} ${isPositiveResult(test.result) ? 'font-bold' : ''}`}>
                                            {test.result}{resultSuffix(test, report)}{deviationLabel(test, report)}
                                        </td>
                                        <td>{test.units}</td>
                                        <td>{changeDollarToSpace(test.bioRefInterval)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }

                    <div className="report-actions" style={{ marginTop: '1rem', justifyContent: 'flex-end' }}>
                        <button onClick={() => previewReport(index)} className="btn btn-secondary">
                            Preview
                        </button>
                        <button onClick={() => downloadReport(index)} className="btn btn-primary">
                            Download PDF
                        </button>
                        <button onClick={() => deleteReport(index)} className="btn btn-danger">
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DisplayPatientData;
