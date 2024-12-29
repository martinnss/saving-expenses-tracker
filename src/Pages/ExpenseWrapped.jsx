import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import { TrendingUp, MapPin, Calendar, CreditCard, Award, ShoppingBag } from 'lucide-react';

// Sample data - replace with actual data
const data = [
  { city: "New York", date: "2024-01-15", monto_total: 1500, n_cuotas: 3, seller: "John", monto_cuota: 500 },
  { city: "Miami", date: "2024-02-20", monto_total: 2000, n_cuotas: 4, seller: "Alice", monto_cuota: 500 },
  { city: "Chicago", date: "2024-03-10", monto_total: 800, n_cuotas: 2, seller: "Bob", monto_cuota: 400 },
  { city: "Los Angeles", date: "2024-04-05", monto_total: 3000, n_cuotas: 6, seller: "John", monto_cuota: 500 },
  { city: "Miami", date: "2024-05-12", monto_total: 1200, n_cuotas: 3, seller: "Alice", monto_cuota: 400 },
  { city: "Chicago", date: "2024-06-18", monto_total: 2500, n_cuotas: 5, seller: "Bob", monto_cuota: 500 },
  { city: "New York", date: "2024-07-22", monto_total: 1800, n_cuotas: 3, seller: "John", monto_cuota: 600 },
  { city: "Los Angeles", date: "2024-08-30", monto_total: 900, n_cuotas: 2, seller: "Alice", monto_cuota: 450 }
];

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const ExpenseWrapped = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [animateNumber, setAnimateNumber] = useState(0);
  
  const totalSpent = data.reduce((acc, curr) => acc + curr.monto_total, 0);
  const avgInstallment = data.reduce((acc, curr) => acc + curr.monto_cuota, 0) / data.length;
  
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimateNumber(prev => {
        if (prev < totalSpent) {
          return Math.min(prev + totalSpent / 50, totalSpent);
        }
        return totalSpent;
      });
    }, 20);
    return () => clearInterval(timer);
  }, [totalSpent]);

  // Calculate monthly spending
  const monthlySpending = data.reduce((acc, curr) => {
    const month = new Date(curr.date).getMonth();
    acc[month] = (acc[month] || 0) + curr.monto_total;
    return acc;
  }, {});

  const monthlyData = MONTHS.map((month, index) => ({
    name: month,
    amount: monthlySpending[index] || 0
  }));

  // Calculate spending patterns
  const avgSpending = totalSpent / data.length;
  const maxTransaction = Math.max(...data.map(d => d.monto_total));
  const minTransaction = Math.min(...data.map(d => d.monto_total));
  
  // Calculate seller performance
  const sellerStats = data.reduce((acc, curr) => {
    if (!acc[curr.seller]) {
      acc[curr.seller] = { total: 0, transactions: 0 };
    }
    acc[curr.seller].total += curr.monto_total;
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
    data.reduce((acc, curr) => {
      acc[curr.city] = (acc[curr.city] || 0) + curr.monto_total;
      return acc;
    }, {})
  ).map(([city, total]) => ({ name: city, value: total }));

  const sections = [
    {
      title: "🎉 Your 2024 Spending Symphony",
      content: (
        <div className="space-y-6">
          <div className="text-center animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">
              ${animateNumber.toLocaleString()}
            </h2>
            <p className="text-xl text-gray-600">Total Spent in 2024</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="stat-card">
              <TrendingUp size={24} />
              <p className="stat-title">Biggest Splurge</p>
              <p className="stat-value">${maxTransaction}</p>
            </div>
            <div className="stat-card">
              <CreditCard size={24} />
              <p className="stat-title">Average Payment</p>
              <p className="stat-value">${avgInstallment.toFixed(0)}</p>
            </div>
            <div className="stat-card">
              <ShoppingBag size={24} />
              <p className="stat-title">Total Purchases</p>
              <p className="stat-value">{data.length}</p>
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
                <li>• Preferred installment count: {Math.round(data.reduce((acc, curr) => acc + curr.n_cuotas, 0) / data.length)}</li>
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
      <style jsx>{`
        .wrapped-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        .navigation {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin: 2rem 0;
        }
        .nav-button {
          padding: 0.5rem 1.5rem;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .nav-button.active {
          background: linear-gradient(135deg, #FF6B6B, #45B7D1);
          color: white;
        }
        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 1rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        .stat-title {
          color: #666;
          font-size: 0.9rem;
        }
        .stat-value {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
        }
        .chart-container {
          background: white;
          padding: 1.5rem;
          border-radius: 1rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .personality-card {
          background: linear-gradient(135deg, #FF6B6B22, #45B7D122);
          padding: 2rem;
          border-radius: 1rem;
          text-align: center;
        }
        .personality-badge {
          font-size: 2rem;
          margin: 1rem 0;
          padding: 1rem;
          background: white;
          border-radius: 0.5rem;
          display: inline-block;
        }
        .personality-description {
          color: #666;
          font-size: 1.1rem;
        }
        .insight-card {
          background: white;
          padding: 1.5rem;
          border-radius: 1rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .seller-card {
          background: white;
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
          position: relative;
          overflow: hidden;
        }
        .seller-rank {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          width: 1.5rem;
          height: 1.5rem;
          background: #45B7D1;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: bold;
        }
        .seller-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 4px;
          background: linear-gradient(to right, #FF6B6B, #45B7D1);
          transition: width 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>

      
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-2" style={{ 
        background: 'linear-gradient(135deg, #FF6B6B, #45B7D1)', 
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Your 2024 Expenses Wrapped! ✨
      </h1>
      <p className="text-gray-600 mb-8">Let's dive into your spending adventure!</p>
    </div>

    <div className="navigation">
      {sections.map((section, index) => (
        <button
          key={index}
          onClick={() => setActiveSection(index)}
          className={`nav-button ${activeSection === index ? 'active' : ''}`}
        >
          {section.title.split(' ')[0]}
        </button>
      ))}
    </div>

    <div className="content-section animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {sections[activeSection].title}
      </h2>
      {sections[activeSection].content}
    </div>

    <div className="mt-8 text-center text-gray-500 text-sm">
      <p>💫 Created with love • Share your wrapped with friends!</p>
    </div>

    <div className="fixed bottom-4 right-4">
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        ↑
      </button>
    </div>
  </div>
);
};

export default ExpenseWrapped;