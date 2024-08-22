import React, { useState } from 'react';
import './../styles.css'; // Make sure this CSS file is correctly imported

function Dashboard({ onGenerateReport, onViewOrDownload }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [designConsultant, setDesignConsultant] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [isDownloadVisible, setIsDownloadVisible] = useState(false);

  const handleGoClick = () => {
    // Trigger report generation
    onGenerateReport({ selectedDate, designConsultant, timePeriod });
    setIsDownloadVisible(true); // Show the download/view options
  };

  const handleResetClick = () => {
    // Reset all fields
    setSelectedDate('');
    setDesignConsultant('');
    setTimePeriod('');
    setIsDownloadVisible(false);
    onViewOrDownload(false); // Hide the report table
  };

  const handleDownloadClick = () => {
    onViewOrDownload(true); // Trigger download options
  };

  const handleViewClick = () => {
    onViewOrDownload(false); // Show the report table without download options
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      
      {/* Date Selection */}
      <div className="form-group">
        <label htmlFor="date">Select Date:</label>
        <input 
          type="date" 
          id="date" 
          value={selectedDate} 
          onChange={(e) => setSelectedDate(e.target.value)} 
        />
      </div>

      {/* Design Consultant Selection */}
      <div className="form-group">
        <label htmlFor="designConsultant">Design Consultant:</label>
        <select 
          id="designConsultant" 
          value={designConsultant} 
          onChange={(e) => setDesignConsultant(e.target.value)}
        >
          <option value="">Select</option>
          <option value="Consultant 1">Consultant 1</option>
          <option value="Consultant 2">Consultant 2</option>
          <option value="Consultant 3">Consultant 3</option>
        </select>
      </div>

      {/* Time Period Selection */}
      <div className="form-group">
        <label htmlFor="timePeriod">Select Time Period:</label>
        <select 
          id="timePeriod" 
          value={timePeriod} 
          onChange={(e) => setTimePeriod(e.target.value)}
        >
          <option value="">Select</option>
          <option value="byDate">By Date</option>
          <option value="byMonth">By Month</option>
          <option value="last6Months">Last 6 Months</option>
          <option value="fromBeginning">From Beginning to Till Date</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="button-container">
        <button className="button go-button" onClick={handleGoClick}>Go</button>
        <button className="button reset-button" onClick={handleResetClick}>Reset</button>
      </div>

      {/* Download/View Options */}
      {isDownloadVisible && (
        <div className="download-container">
          <button className="button view-button" onClick={handleViewClick}>View</button>
          <button className="button download-button" onClick={handleDownloadClick}>Download</button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;