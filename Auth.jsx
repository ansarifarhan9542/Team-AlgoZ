import React, { useState } from 'react';

// STYLES OBJECT (Matching your Excalidraw design)
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f1f5f9',
  fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  padding: '20px'
};

const cardStyle = {
  width: '100%',
  maxWidth: '440px',
  backgroundColor: 'white',
  padding: '40px 30px',
  borderRadius: '16px',
  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
  border: '1px solid #e2e8f0',
  position: 'relative'
};

const logoContainerStyle = {
  backgroundColor: '#f8fafc',
  border: '2px dashed #cbd5e1',
  borderRadius: '8px',
  height: '55px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '30px',
  color: '#64748b',
  fontWeight: '600',
  fontSize: '14px',
  letterSpacing: '0.5px'
};

const labelStyle = {
  display: 'block',
  fontSize: '14px',
  fontWeight: '600',
  color: '#334155',
  marginBottom: '6px'
};

const inputContainerStyle = {
  position: 'relative',
  marginBottom: '20px'
};

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '8px',
  border: '1px solid #cbd5e1',
  fontSize: '15px',
  boxSizing: 'border-box',
  color: '#1e293b',
  outline: 'none',
  transition: 'border-color 0.2s',
};

const buttonStyle = {
  width: '100%',
  padding: '14px',
  backgroundColor: '#a78bfa', // Excalidraw Purple Style
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '16px',
  marginTop: '10px',
  transition: 'background-color 0.2s',
  letterSpacing: '0.5px'
};

const linkContainerStyle = {
  textAlign: 'center',
  marginTop: '25px',
  fontSize: '14px',
  color: '#64748b'
};

const activeLinkStyle = {
  color: '#8b5cf6',
  cursor: 'pointer',
  fontWeight: 'bold',
  textDecoration: 'underline',
  marginLeft: '5px'
};

const eyeButtonStyle = {
  position: 'absolute',
  right: '12px',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: '#64748b',
  display: 'flex',
  alignItems: 'center'
};

export default function AuthPage({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Sign Up Field States
  const [companyName, setCompanyName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Visibility States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Sign In Field States
  const [loginIdInput, setLoginIdInput] = useState('');
  const [loginPasswordInput, setLoginPasswordInput] = useState('');

  // Generated ID Modal State
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generatedId, setGeneratedId] = useState('');

  // Auto-Generation ID Formula (Matching Excalidraw requirements)
  const generateEmployeeId = (name) => {
    const parts = name.trim().split(/\s+/);
    let firstPart = "EM";
    let lastPart = "PL";

    if (parts.length >= 2) {
      firstPart = parts[0].slice(0, 2);
      lastPart = parts[parts.length - 1].slice(0, 2);
    } else if (parts.length === 1 && parts[0].length >= 4) {
      firstPart = parts[0].slice(0, 2);
      lastPart = parts[0].slice(2, 4);
    } else if (parts.length === 1) {
      firstPart = parts[0].slice(0, 2);
      lastPart = "XX";
    }

    const yearOfJoining = new Date().getFullYear(); // e.g., 2026
    const serialNumber = "01"; // Default onboarding sequence queue serial

    return `${firstPart.toUpperCase()}${lastPart.toUpperCase()}${yearOfJoining}${serialNumber}`;
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Error: Passwords do not match!");
      return;
    }

    // Compute and generate the customized ID
    const newId = generateEmployeeId(fullName);
    setGeneratedId(newId);
    setShowSuccessModal(true);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginIdInput && loginPasswordInput) {
      // Directs to admin context if "admin" is used, otherwise regular employee
      const targetRole = loginIdInput.toLowerCase().includes('admin') || loginIdInput.toLowerCase().includes('emp-') ? 'admin' : 'employee';
      onLoginSuccess(targetRole);
    } else {
      alert("Please provide both your Login ID and password.");
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    // Autofills sign-in form with the generated Login ID!
    setLoginIdInput(generatedId);
    setIsSignUp(false);
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        
        {/* LOGO BOX */}
        <div style={logoContainerStyle}>
          <span>App/Web Logo</span>
        </div>

        {/* 1. SIGN IN SCREEN */}
        {!isSignUp ? (
          <div>
            <h2 style={{ color: '#1e293b', fontSize: '24px', marginBottom: '25px', marginTop: 0, textAlign: 'center' }}>Sign In Page</h2>
            <form onSubmit={handleLoginSubmit}>
              
              <label style={labelStyle}>Login Id/Email :-</label>
              <div style={inputContainerStyle}>
                <input 
                  type="text" 
                  placeholder="Enter Login ID or Email" 
                  value={loginIdInput} 
                  onChange={(e) => setLoginIdInput(e.target.value)} 
                  style={inputStyle} 
                  required 
                />
              </div>

              <label style={labelStyle}>Password :-</label>
              <div style={inputContainerStyle}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter Password" 
                  value={loginPasswordInput} 
                  onChange={(e) => setLoginPasswordInput(e.target.value)} 
                  style={inputStyle} 
                  required 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={eyeButtonStyle}>
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  )}
                </button>
              </div>

              <button type="submit" style={buttonStyle}>SIGN IN</button>
            </form>

            <div style={linkContainerStyle}>
              Don't have an Account? 
              <span onClick={() => { setIsSignUp(true); setShowPassword(false); }} style={activeLinkStyle}>Sign Up</span>
            </div>
          </div>
        ) : (
          
          /* 2. SIGN UP SCREEN */
          <div>
            <h2 style={{ color: '#1e293b', fontSize: '24px', marginBottom: '25px', marginTop: 0, textAlign: 'center' }}>Sign Up Page</h2>
            <form onSubmit={handleRegisterSubmit}>
              
              <label style={labelStyle}>Company Name :-</label>
              <div style={{ ...inputContainerStyle, display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  placeholder="Enter Company Name" 
                  value={companyName} 
                  onChange={(e) => setCompanyName(e.target.value)} 
                  style={{ ...inputStyle, flex: 1 }} 
                  required 
                />
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px',
                  backgroundColor: '#cbd5e1',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  width: '46px',
                  boxSizing: 'border-box'
                }} title="Upload Corporate Logo">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={() => alert('Logo uploaded successfully!')} />
                </label>
              </div>

              <label style={labelStyle}>Name :-</label>
              <div style={inputContainerStyle}>
                <input 
                  type="text" 
                  placeholder="Enter First & Last Name" 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)} 
                  style={inputStyle} 
                  required 
                />
              </div>

              <label style={labelStyle}>Email :-</label>
              <div style={inputContainerStyle}>
                <input 
                  type="email" 
                  placeholder="Enter Email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  style={inputStyle} 
                  required 
                />
              </div>

              <label style={labelStyle}>Phone :-</label>
              <div style={inputContainerStyle}>
                <input 
                  type="tel" 
                  placeholder="Enter Contact Number" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  style={inputStyle} 
                  required 
                />
              </div>

              <label style={labelStyle}>Password :-</label>
              <div style={inputContainerStyle}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Create Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  style={inputStyle} 
                  required 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={eyeButtonStyle}>
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  )}
                </button>
              </div>

              <label style={labelStyle}>Confirm Password :-</label>
              <div style={inputContainerStyle}>
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="Re-enter Password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  style={inputStyle} 
                  required 
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={eyeButtonStyle}>
                  {showConfirmPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  )}
                </button>
              </div>

              <button type="submit" style={{ ...buttonStyle, backgroundColor: '#c084fc' }}>Sign Up</button>
            </form>

            <div style={linkContainerStyle}>
              Already have an account? 
              <span onClick={() => { setIsSignUp(false); setShowPassword(false); }} style={activeLinkStyle}>Sign In</span>
            </div>
          </div>
        )}
      </div>

      {/* AUTO-GENERATED SUCCESS MODAL */}
      {showSuccessModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '400px',
            textAlign: 'center',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#f3e8ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto'
            }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            
            <h3 style={{ margin: '0 0 10px 0', fontSize: '22px', color: '#1e293b' }}>Account Created!</h3>
            <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>
              Your customized company login ID has been generated successfully.
            </p>

            <div style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '15px',
              fontSize: '20px',
              fontWeight: 'bold',
              letterSpacing: '1px',
              color: '#8b5cf6',
              marginBottom: '25px'
            }}>
              {generatedId}
            </div>

            <button onClick={handleModalClose} style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#8b5cf6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '15px'
            }}>
              Proceed to Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
}