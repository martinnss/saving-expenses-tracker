import CryptoJS from 'crypto-js'


function encryptData( data) {
    const key = "vhQ1IO/ZpefkcqrVXtbRACeh1PMLcdZh71KXj9Iz0wA="
    const cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
    return cipherText;
  }

export default encryptData