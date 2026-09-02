import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const options = [
  { value: ' ', label: ' ' },
  { value: 'COMPLETE BLOOD COUNT - CBC', label: 'Complete Blood Count - CBC' },
  { value: 'KIDNEY FUNCTION TEST - KFT', label: 'Kidney Function Test - KFT' },
  { value: 'LIVER FUNCTION TESTS - LFT', label: 'Liver Function Tests - LFT' },
  { value: 'HCV', label: 'HCV' },
  { value: 'HIV I & II', label: 'HIV I & II' },
  { value: 'HBSAG', label: 'HBSAG' },
  { value: 'Glycosylated Haemoglobin - HbA1c', label: 'Glycosylated Haemoglobin - HbA1c' },
  { value: 'RBS', label: 'RBS' },
  { value: 'FBS', label: 'FBS' },
  { value: 'FBS+PP', label: 'FBS+PP' },
  { value: 'PP', label: 'PP' },
  { value: 'Fasting Lipid Profile - FLP', label: 'Fasting Lipid Profile - FLP' },
  { value: 'PROTHOMBIN TIME-(PT/INR)', label: 'Prothombin Time-(PT/INR)' },
  { value: 'HB%', label: 'HB%' },
  { value: 'WIDAL TEST (slide method)', label: 'Widal Test (slide method)' },
  { value: 'REPORT ON THE EXAMINATION OF URINE', label: 'Urine' },
  { value: 'E.S.R', label: 'E.S.R' },
  { value: 'TROP-T TEST', label: 'TROP-T TEST' },
  { value: 'C.R.P', label: 'C.R.P' },
  { value: 'Malaria Parasite', label: 'Malaria Parasite' },
  { value: 'BLOOD GROUP ABO & Rh FACTOR', label: 'Blood Group ABO & Rh Factor' },
  { value: 'VIRAL INFECTION', label: 'Viral Infection' },
  { value: 'VDRL INFECTION', label: 'VDRL Infection' },
  { value: 'OPTIMAL TEST', label: 'Optimal Test' },
  // Add more options as needed
];

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: '38px',
    height: '38px',
    margin: '0px',
    fontSize: '.9rem',
    borderRadius: '8px',
    borderColor: state.isFocused ? '#0d9488' : '#e2e8f0',
    boxShadow: state.isFocused ? '0 0 0 3px rgba(13, 148, 136, .15)' : 'none',
    '&:hover': { borderColor: state.isFocused ? '#0d9488' : '#cbd5e1' },
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: '36px',
    padding: '0 8px',
  }),
  input: (provided) => ({
    ...provided,
    margin: '0px',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#94a3b8',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: '36px',
  }),
  menu: (provided) => ({
    ...provided,
    fontSize: '.9rem',
    borderRadius: '8px',
    overflow: 'hidden',
    zIndex: 40,
  }),
};

const TestNameDropdown = ({ formData, onTestNameChange }) => {
  const [inputValue, setInputValue] = useState(formData.mainTestName);

  useEffect(() => {
    setInputValue(formData.mainTestName);
  }, [formData.mainTestName]);

  const handleChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : ''
    setInputValue(value)
    onTestNameChange(selectedOption ? selectedOption.value : '');
  };

  const handleInputChangeLocal = (inputValue) => {
    setInputValue(inputValue);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // setInputValue(inputValue)
      onTestNameChange(inputValue);
    }
  };

  return (
    <div className="block mb-1">
      <label className="block mb-1">Test Name</label>
      <Select
        options={options}
        value={options.find(option => option.value === formData.mainTestName) || { value: inputValue, label: inputValue }}
        onChange={handleChange}
        onInputChange={handleInputChangeLocal}
        inputValue={inputValue}
        onKeyDown={handleKeyDown}
        isClearable
        placeholder="Select or type to search..."
        
        styles={customStyles}
      />
    </div>
  );
};

export default TestNameDropdown;
