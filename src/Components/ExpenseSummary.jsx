import React, { useState, useEffect } from 'react';
import useReadPdf from '../Hooks/useReadPdf';

import jsonFromText from '../functions/jsonFromText';
import readPdf from '../functions/readPdf';




const ExpenseSummary = () => {
  const [selectedFile, setSelectedFile] = useState(null);


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  
  
  const text = useReadPdf({
    pdfUrl: selectedFile ? URL.createObjectURL(selectedFile) : '',
    banco: 'Santander'
  });
  


  
  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <p>{text ? text : "no hay text"}</p>
    </div>
  );
};

export default ExpenseSummary