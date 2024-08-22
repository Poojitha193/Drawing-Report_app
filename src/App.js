import React, { useState } from 'react';
import './styles.css';
import Dashboard from './components/Dashboard';
import ReportTable from './components/ReportTable';
import PdfGenerator from './components/PdfGenerator';
import ExcelGenerator from './components/ExcelGenerator';
import CsvGenerator from './components/CsvGenerator';

function App() {
  const [reportData, setReportData] = useState([]);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [isDownloadVisible, setIsDownloadVisible] = useState(false);

  const generateReport = (filters) => {
    // Simulated data generation
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
    setIsTableVisible(false);
  };

  const handleViewOrDownload = (download) => {
    setIsTableVisible(!download);
    setIsDownloadVisible(download);
  };

  return (
    <div className="app">
      <h1 className="header">Vehicle Penalty/Challan Tracking</h1>
      <div className="dashboardContainer">
        <Dashboard onGenerateReport={generateReport} onViewOrDownload={handleViewOrDownload} />
      </div>
      {isTableVisible && (
        <ReportTable data={reportData} />
      )}
      {isDownloadVisible && (
        <div className="buttonContainer">
          <PdfGenerator data={reportData} />
          <ExcelGenerator data={reportData} />
          <CsvGenerator data={reportData} />
        </div>
      )}
    </div>
  );
}

export default App;