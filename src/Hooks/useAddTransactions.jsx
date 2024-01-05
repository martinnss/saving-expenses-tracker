import React, {useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx'
import { useGetUserInfo } from "./useGetUserInfo";
import useReadPdf from './useReadPdf'
import categorizerGPT from '../functions/categorizerGPT';
import {addDoc, collection, serverTimestamp, Timestamp} from "firebase/firestore"
import { db } from "../config/firebase";



const useAddTransactions = ({updatedCacheFlag, setUpdatedCacheFlag, hasInputData, jsonInput}) => {
    const [jsonData, setJsonData] = useState(null);

    const transactionCollectionRef = collection(db, 'transactions') //db a la que queremos enviar la data

    const userInfo = useGetUserInfo()
    let count = 0;

    useEffect(() => {
        if (jsonInput !== ""){

            const generateUniqueId = () => {
                return uuidv4();
            };

            const transactionJSON =JSON.parse(jsonInput)


            if (transactionJSON.length > 0) {


                const jsonDataArray = transactionJSON.slice(1).map((row) => {
                    return {
                        transaction_id: generateUniqueId(),
                        uid: userInfo.uid,
                        uploadedAt: serverTimestamp(),
                        date: row.dateObject ? new Date(row.dateObject) : serverTimestamp(),
                        transaction_location: row.lugarOperacion ? row.lugarOperacion : "TBD",
                        seller: row.desc ? row.desc : "TBD",
                        amount: row.montoTotal ? row.montoTotal : 0,
                        num_installments: row.numCuota ? row.numCuota : "NA" ,
                        installment_amount: row.valorCuota ? row.valorCuota : "NA" ,
                        category: row.category ? row.category : "TBD",
                    };
                });

                console.log("subida a firestore parada");
                // upload to firestore
                jsonDataArray.forEach((element, index) => {


                    /*
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
                        date: element.date
                    }) */
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