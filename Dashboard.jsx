import React from 'react';

// Help helper for styling dashboard cards
function cardStyle(bgColor) {
  return {
    backgroundColor: bgColor,
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
  };
}

export function EmployeeDashboard() {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={cardStyle('#3b82f6')}><h3>Profile Updated</h3><p>Status: Completed</p></div>
        <div style={cardStyle('#10b981')}><h3>Attendance</h3><p>This Week: 95%</p></div>
        <div style={cardStyle('#f59e0b')}><h3>Leave Requests</h3><p>1 Pending Approval</p></div>
      </div>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3>Recent Alerts & Activity</h3>
        <ul>
          <li>Your leave application for upcoming Friday is pending review.</li>
          <li>System Update: Payroll structures revised for the new cycle.</li>
        </ul>
      </div>
    </div>
  );
}

export function AdminDashboard() {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={cardStyle('#1e293b')}><h3>Total Employees</h3><p style={{fontSize:'24px', margin:0}}>48</p></div>
        <div style={cardStyle('#ef4444')}><h3>Pending Leaves</h3><p style={{fontSize:'24px', margin:0}}>5 Active</p></div>
        <div style={cardStyle('#10b981')}><h3>Today's Attendance</h3><p style={{fontSize:'24px', margin:0}}>92% Present</p></div>
      </div>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3>Master Employee List</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '10px' }}>ID</th><th>Name</th><th>Role</th><th>Department</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}><td style={{ padding: '10px' }}>EMP-021</td><td>Sourav Yadav</td><td>Frontend Engineer</td><td>Tech</td></tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}><td style={{ padding: '10px' }}>EMP-022</td><td>Ansar Farhan</td><td>Fullstack Developer</td><td>Tech</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}