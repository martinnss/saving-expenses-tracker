import CryptoJS from 'crypto-js'

// Función para descifrar datos
function decryptData( cipherText) {
    const key="vhQ1IO/ZpefkcqrVXtbRACeh1PMLcdZh71KXj9Iz0wA="
    const bytes = CryptoJS.AES.decrypt(cipherText, key);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }

export default decryptData