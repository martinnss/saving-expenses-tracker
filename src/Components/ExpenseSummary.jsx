import React, { useState } from 'react';
import useReadPdf from '../Hooks/useReadPdf';




const ExpenseSummary = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [textPDF, setTextPDF] = useState('')

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  
  const text = useReadPdf({
    pdfUrl: selectedFile ? URL.createObjectURL(selectedFile) : ''
  });
  
  console.log(text)
  
  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />

    </div>
  );
};

export default ExpenseSummary