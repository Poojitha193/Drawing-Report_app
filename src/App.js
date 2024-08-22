import React, { useState } from 'react';
import './styles.css';  // Import the external CSS file
import Dashboard from './components/Dashboard';
import ReportTable from './components/ReportTable';
import PdfGenerator from './components/PdfGenerator';
import ExcelGenerator from './components/ExcelGenerator.js';
import CsvGenerator from './components/CsvGenerator';

function App() {
  const [reportData, setReportData] = useState([]);

  const generateReport = (filters) => {
    const simulatedData = [
      {
        date: '2024-08-22',
        status: 'Completed',
        challanId: 'CH12345',
        startReading: 1000,
        endReading: 1100,
        totalReading: 100,
        startReadingMotor2: 500,
        endReadingMotor2: 600,
        totalReadingMotor2: 100,
        startTime: '09:00 AM',
        endTime: '10:00 AM',
      },
    ];
    setReportData(simulatedData);
  };

  return (
    <div className="app">
      <h1 className="header">Vehicle Penalty/Challan Tracking</h1>
      <div className="dashboardContainer">
        <Dashboard onGenerateReport={generateReport} />
      </div>
      <ReportTable data={reportData} />
      <div className="buttonContainer">
        <PdfGenerator data={reportData} />
        <ExcelGenerator data={reportData} />
        <CsvGenerator data={reportData} />
      </div>
    </div>
  );
}

export default App;