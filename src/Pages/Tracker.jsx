import React, { useState } from 'react'
import { useGetUserInfo } from "../Hooks/useGetUserInfo.jsx";

import '../Styles/tracker.css'
import HambugerMenuIcon from "../Assets/icons/hamburger-menu-icon.png"

import FileUpload  from '../Components/FileUpload.jsx';
import ExpenseHistory from '../Components/ExpenseHistory.jsx'
import ExpenseSummary from '../Components/ExpenseSummary.jsx'
import TrackerSidebar from '../Components/TrackerSidebar.jsx';
import Popup from '../Components/Popup.jsx'

const Tracker = () => {
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(!showPopup);
  };
  
  const userInfo = useGetUserInfo()
  console.log(userInfo)

  const [activeLink, setActiveLink] = useState('ExpenseSummary');   // cambiar para dejar como summary por defecto
  const [mobileSidebar, setMobileSidebar] = useState(false)

  const toggleSidebar = () => {
    setMobileSidebar(!mobileSidebar)
  }
  

  return (
    <div className="grid container">
      <div className='menu-sidebar'>
        < TrackerSidebar className="sidebar-web" setActiveLinkCallback={setActiveLink} />
      </div>
      <div className='mobile-header'>
        <div className="header headerlogin">
              <div className="logo" id='logo'>
                  <img id='logo-login' src="https://firebasestorage.googleapis.com/v0/b/saving-expenses-tracker.appspot.com/o/logos%2Foutput-onlinepngtools%20(1).png?alt=media&token=3cc14b4a-0b1f-4fd8-8bd1-b54a2861b3ef" alt="walleton logo, a pig" />
                  <h1 className='logo-text'>Walleton</h1>
              </div>
          </div>
        <div className='hamburger-icon' onClick={toggleSidebar}>
          <img src={HambugerMenuIcon} alt="hamburger menu icon" className='hamburger-menu-icon' />
        </div>
        {mobileSidebar && < TrackerSidebar className="sidebar-mobile" setActiveLinkCallback={setActiveLink}/>}
      </div>
      <div className='tracker-pages'>
        {activeLink === 'FileUpload' && <FileUpload  openPopup={openPopup} className="tracker-page"/>}
        {activeLink === 'ExpenseHistory' && <ExpenseHistory className="tracker-page" />}
        {activeLink === 'ExpenseSummary' && <ExpenseSummary className="tracker-page" />}
      </div>
      {showPopup && (
        <div className="popup-background">
          <Popup onClose={() => setShowPopup(false)} />
        </div>
      )}
    </div>
  );
  }
export default Tracker