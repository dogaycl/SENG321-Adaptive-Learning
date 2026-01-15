# Personalized Learning Content Platform

**Course:** SENG-321 – Software Engineering  
**Project Type:** AI-Powered Personalized Learning System  
**Group Members:**
220201012 - Nisa Doğa Yücel
210204009 - Lütfiye Buse Gürdal
240201900 - Danya Özdil
240204015 - Muhammet Yasin Harmandar
220201058 - Hayrunnisa İlgün
210201020 - Fatma Nur Kodak


This project is an AI-driven personalized learning platform designed to adapt educational content based on individual learner performance, preferences, and engagement levels. The system dynamically recommends learning materials, quizzes, and revision sessions using adaptive algorithms.
----------

##  Project Overview

The goal of this project is to improve learning efficiency and engagement by:
- Adapting content difficulty to each learner
- Identifying knowledge gaps using performance data
- Supporting spaced repetition for long-term retention
- Providing role-based access for students and instructors

The system is designed following **software engineering best practices**, including UML-based design, layered architecture, and role-based authorization.

---

##  System Actors

- **Student / Learner**
  - Consumes adaptive learning content
  - Takes quizzes and receives feedback
  - Views progress and weak area reports

- **Instructor**
  - Manages educational content
  - Analyzes student performance
  - Generates and exports reports

- **Adaptive Algorithm (AI)**
  - Calculates confidence scores
  - Prioritizes weak topics
  - Maintains optimal learning difficulty

---

##  Architecture Overview

The project follows a **layered and modular architecture**, ensuring scalability and maintainability.

### Main Layers
- **Frontend:** Mobile/Web user interface
- **Backend:** Business logic and core services
- **API Layer:** Communication between frontend and backend
- **Data Layer:** Persistent storage for users, content, and progress

The architecture ensures clear separation between:
- UI
- Business Logic
- Data Access

---

##  Core Functionalities

### Student Features
- Secure registration and login
- Placement test for initial level detection
- Adaptive content recommendation
- Personalized quizzes
- Immediate explanatory feedback
- Progress dashboard
- Weak areas reporting
- Spaced repetition support

### Instructor Features
- Content upload, tagging, and management
- Student performance analysis
- Report generation and export

### AI Features
- Confidence score calculation
- Knowledge gap prioritization
- Optimal learning zone control
- Adaptive practice set generation

---

##  Adaptive Learning Logic

The adaptive system operates using:
- User accuracy and response time
- Confidence score per topic
- Optimal success range (70% – 85%)
- Spaced repetition intervals

This ensures learners are consistently challenged without frustration or overload.

---

##  Security & Access Control

- Role-based authorization (Student / Instructor)
- Secure authentication and session management
- Encrypted user and performance data
- Automatic session timeout for inactivity

---

## Team Workflow

The project is developed collaboratively using GitHub:
- Each module is developed in a separate branch
- All changes are merged via pull requests
- Commit messages follow clear and descriptive standards

---

##  Documentation

All UML diagrams, use case descriptions, sequence diagrams, class diagrams, and reports are available under the `docs/` directory.

---

##  Installation & Execution

Detailed setup and execution instructions will be provided for:
- Backend services
- Frontend application
- API configuration

---

## Future Extensions

The system architecture supports:
- Adding new learning modules
- Supporting additional user roles
- Expanding AI models and analytics
- Multi-language support

---

## 📜 License

This project is developed for academic purposes as part of the SENG-321 Software Engineering course.

