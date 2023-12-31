import React, { useState } from 'react';
import '../Styles/Popup.css'


const Popup = ({ trigger, children }) => {

  const savingQuotes = [
    "¿Te imaginai' meterte en el mundo de las criptos con tus ahorros? Una apuesta arriesgada, ¡pero quién sabe!",
    "Con ahorros en la billetera, date el lujo de partir a la aventura sin aviso. ¿Un fin de semana en la playa? ¡Anda po!",
    "¡Invierte en educación! Aprende en cursos, certificaciones o incluso metiéndote de lleno en la universidad📖",
    "¿Y si te lanzai' con tu propio negocio? Con los ahorros como tu comodín, podrías armar el próximo emprendimiento que revolucione el país🚀",
    "Nunca se sabe cuándo va a llover. Arma un fondo de emergencia que sea más fuerte que el viento en Punta Arenas",
    "Si sueñas con tener tu propio pedazo de tierra, con los ahorros puedes decirle adiós al arrendatario y ser el dueño de tu propio reino",
    "Asegúrate de que tú y los tuyos están cubiertos. Invierte en buenos seguros de vida ¡la salud es lo primero!",
    "Si te gusta la adrenalina, tus ahorros pueden financiar esa experiencia de paracaidismo que siempre quisiste probar🪂",
    "Ponle buena onda al planeta. Invierte en tecnologías de energía limpia para la casa y contribuye a la causa verde🌳",
    "¿Te gustaría volar lo antes posible al próximo destino? Arma un fondo especial para que tus aventuras no dependan del presupuesto mensual🚀",
    "Diversifica tus ahorros, no pongas todos los huevos en la misma canasta🥚💰",
    "A penny saved is a penny earned💰",
    "Small savings make big differences💰"
  ]; 

  function selectedQuote(){
    const index = Math.floor(Math.random() * savingQuotes.length);
    return savingQuotes[index];

  }

  return (
    <>
        <div className="popup">
          <div className="popup-inner">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="https://usagif.com/wp-content/uploads/loading-25.gif" alt="" srcset="" style={{ width: '1.25rem', marginRight:'0.5rem' }}  />
                <h3>Cargando...</h3>
            </div>
            <p>{selectedQuote()}</p>
          </div>
        </div>
      
    </>
  );
};

export default Popup;