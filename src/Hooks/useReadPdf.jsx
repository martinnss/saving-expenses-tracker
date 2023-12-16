import { useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import jsonFromText from '../functions/jsonFromText'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useReadPdf = ({ pdfUrl , banco}) => {
  const [pdfExtracted, setPdfExtracted] = useState('');

  async function concatenatePdfText(pdfDoc) {
    // Initialize variable to store concatenated text
    let fullText = '';
  
    // Iterate through each page of the PDF and concatenate the text content
    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }
  
    // Return the concatenated text
    return fullText;
  }


  function procesarLista(strings) {
    const resultado = [];
  
    strings.forEach((cadena) => {
      const cadenaSinEspacio = cadena.replace(/\$ /g, '$');
      const [fecha, montoOrigen, montoTotal, desc1, valorCuota, numCuota, desc2] = cadenaSinEspacio.split(/\s+/);
  
      const objetoJson = {
        fecha,
        'monto origen': montoOrigen,
        'monto total': montoTotal,
        descripcion1: desc1,
        'valor cuota': valorCuota,
        'numero cuota': numCuota,
        descripcion2: desc2,
      };
  
      resultado.push(objetoJson);
    });
  
    return resultado;
  }



  useEffect(() => {

    const handleTextExtraction = async () => {
      if (!pdfUrl) {
        setPdfExtracted('');
        return;
      }
      try {
        const pdfDoc = await pdfjs.getDocument(pdfUrl).promise;
        
        const fullText = await concatenatePdfText(pdfDoc);


          if (banco==='Santander') {
          // Step 2: Identify the start and end indices of the table
          const startIndex = fullText.indexOf('2.PERÍODO ACTUAL');
          const endIndex = fullText.indexOf('3. CARGOS, COMISIONES, IMPUESTOS Y ABONOS');

          // Step 3: Extract the table using substring
          const tableText = fullText.substring(startIndex, endIndex);
        
          // Step 4: Define a regular expression to find dates in the format 00/00/0000
          const regex = /\b\d{2}\/\d{2}\/\d{2}\b/g;

          // Step 5: Find all dates in the string
          const fechas = tableText.match(regex);
          
          // Step 6: Split the string into sublists using dates as delimiters
          const sublistas = tableText.split(regex);
          
          // Step 7: Combine dates with corresponding sublists
          const resultado = sublistas.map((sublista, index) => {
              const indexModifed = index - 1
              return fechas[indexModifed] + ' ' + sublista.trim();
          });
          const test=procesarLista(resultado)
          console.log(resultado)
          console.log(test)
          setPdfExtracted(test.toString());
        }


        else if (banco==='BancoDeChile'){
          console.log('chile')
        }

      } catch (error) {
        console.error('Error extracting text:', error);
      } finally {
        // Clean up the object URL
        URL.revokeObjectURL(pdfUrl);
      }
    };

    handleTextExtraction();
    // Cleanup function when component unmounts or when pdfUrl changes
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  
  }, [pdfUrl]);


  return pdfExtracted;
};

export default useReadPdf;
