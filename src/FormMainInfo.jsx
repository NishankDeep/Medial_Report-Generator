import React from "react";
import TestNameDropdown from "./Select";


const PRN_PREFIX = 'JHSCD';
const DOCTOR_PREFIX = 'Dr.';

const FormMainInfo = (prop) => {
    const { formData, handleInputChange, handleTestNameChange } = prop;

    const prnDigits = (formData.prn || '').replace(new RegExp(`^${PRN_PREFIX}`, 'i'), '');

    const handlePrnChange = (e) => {
        const digits = e.target.value.replace(/\D/g, '');
        handleInputChange({ target: { name: 'prn', value: PRN_PREFIX + digits } });
    };

    const referredByName = (formData.referredBy || '').replace(/^(dr\.?\s*)+/i, '');

    const handleReferredByChange = (e) => {
        const name = e.target.value.replace(/^(dr\.?\s*)+/i, '');
        handleInputChange({ target: { name: 'referredBy', value: name ? DOCTOR_PREFIX + name : '' } });
    };

    return (
        <div className="field-grid">
            <div>
                <label className="block mb-1">Salutation</label>
                <select
                    name="salutation"
                    value={formData.salutation}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Miss">Miss</option>
                    <option value="Master">Master</option>
                </select>
            </div>
            <div>
                <label className="block mb-1">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Patient name"
                    required
                />
            </div>
            <div>
                <label className="block mb-1">PRN No.</label>
                {/* JHSCD is fixed, only the digits after it are typed */}
                <div className="input-group">
                    <span className="input-prefix">{PRN_PREFIX}</span>
                    <input
                        type="text"
                        inputMode="numeric"
                        name="prn"
                        value={prnDigits}
                        onChange={handlePrnChange}
                        placeholder="1042"
                        required
                    />
                </div>
            </div>
            <div>
                <label className="block mb-1">Age</label>
                <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="e.g. 34"
                    required
                />
            </div>
            <div>
                <label className="block mb-1">Gender</label>
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                </select>
            </div>
            <div>
                <label className="block mb-1">Sample Date</label>
                <input
                    type="date"
                    name="Sample_Collected_On"
                    value={formData.Sample_Collected_On}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label className="block mb-1">Report Date</label>
                <input
                    type="date"
                    name="Sample_Out_On"
                    value={formData.Sample_Out_On}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label className="block mb-1">Referred By</label>
                {/* Dr. is fixed, only the name after it is typed */}
                <div className="input-group">
                    <span className="input-prefix">{DOCTOR_PREFIX}</span>
                    <input
                        type="text"
                        name="referredBy"
                        list="referredByOptions"
                        value={referredByName}
                        onChange={handleReferredByChange}
                        placeholder="Select or type a name"
                        required
                    />
                </div>
                <datalist id="referredByOptions">
                    <option value="Anupam kr.singh" />
                    <option value="Tusar Arya" />
                    <option value="Kumar Prateek" />
                    <option value="Self" />
                </datalist>
            </div>
            <div>
                <TestNameDropdown formData={formData} onTestNameChange={handleTestNameChange} />
                {formData.mainTestName &&
                    <div className="selected-test">Selected: <strong>{formData.mainTestName}</strong></div>
                }
            </div>
        </div>
    );
}


export default FormMainInfo;
