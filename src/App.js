import React from 'react';
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <ToastContainer position="top-right" autoClose={2000} />
        <Navbar/>
        <main className="flex-fill">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/about" element={<About />} /> */}
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
