import { useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';

import verifySaleOriginSantander from '../functions/verifySaleOriginSantander';
import verifySaleOriginDeferredSantander from '../functions/verifySaleOriginDeferredSantander';

import categorizerGPT from '../functions/categorizerGPT';
import convertCurrencyStringToInt from '../functions/convertCurrencyStringToInt'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useReadPdf = ({ pdfUrl , bank, setJsonTransactions, jsonTransactions}) => {
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
  
    strings.forEach((string) => {
      const stringCleanOne = string.replace(/\$ /g, '$');
      const stringCleanTwo = stringCleanOne.replace(/\s*\*\s*/g, '*');
      const isDeferredPayment = / \d{2}\/\d{2} /.test(stringCleanTwo);

      if (isDeferredPayment){
        const listOfStrings = verifySaleOriginDeferredSantander(stringCleanTwo)


        const [fecha, lugarOperacion, monto, desc1, preciocuota, numCuota, desc2] = listOfStrings

        const [day, month, year] = fecha.split('/');

        let actualYear=parseInt(year)
        if (year <100){
          actualYear= actualYear+2000
        } 
        // Create a new Date object using the components
        const dateObject = new Date(`${actualYear}-${month}-${day}`);

        const montoTotal = convertCurrencyStringToInt(monto)
        const valorCuota = convertCurrencyStringToInt(preciocuota)
        

        const description = desc2

        let desc = description

        if(description.length >=20){
          desc = description.substring(0, 50);
        } 

        const objetoJson = {
          dateObject,
          lugarOperacion:"Pago en Cuotas",
          montoTotal,
          desc,
          valorCuota,
          numCuota,
        } 
        
        
        resultado.push(objetoJson);

      } else {
        const listOfStrings=verifySaleOriginSantander(stringCleanTwo)

        if(listOfStrings.length ===4) {
          const [fecha, lugarOperacion, monto, description] = listOfStrings;

          const [day, month, year] = fecha.split('/');

          let actualYear=parseInt(year)
          if (year <100){
            actualYear= actualYear+2000
          } 
          // Create a new Date object using the components
          const dateObject = new Date(`${actualYear}-${month}-${day}`);

          let desc = description

          if(description.length >=20){
            desc = description.substring(0, 25);
          } 

          const montoTotal =  convertCurrencyStringToInt(monto)


          const objetoJson = {
            dateObject,
            lugarOperacion,
            montoTotal,
            desc,
            valorCuota:"NA",
            numCuota:"NA",
          }
          resultado.push(objetoJson); 
        }
      }

    });

    const resultWithCategories= categorizerGPT(resultado)


    return resultWithCategories;
  }



  useEffect(() => {

    const handleTextExtraction = async () => {
      if (!pdfUrl) {
        setPdfExtracted('');
        setJsonTransactions("")
        return;
      }
      try {
        const pdfDoc = await pdfjs.getDocument(pdfUrl).promise;
        
        const fullText = await concatenatePdfText(pdfDoc);


          if (bank==='Santander') {
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
          const stringsArray= resultado.slice(1);
          const transactionList= await procesarLista(stringsArray)

          setPdfExtracted(JSON.stringify(transactionList));
          setJsonTransactions(JSON.stringify(transactionList));
          
          
        }


        else if (bank==='BancoDeChile'){
          console.log('chile')
        }

      } catch (error) {
        console.error('Error extracting text:', error);
      } finally {
        // Clean up the object URL
        //URL.revokeObjectURL(pdfUrl);
      }
    };

    handleTextExtraction();
    // Cleanup function when component unmounts or when pdfUrl changes
    return () => {
      if (pdfUrl) {
        //URL.revokeObjectURL(pdfUrl);
      }
    };
  
  }, [pdfUrl]);


  return jsonTransactions;
};

export default useReadPdf;