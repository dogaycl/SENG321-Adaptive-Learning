import React, { useState } from 'react';
import api from '../PublicComponent/Api/axios';
import { useAuth } from '../PublicComponent/Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      // Backend'den dönen response_model: { access_token, token_type }
      login(response.data.access_token);
      navigate('/dashboard');
    } catch (error) {
      alert("Giriş başarısız: " + (error.response?.data?.detail || "Hata oluştu"));
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required /><br/><br/>
        <input type="password" placeholder="Şifre" onChange={(e) => setPassword(e.target.value)} required /><br/><br/>
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
};

export default Login;