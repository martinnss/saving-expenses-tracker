import React from 'react'
import {  useGoogleLogin} from '@react-oauth/google';
import axios from 'axios';
import getAllMessages from '../functions/getMessagesFromGmail'


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

            console.log(userEmail);

            // Call the function and handle the result appropriately in your React component
            getAllMessages(userInfo, tokenResponse.access_token)
            .then( async allMessages => {
                console.log(allMessages);

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
                  
                    // if decodedString es un html entonces que use cheerio si no que continue
                    //extraer texto del html usando cheerio

                    
                  console.log(userEmailData)
                  console.log(decodedString)
                  console.log(emailFrom)

                  userEmailDataArray.push(userEmailData);

                  let emailContent = ""

                }
                console.log(userEmailDataArray)
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