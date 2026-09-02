import React from "react";
import './App.css'

const displayInputContent = (test, formData, index, handleTestDetailChange) => {
    let displayOnScreenForInput;
    if (formData.mainTestName.toLowerCase().includes('widal test (slide method)')) {
        displayOnScreenForInput = (
            <>

                <input
                    type="text"
                    name={test.testName.includes("The Test is : ") === true ? "result" : "test1"}
                    value={test.testName.includes("The Test is : ") === true ? test.result : test.test1}
                    onChange={(e) => handleTestDetailChange(index, e)}
                    placeholder={test.testName.includes("The Test is : ") === true ? "Result" : "Test 1"}
                />

                <input
                    type="text"
                    name="test2"
                    value={test.test2}
                    onChange={(e) => handleTestDetailChange(index, e)}
                    placeholder='Test 2'
                    style={{ display: test.testName.includes("The Test is : ") !== true ? 'block' : 'none' }}
                />

                <input
                    type="text"
                    name="test3"
                    value={test.test3}
                    onChange={(e) => handleTestDetailChange(index, e)}
                    placeholder='Test 3'
                    style={{ display: test.testName.includes("The Test is : ") !== true ? 'block' : 'none' }}
                />

                <input
                    type="text"
                    name="test4"
                    value={test.test4}
                    onChange={(e) => handleTestDetailChange(index, e)}
                    placeholder='Test 4'
                    style={{ display: test.testName.includes("The Test is : ") !== true ? 'block' : 'none' }}
                />

                <input
                    type="text"
                    name="test5"
                    value={test.test5}
                    onChange={(e) => handleTestDetailChange(index, e)}
                    placeholder='Test 5'
                    style={{ display: test.testName.includes("The Test is : ") !== true ? 'block' : 'none' }}
                />
            </>
        );
    }
    else if (formData.mainTestName.toLowerCase().includes('malaria parasite')) {
        displayOnScreenForInput = (
            <>
                <input
                    type="text"
                    name="result"
                    value={test.result}
                    onChange={(e) => handleTestDetailChange(index, e)}
                    placeholder="Result"
                    required
                />
            </>)

    } else {
        displayOnScreenForInput = (
            <>
                <input
                    type="text"
                    name="result"
                    value={test.result}
                    onChange={(e) => handleTestDetailChange(index, e)}
                    placeholder="Result"
                    required
                />
                <input
                    type="text"
                    name="units"
                    value={test.units}
                    onChange={(e) => handleTestDetailChange(index, e)}
                    placeholder="Units"
                />
                <input
                    type="text"
                    name="bioRefInterval"
                    value={test.bioRefInterval}
                    onChange={(e) => handleTestDetailChange(index, e)}
                    placeholder="Bio Ref Interval"
                />
            </>
        );
    }

    return displayOnScreenForInput;
}

const TestDetailInput = (prop) => {
    const { testDetails, formData, handleTestDetailChange, handleRemoveTestDetail } = prop;


    const testReturnInput = <>
        <div id="testDetailsContainer">
            {testDetails.length === 0 &&
                <p className="selected-test">No rows yet. Pick a test above, or use "Add Row".</p>
            }
            {testDetails.map((test, index) => (
                <div key={index} className="test-row">

                    <input
                        type="text"
                        name="testName"
                        value={test.testName}
                        onChange={(e) => handleTestDetailChange(index, e)}
                    placeholder="Test Name"
                        required
                />
                    {displayInputContent(test, formData, index, handleTestDetailChange)}
                    <button
                        type="button"
                        onClick={() => handleRemoveTestDetail(index)}
                        className="btn btn-danger btn-icon"
                        title="Remove row"
                    >
                        Remove
                    </button>
                </div>
            ))}
        </div>
    </>
    return (testReturnInput);
}

export default TestDetailInput;