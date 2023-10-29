import React from 'react'
import '../Styles/FileUpload.css'

const FileUpload = () => {
  return (
    <div className="content">
        <header className="header">
            <div className="header-content">
                <a href="#">
                <span className="page-title">Dashboard</span>
                <span className="back-button">
                    <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="back-icon"
                    >
                    <path d="m9 18 6-6-6-6"></path>
                    </svg>
                    <span className="back-text">File Upload</span>
                </span>
                </a>
            </div>
        </header>
        <main className="main-content">
        <div className="file-upload">
            <input
            type="file"
            className="file-input"
            accept=".xlsx"
            />
        </div>
        <div className="expenses-table">
            <table className="expenses-table">
            <caption className="table-caption">
                Recent Expenses
            </caption>
            <thead>
                <tr className="table-row">
                <th className="table-header">Date</th>
                <th className="table-header">Description</th>
                <th className="table-header">Amount</th>
                <th className="table-header">Category</th>
                </tr>
            </thead>
            <tbody>
                <tr className="table-row">
                <td className="table-data">01/01/2023</td>
                <td className="table-data">Internet Bill</td>
                <td className="table-data">$50.00</td>
                <td className="table-data">Utilities</td>
                </tr>
                <tr className="table-row">
                <td className="table-data">01/03/2023</td>
                <td className="table-data">Groceries</td>
                <td className="table-data">$100.00</td>
                <td className="table-data">Food</td>
                </tr>
            </tbody>
            </table>
        </div>
        <div className="expense-trends">
            <span className="trends-text">Expense Trends Visualization</span>
        </div>
        <div className="expense-summary">
            <span className="summary-text">Expense Summary Visualization</span>
        </div>
        </main>
    </div>
  )
}

export default FileUpload