import React from 'react'
import '../Styles/FileUpload.css'

const FileUpload = () => {
  return (
    <div className="content">
        <div className="fileupload-header">
            <div className="fileupload-header-content">
                <span className="page-title">Dashboard</span>
                <span className="back-button">
                <div class="icon-container">
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
                </div>
                    <span className="back-text">File Upload</span>
                </span>
            </div>
        </div>
        <div className="main-content">
            <span className='fileupload-title'>File Upload</span>
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
        </div>
    </div>
  )
}

export default FileUpload