import React ,{useEffect, useState } from 'react'
import { db } from "../config/firebase";
import {collection, getDocs, updateDoc, where, orderBy,query, Timestamp, FieldPath} from "firebase/firestore"
import { useGetUserInfo } from "./useGetUserInfo.jsx";
import { getAuth } from "firebase/auth";
import useLocalCache from '../Hooks/useLocalCache.jsx';
import encryptData from '../functions/encryptData.js'
import decryptData from '../functions/decryptData.js'


const useGetExpenses = ({startDateFilter, endDateFilter, dataUpToDate}) => {
  

        // Handle any errors here

        const auth = getAuth();

        const currentUser = auth.currentUser;

    const userInfo = useGetUserInfo()

    const [expenses, setExpenses] = useState([]);

    const fechaDesdeTimestamp = startDateFilter !== null
    ? new Date(startDateFilter.$d)
    : new Date("2023-01-01T00:00:00Z");

    const fechaHastaTimestamp = endDateFilter !== null 
    ? new Date(endDateFilter.$d)
    : new Date();

    const transactionCollectionRef = collection(db, 'transactions') //db a la que le queremos hacer un get

    const getExpenses = async () => {
      try {

        const q = query(
          transactionCollectionRef,
          where(FieldPath.documentId(), '==', currentUser.uid),
          where('date', '>=', Timestamp.fromDate(fechaDesdeTimestamp)),
          where('date', '<=', Timestamp.fromDate(fechaHastaTimestamp)),
          orderBy('date', 'desc')
        );
        console.log(q)
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot)
        const expensesData = querySnapshot.docs.map((doc) => doc.data());

        
        const fixedExpensesData =expensesData.map(objeto => {
          
          const timestamp=objeto.date;
          const fechaEnMilisegundos = timestamp.seconds * 1000;
          // Convierte la cadena de fecha a un objeto Date.
          const fechaTransformada = new Date(fechaEnMilisegundos);
        
          //Formato deseado
          return { ...objeto, date: fechaTransformada };
        });

        console.log("fixed", fixedExpensesData)
        setExpenses(fixedExpensesData);
        return fixedExpensesData

      } catch (error) {

        if (currentUser) {
          // User is signed in
          console.log("User is signed in:", currentUser.uid);
          console.log(userInfo)
          // You can access user information like currentUser.uid, currentUser.email, etc.
        } else {
          // No user is signed in
          console.log("No user is signed in");
        }

        console.error("Error fetching expenses:", error);
      }
    };


    

    const [myData, setMyData] = useLocalCache('transactions', {});

    useEffect(() => {
        const fetchData = async () => {
            if (userInfo) {
              console.log(dataUpToDate)

                if (dataUpToDate===false ){
                  console.log('actualizando por datos nuevos');

                  const newExpenses = await getExpenses();
                  const encryptCache = encryptData(newExpenses)

                  setMyData(encryptCache);
                  console.log("expenses seteadas",newExpenses)

                } else if (myData.length > 2) {
                  const listaFiltrada = [];
                  
                  // decrypt
                  const decryptedData = decryptData(myData)

                  // Itera la lista de objetos
                  for (const objeto of decryptedData) 
                  { 
                    
                    const fechaObjeto = new Date(objeto.date);
                    // Paso 1: Convertir cadena de fecha a objeto Date
                    const fechaCadena = new Date(fechaObjeto);

                    // Compara la fecha del objeto con el rango especificado
                    if (fechaCadena.getTime() >= fechaDesdeTimestamp.getTime() && fechaCadena.getTime() <= fechaHastaTimestamp.getTime()) {
                      // Agrega el objeto a la lista filtrada si cumple con el rango
                      listaFiltrada.push(objeto);
                    }
                  }


                    if (listaFiltrada.length >0 ){
                      setExpenses(listaFiltrada)
                    } else {
                      setExpenses(myData)
                    }
                    
                } else {
                    console.log('leyendo firebase');
    
                    // Suponiendo que getExpenses es una función asincrónica
                    const newExpenses = await getExpenses();

                    const encryptCache = encryptData(newExpenses)

                    
 
                    setMyData(encryptCache);

                }

            }
        };
    
        fetchData();
    }, [userInfo, dataUpToDate, startDateFilter, endDateFilter]); // Dependencia actualizada
    




    

      return { expenses };
}

export default useGetExpenses