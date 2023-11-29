import React, {useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx'
import { useGetUserInfo } from "./useGetUserInfo";
import {addDoc, collection, serverTimestamp, Timestamp} from "firebase/firestore"
import { db } from "../config/firebase";


const useAddTransactions = ({updatedCacheFlag, setUpdatedCacheFlag}) => {
    const [jsonData, setJsonData] = useState(null);

    const transactionCollectionRef = collection(db, 'transactions') //db a la que queremos enviar la data

    const userInfo = useGetUserInfo()

    const convertExcelSerialDateToJSDate = (excelSerialDateNumber) => {
        // Base date for Windows Excel (1900)
        const baseDate = new Date('1900-01-01');

        const dateInMilliseconds = baseDate.getTime() + (excelSerialDateNumber - 1) * 24 * 60 * 60 * 1000;
        
        const resultDate=new Date(dateInMilliseconds)

        const resultTimeStamp = Timestamp.fromDate(resultDate)

        return resultTimeStamp
    }
    const handleFileChange = (e) => {

        const generateUniqueId = () => {
            return uuidv4();
        };

        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const result = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                const jsonDataArray = result.slice(1).map((row) => {
                    return {
                        transaction_id: generateUniqueId(),
                        uid: userInfo.uid,
                        uploadedAt: serverTimestamp(),
                        date: row[0] ? convertExcelSerialDateToJSDate(row[0]) : serverTimestamp(),
                        type: row[1] ? row[1] : "TBD",
                        details: row[2] ? row[2] : "TBD",
                        amount: row[3] ? row[3] : 0,
                    };
                });

                // Print each element
                jsonDataArray.forEach((element, index) => {
                    console.log("subida a firebase comentada para hacer pruebas")
                    addDoc(transactionCollectionRef, {
                        transaction_id: element.transaction_id,
                        uid: element.uid,
                        uploadedAt: element.uploadedAt,
                        date: element.date,
                        type: element.type,
                        details: element.details,
                        amount: element.amount,
                    })
                });

                // Set the JSON data state
                setJsonData(jsonDataArray);
            };

            reader.readAsArrayBuffer(file);
            setUpdatedCacheFlag(false)
        }
    };



    return {
        jsonData,
        handleFileChange,
        updatedCacheFlag
    };
};

export default useAddTransactions