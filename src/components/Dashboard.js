import React, { useState } from 'react';
import './../styles.css'; // Make sure this CSS file is correctly imported

function Dashboard({ onGenerateReport }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [designConsultant, setDesignConsultant] = useState('');
  const [timePeriod, setTimePeriod] = useState('');

  const handleGoClick = () => {
    // Call the parent function to generate the report with the selected filters
    onGenerateReport({ selectedDate, designConsultant, timePeriod });
  };

  const handleResetClick = () => {
    // Reset all fields to their default state
    setSelectedDate('');
    setDesignConsultant('');
    setTimePeriod('');
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
        <button className="button go-button" onClick={handleGoClick}>GO</button>
        <button className="button reset-button" onClick={handleResetClick}>RESET</button>
      </div>
    </div>
  );
}

export default Dashboard;