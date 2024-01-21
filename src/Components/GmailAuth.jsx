import React, { useState, useEffect } from 'react';

const APP_NAME = 'Sample App';
const CLIENT_ID = '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';
const API_KEY = '640576926117-qrjdh5uc3j0h998cd04f1rot4k1hff97.apps.googleusercontent.com';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest';
const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';
/* global gapi */
/* global google */


let tokenClient;
let gapiInited = false;
let gisInited = false;

const GmailAuth = () => {
  const [gapiReady, setGapiReady] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    window.gapiLoaded = () => {
      gapi.load('client', initializeGapiClient);
    }

    window.gisLoaded = () => {
      tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: ''
      });
      gisInited = true;
      setGapiReady(gapiInited && gisInited);
    }
  }, []);

  async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });

    gapiInited = true;
    setGapiReady(gapiInited && gisInited);
  }

  const handleAuthClick = () => {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw (resp);
      }

      setAuthorized(true);
      await listLabels();
    };

    if (gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      tokenClient.requestAccessToken({ prompt: '' });
    }
  }

  const handleSignoutClick = () => {
    const token = gapi.client.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken('');
      setContent('');
      setAuthorized(false);
    }
  }

  async function listLabels() {
    let response;
    try {
      response = await gapi.client.gmail.users.labels.list({
        'userId': 'me',
      });
    } catch (err) {
      setContent(err.message);
      return;
    }

    const labels = response.result.labels;
    const outputText = (labels && labels.length > 0)
      ? labels.reduce(
        (str, label) => `${str}${label.name}\n`,
        'Labels:\n')
      : 'No labels found';

    setContent(outputText);
  }

  return (
    <div>
      {gapiReady && !authorized &&
        <button onClick={handleAuthClick}>Authorize</button>
      }
      {gapiReady && authorized &&
        <button onClick={handleSignoutClick}>Sign Out</button>
      }
      <pre>{content}</pre>
    </div>
  );
}

export default GmailAuth;