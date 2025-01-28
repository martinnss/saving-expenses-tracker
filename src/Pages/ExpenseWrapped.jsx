import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import { TrendingUp, MapPin, Calendar, CreditCard, Award, ShoppingBag } from 'lucide-react';
import '../Styles/wrapped.css'

import expesesPreProcess from './expenses_all_2025-01.json'
//const anonymizer = Math.random() * (1.5 - 0.75) + 0.75;
const anonymizer = 1
// Apply the anonymizer to the monto_total and monto_cuota properties
const expenses = expesesPreProcess.map(expense => {
  return {
    ...expense,
    monto_total: expense.monto_total * anonymizer,
    monto_cuota: expense.monto_cuota * anonymizer
  };
});
const COLORS = ['#eb83e4', '#4bd6cc', '#36b5d2', '#70d6a6', '#ccb456','#be5c49'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const ExpenseWrapped = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [animateNumber, setAnimateNumber] = useState(0);

  const totalSpent = expenses.reduce((acc, curr) => acc + curr.monto_cuota, 0);
  const avgInstallment = expenses.reduce((acc, curr) => acc + curr.monto_cuota, 0) / expenses.length;
  

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimateNumber(prev => {
        if (prev < totalSpent) {
          return Math.min(prev + totalSpent / 50, totalSpent);
        }
        return totalSpent;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [totalSpent]);



  // Calculate monthly spending
  const monthlySpending = expenses.reduce((acc, curr) => {
    const [yearAbbr, actualMonth] = curr.month.split("-").map(Number); 
    const year = 2000 + yearAbbr;

    const month = new Date(year, actualMonth - 1).getMonth();
    acc[month] = (acc[month] || 0) + curr.monto_cuota;
    return acc;
  }, {});

  const monthlyData = MONTHS.map((month, index) => ({
    name: month,
    amount: monthlySpending[index] || 0
  }));

  const formatYAxis = (tick) => {
    if (tick >= 1000000) {
      return `${(tick / 1000000).toFixed(1)}M`;
    } else if  (tick >= 100000){
      return `${(tick / 1000).toFixed(0)}K`;
    }
    return tick;
  };
  
  // Calculate spending patterns
  const avgSpending = totalSpent / expenses.length;
  const maxTransaction = Math.max(...expenses.map(d => d.monto_total)).toLocaleString('es-CL',{maximumFractionDigits: 0});

  
  
  // Calculate seller performance
  const sellerStats = expenses.reduce((acc, curr) => {
    if (!acc[curr.seller]) {
      acc[curr.seller] = { total: 0, transactions: 0 };
    }
    acc[curr.seller].total += curr.monto_cuota;
    acc[curr.seller].transactions += 1;
    return acc;
  }, {});
  

  const topSellers = Object.entries(sellerStats)
    .map(([name, stats]) => ({
      name,
      total: stats.total,
      transactions: stats.transactions,
      avgPerSale: stats.total / stats.transactions
    }))
    .sort((a, b) => b.total - a.total);
  
  const cityData = Object.entries(
    expenses.reduce((acc, curr) => {
      acc[curr.city] = (acc[curr.city] || 0) + curr.monto_cuota;
      return acc;
    }, {})
  ).map(([city, total]) => ({ name: city, value: total }));

  const formatValue = (value) => `${(value / 1_000_000).toFixed(1)}M`;

  const top5WithOthers = (data) => {
    const sortedData = [...data].sort((a, b) => b.value - a.value);
    const top5 = sortedData.slice(0, 5);
    const othersValue = sortedData.slice(5).reduce((acc, item) => acc + item.value, 0);
  
    if (othersValue > 0) {
      top5.push({ name: "Others", value: othersValue });
    }
  
    return top5;
  };
  
  const formattedCityData = top5WithOthers(cityData);

  const categoryData = Object.entries(
    expenses.reduce((acc, curr) => {
      if (!acc[curr.Category]) {
        acc[curr.Category] = { total: 0, count: 0 }; // Initialize total and count
      }
      acc[curr.Category].total += curr.monto_cuota;
      acc[curr.Category].count += 1; // Increment count for each occurrence
      return acc;
    }, {})
  ).map(([Category, { total, count }]) => ({ name: Category, value: total, count }));

  const sections = [
    {
      title: "🎉 Your 2024 Spending Summary",
      short_title: "🎉 Summary",
      content: (
        <div className="">
          <div className="text-center animate-fade-in">
            <h2 className="">
              ${animateNumber.toLocaleString('es-CL',{maximumFractionDigits: 0})} <p style={{fontSize: '15px'}} > This year</p>
            </h2>
            <p className="">Total Spent in 2024</p>
          </div>
          
          <div className="main-cards">
            <div className="stat-card">
              <TrendingUp size={24} />
              <p className="stat-title">Biggest Purchase</p>
              <p className="stat-value">${maxTransaction.toLocaleString('es-CL')}</p>
            </div>
            <div className="stat-card">
              <CreditCard size={24} />
              <p className="stat-title">Average Payment</p>
              <p className="stat-value">${avgInstallment.toLocaleString('es-CL',{maximumFractionDigits: 0})}</p>
            </div>
            <div className="stat-card">
              <ShoppingBag size={24} />
              <p className="stat-title">Total Purchases</p>
              <p className="stat-value">{expenses.length}</p>
            </div>
          </div>

          <div className="chart-container">
            <h3 className="text-xl font-bold mb-4">Monthly Spending Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={formatYAxis} />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke=" rgb(0, 2, 110)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )
    },
    {
      title: "🌟 Your Shopping Personality",
      short_title: "🌟 Personality Test",
      content: (
        <div className="space-y-6">
          <div className="personality-card">
            <h3 className="text-2xl font-bold mb-4">You're a...</h3>
            <div className="personality-badge">
              {avgInstallment > 500 ? "🛫 Travel Lover" : "🦊 Smart Saver"}
            </div>
            <p className="personality-description">
              {avgInstallment > 500 
                ? "You’ve got a passport full of stamps🛂 Who needs savings when you can have memories?!"
                : "You're savvy with your money and know how to make it work for you!"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="insight-card">
              <h4 className="text-lg font-bold mb-2">Shopping Habits</h4>
              <ul className="space-y-2">
                <li>Most active month: {MONTHS[Object.entries(monthlySpending).sort((a, b) => b[1] - a[1])[0][0]]} - ${Object.entries(monthlySpending).sort((a, b) => b[1] - a[1])[0][1].toLocaleString('es-CL',{maximumFractionDigits: 0})}</li>
                <li>Least active month: {MONTHS[Object.entries(monthlySpending).sort((a, b) => a[1] - b[1])[0][0]]} - ${Object.entries(monthlySpending).sort((a, b) => a[1] - b[1])[0][1].toLocaleString('es-CL',{maximumFractionDigits: 0})}</li>
              </ul>
            </div>

            <div className="insight-card">
              <h4 className="text-lg font-bold mb-2">Fun Facts</h4>
              <ul className="space-y-2">
                <li>You could buy {((totalSpent/114000000000)*100).toFixed(3)}% of a Airbus a321🛫</li>
                <li>That's {Math.floor(totalSpent / 10000)} pasteles de choclo🌽 </li>
                <li>Or {Math.floor(totalSpent / 6000)} piscolas 🥂</li>
              </ul>
            </div>
          </div>
          <div className="seller-stats">
            <h3>Top 5 Categories</h3>
            {categoryData
              .sort((a, b) => b.value - a.value)  
              .slice(0, 5)  
              .map((category, index) => (
                <div key={category.name} className="seller-card">
                  <div className="seller-rank">{index + 1}</div>
                  <div className="seller-info">
                    <h4 className="font-bold">{category.name}</h4>
                    <p className="text-sm text-gray-600">
                      ${category.value.toLocaleString('es-CL',{maximumFractionDigits: 0})} in {category.count} sales
                    </p>
                    <div className="seller-progress" style={{ width: `${(category.value / categoryData[0].value) * 100}%` }} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      )
    },
    {
      title: "🏆 Top Sellers & Cities",
      short_title: "🏆The Top",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="chart-container">
              <h3 className="text-xl font-bold mb-4">Spending by City</h3>
              <ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={formattedCityData}
      cx="50%"
      cy="50%"
      label={({ name }) => `${name}`}
      labelLine={false}
      outerRadius={40}
      innerRadius={30}
      fill="#8884d8"
      dataKey="value"
      labelStyle={{ fontSize: '8px' }}  
    >
      {formattedCityData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip formatter={(value) => formatValue(value)} />
  </PieChart>
</ResponsiveContainer>
            </div>

            <div className="seller-stats">
              <h3 className="text-xl font-bold mb-4">Top Sellers</h3>
              {topSellers.sort((a, b) => b.value - a.value)  
                          .slice(0, 5)
                          .map((seller, index) => (
                          <div key={seller.name} className="seller-card">
                            <div className="seller-rank">{index + 1}</div>
                            <div className="seller-info">
                              <h4 className="font-bold">{seller.name}</h4>
                              <p className="text-sm text-gray-600">
                                ${seller.total.toLocaleString('es-CL',{maximumFractionDigits: 0})} in {seller.transactions} sales
                              </p>
                              <div className="seller-progress" style={{ width: `${(seller.total / topSellers[0].total) * 100}%` }} />
                            </div>
                          </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="wrapped-container">      
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-2" style={{ 
        background: 'linear-gradient(135deg, #000f80,  rgb(21, 188, 9))', 
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight:'1000',
        fontSize:'2.75rem'
      }}>
        2024 Expenses Wrapped! 
      </h1>
      <p className="">Let's dive into your spending adventure!</p>
    </div>

    <div className="navigation">
      {sections.map((section, index) => (
        <button
          key={index}
          onClick={() => setActiveSection(index)}
          className={`button_wrapped ${activeSection === index ? 'active' : ''}`}
        >
          {section.short_title}
        </button>
      ))}
    </div>

    <div className="content-section animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {sections[activeSection].title}
      </h2>
      {sections[activeSection].content}
    </div>

    <div className="">
      <p>💫 Made with 💙 by <a href="https://www.linkedin.com/in/martin-olivares-tapia/">Martin Olivares</a> </p>
    </div>

  </div>
);
};

export default ExpenseWrapped;