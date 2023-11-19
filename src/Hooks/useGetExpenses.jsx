import React ,{useEffect, useState } from 'react'
import { db } from "../config/firebase";
import {collection, getDocs, where, query} from "firebase/firestore"
import { useGetUserInfo } from "./useGetUserInfo";

const useGetExpenses = ({startDateFilter,endDateFilter}) => {

    if (startDateFilter !== null) {

    } else {
      startDateFilter = new Date('2022-01-01');
    }



    if (endDateFilter !== null) {

    } else {
      endDateFilter =  new Date();
    }


    const userInfo = useGetUserInfo()

    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const transactionCollectionRef = collection(db, 'transactions') //db a la que le queremos hacer un get

        const getExpenses = async () => {
          try {
            const q = query(
              transactionCollectionRef,
              where('uid', '==', userInfo.uid)
            );
    
            const querySnapshot = await getDocs(q);
            const expensesData = querySnapshot.docs.map((doc) => doc.data());


            const fixedExpensesData =expensesData.map(objeto => {

              const timestamp=objeto.date;
              const fechaEnMilisegundos = timestamp.seconds * 1000;
              // Convierte la cadena de fecha a un objeto Date.
              const fechaTransformada = new Date(fechaEnMilisegundos);
            
              //Formato deseado
              return { ...objeto, date: fechaTransformada };
            });


            setExpenses(fixedExpensesData);
          } catch (error) {
            // Handle any errors here
            console.error("Error fetching expenses:", error);
          }
        };
    
        if (userInfo) {
          getExpenses();
        }
      }, [userInfo, expenses]);
    
    
    return expenses
}

export default useGetExpenses