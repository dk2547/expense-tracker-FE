import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dashboard</h1>
        <p>Your dashboard is currently empty. Start adding components!</p>
      </header>
    </div>
  );
}

function ExpensePage() {
  const [formData, setFormData] = useState({
    paidFor: '',
    amount: '',
    paidBy: '',
    category: '',
    transactionDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const expenseData = {
      ...formData,
      transactionDate: formData.transactionDate || new Date().toISOString(),
      date: new Date().toISOString()
    };

    try {
      const response = await fetch('http://localhost:8080/expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseData),
      });
      if (response.ok) {
        alert('Expense added successfully!');
      } else {
        alert('Failed to add expense.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="ExpensePage">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            PaidFor:
            <input type="text" name="paidFor" value={formData.paidFor} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Amount:
            <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            PaidBy:
            <select name="paidBy" value={formData.paidBy} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Sameer">Sameer</option>
              <option value="Akriti">Akriti</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Category:
            <input type="text" name="category" value={formData.category} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Transaction Date:
            <input type="date" name="transactionDate" value={formData.transactionDate} onChange={handleChange} />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function AppWithRouting() {
  return (
    <div>
      <App />
      <ExpensePage />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWithRouting />
  </React.StrictMode>
);