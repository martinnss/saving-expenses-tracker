import React, {useState} from 'react'
import * as XLSX from 'xlsx'

const useAddTransactions = () => {
    const [jsonData, setJsonData] = useState(null);
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        
        if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const result = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            setJsonData(result);
        };
    
        reader.readAsArrayBuffer(file);
        }
    };

    return {
        jsonData,
        handleFileChange,
    };
};

export default useAddTransactions