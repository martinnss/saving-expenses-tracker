import React ,{useEffect, useState } from 'react'
import { db } from "../config/firebase";
import {collection, getDocs, where, query} from "firebase/firestore"
import { useGetUserInfo } from "./useGetUserInfo";

const useGetExpenses = () => {
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
            setExpenses(expensesData);
          } catch (error) {
            // Handle any errors here
            console.error("Error fetching expenses:", error);
          }
        };
    
        if (userInfo) {
          getExpenses();
        }
      }, [userInfo]);
    
    
    return expenses
}

export default useGetExpenses