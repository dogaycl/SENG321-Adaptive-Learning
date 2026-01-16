import React, { useState } from 'react';
import { Zap, User, Lock } from 'lucide-react';
import { authService } from '../services/api'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Backend'e sor
      await authService.login(username, password);

      // 2. Başarılı olursa sayfayı yenileyerek Dashboard'a git
      // (Bu yöntem, React'in token'ı localStorage'dan okumasını garantiler)
      window.location.href = '/dashboard'; 

    } catch (err) {
      console.error("Login Hatası:", err);
      setError('Giriş başarısız! Lütfen bilgileri kontrol et.');
    }
  };

  return (
    <div style={s.container}>
      <div style={s.card}>
        <div style={s.logoContainer}>
           <Zap size={48} fill="#4f46e5" color="#4f46e5" />
        </div>
        <h2 style={s.title}>Giriş Yap</h2>
        
        {error && <p style={s.error}>{error}</p>}
        
        <form onSubmit={handleLogin}>
          <div style={s.inputWrapper}>
            <User size={18} style={s.icon} />
            <input
              type="text"
              placeholder="admin@gmail.com"
              style={s.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div style={s.inputWrapper}>
            <Lock size={18} style={s.icon} />
            <input
              type="password"
              placeholder="Şifre"
              style={s.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" style={s.button}>
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
};

// --- STİLLER (Eski güzel haline döndü) ---
const s = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f1f5f9',
    fontFamily: 'system-ui, sans-serif'
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
    width: '380px',
    textAlign: 'center'
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px'
  },
  title: {
    color: '#1e293b',
    marginBottom: '25px',
    fontSize: '24px',
    fontWeight: 'bold'
  },
  error: {
    color: '#ef4444',
    fontSize: '14px',
    marginBottom: '15px',
    backgroundColor: '#fee2e2',
    padding: '8px',
    borderRadius: '8px'
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: '15px'
  },
  icon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#94a3b8'
  },
  input: {
    width: '100%',
    padding: '12px 12px 12px 40px',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    outline: 'none',
    boxSizing: 'border-box',
    fontSize: '14px'
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
    fontSize: '16px',
    transition: 'background 0.3s'
  }
};

export default Login;