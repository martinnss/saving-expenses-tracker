import React, {useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx'
import { useGetUserInfo } from "./useGetUserInfo.jsx";
import useReadPdf from './useReadPdf.jsx'
import categorizerGPT from '../functions/categorizerGPT.js';
import {addDoc, collection, serverTimestamp, Timestamp} from "firebase/firestore"
import { db } from "../config/firebase";



const useAddTransactions = ({updatedCacheFlag, setUpdatedCacheFlag, hasInputData, jsonInput}) => {
    const [jsonData, setJsonData] = useState(null);

    const transactionCollectionRef = collection(db, 'transactions') //db a la que queremos enviar la data

    const userInfo = useGetUserInfo()
    let count = 0;

    const capitalizeFirstLetter = (str) => {
        return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
    };

    useEffect(() => {
        if (jsonInput !== ""){

            const generateUniqueId = () => {
                return uuidv4();
            };
            
            const transactionJSON =JSON.parse(jsonInput)
            console.log(transactionJSON)


            if (transactionJSON.length > 0) {


                const jsonDataArray = transactionJSON.slice(1).map((row) => {
                    console.log(row, userInfo.uid)
                    return {
                        transaction_id: generateUniqueId(),
                        uid: userInfo.uid,
                        uploadedAt: serverTimestamp(),
                        date: row.dateObject ? new Date(row.dateObject) : serverTimestamp(),
                        transaction_location: row.lugarOperacion ? row.lugarOperacion : "TBD",
                        seller: row.desc ? capitalizeFirstLetter(row.desc) : "TBD",
                        amount: row.montoTotal ? row.montoTotal : 0,
                        num_installments: row.numCuota ? row.numCuota : "NA" ,
                        installment_amount: row.valorCuota ? row.valorCuota : 0 ,
                        category: row.category ? capitalizeFirstLetter(row.category) : "TBD",
                        currency: row.currency ? row.currency : "TBD",
                        amount_original: row.amount_original ? row.amount_original : 0
                    };
                });

                console.log("subida a firestore parada");
                // upload to firestore
                jsonDataArray.forEach((element, index) => {


                    
                    addDoc(transactionCollectionRef, {
                        transaction_id: element.transaction_id,
                        uid: element.uid,
                        uploadedAt: element.uploadedAt,
                        transaction_location: element.transaction_location,
                        seller: element.seller,
                        amount: element.amount,
                        num_installments: element.num_installments,
                        installment_amount: element.installment_amount,
                        category: element.category ,
                        date: element.date,
                        currency: element.currency,
                        amount_original: element.amount_original
                    }) 
                });

                // Set the JSON data state
                setJsonData(jsonDataArray);
            };

            setUpdatedCacheFlag(false)
        }
    }, [jsonInput, setUpdatedCacheFlag]);



    return {
        jsonData
    };
};

export default useAddTransactions