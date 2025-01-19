import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ExpensePage from "./components/ExpensePage"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";
import Report from "./components/Report";

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<><NavBar/><ExpensePage/></>
    },
    {
      path:"/dashboard",
      element:<><NavBar/><Dashboard/></>
    },
    {
      path:"/report",
      element:<><NavBar/><Report/></>
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
      {/* <header className="App-header">
        <h1>Dashboard</h1>
        <p>Your dashboard is currently empty. Start adding components!</p>
        
      </header> */}
     
    </div>
  );
}



function AppWithRouting() {
  return (
    <div>
      <App />
      
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);