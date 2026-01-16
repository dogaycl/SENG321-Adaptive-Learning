import { useAuth } from '../PublicComponent/Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Hoş Geldiniz!</h1>
      <p>Şu an güvenli alandasınız.</p>
      <button onClick={handleLogout}>Çıkış Yap</button>
    </div>
  );
};

export default Dashboard;