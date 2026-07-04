import React from 'react';

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginTop: '5px',
  borderRadius: '4px',
  border: '1px solid #cbd5e1',
  boxSizing: 'border-box'
};

export default function LeavePage({ role }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: role === 'employee' ? '1fr 1fr' : '1fr', gap: '30px' }}>
      {role === 'employee' ? (
        <>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
            <h3>Apply for Leave</h3>
            <label style={{ display: 'block', marginTop: '15px' }}>Leave Type</label>
            <select style={inputStyle}><option>Sick Leave</option><option>Paid Time Off</option><option>Casual Leave</option></select>
            <label style={{ display: 'block', marginTop: '15px' }}>Remarks</label>
            <textarea style={{ ...inputStyle, height: '80px' }} placeholder="Reason for leave request..."></textarea>
            <button style={{ marginTop: '15px', padding: '10px 20px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit Request</button>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
            <h3>My Requests status</h3>
            <div style={{ padding: '10px', borderLeft: '4px solid #f59e0b', backgroundColor: '#fef3c7', margin: '10px 0' }}><strong>July 10 - Sick Leave</strong> <br/> Status: Pending</div>
            <div style={{ padding: '10px', borderLeft: '4px solid #10b981', backgroundColor: '#d1fae5', margin: '10px 0' }}><strong>June 15 - Paid Leave</strong> <br/> Status: Approved</div>
          </div>
        </>
      ) : (
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
          <h3>Review Pending Leave Pipelines</h3>
          <div style={{ padding: '15px', border: '1px solid #e2e8f0', borderRadius: '6px', marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>Sourav Yadav</strong> - Sick Leave <br/>
              <span style={{ fontSize: '14px', color: '#64748b' }}>"Medical checkup appointment"</span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}>Approve</button>
              <button style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}>Reject</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}