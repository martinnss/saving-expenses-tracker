import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddUser = () => {
    const userCollectionRef = collection(db, 'users'); // Colección de usuarios en Firestore
    const userInfo = useGetUserInfo();

    const addUser = async () => {
        try {
            if (userInfo && userInfo.uid) {
                // Verifica que userInfo y userInfo.uid sean válidos antes de usarlos.
                await addDoc(userCollectionRef, {
                    uid: userInfo.uid,
                    name: userInfo.displayName,
                    email: userInfo.email,
                    createdAt: serverTimestamp()
                });
                console.log("Usuario agregado correctamente a Firestore.");
            } else {
                console.error("El usuario no está autenticado o no tiene un UID válido.");
            }
        } catch (error) {
            console.error("Error al agregar usuario a Firestore:", error);
            throw error; // Puedes manejar el error según tus necesidades.
        }
    };

    return { addUser };
};
