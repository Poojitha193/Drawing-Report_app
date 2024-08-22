import React from 'react';

function PdfGenerator({ data }) {
  const generatePdf = () => {
    // Implement PDF generation logic here
    console.log('Generating PDF...', data);
  };

  return (
    <button onClick={generatePdf}>Download PDF</button>
  );
}

export default PdfGenerator;