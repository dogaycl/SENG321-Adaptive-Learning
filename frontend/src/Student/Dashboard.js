import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Award, BookOpen, Zap, TrendingUp, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// Eğer QuizGame dosyan src klasöründeyse '../QuizGame' doğrudur.
// Dosya yapına göre '../QuizGame' veya '../../QuizGame' olabilir.
import QuizGame from '../QuizGame'; 

const Dashboard = () => {
  const navigate = useNavigate();
  const [isQuizActive, setIsQuizActive] = useState(false);
  
  // Örnek veriler (Backend bağlanana kadar bunlar görünsün)
  const [data, setData] = useState({ 
    score: 70, solved: 14, difficulty: 3, 
    history: [
      { day: 'Pzt', val: 40 }, { day: 'Sal', val: 55 }, { day: 'Çar', val: 65 }, { day: 'Per', val: 65 }, { day: 'Cum', val: 70 }
    ]
  });

  const handleLogout = () => {
    // Çıkış yaparken token'ı siliyoruz
    localStorage.removeItem('token');
    localStorage.removeItem('access_token');
    window.location.href = '/login';
  };

  const handleQuizComplete = (isSuccess) => {
    setIsQuizActive(false); 
    const newScore = isSuccess ? Math.min(100, data.score + 10) : Math.max(0, data.score - 5);
    const newHistory = [...data.history, { day: 'Şimdi', val: newScore }];
    
    setData({
      ...data,
      score: newScore,
      solved: data.solved + 3,
      difficulty: isSuccess ? data.difficulty + 1 : Math.max(1, data.difficulty - 1),
      history: newHistory
    });
  };

  return (
    <div style={s.container}>
      <header style={s.header}>
        <div style={s.logo}><Zap size={28} fill="#4f46e5" /> AI-Learning Lab</div>
        <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
            <div style={s.difficultyBadge}>Seviye {data.difficulty} / 10</div>
            <button onClick={handleLogout} style={s.btnLogout}>Çıkış Yap</button>
        </div>
      </header>

      <div style={s.mainGrid}>
        <div style={s.leftCol}>
          <div style={s.statCard}>
            <div style={{ backgroundColor: '#e0e7ff', padding: '12px', borderRadius: '12px' }}><Award size={28} color="#4f46e5" /></div>
            <div><p style={s.label}>Ustalık Puanı</p><h2 style={s.val}>%{data.score}</h2></div>
          </div>
          <div style={s.statCard}>
            <div style={{ backgroundColor: '#dcfce7', padding: '12px', borderRadius: '12px' }}><TrendingUp size={28} color="#10b981" /></div>
            <div><p style={s.label}>Tamamlanan</p><h2 style={s.val}>{data.solved}</h2></div>
          </div>
        </div>

        <div style={s.chartCard}>
          <h3 style={s.cardTitle}>Performans Grafiği</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data.history}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
              <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
              <Line type="monotone" dataKey="val" stroke="#4f46e5" strokeWidth={4} dot={{ r: 6, fill: '#4f46e5' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={s.quizCard}>
        {!isQuizActive ? (
          <>
            <h3 style={s.cardTitle}><BookOpen size={22} color="#4f46e5" /> Kendini Sına</h3>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '25px' }}>
                Yapay zeka motoru seviyenize ({data.difficulty}) uygun sorular hazırladı.
            </p>
            <button onClick={() => setIsQuizActive(true)} style={s.btnPrimaryLarge}>
              <Play size={20} fill="white" /> Sınava Başla
            </button>
          </>
        ) : (
             // QuizGame bileşeni yoksa hata vermemesi için basit bir kontrol
             typeof QuizGame !== 'undefined' ? 
             <QuizGame difficulty={data.difficulty} onComplete={handleQuizComplete} /> : 
             <p>Quiz Modülü Yüklenemedi (Dosya yolu kontrol edilmeli)</p>
        )}
      </div>
    </div>
  );
}

// --- STİLLER ---
const s = {
  container: { padding: '40px', backgroundColor: '#f1f5f9', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 30px', backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', borderRadius: '20px', marginBottom: '30px', border: '1px solid #fff', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' },
  logo: { fontSize: '24px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px', color: '#1e293b' },
  mainGrid: { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '25px' },
  leftCol: { display: 'flex', flexDirection: 'column', gap: '20px' },
  statCard: { background: '#fff', padding: '24px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '20px', border: '1px solid #e2e8f0' },
  difficultyBadge: { background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', color: 'white', padding: '8px 20px', borderRadius: '12px', fontWeight: '700' },
  btnLogout: { background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '10px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' },
  chartCard: { background: '#fff', padding: '30px', borderRadius: '24px', border: '1px solid #e2e8f0' },
  quizCard: { marginTop: '30px', background: '#fff', padding: '40px', borderRadius: '24px', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  label: { margin: 0, fontSize: '14px', color: '#64748b' },
  val: { margin: 0, fontSize: '28px', color: '#1e293b', fontWeight: '800' },
  cardTitle: { marginTop: 0, marginBottom: '20px', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
  btnPrimaryLarge: { width: '250px', padding: '16px', backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: '16px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '18px', boxShadow: '0 10px 20px -5px rgba(79, 70, 229, 0.4)' },
};

export default Dashboard;