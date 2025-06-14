import React from 'react';
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Event from './pages/Events';
import Club from './pages/Clubs';
import Booking from './pages/Bookings';
import MyEvent from './pages/MyEvents';
import CreateEvents from './pages/CreateEvents';
import OrganizerDashboard from './pages/OrganizerDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VenueAvailability from './pages/VenueAvailability';
import AdminDashboard from './pages/AdminDashboard';
import AdminVenueAvailability from './pages/AdminVenueAvailability';
import EventApprovals from './pages/EventApprovals';
import ManageUsers from './pages/ManageUsers';
import About from './pages/About';

function App() {
  let organizer='organizer';
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
            <Route path="/events" element={<Event />} />
            <Route path="/clubs" element={<Club />} />
            <Route path="/bookings" element={<Booking />} />
            <Route path="/organizer" element={<OrganizerDashboard />} />
            <Route path="/organizer/myevents" element={<MyEvent />} />
            <Route path="/organizer/create" element={<CreateEvents />} />
            <Route path="/organizer/venue" element={<VenueAvailability />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/venue" element={<AdminVenueAvailability />} />
            <Route path="/admin/approvals" element={<EventApprovals />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
