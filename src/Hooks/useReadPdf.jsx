import { useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import jsonFromText from '../functions/jsonFromText'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useReadPdf = ({ pdfUrl }) => {
  const [pdfExtracted, setPdfExtracted] = useState('');

  useEffect(() => {
    const handleTextExtraction = async () => {
      try {
        const pdfDoc = await pdfjs.getDocument(pdfUrl).promise;
        let fullText = '';

        for (let i = 1; i <= pdfDoc.numPages; i++) {
          const page = await pdfDoc.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => item.str).join(' ');
          fullText += pageText + '\n';
        }



        setPdfExtracted(fullText);

      } catch (error) {
        console.error('Error extracting text:', error);
        setPdfExtracted('');
      }
    };

    handleTextExtraction();
  }, [pdfUrl]);


  return pdfExtracted;
};

export default useReadPdf;
