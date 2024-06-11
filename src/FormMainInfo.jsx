import React from "react";
import TestNameDropdown from "./Select";


const FormMainInfo = (prop) => {
    const {formData, handleInputChange ,handleTestNameChange} = prop;
    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-1">Salutation:</label>
                    <select
                        name="salutation"
                        value={formData.salutation}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Miss">Miss</option>
                        <option value="Master">Master</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1">PRN No.:</label>
                    <input
                        type="text"
                        name="prn"
                        value={formData.prn}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-1">Age:</label>
                    <input
                        type="text"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1">Gender:</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                    </select>
                </div>
                <div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-1">Sample Date:</label>
                    <input
                        type="date"
                        name="Sample_Collected_On"
                        value={formData.Sample_Collected_On}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1">Report Date:</label>
                    <input
                        type="date"
                        name="Sample_Out_On"
                        value={formData.Sample_Out_On}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-1">Referred By:</label>
                    <select
                        name="referredBy"
                        value={formData.referredBy}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select</option>
                        <option value="Dr.Anupam kr.singh">Dr.Anupam kr.singh</option>
                        <option value="Dr.Tusar Arya">Dr.Tusar Arya</option>
                        <option value="Dr.Kumar Prateek">Dr.Kumar Prateek</option>
                        <option value="Dr.Self">Dr.Self</option>
                    </select>
                </div>
                <div>
                    <TestNameDropdown formData={formData} onTestNameChange={handleTestNameChange} />
                    <div>Selected Test Name: <strong>{formData.mainTestName}</strong></div>
                </div>
            </div>
        </>
    );
}


export default FormMainInfo;