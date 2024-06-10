import React,{useEffect} from "react";
import './App.css'
import { setInitialTestDetail } from "./Helper";


const urineInput = {
        test1:[
          {testName:'volume', result:''},
          {testName:'color', result:''},
          {testName:'appearence', result:''},
          {testName:'sediments', result:''},
          {testName:'specific_gravity', result:''}
        ],
        test2:[
          {testName:'ph', result:''},
          {testName:'reaction', result:''},
          {testName:'sugar', result:''},
          {testName:'albumin', result:''},
          {testName:'phosphate', result:''}
        ],
        test3:[
          {testName:'erythrocytes', result:''},
          {testName:'pus_cells', result:''},
          {testName:'epithelial_cells', result:''},
          {testName:'others', result:''},
          {testName:'casts', result:''},
          {testName:'crystals', result:''}
        ],
      
}

// component to take urine inputs....
export const UrineInput = ({urineTestDetails,setUrineTestDetails,formData}) => {

    useEffect(() => {
          setUrineTestDetails(urineInput);
      }, [formData.mainTestName])

    const handleAddTest1Detail = () => {
        setUrineTestDetails({...urineTestDetails,test1:[...urineTestDetails.test1,{testName:'',result:''}]});
    };
    
    const handleAddTest2Detail = () => {
        setUrineTestDetails({...urineTestDetails,test2:[...urineTestDetails.test2,{testName:'',result:''}]});
    };
    
    const handleAddTest3Detail = () => {
        setUrineTestDetails({...urineTestDetails,test3:[...urineTestDetails.test3,{testName:'',result:''}]});
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
        let newTestDetails = {...urineTestDetails};
        newTestDetails.test1 = urineTestDetails.test1.filter((_, i) => i !== index);
        setUrineTestDetails(newTestDetails);
    };

    const handleRemoveTest2Detail = (index) => {
        let newTestDetails = {...urineTestDetails};
        newTestDetails.test2 = urineTestDetails.test2.filter((_, i) => i !== index);
        setUrineTestDetails(newTestDetails);
    };

    const handleRemoveTest3Detail = (index) => {
        let newTestDetails = {...urineTestDetails};
         newTestDetails.test3 = urineTestDetails.test3.filter((_, i) => i !== index);
        setUrineTestDetails(newTestDetails);
    };

    return (
        <>
            <div id="testDetailsContainer" className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Test Details</h3>
                {urineTestDetails.test1.length>0 && <h4 className="text-lg font-semibold mb-2">PHYSICAL EXAMINATION </h4>}
                {urineTestDetails.test1.map((test, index) => (
                    <div key={index} className="grid grid-cols-5 gap-4 mb-2">
                        <input
                            type="text"
                            name="testName"
                            value={test.testName}
                            onChange={(e) => handleTest1DetailChange(index, e)}
                            placeholder="Test Name"
                            required
                            className="p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="result"
                            value={test.result}
                            onChange={(e) => handleTest1DetailChange(index, e)}
                            placeholder="Result"
                            required
                            className="p-2 border border-gray-300 rounded"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveTest1Detail(index)}
                            className="px-4 py-2 bg-red-500 text-white rounded"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddTest1Detail}
                    className="mb-2 mr-4 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                    Add Test Detail1
                    </button>
                {urineTestDetails.test2.length>0 && <h4 className="text-lg font-semibold mb-2">CHEMICAL EXAMINATION </h4>}
                {urineTestDetails.test2.map((test, index) => (
                    <div key={index} className="grid grid-cols-5 gap-4 mb-2">
                        <input
                            type="text"
                            name="testName"
                            value={test.testName}
                            onChange={(e) => handleTest2DetailChange(index, e)}
                            placeholder="Test Name"
                            required
                            className="p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="result"
                            value={test.result}
                            onChange={(e) => handleTest2DetailChange(index, e)}
                            placeholder="Result"
                            required
                            className="p-2 border border-gray-300 rounded"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveTest2Detail(index)}
                            className="px-4 py-2 bg-red-500 text-white rounded"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddTest2Detail}
                    className="mb-2 mr-4 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                    Add Test Detail2
                </button>
                {urineTestDetails.test3.length>0 && <h4 className="text-lg font-semibold mb-2">MICROSCOPIC EXAMINATION </h4>}
                {urineTestDetails.test3.map((test, index) => (
                    <div key={index} className="grid grid-cols-5 gap-4 mb-2">
                        <input
                            type="text"
                            name="testName"
                            value={test.testName}
                            onChange={(e) => handleTest3DetailChange(index, e)}
                            placeholder="Test Name"
                            required
                            className="p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="result"
                            value={test.result}
                            onChange={(e) => handleTest3DetailChange(index, e)}
                            placeholder="Result"
                            required
                            className="p-2 border border-gray-300 rounded"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveTest3Detail(index)}
                            className="px-4 py-2 bg-red-500 text-white rounded"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddTest3Detail}
                    className="mb-2 mr-4 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                    Add Test Detail3
                </button>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Submit
            </button>
        </>
    );
}


// compoenent to display urine output
export const UrineOputut = ({report}) => {
    return (
        <>
            <table className="w-full  border-collapse border border-gray-300" style={{border:'none'}} >
                <tbody>
                    <thead style={{border:'none', lineHeight:'1rem'}}>
                        <tr className="font-bold"><td style={{fontSize:'1rem',border:'none'}}>Physical Examination</td></tr>
                    </thead>
                    {report.urineTests.test1.map((test, index) => (
                        <tr key={index} style={{lineHeight:'0.3rem'}}>
                            <td className="border border-gray-300 p-2" style={{border:'none'}}>
                                {test.testName}
                            </td>
                            <td
                                className={`border border-gray-300 p-2 font-bold`}
                                style={{border:'none'}}
                            >
                                : {test.result}
                            </td>
                        </tr>
                    ))}
                    <thead style={{border:'none',lineHeight:'1rem'}}>
                        <tr className="font-bold"><td style={{fontSize:'1rem',border:'none'}}>Chemical Examination</td></tr>
                    </thead>
                    {report.urineTests.test2.map((test, index) => (
                        <tr key={index} style={{lineHeight:'0.3rem'}}>
                            <td className="border border-gray-300 p-2" style={{border:'none'}}>
                                {test.testName}
                            </td>
                            <td
                                className={`border border-gray-300 p-2 font-bold`}
                                style={{border:'none'}}
                            >
                                : {test.result}
                            </td>
                        </tr>
                    ))}
                    <thead style={{border:'none',lineHeight:'1rem'}}>
                        <tr className="font-bold"><td style={{fontSize:'1rem',border:'none'}}>Microscopic Examination</td></tr>
                    </thead>
                    {report.urineTests.test3.map((test, index) => (
                        <tr key={index} style={{lineHeight:'0.3rem'}}>
                            <td className="border border-gray-300 p-2" style={{border:'none'}}>
                                {test.testName} 
                            </td>
                            <td
                                className={`border border-gray-300 p-2 font-bold`}
                                style={{border:'none'}}
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

{/* {formData.mainTestName.includes('widal test (slide method)') == true ? (
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
                        )
                            :  */}