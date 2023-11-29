import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const readPdf = async (pdfUrl) => {
  try {
    const pdfDoc = await pdfjs.getDocument(pdfUrl).promise;
    let fullText = '';

    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }
    console.log(fullText)
    return fullText;
  } catch (error) {
    console.error('Error extracting text:', error);
    return '';
  }
};

export default readPdf;
