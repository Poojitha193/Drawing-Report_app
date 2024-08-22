import React from 'react';

function ReportTable({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Status</th>
          <th>Challan ID</th>
          <th>Start Reading (km)</th>
          <th>End Reading (km)</th>
          <th>Total Reading</th>
          <th>Start Reading Motor 2 (km)</th>
          <th>End Reading Motor 2 (km)</th>
          <th>Total Reading Motor 2</th>
          <th>Start Time</th>
          <th>End Time</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.date}</td>
            <td>{row.status}</td>
            <td>{row.challanId}</td>
            <td>{row.startReading}</td>
            <td>{row.endReading}</td>
            <td>{row.totalReading}</td>
            <td>{row.startReadingMotor2}</td>
            <td>{row.endReadingMotor2}</td>
            <td>{row.totalReadingMotor2}</td>
            <td>{row.startTime}</td>
            <td>{row.endTime}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ReportTable;