import axios from 'axios';

// Backend adresi (Swagger fotonda gördüğümüz adres)
const API_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- GÜVENLİK KONTROLÜ (Token) ---
// Her istekte "Cebimde giriş anahtarı (token) var mı?" diye bakar, varsa ekler.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- SERVİSLER ---

// 1. KİMLİK DOĞRULAMA (Auth)
export const authService = {
  // Giriş Yapma (Login)
  login: async (username, password) => {
        const response = await api.post('/auth/login', {
            email: username,
            password: password
        });

        // Backend'den gelen anahtarı alıyoruz
        if (response.data.access_token) {
            // BURASI DEĞİŞTİ: Garanti olsun diye iki isimle de kaydediyoruz
            localStorage.setItem('token', response.data.access_token);        // React bunu arıyor olabilir
            localStorage.setItem('access_token', response.data.access_token); // Veya bunu
        }
        return response.data;
    },
  
  // Kayıt Olma (Register)
  register: (userData) => api.post('/auth/register', userData),
  
  // Çıkış Yapma (Logout)
  logout: () => {
    localStorage.removeItem('access_token');
    window.location.href = '/login'; 
  },
};

// 2. DERSLER (Lessons)
export const lessonService = {
  getAll: () => api.get('/lessons/'),
  create: (lessonData) => api.post('/lessons/', lessonData),
};

// 3. YAPAY ZEKA ÖNERİSİ (AI)
export const aiService = {
  getNextStep: (userId) => api.get(`/recommendation/next-step/${userId}`),
};

export default api;