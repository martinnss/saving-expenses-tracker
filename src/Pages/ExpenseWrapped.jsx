import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import { TrendingUp, MapPin, Calendar, CreditCard, Award, ShoppingBag } from 'lucide-react';
import '../Styles/wrapped.css'

import expenses from './output.json'

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];
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
    const month = new Date(curr.date).getMonth();
    acc[month] = (acc[month] || 0) + curr.monto_cuota;
    return acc;
  }, {});

  const monthlyData = MONTHS.map((month, index) => ({
    name: month,
    amount: monthlySpending[index] || 0
  }));

  // Calculate spending patterns
  const avgSpending = totalSpent / expenses.length;
  const maxTransaction = Math.max(...expenses.map(d => d.monto_total));
  const minTransaction = Math.min(...expenses.map(d => d.monto_cuota));
  
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

  const sections = [
    {
      title: "🎉 Your 2024 Spending Summary",
      short_title: "🎉 Summary",
      content: (
        <div className="">
          <div className="text-center animate-fade-in">
            <h2 className="">
              ${animateNumber.toLocaleString()} <p style={{fontSize: '15px'}} > This year</p>
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
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#FF6B6B" strokeWidth={2} />
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
              {avgInstallment > 500 ? "💎 Luxury Lover" : "🦊 Smart Saver"}
            </div>
            <p className="personality-description">
              {avgInstallment > 500 
                ? "You appreciate the finer things in life and aren't afraid to invest in quality!"
                : "You're savvy with your money and know how to make it work for you!"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="insight-card">
              <h4 className="text-lg font-bold mb-2">Shopping Habits</h4>
              <ul className="space-y-2">
                <li>• Average spend per transaction: ${avgSpending.toFixed(0)}</li>
                <li>• Most active month: {MONTHS[Object.entries(monthlySpending).sort((a, b) => b[1] - a[1])[0][0]]}</li>
              </ul>
            </div>

            <div className="insight-card">
              <h4 className="text-lg font-bold mb-2">Fun Facts</h4>
              <ul className="space-y-2">
                <li>• You could buy {Math.floor(totalSpent / 1000)} concert tickets! 🎵</li>
                <li>• That's {Math.floor(totalSpent / 5)} coffee cups ☕</li>
                <li>• Or {Math.floor(totalSpent / 50)} fancy meals 🍽️</li>
              </ul>
            </div>
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
                    data={cityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: $${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {cityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="seller-stats">
              <h3 className="text-xl font-bold mb-4">Top Sellers</h3>
              {topSellers.map((seller, index) => (
                <div key={seller.name} className="seller-card">
                  <div className="seller-rank">{index + 1}</div>
                  <div className="seller-info">
                    <h4 className="font-bold">{seller.name}</h4>
                    <p className="text-sm text-gray-600">
                      ${seller.total.toLocaleString()} in {seller.transactions} sales
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
        background: 'linear-gradient(135deg, #000f80, #42719f)', 
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight:'bolder',
      }}>
        Your 2024 Expenses Wrapped! 
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
      <p>💫 Made with love by <a href="https://www.linkedin.com/in/martin-olivares-tapia/">Martin Olivares</a> </p>
    </div>

  </div>
);
};

export default ExpenseWrapped;