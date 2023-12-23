import React, {useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx'
import { useGetUserInfo } from "./useGetUserInfo";
import useReadPdf from './useReadPdf'
import categorizerGPT from '../functions/categorizerGPT';
import {addDoc, collection, serverTimestamp, Timestamp} from "firebase/firestore"
import { db } from "../config/firebase";



const useAddTransactions = ({updatedCacheFlag, setUpdatedCacheFlag, hasInputData}) => {
    const [jsonData, setJsonData] = useState(null);

    const transactionCollectionRef = collection(db, 'transactions') //db a la que queremos enviar la data

    const userInfo = useGetUserInfo()


    //const jsonWithCategories = categorizerGPT(jsonWithoutCategories)

    //console.log("objectssssssssssssssssssssssssssssssssssssssssssssssssssssssss", jsonWithCategories)

    //categorizer

  

    const generateUniqueId = () => {
        return uuidv4();
    };



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
                date: row[0] ? row[0] : serverTimestamp(),
                type: row[1] ? row[1] : "TBD",
                details: row[2] ? row[2] : "TBD",
                amount: row[3] ? row[3] : 0,
            };
        });
        // antes de acá debo tener el json correcto de usereadpdf
        // Print each element
        jsonDataArray.forEach((element, index) => {
            console.log("subida a firebase activada")
            /*addDoc(transactionCollectionRef, {
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

    setUpdatedCacheFlag(false)



    console.log("jsonData:", jsonData)


    return {
        jsonData,
        updatedCacheFlag
    };
};

export default useAddTransactions