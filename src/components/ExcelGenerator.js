import React from 'react';

function ExcelGenerator({ data }) {
  const generateExcel = () => {
    // Implement Excel generation logic here
    console.log('Generating Excel...', data);
  };

  return (
    <button onClick={generateExcel}>Download Excel</button>
  );
}

export default ExcelGenerator;