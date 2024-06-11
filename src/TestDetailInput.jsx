import React from "react";
import './App.css'
import UrineInput from "./UrineInput";

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
                    className="p-2 border border-gray-300 rounded"
                    placeholder={test.testName.includes("The Test is : ") === true ? "Result" : "Test 1"}
                />

                <input
                    type="text"
                    name="test2"
                    value={test.test2}
                    onChange={(e) => handleTestDetailChange(index, e)}
                    className="p-2 border border-gray-300 rounded"
                    placeholder='Test 2'
                    style={{ display: test.testName.includes("The Test is : ") !== true ? 'block' : 'none' }}
                />

                <input
                    type="text"
                    name="test3"
                    value={test.test3}
                    onChange={(e) => handleTestDetailChange(index, e)}
                    className="p-2 border border-gray-300 rounded"
                    placeholder='Test 3'
                    style={{ display: test.testName.includes("The Test is : ") !== true ? 'block' : 'none' }}
                />

                <input
                    type="text"
                    name="test4"
                    value={test.test4}
                    onChange={(e) => handleTestDetailChange(index, e)}
                    className="p-2 border border-gray-300 rounded"
                    placeholder='Test 4'
                    style={{ display: test.testName.includes("The Test is : ") !== true ? 'block' : 'none' }}
                />

                <input
                    type="text"
                    name="test5"
                    value={test.test5}
                    onChange={(e) => handleTestDetailChange(index, e)}
                    className="p-2 border border-gray-300 rounded"
                    placeholder='Test 5'
                    style={{ display: test.testName.includes("The Test is : ") !== true ? 'block' : 'none' }}
                />
            </>
        );
    } 
    else if(formData.mainTestName.toLowerCase().includes('malaria parasite')){
        displayOnScreenForInput = (
            <>
                <input
                    type="text"
                    name="result"
                    value={test.result}
                    onChange={(e) => handleTestDetailChange(index, e)}
                    placeholder="Result"
                    required
                    className="p-2 border border-gray-300 rounded"
                />
            </>)

    }else {
        displayOnScreenForInput = (
            <>
                <input
                    type="text"
                    name="result"
                    value={test.result}
                    onChange={(e) => handleTestDetailChange(index, e)}
                    placeholder="Result"
                    required
                    className="p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="units"
                    value={test.units}
                    onChange={(e) => handleTestDetailChange(index, e)}
                    placeholder="Units"

                    className="p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="bioRefInterval"
                    value={test.bioRefInterval}
                    onChange={(e) => handleTestDetailChange(index, e)}
                    placeholder="Bio Ref Interval"

                    className="p-2 border border-gray-300 rounded"
                />
            </>
        );
    }

    return displayOnScreenForInput;
}

const TestDetailInput = (prop) => {
    const { testDetails, formData, handleTestDetailChange, handleRemoveTestDetail } = prop;


    const testReturnInput = <>
        <div id="testDetailsContainer" className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Test Details</h3>
            {testDetails.map((test, index) => (
                <div key={index} className="grid grid-cols-5 gap-4 mb-2">

                    <input
                        type="text"
                        name="testName"
                        value={test.testName}
                        onChange={(e) => handleTestDetailChange(index, e)}
                        placeholder="Test Name"
                        required
                        className="p-2 border border-gray-300 rounded"
                    />
                    {displayInputContent(test, formData, index, handleTestDetailChange)}
                    <button
                        type="button"
                        onClick={() => handleRemoveTestDetail(index)}
                        className="px-4 py-2 bg-red-500 text-white rounded"
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