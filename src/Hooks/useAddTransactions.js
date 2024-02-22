import {addDoc, collection, serverTimestamp} from "firebase/firestore"
import { db } from "../config/firebase";
import { useGetUserInfo } from "./useGetUserInfo.jsx";

export const useAddTransaction = () => {
    const transactionCollectionRef = collection(db, 'transactions') //db a la que queremos enviar la data

    const userInfo = useGetUserInfo()

    const addTransaction = async ({
        description,    
        transactionAmount, 
        transactionType 
    }) =>{
        if (userInfo && userInfo.uid) {
            // Verifica que userInfo y userInfo.uid sean válidos antes de usarlos.
            await addDoc(transactionCollectionRef, {
                uid: userInfo.uid,
                description,
                transactionAmount,
                transactionType,
                createdAt: serverTimestamp()
            });
        } else {
            console.error("El usuario no está autenticado o no tiene un UID válido.");
        }

    };
    return {addTransaction}
}