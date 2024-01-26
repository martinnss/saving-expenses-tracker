import React from 'react'
import {  useGoogleLogin} from '@react-oauth/google';
import axios from 'axios';



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

            console.log(tokenResponse);
            // fetching userinfo can be done on the client or the server
            const userInfo = await axios
                .get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                })
                .then(res => res.data);
                
            console.log(userInfo);

            const userEmail = await axios
              .get(`https://gmail.googleapis.com/gmail/v1/users/${userInfo.email}/messages`, {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
              })
              .then(res => res.data);
            console.log(userEmail);

            const userEmailData = await axios
            .get(`https://gmail.googleapis.com/gmail/v1/users/${userInfo.email}/messages/${userEmail.messages[67].id}?format=full`, {
              headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            })
            .then(res => res.data);

            console.log(userEmailData);

            const base64Data  = userEmailData.payload.parts[0].body.data 
            //const base64Data = userEmailData.payload.body.data

            // los bancos tienen cierto formato, asi que acá se deben colocar los formatos que aplican a cada banco

            const decodedString = base64UrlDecode(base64Data);

            console.log(decodedString) 

          },
      
    });

  return (
    <div className='google-get-data-container'>
        <button className='google-get-data' onClick={() => login()}>Sign in with Google 🚀</button>
    </div>
  )
}

export default GmailAuthTest