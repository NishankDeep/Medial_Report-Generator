import React, { useEffect } from "react";
import './App.css'
import { setInitialTestDetail } from "./Helper";


const urineInput = {
    test1: [
        { testName: 'volume', result: '' },
        { testName: 'color', result: '' },
        { testName: 'appearence', result: '' },
        { testName: 'sediments', result: '' },
        { testName: 'specific_gravity', result: '' }
    ],
    test2: [
        { testName: 'ph', result: '' },
        { testName: 'reaction', result: '' },
        { testName: 'sugar', result: '' },
        { testName: 'albumin', result: '' },
        { testName: 'phosphate', result: '' }
    ],
    test3: [
        { testName: 'erythrocytes', result: '' },
        { testName: 'pus_cells', result: '' },
        { testName: 'epithelial_cells', result: '' },
        { testName: 'others', result: '' },
        { testName: 'casts', result: '' },
        { testName: 'crystals', result: '' }
    ],

}

// component to take urine inputs....
export const UrineInput = ({ urineTestDetails, setUrineTestDetails, formData }) => {

    useEffect(() => {
        setUrineTestDetails(urineInput);
    }, [formData.mainTestName])

    const handleAddTest1Detail = () => {
        setUrineTestDetails({ ...urineTestDetails, test1: [...urineTestDetails.test1, { testName: '', result: '' }] });
    };

    const handleAddTest2Detail = () => {
        setUrineTestDetails({ ...urineTestDetails, test2: [...urineTestDetails.test2, { testName: '', result: '' }] });
    };

    const handleAddTest3Detail = () => {
        setUrineTestDetails({ ...urineTestDetails, test3: [...urineTestDetails.test3, { testName: '', result: '' }] });
    };

    const handleTest1DetailChange = (index, e) => {
        const { name, value } = e.target;
        const newTestDetails = { ...urineTestDetails };
        newTestDetails.test1[index][name] = value;
        setUrineTestDetails(newTestDetails);
    };

    const handleTest2DetailChange = (index, e) => {
        const { name, value } = e.target;
        const newTestDetails = { ...urineTestDetails };
        newTestDetails.test2[index][name] = value;
        setUrineTestDetails(newTestDetails);
    };

    const handleTest3DetailChange = (index, e) => {
        const { name, value } = e.target;
        const newTestDetails = { ...urineTestDetails };
        newTestDetails.test3[index][name] = value;
        setUrineTestDetails(newTestDetails);
    };

    const handleRemoveTest1Detail = (index) => {
        let newTestDetails = { ...urineTestDetails };
        newTestDetails.test1 = urineTestDetails.test1.filter((_, i) => i !== index);
        setUrineTestDetails(newTestDetails);
    };

    const handleRemoveTest2Detail = (index) => {
        let newTestDetails = { ...urineTestDetails };
        newTestDetails.test2 = urineTestDetails.test2.filter((_, i) => i !== index);
        setUrineTestDetails(newTestDetails);
    };

    const handleRemoveTest3Detail = (index) => {
        let newTestDetails = { ...urineTestDetails };
        newTestDetails.test3 = urineTestDetails.test3.filter((_, i) => i !== index);
        setUrineTestDetails(newTestDetails);
    };

    return (
        <>
            <div id="testDetailsContainer">
                                {urineTestDetails.test1.length > 0 && <h4 className="card-title" style={{ marginTop: '1rem' }}>PHYSICAL EXAMINATION </h4>}
                {urineTestDetails.test1.map((test, index) => (
                    <div key={index} className="test-row">
                        <input
                            type="text"
                            name="testName"
                            value={test.testName}
                            onChange={(e) => handleTest1DetailChange(index, e)}
                            placeholder="Test Name"
                            required
                        />
                        <input
                            type="text"
                            name="result"
                            value={test.result}
                            onChange={(e) => handleTest1DetailChange(index, e)}
                            placeholder="Result"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveTest1Detail(index)}
                            className="btn btn-danger btn-icon"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddTest1Detail}
                    className="btn btn-secondary"
                >
                    Add Test Detail1
                </button>
                {urineTestDetails.test2.length > 0 && <h4 className="card-title" style={{ marginTop: '1rem' }}>CHEMICAL EXAMINATION </h4>}
                {urineTestDetails.test2.map((test, index) => (
                    <div key={index} className="test-row">
                        <input
                            type="text"
                            name="testName"
                            value={test.testName}
                            onChange={(e) => handleTest2DetailChange(index, e)}
                            placeholder="Test Name"
                            required
                        />
                        <input
                            type="text"
                            name="result"
                            value={test.result}
                            onChange={(e) => handleTest2DetailChange(index, e)}
                            placeholder="Result"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveTest2Detail(index)}
                            className="btn btn-danger btn-icon"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddTest2Detail}
                    className="btn btn-secondary"
                >
                    Add Test Detail2
                </button>
                {urineTestDetails.test3.length > 0 && <h4 className="card-title" style={{ marginTop: '1rem' }}>MICROSCOPIC EXAMINATION </h4>}
                {urineTestDetails.test3.map((test, index) => (
                    <div key={index} className="test-row">
                        <input
                            type="text"
                            name="testName"
                            value={test.testName}
                            onChange={(e) => handleTest3DetailChange(index, e)}
                            placeholder="Test Name"
                            required
                        />
                        <input
                            type="text"
                            name="result"
                            value={test.result}
                            onChange={(e) => handleTest3DetailChange(index, e)}
                            placeholder="Result"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveTest3Detail(index)}
                            className="btn btn-danger btn-icon"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddTest3Detail}
                    className="btn btn-secondary"
                >
                    Add Test Detail3
                </button>
            </div>
            <button
                type="submit"
                className="btn btn-primary"
            >
                Submit
            </button>
        </>
    );
}


// compoenent to display urine output
export const UrineOputut = ({ report }) => {
    return (
        <>
            <table className="w-full  border-collapse border border-gray-300" style={{ border: 'none' }} >
                <tbody>
                    <thead style={{ border: 'none', lineHeight: '1rem' }}>
                        <tr className="font-bold"><td style={{ fontSize: '1rem', border: 'none' }}>Physical Examination</td></tr>
                    </thead>
                    {report.urineTests.test1.map((test, index) => (
                        <tr key={index} style={{ lineHeight: '0.3rem' }}>
                            <td className="border border-gray-300 p-2" style={{ border: 'none' }}>
                                {test.testName}
                            </td>
                            <td
                                className={`border border-gray-300 p-2 font-bold`}
                                style={{ border: 'none' }}
                            >
                                : {test.result}
                            </td>
                        </tr>
                    ))}
                    <thead style={{ border: 'none', lineHeight: '1rem' }}>
                        <tr className="font-bold"><td style={{ fontSize: '1rem', border: 'none' }}>Chemical Examination</td></tr>
                    </thead>
                    {report.urineTests.test2.map((test, index) => (
                        <tr key={index} style={{ lineHeight: '0.3rem' }}>
                            <td className="border border-gray-300 p-2" style={{ border: 'none' }}>
                                {test.testName}
                            </td>
                            <td
                                className={`border border-gray-300 p-2 font-bold`}
                                style={{ border: 'none' }}
                            >
                                : {test.result}
                            </td>
                        </tr>
                    ))}
                    <thead style={{ border: 'none', lineHeight: '1rem' }}>
                        <tr className="font-bold"><td style={{ fontSize: '1rem', border: 'none' }}>Microscopic Examination</td></tr>
                    </thead>
                    {report.urineTests.test3.map((test, index) => (
                        <tr key={index} style={{ lineHeight: '0.3rem' }}>
                            <td className="border border-gray-300 p-2" style={{ border: 'none' }}>
                                {test.testName}
                            </td>
                            <td
                                className={`border border-gray-300 p-2 font-bold`}
                                style={{ border: 'none' }}
                            >
                                : {test.result}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}