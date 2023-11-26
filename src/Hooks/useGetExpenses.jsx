import React ,{useEffect, useState } from 'react'
import { db } from "../config/firebase";
import {collection, getDocs, updateDoc, where, orderBy,query, Timestamp} from "firebase/firestore"
import { useGetUserInfo } from "./useGetUserInfo";

const useGetExpenses = ({startDateFilter,endDateFilter}) => {
  
    if (startDateFilter !== null) {
      const newStartDateFilter =startDateFilter.$d

      startDateFilter = Timestamp.fromDate(newStartDateFilter)
      
    } else {
      const defaultStartDate =new Date('2022-01-01');

      startDateFilter = Timestamp.fromDate(defaultStartDate)
    }



    if (endDateFilter !== null) {
      const newEndDateFilter = endDateFilter.$d

      endDateFilter=Timestamp.fromDate(newEndDateFilter)

    } else {
      const defaultEndDate =new Date();

      endDateFilter =  Timestamp.fromDate(defaultEndDate)
    }


    const userInfo = useGetUserInfo()

    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const transactionCollectionRef = collection(db, 'transactions') //db a la que le queremos hacer un get

        const getExpenses = async () => {
          try {

            const q = query(
              transactionCollectionRef,
              where('uid', '==', userInfo.uid),
              where('date', '>=', startDateFilter),
              where('date', '<=', endDateFilter),
              orderBy('date', 'desc')
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


      const updateExpenseType = async (transactionId, newType) => {
        try {
          const transactionDocRef = collection(db, 'transactions', transactionId);
    
          await updateDoc(transactionDocRef, { type: newType });
    
          // Actualiza el estado con la nueva información
          setExpenses((prevExpenses) =>
            prevExpenses.map((expense) =>
              expense.transaction_id === transactionId
                ? { ...expense, type: newType }
                : expense
            )
          );
        } catch (error) {
          console.error("Error updating expense type:", error);
        }
      };
    
    
      return { expenses, updateExpenseType };
}

export default useGetExpenses