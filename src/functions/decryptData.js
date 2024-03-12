import CryptoJS from 'crypto-js'

// Función para descifrar datos
function decryptData( cipherText) {
  try {
    const key="vhQ1IO/ZpefkcqrVXtbRACeh1PMLcdZh71KXj9Iz0wA="
    const bytes = CryptoJS.AES.decrypt(cipherText, key);
    console.error(bytes);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;}
    catch (error) {
      console.error(error);
    }
  }

export default decryptData