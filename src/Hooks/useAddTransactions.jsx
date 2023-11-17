import React, {useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx'
import { useGetUserInfo } from "./useGetUserInfo";
import {addDoc, collection, serverTimestamp} from "firebase/firestore"
import { db } from "../config/firebase";


const useAddTransactions = () => {
    const [jsonData, setJsonData] = useState(null);

    const transactionCollectionRef = collection(db, 'transactions') //db a la que queremos enviar la data

    const userInfo = useGetUserInfo()

    const convertExcelSerialDateToJSDate = (excelSerialDateNumber) => {
        // Base date for Windows Excel (1900)
        const baseDate = new Date('1900-01-01');

        const dateInMilliseconds = baseDate.getTime() + (excelSerialDateNumber - 1) * 24 * 60 * 60 * 1000;
        
        const resultDate=new Date(dateInMilliseconds)

        const year = resultDate.getFullYear();
        const month = (resultDate.getMonth() + 1).toString().padStart(2, '0'); // Zero-padding for single-digit months
        const day = resultDate.getDate().toString().padStart(2, '0'); // Zero-padding for single-digit days

        const resultString = year + '-' + month + '-' + day;

        return resultString
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
                        date: row[0] ? convertExcelSerialDateToJSDate(row[0]) : null,
                        type: row[1] ? row[1] : null,
                        details: row[2] ? row[2] : null,
                        amount: row[3] ? row[3] : null,
                    };
                });

                // Print each element
                jsonDataArray.forEach((element, index) => {
                    console.log("subida a firebase comentada para hacer pruebas")/*
                    addDoc(transactionCollectionRef, {
                        transaction_id: element.transaction_id,
                        uid: element.uid,
                        uploadedAt: element.uploadedAt,
                        date: element.date,
                        type: element.type,
                        details: element.details,
                        amount: element.amount,
                    })*/
                });

                // Set the JSON data state
                setJsonData(jsonDataArray);
            };

            reader.readAsArrayBuffer(file);
        }
    };

    console.log(jsonData);

    return {
        jsonData,
        handleFileChange,
    };
};

export default useAddTransactions