import React, { useState, useEffect } from 'react';
import Popup from './Popup';



const ExpenseSummary = () => {
  const [popupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  
  return (
    <div>
    </div>
  );
};

export default ExpenseSummary