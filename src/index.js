import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ExpensePage from "./components/ExpensePage"

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