import React from 'react'
import useAddTransactions from '../Hooks/useAddTransactions.jsx'
import useGetExpenses from '../Hooks/useGetExpenses.jsx'

import '../Styles/FileUpload.css'

const FileUpload = () => {
    const {jsonData, handleFileChange } = useAddTransactions()
    

    const { expenses, updateExpenseType } = useGetExpenses({
        startDateFilter: null,
        endDateFilter: null,
    });
    


    const latestExpenses = expenses.slice(0, 5);

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
                    onChange={handleFileChange}
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
                            {
                                latestExpenses.map((expense) => (
                                    <tr key={expense.transaction_id} className='table-row'>
                                        <td className='table-data'>{expense.date.toISOString().split('T')[0]}</td>
                                        <td className='table-data'>{expense.details}</td>
                                        <td className='table-data'>{expense.amount}</td>
                                        <td className='table-data'>{expense.type}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default FileUpload