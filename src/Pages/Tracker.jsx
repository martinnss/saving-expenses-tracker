import React, { useState } from 'react'
import { useGetUserInfo } from "../Hooks/useGetUserInfo";

import '../Styles/tracker.css'
import HambugerMenuIcon from "../Assets/icons/hamburger-menu-icon.png"

import FileUpload  from '../Components/FileUpload';
import ExpenseHistory from '../Components/ExpenseHistory'
import ExpenseSummary from '../Components/ExpenseSummary'
import TrackerSidebar from '../Components/TrackerSidebar';
import Popup from '../Components/Popup'

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
        <div className='hamburger-icon' onClick={toggleSidebar}>
          <img src={HambugerMenuIcon} alt="hamburger menu icon" className='hamburger-menu-icon' />
        </div>
        {mobileSidebar && < TrackerSidebar className="sidebar-mobile" setActiveLinkCallback={setActiveLink}/>}
      </div>
      <div>
        {activeLink === 'FileUpload' && <FileUpload  openPopup={openPopup}/>}
        {activeLink === 'ExpenseHistory' && <ExpenseHistory />}
        {activeLink === 'ExpenseSummary' && <ExpenseSummary />}
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