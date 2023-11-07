import React, { useState } from 'react'
import '../Styles/tracker.css'

import { useGetUserInfo } from "../Hooks/useGetUserInfo";
import FileUpload  from '../Components/FileUpload';
import ExpenseHistory from '../Components/ExpenseHistory'
import ExpenseSummary from '../Components/ExpenseSummary'

const Tracker = () => {
  const userInfo = useGetUserInfo()
  console.log(userInfo)

  const [activeLink, setActiveLink] = useState('ExpenseSummary');   // cambiar para dejar como summary por defecto
  

  return (
    <div className="grid container">
      <div className="sidebar">
        <div className="sidebar-content">
          <div className="logo">
            <a href="#">
              <span className="logo-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
                  <path d="M3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
                  <path d="M12 3v6"></path>
                </svg>
              </span>
              <span className="logo-text">Expenses Tracker</span>
            </a>
          </div>
          <div className="menu">
            <nav className="menu-items">
              <p onClick={(e) => {
                e.preventDefault(); // Evita la navegación
                setActiveLink('ExpenseSummary');}}
                className="menu-item">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="menu-icon"
                >
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                  <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                </svg>
                Expense Summary
              </p>
              <p onClick={(e) => {
                e.preventDefault(); // Evita la navegación
                setActiveLink('FileUpload');}} 
                className="menu-item">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="menu-icon"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" x2="12" y1="3" y2="15"></line>
                </svg>
                File Upload
              </p>
              <p onClick={(e) => {
                e.preventDefault(); // Evita la navegación
                setActiveLink('ExpenseHistory');}}  
                className="menu-item">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="menu-icon"
                >
                  <path d="M12 3v18"></path>
                  <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                  <path d="M3 9h18"></path>
                  <path d="M3 15h18"></path>
                </svg>
                Expense History
              </p>
              <p className='menu-item'>
                Spending Forecasts
                <p className='coming-soon'>Coming Soon</p>
              </p>
            </nav>
          </div>
        </div>
      </div>
      <div>
      {activeLink === 'FileUpload' && <FileUpload />}
      {activeLink === 'ExpenseHistory' && <ExpenseHistory />}
      {activeLink === 'ExpenseSummary' && <ExpenseSummary />}
      </div>
    </div>
  );
  }
export default Tracker