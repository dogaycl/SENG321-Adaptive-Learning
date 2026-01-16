# 🎓 SENG321 - AI Powered Adaptive Learning System

An intelligent education platform designed to personalize the learning experience based on student performance. This project utilizes a specialized recommendation algorithm to analyze student progress and suggest appropriate content or difficulty adjustments.

---

## 🚀 Key Features

### 🔐 1. Authentication & Security (RBAC)
- **JWT-Based Auth:** Secure login and registration for all users.
- **Role-Based Access Control:**
  - **Admin/Teacher:** Can create, update, and delete lessons, topics, and questions.
  - **Student:** Can access assigned content, solve quizzes, and view personal analytics.

### 📚 2. Content & Lesson Management (CRUD)
- Complete management system for educational content.
- Automatic validation for question creation (True/False & Multiple Choice support).

### 🤖 3. AI-Driven Recommendation Engine
- **Adaptive Learning:** The system analyzes the student's quiz history.
- **Dynamic Suggestions:** Based on success rates, the system suggests:
  - *"Increase Difficulty"* for high performers.
  - *"Review Topic X"* for students struggling with specific concepts.

### 📊 4. Analytics & Reporting
- Real-time tracking of solved questions.
- Detailed performance breakdown per lesson and topic.
- Visual progress summaries for students.

---

## 🛠️ Technology Stack

### Backend
- **Framework:** Python FastAPI (High performance, async support)
- **Database:** MySQL (Structured data storage)
- **Security:** JWT (JSON Web Tokens) for stateless authentication
- **Documentation:** Swagger UI / OpenAPI

### Frontend
- **Framework:** React.js
- **Styling:** CSS / TailwindCSS
- **State Management:** React Hooks
- **HTTP Client:** Axios (Interceptors used for token handling)

---

## ⚙️ Installation & Setup

To run this project locally, you need to set up both the backend and frontend services.

### 1️⃣ Backend Setup
Navigate to the backend directory:
```bash
cd backend