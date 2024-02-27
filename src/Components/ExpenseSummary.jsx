import React, { useState, useEffect, useRef } from 'react';
import useGetExpenses from '../Hooks/useGetExpenses.jsx';
import { useGetUserInfo } from '../Hooks/useGetUserInfo.jsx';
import BasicDatePicker from './BasicDatePicker.jsx';
import ExpensesSummaryTable from './ExpensesSummaryTable.jsx';
import Chart from 'chart.js/auto';
import generatePastelColor from '../functions/generatePastelColor.js'
import '../Styles/ExpenseSumary.css'
import ChartDataLabels from 'chartjs-plugin-datalabels';





const ExpenseSummary = () => {
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

  const userInfo = useGetUserInfo()

  const { expenses, updateExpenseType } = useGetExpenses({
    startDateFilter: startDate,
    endDateFilter: endDate,
    dataUpToDate:true,
  });      
  










  const chartRef = useRef(null);
  const totalRef = useRef(null);

  const chartInstance = useRef(null);
  const [expensesTable, setExpensesTable] = useState({})



  useEffect(() => {
    // Filtrar las expenses por el UID del usuario
    const userExpenses = expenses.filter(expense => expense.uid === userInfo.uid);

    // Calcular las sumas de installment_amount por categoría
    const categorySums = {};


    userExpenses.forEach(expense => {
      const category = expense.category;
      const amount = parseFloat(expense.amount);
      categorySums[category] = (categorySums[category] || 0) + amount;

    });

  // Step 1: Extract and Pair Data
  const pairedData = Object.keys(categorySums).map(label => ({
    label,
    sum: categorySums[label],
  }));

  // Step 2: Sort the Array
  pairedData.sort((a, b) => b.sum - a.sum);

    // Configurar datos para el gráfico de torta
    const data = {
      labels: pairedData.map(item => item.label),
      datasets: [{
        data: pairedData.map(item => item.sum),
        backgroundColor: pairedData.map(() => generatePastelColor()),
      }],
      total: pairedData.reduce((total, item) => total + item.sum, 0)
    };

    setExpensesTable(data)
    // Configurar opciones del gráfico
    const options = {
      responsive: true,
      maintainAspectRatio: false,
    };


    // Crear o actualizar el gráfico de torta
    if (chartInstance.current) {
      // Si el gráfico ya existe, destrúyelo antes de crear uno nuevo
      chartInstance.current.destroy();
    }


    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: options,
    });
  }, [expenses]);


  

  return (
    <div className='content'>
          <div className="fileupload-header">
                <div className="fileupload-header-content">
                    <span className="page-title">Dashboard</span>
                    <span className="back-button">
                    <div className="icon-container">
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
                        <span className="back-text">Resumen</span>
                    </span>
                </div>
            </div>
            <span className='content-title'>Resumen de mis Finanzas</span>
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

      <div className='summary-content'>
        <div className='chart'>
          <div className="expenses-chart">
            <canvas ref={chartRef}></canvas>
          </div>
          <h2>Total:{expensesTable.total ? expensesTable.total.toLocaleString('es-CL', {
              style: 'currency',
              currency: 'CLP',
            }) : 0}
          </h2>
        </div>
        <div className='expenses-table'>
          
          {Object.keys(expensesTable).length && (
            <ExpensesSummaryTable data={expensesTable} />
          )}
        </div>
      </div>

    </div>
  );
};

export default ExpenseSummary