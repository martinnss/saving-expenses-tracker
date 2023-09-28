import React, { useState, useRef } from 'react';
import '../Styles/audio-recorder.css'

function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.addEventListener('dataavailable', event => {
          recordedChunksRef.current.push(event.data);
        });

        mediaRecorder.addEventListener('stop', () => {
          const audioBlob = new Blob(recordedChunksRef.current);
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
        });

        mediaRecorder.start();
        setRecording(true);
        mediaRecorderRef.current = mediaRecorder;
      })
      .catch(err => {
        console.error('Error al acceder al dispositivo de audio: ', err);
      });
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
    recordedChunksRef.current = [];
  };

  const playRecording = () => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <div className='container'>
      <h1 className='title' id='title'>Grabadora de Voz</h1>
      <div className='ventana'>
        <div onClick={startRecording} disabled={recording} className='start-recording'>
          {recording ? <p>Grabando ...</p> : <button className='btn-sm'>Iniciar Grabación</button>}
        </div>
        <div onClick={stopRecording} disabled={!recording}>
          {recording ? <button className='btn-sm'>Detener Grabación</button> : <button className='btn-sm' style={{display:'none'}}></button>}
        </div>
        {audioUrl && (
          <div>
            <audio src={audioUrl} controls />
            <button className='btn-sm process-summary'>
              Procesar resumen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AudioRecorder;
