import React, { useState, useEffect, useRef } from 'react';
import useGetExpenses from '../Hooks/useGetExpenses';
import { useGetUserInfo } from '../Hooks/useGetUserInfo';
import BasicDatePicker from './BasicDatePicker';
import Chart from 'chart.js/auto';

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
  const chartInstance = useRef(null);

  useEffect(() => {
    // Filtrar las expenses por el UID del usuario
    const userExpenses = expenses.filter(expense => expense.uid === userInfo.uid);

    // Calcular las sumas de installment_amount por categoría
    const categorySums = {};
    userExpenses.forEach(expense => {
      const category = expense.category;
      const amount = parseFloat(expense.installment_amount);
      categorySums[category] = (categorySums[category] || 0) + amount;
    });

    // Configurar datos para el gráfico de torta
    const data = {
      labels: Object.keys(categorySums),
      datasets: [{
        data: Object.values(categorySums),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          // ... Puedes agregar más colores según sea necesario
        ],
      }],
    };

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
      type: 'pie',
      data: data,
      options: options,
    });
  }, [expenses]);









  return (
    <div>
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
      <div className="expenses-chart">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default ExpenseSummary