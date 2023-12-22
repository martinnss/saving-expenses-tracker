import React,{useState} from 'react'
import useAddTransactions from '../Hooks/useAddTransactions.jsx'
import useGetExpenses from '../Hooks/useGetExpenses.jsx'
import { useGetUserInfo } from "../Hooks/useGetUserInfo";
import FileInput from "./FileInput.jsx"
import useReadPdf from '../Hooks/useReadPdf.jsx'


import '../Styles/FileUpload.css'

const FileUpload = () => {

    const userInfo = useGetUserInfo()
    const [updatedCacheFlag, setUpdatedCacheFlag] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);


    const handleFileChange = (file) => {
        setSelectedFile(file);
    };

  // Llama a useReadPdf solo cuando selectedFile cambia ojala lograrlo
    const jsonWithoutCategories = useReadPdf({
        pdfUrl: selectedFile ? URL.createObjectURL(selectedFile) : '',
        banco: 'Santander',
    });

    // Llama a useAddTransactions solo cuando selectedFile cambia
    /*const { jsonData, handleFileChange: handleFileChangeHook } = useAddTransactions({
        updatedCacheFlag: updatedCacheFlag,
        setUpdatedCacheFlag: setUpdatedCacheFlag,
        pdfUrl: selectedFile ? URL.createObjectURL(selectedFile) : '',
    });*/
    
    
    const { expenses, updateExpenseType } = useGetExpenses({
        startDateFilter: null,
        endDateFilter: null,
        dataUpToDate: updatedCacheFlag
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
                    <FileInput onFileChange={handleFileChange} />
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
                                latestExpenses.map((expense) => {
                                    if (expense.uid === userInfo.uid) {
                                      return (
                                        <tr key={expense.transaction_id} className='table-row'>
                                          <td className='table-data'>{expense.date.toLocaleString()}</td>
                                          <td className='table-data'>{expense.details}</td>
                                          <td className='table-data'>{expense.amount}</td>
                                          <td className='table-data'>{expense.type}</td>
                                        </tr>
                                      );
                                    } else {
                                      return null; // Omitir las filas que no cumplen con la condición
                                    }
                                  }
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default FileUpload