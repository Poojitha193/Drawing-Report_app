import React from 'react';

function CsvGenerator({ data }) {
  const generateCsv = () => {
    // Implement CSV generation logic here
    console.log('Generating CSV...', data);
  };

  return (
    <button onClick={generateCsv}>Download CSV</button>
  );
}

export default CsvGenerator;