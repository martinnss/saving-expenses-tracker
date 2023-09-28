import React, { useState } from 'react';

import AudioRecorder from './AudioRecorder';

import '../Styles/summarize.css';

const Summarize = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleRecording = () => {
    setIsRecording(!isRecording);
    setShowPopup(!showPopup);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handlePopUp = () => {
    setShowPopup(!showPopup);
  }

  return (
    <div>
      <header>
        <div className="header">
          <div className="logo">
            <img src="https://pngimg.com/uploads/tesla_logo/tesla_logo_PNG21.png" alt="tesla" />
          </div>
          <div className="login">
            <p>[username]</p>
          </div>
        </div>
      </header>

      <div className="summarize">
        <div className='summarize-title' id='summarize-title'>
          <h1>Bienvenido, <span id="username">username!</span></h1>
          <p>Para resumir tus reuniones, debes elegir una de las siguientes opciones:</p>
        </div>
        <div className='summarize-options' id='summarize-options'>
          <div className='summ-option'>
            <h3>Graba tu reunión</h3>
            <p>Graba tu reunión directamente con nosotros</p>
            <button onClick={handleRecording} className='btn-smsm record-audio'>Grabar Audio</button>
          </div>

          <div className='summ-option'>
            <h3>Sube una reunión</h3>
            <p>Sube una reunión ya grabada con tu dispositivo</p>
            <div className={selectedFile ? "none": "file-input-container"}>
              <label className="file-input-label">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="file-input"
                />
                <span>Seleccionar Audio</span>
              </label>
            </div>
            <span>
                  {selectedFile ?               
                  <div>
                    <label className="upload-text">
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={handleFileChange}
                        className="file-input"
                      />
                      <span style={{display:'block'}}>{selectedFile.name}</span>
                    </label>
                    <button className='btn-smsm'>Procesar Resumen</button>
                  </div>
              : ''}
            </span>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content" >
            <img onClick={handlePopUp} src="https://ff053a555d374f0e5a49b3ab4f3cd0ee7584239a4bd5f87e62a598e-apidata.googleusercontent.com/download/storage/v1/b/resumia/o/9110796_x_icon.svg?jk=AYvHSRGchToQby6rb6PL32O6rip5cSkzTjfWIR_i-NPgS8bxo9HkfDKOg4J2LbuV6mqdobuf6nHUnut1BioeC7p8rL86dm8LMP3cWs4DyVNd-6A5HTrqgHhAQx838YemjGtjEey7_AWdu5aRctLuhFpozIkw7i4PEC31PARcFKxxa-GmFl0TrPviui47s5MGmwf0awrnlJi7ZSso-easrD1e7C2na9_yC_kRhbh0SXOec7NLV_b78vSEZKPkscz6P2LtPcSk8HTjmi-rjXuMRoeDm5OsXYXiKrbqEFp7cX9LTVzVQE-3wY9X-mE8f-9NnDFiSVMCCC9Jfke43qHeqFsQXoivLkCKrA57ea4jcK5WQ5zpfpmNtetEOqBEG4cB2JkOmCIBM7daWa7BOJMofwe6od1iK1ggdrbxlWJOG0rL0w1uy5gon7bJI6QtT5xMI9M5msf0QrErOpXoH-TChx5uaywhEjiwg4M9Cs_cV7K4ZndgZaqN58Af-qALlGy4PtUpotejNCSZhzptjDgoNLnv_IK4-o9GAWlgz8KiEW3ahfGiBUUnaJc6I1HVSI6WDkzGson8_DeH-2X17-Ii72PWHQ7CS3Q_fyR9IflBH0rVWFElWXQu5mFyokHXBI0xH92F7Fj6JiM96sDhUHu3kwn1aqsX2_xPqcfuDY_-6AOdMU2khUUDXbyiTN0Yc_5vvyS_S2RcAWlIjhso2U8hdEMtWFmj3s3idnjkMDNmTHsDXipILx4uEYLJMXcUJgn7ZUPpm7IOfgYmHTN46YtPZtbFHczDXGsFc26qf2WlN9voIUsF9JwPgAbDX3fmLSF-TGKEejBJFb3p3JeVPal4rFTqB-xM4VdmisOXn93upPwkXvzkKkAsn9f_1dO6NxmipgTIv1S4PSPeAkmdkTEQTE-ekg30AD8uwfjoUmTYhx5yapa6OhkZTwEXV70JJpoKcMvoYLjxgSuVNjhidM-PzQ2RijdvE2bTbEM9Gh0vEeIGbWlNfFBMh5mApxl8uIRAKjvTv6WsV3zr_gWvT5Mklt7UZCbplbZJZX8_dhDK7f7wYWARhuJzM14-q512yaf58kNR3fD1JKLU-EZIWcFZ2e0Xz-4-GxUcmDgV96OmUtgq8dAAKuEXF9siixhwbrAE4HL0_rIm0tWkf2ppJRY&isca=1" alt="close" />
            <div>
              <AudioRecorder />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summarize;
