import React from 'react'
import {  useGoogleLogin} from '@react-oauth/google';
import axios from 'axios';
import getAllMessages from '../functions/getMessagesFromGmail'
import categorizerGPTEmails from '../functions/categorizerGPTEmails';

const GmailAuthTest = () => {

    function base64UrlDecode(base64Url) {
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedData = atob(base64);
        const utf8String = decodeURIComponent(escape(decodedData));
        return utf8String;
    }


    const login = useGoogleLogin({
        scope: "https://www.googleapis.com/auth/gmail.readonly",
        onSuccess: async tokenResponse => {


            // fetching userinfo can be done on the client or the server
            const userInfo = await axios
                .get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                })
                .then(res => res.data);
            
            const userEmail = await axios
              .get(`https://gmail.googleapis.com/gmail/v1/users/${userInfo.email}/messages`, {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
              })
              .then(res => res.data);


            // Call the function and handle the result appropriately in your React component
            getAllMessages(userInfo, tokenResponse.access_token)
            .then( async allMessages => {

              //si threadid está en caché, entonces que lo omita
              console.log(allMessages)


                const userEmailDataArray = [];

                for (let i = 0; i < allMessages.length; i++) {
                  const messageId = allMessages[i].id;

                  const userEmailData = await axios
                    .get(`https://gmail.googleapis.com/gmail/v1/users/${userInfo.email}/messages/${messageId}?format=full`, {
                      headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                    })
                    .then(res => res.data);

                  const headers = userEmailData.payload.headers;

                  const fromHeader = headers.find(header => header.name.toLowerCase() === 'from');

                  const fromHeaderValue = fromHeader ? fromHeader.value : null;

                  // Utilizar una expresión regular para extraer el correo electrónico
                  const emailRegex = /<([^>]+)>/;
                  const match = fromHeaderValue.match(emailRegex);


                  const emailFrom = match ? match[1] : null;

                  //particularidades para cada banco
                  const rawDataEmail =userEmailData.payload.parts[0].body.data

                  const decodedString = base64UrlDecode(rawDataEmail);
                  


                  const parser = new DOMParser();
                  const doc = parser.parseFromString(decodedString, 'text/html');
                  const emailText = doc.body.textContent;
                  const emailTextFull = emailText.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
                  userEmailData.emailFrom = emailFrom
                  userEmailData.emailFullText = emailTextFull
                  
                  //bchile
                  if (emailFrom ==="enviodigital@bancochile.cl"){
                    const inicio = userEmailData.snippet.indexOf("Te informamos que se ha") + "Te informamos que se ha".length;
                    const fin = userEmailData.snippet.indexOf("Revisa Saldos");

                    // Verifica si los índices son válidos
                    if (inicio >= 0 && fin >= 0 && fin > inicio) {
                      // Acorta el string desde el índice de inicio hasta el índice de fin
                      const stringAcortado = userEmailData.snippet.substring(inicio, fin).trim();
                      userEmailData.snippet = stringAcortado
                    } else {
                      userEmailData.snippet =""
                    }
                  }

                  //bci
                  if (emailFrom ==="martin.olivarest@utem.cl"){
                    //extraer data de la tabla
                    //traer los table rows y asignarselos
                    //https://chat.openai.com/c/3ff2d53d-22b8-420e-9db3-64c38d2aa21b
                    //'martin.olivarest@utem.cl'

                  }
                  // solo para Bchile
                  
                  if (userEmailData.snippet !== "") {
                    // Agregar userEmailData al array solo si la condición se cumple
                    userEmailDataArray.push(userEmailData);
                  }

                  
                }

                const transactionsArray = [];

                for (let i = 0; i < userEmailDataArray.length; i++) {
                  const  transaction = userEmailDataArray[i];


                  if (transaction.emailFrom ==="enviodigital@bancochile.cl"){
                    let cost = ""
                    let seller = ""
                    let date = ""

      
                    const snippet = transaction.snippet;


                    // cost
                    const patron = /\$([0-9,.]+)/;
                    const result = snippet.match(patron);
                    if (result) {
                      cost = result[1];
                      console.log("Número extraído:", cost);
                    } 

                    //seller
                    const mayusList = snippet.match(/\b[A-Z]+\b/g) ? snippet.match(/\b[A-Z]+\b/g) : ["TBD"] ;
                    
                    if (mayusList[0] ==="US"){
                      seller = mayusList.slice(1).join(' ');
                    } else {
                      seller = mayusList.join(' ');
                    }
                    console.log(seller)

                    //date
                    const patronFechaHora = /(\d{2}\/\d{2}\/\d{4} \d{2}:\d{2})/;
                    date = snippet.match(patronFechaHora)[1];

                    console.log(date)

                  }
                  console.log(transaction)
              
                  //Crear objeto transctions extrayendo la data de cada mensaje.
                  // todo lo anterior con el formato para enviar a firebase 

                  /*
                  transaction_id: generateUniqueId(), ///////////////////////listo
                  uid: userInfo.uid, ///////////////////////listo
                  uploadedAt: serverTimestamp(), ///////////////////////listo
                  date: row.dateObject ? new Date(row.dateObject) : serverTimestamp(),
                  transaction_location: row.lugarOperacion ? row.lugarOperacion : "TBD",
                  seller: row.desc ? row.desc : "TBD", ///////////////////////listo
                  amount: row.montoTotal ? row.montoTotal : 0, 
                  num_installments: row.numCuota ? row.numCuota : "NA" ,
                  installment_amount: row.valorCuota ? row.valorCuota : 0 ,
                  category: row.category ? row.category : "TBD",*/
              }

                const categorizedEmails = categorizerGPTEmails(userEmailDataArray)


            })
            .catch(error => {
                // Handle any errors that might occur during the process
                console.error('Error:', error.message);
                // You might want to implement additional error handling or logging here
            });

            const userEmailData = await axios
            .get(`https://gmail.googleapis.com/gmail/v1/users/${userInfo.email}/messages/${userEmail.messages[67].id}?format=full`, {
              headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            })
            .then(res => res.data);

          },
      
    });

  return (
    <div className='google-get-data-container'>
        <button className='google-get-data' onClick={() => login()}>Sign in with Google 🚀</button>
    </div>
  )
}

export default GmailAuthTest