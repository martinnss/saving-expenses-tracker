import React,{useState} from 'react'
import useGetExpenses from '../Hooks/useGetExpenses.jsx'
import BasicDatePicker from './BasicDatePicker.jsx'
import { useGetUserInfo } from "../Hooks/useGetUserInfo";

import '../Styles/ExpenseHistory.css'

const ExpenseHistory = () => {
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastExpense = currentPage * itemsPerPage;
  const indexOfFirstExpense = indexOfLastExpense - itemsPerPage;



  const handleStartDateChange = (newValue) => {
    setStartDate(newValue)

    const startDate=newValue

  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue)
    const endDate=newValue
  };


  const userInfo = useGetUserInfo()

  const { expenses, updateExpenseType } = useGetExpenses({
    startDateFilter: startDate,
    endDateFilter: endDate,
    dataUpToDate:true,
  });      

  const handleTypeChange = async (transactionId, newType) => {
    // Llama a la función para actualizar el tipo de gasto
    await updateExpenseType(transactionId, newType);
  };



  const currentExpenses = expenses 
    .filter((expense) => expense.uid === userInfo.uid)
    .slice(indexOfFirstExpense, indexOfLastExpense);


  

  return (
    <div className='content'>
      <div className="content-header">
          <div className="content-header-content">
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
                  <span className="back-text">Expense History</span>
              </span>
          </div>
      </div>
      <div className="main-content">
      <span className='content-title'>Expense History</span>
        <div className="time-picker-container">
          <div className="time-picker-component">
            <p className='subtitle'>From:</p>
            <BasicDatePicker onChangeDate={handleStartDateChange} />
          </div>
          <div className="time-picker-component">
            <p className='subtitle'>To:</p>
            <BasicDatePicker onChangeDate={handleEndDateChange} isEnd={true} isStartDate={startDate} />
          </div>
        </div>
        <div className="expenses-table-div">
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
                {currentExpenses.map((expense) => (
                  <tr key={expense.transaction_id} className='table-row'>
                    <td className='table-data'>{expense.date.toLocaleString()}</td>
                    <td className='table-data'>{expense.seller}</td>
                    <td className='table-data'>{expense.installment_amount}</td>
                    <td className='table-data'>{expense.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='table-buttons'>
              <button
                className='table-btn'
                onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
              >
                Anterior
              </button>

              <button
                className='table-btn'
                onClick={() =>
                  setCurrentPage(currentPage < Math.ceil(expenses.length / itemsPerPage) ? currentPage + 1 : currentPage)
                }
                disabled={currentPage === Math.ceil(expenses.length / itemsPerPage)}
              >
                Siguiente
              </button>
              <span style={{ margin: '0 10px' }}>
                Página {currentPage} / {Math.ceil(expenses.length / itemsPerPage)}
              </span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ExpenseHistory