import React from 'react';

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginTop: '5px',
  borderRadius: '4px',
  border: '1px solid #cbd5e1',
  boxSizing: 'border-box'
};

export default function ProfilePage({ role }) {
  const isAdmin = role === 'admin';
  return (
    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
      <h3>Personal & Job Details</h3>
      <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Full Name</label>
          <input type="text" defaultValue="Sourav Yadav" disabled={!isAdmin} style={inputStyle} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Contact Number</label>
          <input type="text" defaultValue="+91 9876543210" style={inputStyle} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email Address</label>
          <input type="email" defaultValue="sourav@example.com" disabled={!isAdmin} style={inputStyle} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Salary Structure</label>
          <input type="text" defaultValue="₹85,000 / Month" disabled style={inputStyle} />
        </div>
      </form>
    </div>
  );
}