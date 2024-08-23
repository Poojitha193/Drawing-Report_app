import React, { useEffect, useState } from 'react';
import { FaFilePdf, FaFileExcel, FaFileCsv } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

const DrawingReportAnalysis = () => {
  const [reportType, setReportType] = useState('');
  const [designConsultant, setDesignConsultant] = useState('');
  const [timePeriod, setTimePeriod] = useState('byDate');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [viewDownload, setViewDownload] = useState('download');
  const [showView, setShowView] = useState(false);
  const [sixMonthsAgo, setSixMonthsAgo] = useState('');
  const [beginningDate, setBeginningDate] = useState('');
  const [today, setToday] = useState('');

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (viewDownload === 'view') {
      setShowView(true);
    } else {
      // Handle download logic here
    }
  };

  const handleReset = () => {
    setReportType('');
    setDesignConsultant('');
    setTimePeriod('byDate');
    setFromDate('');
    setToDate('');
    setMonth('');
    setYear('');
    setViewDownload('download');
    setShowView(false);
  };

  const downloadPDF = () => {
    const data = generateDownloadData();
    const doc = new jsPDF();
    
    doc.text("Drawing Report Analysis", 10, 10);
    let yPos = 30;
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        doc.text(`${key}: ${value}`, 10, yPos);
        yPos += 10;
      }
    });
    
    doc.save("drawing_report_analysis.pdf");
  };
  
  const downloadExcel = () => {
    const data = generateDownloadData();
    const ws = XLSX.utils.json_to_sheet([data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    XLSX.writeFile(wb, "drawing_report_analysis.xlsx");
  };
  
  const downloadCSV = () => {
    const data = generateDownloadData();
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Add headers
    csvContent += Object.keys(data).join(",") + "\n";
    
    // Add values
    csvContent += Object.values(data).join(",");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "drawing_report_analysis.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const currentDate = new Date();
    setToday(formatDate(currentDate));

    // Calculate 6 months ago
    const sixMonthsAgoDate = new Date(currentDate.setMonth(currentDate.getMonth() - 6));
    setSixMonthsAgo(formatDate(sixMonthsAgoDate));

    // Set a random beginning date (e.g., 2 years ago)
    const twoYearsAgo = new Date(currentDate.setFullYear(currentDate.getFullYear() - 2));
    setBeginningDate(formatDate(twoYearsAgo));
  }, []);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const generateDownloadData = () => {
    let data = {
      reportType,
      designConsultant,
      timePeriod,
    };

    switch (timePeriod) {
      case 'byDate':
        data = { ...data, fromDate, toDate };
        break;
      case 'byMonth':
        data = { ...data, month };
        break;
      case 'last6Months':
        data = { ...data, fromDate: sixMonthsAgo, toDate: today };
        break;
      case 'fromBegin':
        data = { ...data, fromDate: beginningDate, toDate: today };
        break;
    }

    return data;
  };

  return (
    <div className="p-20 bg-white">
      <h1 className="text-2xl font-bold mb-6">Drawing Report Analysis</h1>
      <form onSubmit={handleSubmit} className="space-y-6 mx-24 my-10">
        <div className="flex items-center justify-between gap-24">
        <div className='grid grid-cols-3 w-full items-center'>
          <label className="block mb-2 col-span-1">Report Type:</label>
          <input
            type="text"
            value={reportType}
            placeholder='Select date'
            onChange={(e) => setReportType(e.target.value)}
            className="w-full p-2 border rounded col-span-2 bg-gray-200"
          />
        </div>
 
        <div className='grid grid-cols-3 w-full items-center'>
          <label className="block mb-2 col-span-1">Design Consultant:</label>
          <select
            value={designConsultant}
            onChange={(e) => setDesignConsultant(e.target.value)}
            className="w-full p-2 border rounded col-span-2 bg-gray-200"
          >
            <option value="">Select consultant</option>
            <option value="consultant1">Consultant 1</option>
            <option value="consultant2">Consultant 2</option>
            <option value="consultant3">Consultant 3</option>
          </select>
        </div>
        </div>

        <div>
          <label className="block mb-2 font-bold mb-6">Select Time Period:</label>
          <div className="space-y-2 flex items-center justify-between">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="byDate"
                checked={timePeriod === 'byDate'}
                onChange={() => setTimePeriod('byDate')}
                className="mr-2"
              />
              By Date
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="byMonth"
                checked={timePeriod === 'byMonth'}
                onChange={() => setTimePeriod('byMonth')}
                className="mr-2"
              />
              By Month
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="last6Months"
                checked={timePeriod === 'last6Months'}
                onChange={() => setTimePeriod('last6Months')}
                className="mr-2"
              />
              Last 6 Months
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="fromBegin"
                checked={timePeriod === 'fromBegin'}
                onChange={() => setTimePeriod('fromBegin')}
                className="mr-2"
              />
              From Beginning to Till Date
            </label>
          </div>
        </div>

        {timePeriod === 'byDate' && (
          
          <div className="flex items-center justify-between gap-6">
            <div  className='grid grid-cols-3 w-full items-center '>
              <label className="block mb-2 col-span-1">From:</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full p-2 border rounded col-span-2 bg-gray-200"
              />
            </div>
            <div className='grid grid-cols-3 w-full items-center '>
              <label className="block mb-2 col-span-1">To:</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full p-2 border rounded col-span-2 bg-gray-200"
              />
            </div>
          </div>
    
        )}

        {timePeriod === 'byMonth' && (
          <div className="flex space-x-4">
            <div className='flex gap-6 items-center'>
              <label className="block mb-2">Month:</label>
              <input
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full p-2 border rounded bg-gray-200"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block mb-2 font-bold mb-6">Select appropriate options to view / Download the Report:</label>
          <div className="space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="download"
                checked={viewDownload === 'download'}
                onChange={() => {
                  setViewDownload('download')
                  setShowView(viewDownload === 'download' ? true : false)
                }}
                className="mr-2"
              />
              Download
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="view"
                checked={viewDownload === 'view'}
                onChange={() => {
                  setViewDownload('view')
                  setShowView(viewDownload === 'view' ? false : true)
                }}
                className="mr-2"
              />
              View
            </label>
          </div>
        </div>

        {viewDownload === 'download' && (
          <div className="space-x-4 flex items-center justify-between">
            <button 
              type="button" 
              className="px-4 py-2   rounded flex items-center"
              onClick={downloadPDF}
            >
              <FaFilePdf className="mr-2  m-1 text-red-500" /> Download in PDF format
            </button>
            <button 
              type="button" 
              className="px-4 py-2  rounded flex items-center"
              onClick={downloadExcel}
            >
              <FaFileExcel className="mr-2 text-green-400" /> Download in MS Excel format
            </button>
            <button 
              type="button" 
              className="px-4 py-2  rounded flex items-center"
              onClick={downloadCSV}
            >
              <FaFileCsv className="mr-2 text-blue-500" /> Download in CSV format
            </button>
          </div>
        )}

        <div className="space-x-4 items-center justify-center flex">
          <button type="submit" className="px-6 py-2 bg-orange-500 text-white rounded">GO</button>
          <button type="button" onClick={handleReset} className="px-6 py-2 bg-orange-500 text-white rounded">RESET</button>
        </div>
      </form>

      {showView && (
        <div className="mt-8 p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">Entered Information:</h2>
          <table className="w-full">
            <thead>
              <tr className="bg-black text-white">
                <th className="p-2 text-left">Report Type</th>
                <th className="p-2 text-left">Design Consultant</th>
                <th className="p-2 text-left">Time Period</th>
                <th className="p-2 text-left">From Date</th>
                <th className="p-2 text-left">To Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">{reportType}</td>
                <td className="p-2">{designConsultant}</td>
                <td className="p-2">{timePeriod}</td>
                <td className="p-2">
                  {timePeriod === 'byDate' && fromDate}
                  {timePeriod === 'byMonth' && month}
                  {timePeriod === 'last6Months' && sixMonthsAgo}
                  {timePeriod === 'fromBegin' && beginningDate}
                </td>
                <td className="p-2">
                  {timePeriod === 'byDate' && toDate}
                  {timePeriod === 'byMonth' && month}
                  {(timePeriod === 'last6Months' || timePeriod === 'fromBegin') && today}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DrawingReportAnalysis;