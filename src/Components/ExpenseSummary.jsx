import React, { useState, useEffect } from 'react';
import useReadPdf from '../Hooks/useReadPdf';

import jsonFromText from '../functions/jsonFromText';
import readPdf from '../functions/readPdf';

import useLocalCache from '../Hooks/useLocalCache';



const ExpenseSummary = () => {
  const [selectedFile, setSelectedFile] = useState(null);


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  
  
  const text = useReadPdf({
    pdfUrl: selectedFile ? URL.createObjectURL(selectedFile) : '',
  });
  
  // al text ser un hook, este se actualiza cada vez que le pasa algo a selected file, no es necesario agregar un hanlde
  //crear otro hook que sea algo como useReadTextToJson, y que lea el text de useReadPdf para que se 

  const [cacheData, setCacheData] = useLocalCache('miCacheKey', {}); // Puedes cambiar 'miCacheKey' por la clave que desees

  
  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />

    </div>
  );
};

export default ExpenseSummary