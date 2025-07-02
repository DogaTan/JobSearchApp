import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import CompanyLogin from './pages/CompanyLogin';
import AdminLogin from './pages/AdminLogin';
import Register from './pages/Register';
import CompanyRegister from "./pages/CompanyRegister";
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import JobDetail from './pages/JobDetail';
import MyApplications from './pages/MyApplications';
import JobAlert from './pages/JobAlert';
import CompanyDashboard from "./pages/CompanyDashboard";
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/job-alert" element={<JobAlert />} />

        {/* Admin routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        
        {/* Company routes */}
        <Route path="/Company-login" element={<CompanyLogin />} />
        <Route path="/Company-register" element={<CompanyRegister />} />
        <Route path="/Company-dashboard" element={<CompanyDashboard />} />
        
        {/* Fallback route for 404 */}
      </Routes>
    </Router>
  );
}

export default App;
