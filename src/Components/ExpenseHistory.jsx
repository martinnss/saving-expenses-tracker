import React,{useState} from 'react'
import useGetExpenses from '../Hooks/useGetExpenses.jsx'
import BasicDatePicker from './BasicDatePicker.jsx'

import '../Styles/ExpenseHistory.css'

const ExpenseHistory = () => {
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


  const handleStartDateChange = (newValue) => {
    setStartDate(newValue)

    const startDate=newValue

  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue)

    const endDate=newValue
  };


  const expenses = useGetExpenses({startDateFilter: startDate, endDateFilter: endDate});           //////////////////////////////////////////
  const latestExpenses = expenses.slice(0, 5);

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
                                <td className='table-data'>{expense.date.toLocaleString()}</td>
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

export default ExpenseHistory