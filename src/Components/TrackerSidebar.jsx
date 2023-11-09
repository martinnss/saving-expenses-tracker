import React, { useState } from 'react'
import '../Styles/TrackerSidebar.css'


const TrackerSidebar = ({ setActiveLinkCallback }) => {
    const [activeLink, setActiveLink] = useState('ExpenseSummary'); 
    return (
        <div className='sidebar-container'>
            <div className="sidebar">
                <div className="sidebar-content">
                <div className="logo">
                </div>
                <div className="menu">
                    <nav className="menu-items">
                    <p onClick={(e) => {
                        e.preventDefault(); // Evita la navegación
                        setActiveLinkCallback('ExpenseSummary');}}
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
                        setActiveLinkCallback('FileUpload');}} 
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
                        setActiveLinkCallback('ExpenseHistory');}}  
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
        </div>
    )
}

export default TrackerSidebar