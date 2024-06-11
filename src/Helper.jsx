export const todayDate = () => {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  return formattedDate
}

export const formatCellContent = (bioRefInterval) => {
  // Assuming the values are separated by a space
  if(bioRefInterval!=null){
    const values = bioRefInterval.split('$');
    if (values.length > 1) {
      return values.map((value, index) => (
        <>
          <span key={index} style={{lineHeight:'1rem'}}>
            {value}
          </span>
          <br />
        </>
      ));
    }
    else {
      return bioRefInterval
    }
  }

  return bioRefInterval;
};

export const changeStartingLetter = (name) => {
  name.trimStart();
  if (name.length > 0) {
    return name[0].toUpperCase() + name.slice(1);
  }
  return name;
}

export const changeDollarToSpace = (data) => {
  if(data!=null){
    return data.replaceAll('$', ' ');
  }
  return data;
}

export const setInitialAgglutininTitreData = () => {
  return [
    { testName: 'S. TYPHI `H`',test1:'',test2:'',test3:'',test4:'',test5:'' },
    { testName: 'S. TYPHI `O`',test1:'',test2:'',test3:'',test4:'',test5:'' },
    { testName: 'S. PARATYPH `AH`',test1:'',test2:'',test3:'',test4:'',test5:'' },
    { testName: 'S. PARATYPH `BH`',test1:'',test2:'',test3:'',test4:'',test5:'' },
    { testName: 'The Test is : ',result:'' },
  ];
};

export const setInitialTestDetail = (f) => {
  let initialData = [];
  f=f.toLowerCase();
  // Note : when we want two data to be fit in once cell we need to seperate them as $ 
  if (f.includes("complete blood count") || f.includes("cbc")) {
    initialData = [{ testName: 'Haemoglobin(Hb)', result: '', units: 'mg/dl', bioRefInterval: 'Male:13.1-16.7$Female:12.0-15.0' },
    { testName: 'Total WBC Count', result: '', units: 'Cells/cu mm', bioRefInterval: '4,100-11,100' },
    { testName: 'Lymphocytes', result: '', units: '%', bioRefInterval: '16-46' },
    { testName: 'Monocytes', result: '', units: '%', bioRefInterval: '2.3-8.5' },
    { testName: 'Granulyocytes', result: '', units: '%', bioRefInterval: '48.7-81.2' },
    { testName: 'R.B.C. COUNT', result: '', units: 'Million Cells/cu mm ', bioRefInterval: 'Women:3.90-5.20$Men:4.5-5.5' },
    { testName: 'HCT', result: '', units: '% ', bioRefInterval: '36.4-46.0' },
    { testName: 'MCV', result: '', units: 'Fl ', bioRefInterval: '83-97' },
    { testName: 'MCH', result: '', units: 'pg ', bioRefInterval: '27-32' },
    { testName: 'MCHC', result: '', units: 'g/dl ', bioRefInterval: '32-34' },
    { testName: 'RDW - CV', result: '', units: '% ', bioRefInterval: '11.9-14.8' },
    { testName: 'RDW - SD', result: '', units: 'Fl', bioRefInterval: '38-49' },
    { testName: 'Platelets Count', result: '', units: 'lakh/cu mm', bioRefInterval: '1.50-4.10' },
    { testName: 'MPV', result: '', units: 'Fl', bioRefInterval: '7.0-10.5' },
    { testName: 'PCT', result: '', units: '%', bioRefInterval: '0.150-0.500' },
    { testName: 'PDW', result: '', units: '%', bioRefInterval: '11.0-18.0' },
    ]
  }
  else if (f.includes("kidney function test") || f.includes("kft")) {
    initialData = [{ testName: 'Serum Creatinine', result: '', units: 'mg/dl', bioRefInterval: 'Men:0.6-1.4$Women:0.6-1.2' },
    { testName: 'Blood Urea', result: '', units: 'mg/dl', bioRefInterval: '13-45' },
    { testName: 'Serum Uric Acid', result: '', units: 'mg/dl', bioRefInterval: 'Men:3.6-7.2$Women:2.5-6.8' },
    { testName: 'Potassium', result: '', units: 'mmol/L', bioRefInterval: '3.5-5.2' },
    { testName: 'Sodium', result: '', units: 'mmol/L', bioRefInterval: '136-145' },
    { testName: 'Chloride', result: '', units: 'mmol/L ', bioRefInterval: '96-108' },
    ]
  }
  else if (f.includes("liver Function test") || f.includes("lft")) {
    initialData = [
      { testName: 'Serum Bilirubin Total ', result: '', units: 'mg/dl', bioRefInterval: '0.1-1.2' },
      { testName: 'Serum Bilirubin Direct', result: '', units: 'mg/dl', bioRefInterval: '00-0.3' },
      { testName: 'Bilirubin Indirect', result: '', units: 'mg/dl', bioRefInterval: 'upto 0.7' },
      { testName: 'S.G.P.T (AST)', result: '', units: 'U/L', bioRefInterval: 'upto-<45' },
      { testName: 'S.G.O.T(AST)', result: '', units: 'U/L ', bioRefInterval: 'upto-<45' },
      { testName: 'Serum Alkaline Phosphatase', result: '', units: 'U/L ', bioRefInterval: 'Adults:41-135$Women:30-160'},
      { testName: 'Serum Protein-Total ', result: '', units: 'mg/dl', bioRefInterval: '6.0-8.3' },
      { testName: 'Serum Protein-albumin ', result: '', units: 'mg/dl', bioRefInterval: '3.2-5.0' },
    ]
  }
  else if (f.includes("anti hcv") || f.includes("hcv")) {
    initialData = [
      { testName: 'Anti HCV', result: '', bioRefInterval: '' }
    ]
  }
  else if (f.includes("hiv")) {
    initialData = [
      { testName: 'HIV 1', result: '', bioRefInterval: '' },
      { testName: 'HIV 2', result: '', bioRefInterval: '' }
    ]
  }
  else if (f.includes("hbsag")) {
    initialData = [
      { testName: 'Hbsag$ Method:CARD Method', result: '', units: '', bioRefInterval: '' },
    ]
  }
  else if (f.includes("glycosylated haemoglobin") || f.includes('hba1c')) {
    initialData = [
      { testName: ' Glycosylated Haemoglobin-HbA1c$Method: Latex Immunoturbidometry-NGSP/IFCC Standardized', result: '',units:'', bioRefInterval: '5.0%-6.5%-Normal Non$Diabetic Level$7.0-9.0-Good Control (GOAL)$9.0 to 10.0-Fair Control$>10-Poor Control' },
      { testName: 'Mean Blood Glucose (calculated from HbA1c)', result: '', units: '', bioRefInterval: '' }, 
    ]
  }
  else if (f.includes("rbs") ) {
    initialData = [
      { testName: 'Random Blood Sugar-RBS$ Method:GOD/POD Method', result: '', units: 'mg/dl', bioRefInterval: '70-140' }
    ]

  }
  else if (f.includes("fbs") ) {
    initialData = [
      { testName: ' Fasting Blood Sugar-RBS$ Method:GOD/POD Method', result: '', units: 'mg/dl', bioRefInterval: '70-110' },  
    ]
  }
  else if (f.includes("fbs+pp") ) {
    initialData = [
      { testName: ' Fasting Blood Sugar-RBS$ Method:GOD/POD Method', result: '', units: 'mg/dl', bioRefInterval: '70-110' },
      { testName: ' Post Prandial-PP$ Method:GOD/POD Method', result: '', units: 'mg/dl', bioRefInterval: '70-140' },
  
    ]
  }
  else if (f.includes("pp") ) {
    initialData = [
      { testName: ' Post Prandial-PP$Method:GOD/POD Method ', result: '', units: 'mg/dl', bioRefInterval: '70-140' },
    ]
  }
  else if (f.includes("fasting lipid profile") || f.includes('flp') ) {
    initialData = [
      { testName: 'Serum Total Cholesterol', result: '', units: 'mg/dl', bioRefInterval: '130-250' },
      { testName: 'Serum HDL Cholesterol', result: '', units: 'mg/dl', bioRefInterval: '30-50' },
      { testName: 'serum LDL Cholesterol', result: '', units: 'mg/dl', bioRefInterval: '100-160' },
      { testName: 'Serum VLDL Cholesterol', result: '', units: 'mg/dl', bioRefInterval: '5-40' },
      { testName: 'Serum Triglycerides', result: '', units: 'mg/dl ', bioRefInterval: '50-200' },
      { testName: 'Total Cholesterol/HDL Ratio', result: '', units: '', bioRefInterval: 'Men:3.8-5.9$Women:3.1-4.6'},
      { testName: 'LDL: HDL Ratio', result: '', units: '', bioRefInterval: 'Men-1.00;Average-3.55$Moderate-6.25;High-7.99'}, 
    
    ]
  }
  else if (f.includes("prothombin time") || f.includes('pt/inr') ) {
    initialData = [
      { testName: 'PT Test*(Citrated Plasma)$Method:(Automated Coagulometer)', result: '', units: 'sec', bioRefInterval: '10-14' },
      { testName: 'R Value$ Method*(Derived)', result: '', units: '', bioRefInterval: '' },
      { testName: 'INR (International Normalized Ratio$Method*(Derived) ', result: '', units: '', bioRefInterval: '0.9-1.4' },
      
    ]
  }
  else if (f.includes("hb%") || f.includes('hb') ) {
    initialData = [
      { testName: 'Haemoglobin(Hb)', result: '', units: 'mg/dl', bioRefInterval: 'Male:13.1-6.7$Female:12.0-15.0' },  
    ]
  }
  else if (f.includes("widal test (slide method)") || f.includes("typhoid")) {
    initialData = setInitialAgglutininTitreData();
  }
  else if(f.includes('urine')){
    initialData = {
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
  }
  else if (f.includes("e.s.r") ) {
    initialData = [
      { testName: 'First hr', result: '', units: 'mm/hr', bioRefInterval: '<20' },  
    ]
  }
  else if (f.includes("trop-t") ) {
    initialData = [
      { testName: 'Trop-T Test', result: '', units: '', bioRefInterval: '' },  
    ]
  }
  else if (f.includes("c-reactive protein") ) {
    initialData = [
      { testName: 'C-Reactive Protein', result: '', units: 'mg/dl', bioRefInterval: '0-5' },  
      { testName: 'The Test Result', result: '', units: '', bioRefInterval: '' } 
    ]
  }
  else if (f.includes("malaria parasite") ) {
    initialData = [
      { testName: 'P.Vivax - Antigen', result: '' },  
      { testName: 'P.Falciparum', result: '' } 
    ]
  }





  return initialData;
}