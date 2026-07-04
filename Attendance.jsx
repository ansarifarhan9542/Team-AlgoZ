import React from 'react';

export default function AttendancePage({ role, isCheckedIn, setIsCheckedIn }) {
  return (
    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
      {role === 'employee' ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <h3>Daily Punch Matrix</h3>
          <button 
            onClick={() => setIsCheckedIn(!isCheckedIn)} 
            style={{ padding: '15px 40px', fontSize: '18px', fontWeight: 'bold', borderRadius: '30px', border: 'none', color: 'white', backgroundColor: isCheckedIn ? '#ef4444' : '#10b981', cursor: 'pointer', transition: '0.2s', marginTop: '20px' }}
          >
            {isCheckedIn ? 'Check Out' : 'Check In'}
          </button>
          <p style={{ marginTop: '15px', color: '#64748b' }}>Current Status: <strong>{isCheckedIn ? 'Active Work Session' : 'Offline'}</strong></p>
        </div>
      ) : (
        <div>
          <h3>All Employee Logs</h3>
          <p style={{ color: '#64748b' }}>Admin Overlook View Mode</p>
          <div style={{ padding: '15px', backgroundColor: '#f8fafc', borderRadius: '6px', marginTop: '15px' }}>
            <strong>EMP-021:</strong> Present (Checked in 09:15 AM)
          </div>
        </div>
      )}
    </div>
  );
}