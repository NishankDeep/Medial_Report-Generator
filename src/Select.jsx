import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const options = [
  { value: ' ', label: ' ' },
  { value: 'Complete Body Test - CBC', label: 'Complete Body Test - CBC' },
  { value: 'Kidney Function Test - KFT', label: 'Kidney Function Test - KFT' },
  { value: 'Liver Function Tests - LFT', label: 'Liver Function Tests - LFT' },
  { value: 'Anti HCV', label: 'Anti HCV' },
  { value: 'Hiv 1 & 2 rapid', label: 'Hiv 1 & 2 rapid' },
  { value: 'HBSAG', label: 'HBSAG' },
  { value: 'Glycosylated Haemoglobin - HbA1c', label: 'Glycosylated Haemoglobin - HbA1c' },
  { value: 'RBS', label: 'RBS' },
  { value: 'FBS', label: 'FBS' },
  { value: 'FBS+PP', label: 'FBS+PP' },
  { value: 'PP', label: 'PP' },
  { value: 'Fasting Lipid Profile - FLP', label: 'Fasting Lipid Profile - FLP' },
  { value: 'Prothombin Time-(PT/INR)', label: 'Prothombin Time-(PT/INR)' },
  { value: 'HB%', label: 'HB%' },
  { value: 'widal test (slide method)', label: 'widal test (slide method)' },
  { value: 'REPORT ON THE EXAMINATION OF URINE', label: 'Urine' },
  { value: 'E.S.R', label: 'E.S.R' },
  { value: 'TROP-T TEST', label: 'TROP-T TEST' },
  { value: 'C-REACTIVE PROTEIN', label: 'C-REACTIVE PROTEIN' },
  { value: 'Malaria Parasite', label: 'Malaria Parasite' },
  // Add more options as needed
];

const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: '30px',  // Adjust this value to set the desired height
      height: '35px',
      margin: '0px'
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: '30px',
      padding: '0 6px',
    }),
    input: (provided) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: '40px',
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
      <label className="block mb-1">Test Name:</label>
      <Select
        options={options}
        value={options.find(option => option.value === formData.mainTestName) || { value: inputValue, label: inputValue }}
        onChange={handleChange}
        onInputChange={handleInputChangeLocal}
        inputValue={inputValue}
        onKeyDown={handleKeyDown}
        isClearable
        placeholder="Select or type to search..."
        className="w-full rounded"
        styles={customStyles}
      />
    </div>
  );
};

export default TestNameDropdown;
