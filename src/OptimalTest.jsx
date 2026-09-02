import React, { useEffect } from "react";
import './App.css'
import { WidalTestBody } from "./ResultTable";


const optimalInput = {
    test1: [
        { testName: 'S. TYPHI `H`', test1: '', test2: '', test3: '', test4: '', test5: '' },
        { testName: 'S. TYPHI `O`', test1: '', test2: '', test3: '', test4: '', test5: '' },
        { testName: 'S. PARATYPH `AH`', test1: '', test2: '', test3: '', test4: '', test5: '' },
        { testName: 'S. PARATYPH `BH`', test1: '', test2: '', test3: '', test4: '', test5: '' },
        { testName: 'The Test is : ', result: '' },
    ],
    test2: [
        { testName: 'P.Vivax - Antigen', result: '' },
        { testName: 'P.Falciparum', result: '' }
    ]
}

// component to take urine inputs....
export const OptimalTestInput = ({ optimalTestDetails, setOptimalTestDetails, formData }) => {

    useEffect(() => {
        setOptimalTestDetails(optimalInput);
    }, [formData.mainTestName])

    const handleAddTest1Detail = () => {
        setOptimalTestDetails({ ...optimalTestDetails, test1: [...optimalTestDetails.test1, { testName: '', test1: '', test2: '', test3: '', test4: '', test5: '' }] });
    };

    const handleAddTest2Detail = () => {
        setOptimalTestDetails({ ...optimalTestDetails, test2: [...optimalTestDetails.test2, { testName: '', result: '' }] });
    };

    const handleTest1DetailChange = (index, e) => {
        const { name, value } = e.target;
        const newTestDetails = { ...optimalTestDetails };
        newTestDetails.test1[index][name] = value;
        setOptimalTestDetails(newTestDetails);
    };

    const handleTest2DetailChange = (index, e) => {
        const { name, value } = e.target;
        const newTestDetails = { ...optimalTestDetails };
        newTestDetails.test2[index][name] = value;
        setOptimalTestDetails(newTestDetails);
    };

    const handleRemoveTest1Detail = (index) => {
        let newTestDetails = { ...optimalTestDetails };
        newTestDetails.test1 = optimalTestDetails.test1.filter((_, i) => i !== index);
        setOptimalTestDetails(newTestDetails);
    };

    const handleRemoveTest2Detail = (index) => {
        let newTestDetails = { ...optimalTestDetails };
        newTestDetails.test2 = optimalTestDetails.test2.filter((_, i) => i !== index);
        setOptimalTestDetails(newTestDetails);
    };

    return (
        <>
            <div id="testDetailsContainer">
                                {optimalTestDetails.test1.length > 0 && <h4 className="card-title" style={{ marginTop: '1rem' }}>WIDAL TEST (SLIDE METHOD)</h4>}
                {optimalTestDetails.test1.map((test, index) => (
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
                            name={test.testName.includes("The Test is : ") === true ? "result" : "test1"}
                            value={test.testName.includes("The Test is : ") === true ? test.result : test.test1}
                            onChange={(e) => handleTest1DetailChange(index, e)}
                            
                            placeholder={test.testName.includes("The Test is : ") === true ? "Result" : "Test 1"}
                        />

                        <input
                            type="text"
                            name="test2"
                            value={test.test2}
                            onChange={(e) => handleTest1DetailChange(index, e)}
                            
                            placeholder='Test 2'
                            style={{ display: test.testName.includes("The Test is : ") !== true ? 'block' : 'none' }}
                        />

                        <input
                            type="text"
                            name="test3"
                            value={test.test3}
                            onChange={(e) => handleTest1DetailChange(index, e)}
                            
                            placeholder='Test 3'
                            style={{ display: test.testName.includes("The Test is : ") !== true ? 'block' : 'none' }}
                        />

                        <input
                            type="text"
                            name="test4"
                            value={test.test4}
                            onChange={(e) => handleTest1DetailChange(index, e)}
                            
                            placeholder='Test 4'
                            style={{ display: test.testName.includes("The Test is : ") !== true ? 'block' : 'none' }}
                        />

                        <input
                            type="text"
                            name="test5"
                            value={test.test5}
                            onChange={(e) => handleTest1DetailChange(index, e)}
                            
                            placeholder='Test 5'
                            style={{ display: test.testName.includes("The Test is : ") !== true ? 'block' : 'none' }}
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
                {optimalTestDetails.test2.length > 0 && <h4 className="card-title" style={{ marginTop: '1rem' }}><p>Malaria Parasite</p><p>(Rapid screening test)</p> </h4>}
                {optimalTestDetails.test2.map((test, index) => (
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
export const OptimalTestOputut = ({ report }) => {
    console.log(report)
    const data = {
        tests: report.optimalTests.test1
    }
    return (
        <>
            <table className="w-full text-1xl" style={{ border: 'none', marginTop: '0' }}>
                <thead style={{ borderBottom: '3px solid', borderTop: '3px solid' }}>
                    <tr>
                        <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px' }}>Test Name</th>
                        <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px' }}>Result</th>
                        <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px' }}>Units</th>
                        <th className="border border-gray-300 " style={{ border: 'none', paddingTop: '0px' }}>Bio Ref Interval</th>

                    </tr>
                </thead>
            </table>
            <table className="w-full  border-collapse border border-gray-300" style={{ border: 'none' }} >
                {/* <tbody> */}
                <thead style={{ border: 'none', lineHeight: '1rem' }}>
                    <tr className="font-bold"><td style={{ fontSize: '1rem', border: 'none' }}>WIDAL TEST (SLIDE METHOD)</td></tr>
                </thead>
                <tbody>
                    <WidalTestBody data={data} />
                </tbody>
            </table>
            <table className="w-full  border-collapse border border-gray-300" style={{ border: 'none' }} >
                <thead style={{ border: 'none', lineHeight: '1rem' }}>
                    <tr className="font-bold"><td style={{ fontSize: '1rem', border: 'none' }}><p>Malaria Parasite</p><p>(Rapid screening test)</p></td></tr>
                </thead>
                <tbody>
                    {report.optimalTests.test2.map((test, index) => (
                        <tr key={index} style={{ lineHeight: '0.6rem' }}>
                            <td className="border border-gray-300 p-2" style={{ border: 'none', width: '35%' }}>
                                {test.testName}
                            </td>
                            <td
                                className={`border border-gray-300 p-2 font-bold`}
                                style={{ border: 'none' }}
                            >
                                {test.result}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}