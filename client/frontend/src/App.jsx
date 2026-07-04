import React, { useState } from 'react';
import './App.css';

// IMPORTING YOUR MODULAR PAGES
import { EmployeeDashboard, AdminDashboard } from './pages/Dashboard';
import ProfilePage from './pages/Profile';
import AttendancePage from './pages/Attendance';
import LeavePage from './pages/Leave';
import AuthPage from './pages/Auth'; // Imported your new authentication page!

function App() {
  // Authentication States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('employee'); // 'employee' or 'admin'
  
  // Navigation State
  const [currentPage, setCurrentPage] = useState('dashboard'); 
  
  // Attendance State
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  // Function called when Login/Register is successful
  const handleLoginSuccess = (userRole) => {
    setRole(userRole);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  // Function to handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsCheckedIn(false);
  };

  // GATEKEEPING: If not logged in, show the Auth Page exclusively
  if (!isLoggedIn) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="app-container" style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif', backgroundColor: '#f4f6f9' }}>
      
      {/* SIDEBAR NAVIGATION */}
      <div className="sidebar" style={{ width: '250px', backgroundColor: '#1e293b', color: 'white', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '20px', marginBottom: '30px', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>HRMS Portal</h2>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button onClick={() => setCurrentPage('dashboard')} style={navButtonStyle(currentPage === 'dashboard')}>Dashboard</button>
            <button onClick={() => setCurrentPage('profile')} style={navButtonStyle(currentPage === 'profile')}>My Profile</button>
            <button onClick={() => setCurrentPage('attendance')} style={navButtonStyle(currentPage === 'attendance')}>Attendance</button>
            <button onClick={() => setCurrentPage('leave')} style={navButtonStyle(currentPage === 'leave')}>Leave & Time-Off</button>
          </nav>
        </div>

        {/* LOGOUT BUTTON */}
        <div>
          <button 
            onClick={handleLogout} 
            style={{ width: '100%', padding: '12px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '15px' }}
          >
            Logout
          </button>

          {/* QUICK ROLE SWAPPER FOR HACKATHON JUDGES */}
          <div style={{ backgroundColor: '#334155', padding: '10px', borderRadius: '6px', textAlign: 'center' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#94a3b8' }}>Testing Role Switcher:</p>
            <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%', padding: '5px', borderRadius: '4px', cursor: 'pointer' }}>
              <option value="employee">View as Employee</option>
              <option value="admin">View as Admin / HR</option>
            </select>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="main-content" style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ margin: 0, textTransform: 'capitalize' }}>{currentPage}</h1>
          <div style={{ fontWeight: 'bold', color: '#475569' }}>
            Logged in as: <span style={{ color: '#2563eb', textTransform: 'uppercase' }}>{role}</span>
          </div>
        </header>

        {/* DYNAMIC ROUTING MAP */}
        {currentPage === 'dashboard' && (
          role === 'employee' ? <EmployeeDashboard /> : <AdminDashboard />
        )}
        {currentPage === 'profile' && <ProfilePage role={role} />}
        {currentPage === 'attendance' && <AttendancePage role={role} isCheckedIn={isCheckedIn} setIsCheckedIn={setIsCheckedIn} />}
        {currentPage === 'leave' && <LeavePage role={role} />}
      </div>
    </div>
  );
}

function navButtonStyle(isActive) {
  return {
    padding: '12px 15px',
    textAlign: 'left',
    backgroundColor: isActive ? '#2563eb' : 'transparent',
    color: isActive ? 'white' : '#cbd5e1',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: isActive ? 'bold' : 'normal',
    transition: '0.2s'
  };
}

export default App;
