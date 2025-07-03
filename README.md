# Project Review Management System

## Overview
The Project Review Management System is a comprehensive full-stack web application designed to streamline the management, review, and evaluation of academic projects. Built using the MERN stack (MongoDB, Express.js, React, Node.js), the system facilitates collaboration between administrators, faculty, and students throughout the project lifecycle.

## Key Features

### Role-Based Access Control
- **Admin Portal**: Manage faculty and students, view activity logs, and oversee the entire system
- **Faculty Portal**: Different interfaces for project guides and incharges to create projects, track progress, and conduct reviews
- **Student Portal**: Submit work, view feedback, access project forums, and collaborate with team members

### Project Management
- Project creation and assignment
- Task management with deadlines
- Real-time progress tracking
- Review scheduling and feedback system
- Project archiving and history maintenance

### Communication Tools
- Built-in notification system
- Project forums for discussion
- Activity logging for transparency

### User Management
- Comprehensive profile management
- Password reset functionality
- Secure authentication system

## Technical Architecture

### Frontend
- **React**: UI library for building the user interface
- **Tailwind CSS**: For styling components
- **Redux**: State management
- **Vite**: Build tool and development server

### Backend
- **Node.js & Express**: Server-side framework
- **MongoDB**: Database for storing application data
- **JWT**: For secure authentication
- **Firebase**: For notification services

### Integrations
- File upload and management
- Real-time notifications

## Project Structure
```
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── modules/       # Module-specific components (Admin, Faculty, Student)
│   │   ├── lib/           # Utility libraries
│   │   ├── store/         # Redux store configuration
│   │   └── services/      # API service integrations
│
└── server/                # Backend Node.js/Express application
    ├── controllers/       # Request handlers
    ├── models/            # Database models
    ├── routes/            # API routes
    ├── middleware/        # Custom middleware
    └── services/          # Business logic and services
```

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/project-review-management-system.git
   cd project-review-management-system
   ```

2. Install server dependencies
   ```
   cd server
   npm install
   ```

3. Install client dependencies
   ```
   cd ../client
   npm install
   ```

4. Configure environment variables
   - Create `.env` file in the server directory with the following variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
   - Create `.env` file in the client directory:
     ```
     VITE_API_URL=http://localhost:5000/api
     ```

5. Start the development servers
   - For the backend:
     ```
     cd server
     npm run dev
     ```
   - For the frontend:
     ```
     cd client
     npm run dev
     ```

6. Access the application
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000/api`

## User Roles and Workflows

### Admin
- Manage faculty accounts
- Add/edit student accounts
- View system-wide activity logs
- Monitor project progress across departments

### Faculty
- **Guide**: Create projects, assign tasks, review submissions, provide feedback
- **Incharge**: Oversee multiple projects, manage class teams, conduct formal reviews

### Students
- View assigned projects and tasks
- Submit work for review
- Access feedback and improvement suggestions
- Participate in project forums
- Update profiles and academic information

## License
[Your chosen license]

## Contributors
[List of contributors]

## Acknowledgments
[Any acknowledgments] 