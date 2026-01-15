import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

const mockQuestions = [
  {
    id: 1,
    text: "React'te 'State' değiştiğinde ne olur?",
    options: ["Sayfa yenilenir", "Bileşen tekrar render edilir", "Veritabanı silinir", "Hiçbir şey olmaz"],
    correct: "Bileşen tekrar render edilir",
    explanation: "React'te state güncellendiğinde, React değişikliği algılar ve bileşeni (ve çocuklarını) yeniden render eder."
  },
  {
    id: 2,
    text: "Hangi Hook bir bileşenin yaşam döngüsünü (Lifecycle) yönetir?",
    options: ["useState", "useEffect", "useRef", "useCallback"],
    correct: "useEffect",
    explanation: "useEffect; componentDidMount, componentDidUpdate ve componentWillUnmount işlevlerini tek fonksiyonda toplar."
  },
  {
    id: 3,
    text: "JSX nedir?",
    options: ["Bir veritabanı türüdür", "JavaScript içinde HTML yazmayı sağlayan sözdizimi uzantısıdır", "Bir CSS kütüphanesidir", "Sunucu taraflı bir dildir"],
    correct: "JavaScript içinde HTML yazmayı sağlayan sözdizimi uzantısıdır",
    explanation: "JSX (JavaScript XML), React bileşenlerinde UI yapısını HTML benzeri kodlarla yazmamızı sağlar."
  }
];

const QuizGame = ({ onComplete, difficulty }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const question = mockQuestions[currentQIndex];

  const handleOptionClick = (option) => {
    if (feedback) return;
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    const isCorrect = selectedOption === question.correct;
    setFeedback(isCorrect ? 'correct' : 'wrong');

    setTimeout(() => {
      if (currentQIndex + 1 < mockQuestions.length) {
        setCurrentQIndex(currentQIndex + 1);
        setSelectedOption(null);
        setFeedback(null);
      } else {
        onComplete(isCorrect); 
      }
    }, 2000);
  };

  return (
    <div style={s.quizContainer}>
      <div style={s.headerBadge}>
        <HelpCircle size={18} /> Adaptive Level: {difficulty}
      </div>

      <h2 style={s.questionText}>{question.text}</h2>

      <div style={s.optionsGrid}>
        {question.options.map((opt, i) => (
          <div 
            key={i} 
            onClick={() => handleOptionClick(opt)}
            style={{
              ...s.optionCard,
              border: selectedOption === opt ? '2px solid #4f46e5' : '1px solid #e2e8f0',
              backgroundColor: 
                feedback && opt === question.correct ? '#dcfce7' : 
                feedback === 'wrong' && selectedOption === opt ? '#fee2e2' : 
                selectedOption === opt ? '#e0e7ff' : '#fff'
            }}
          >
            {opt}
            {feedback && opt === question.correct && <CheckCircle size={20} color="#10b981" />}
            {feedback === 'wrong' && selectedOption === opt && <XCircle size={20} color="#f43f5e" />}
          </div>
        ))}
      </div>

      <button 
        onClick={handleSubmit} 
        disabled={!selectedOption || feedback}
        style={{
          ...s.submitBtn,
          opacity: !selectedOption ? 0.5 : 1,
          cursor: !selectedOption ? 'not-allowed' : 'pointer'
        }}
      >
        {feedback ? (feedback === 'correct' ? 'Doğru! Sıradaki...' : 'Yanlış! Zorluk Ayarlanıyor...') : 'Cevabı Gönder'}
      </button>

      {feedback && (
        <div style={s.explanationBox}>
          <b>Açıklama:</b> {question.explanation}
        </div>
      )}
    </div>
  );
};

const s = {
  quizContainer: { textAlign: 'left', animation: 'fadeIn 0.5s' },
  headerBadge: { display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f1f5f9', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', color: '#64748b', marginBottom: '20px', fontWeight: '600' },
  questionText: { color: '#1e293b', fontSize: '22px', marginBottom: '30px', lineHeight: '1.4' },
  optionsGrid: { display: 'grid', gap: '12px' },
  optionCard: { padding: '16px', borderRadius: '12px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s', fontSize: '16px', color: '#334155', fontWeight: '500' },
  submitBtn: { marginTop: '25px', width: '100%', padding: '16px', backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: '14px', fontWeight: '700', fontSize: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' },
  explanationBox: { marginTop: '20px', padding: '15px', backgroundColor: '#f8fafc', borderRadius: '10px', fontSize: '14px', color: '#475569', borderLeft: '4px solid #4f46e5' }
};

export default QuizGame;