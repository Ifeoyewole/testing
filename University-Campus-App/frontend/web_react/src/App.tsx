import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AttendancePage from './pages/AttendancePage';
import TimetablePage from './pages/TimetablePage';
import EventsPage from './pages/EventsPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import StudentLayout from './layouts/StudentLayout';
import TeacherLayout from './layouts/TeacherLayout';

// Config
import { APP_LOGO_PATH } from './config/appConfig';

function AppContent() {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    if (user?.userType === 'admin') {
      return (
        <Routes>
          <Route
            path="/admin/*"
            element={
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            }
          />
          <Route path="/*" element={<Navigate to="/admin" replace />} />
        </Routes>
      );
    }

    if (user?.userType === 'teacher') {
      return (
        <Routes>
          <Route
            path="/teacher/*"
            element={
              <TeacherLayout>
                <TeacherDashboard />
              </TeacherLayout>
            }
          />
          <Route path="/*" element={<Navigate to="/teacher" replace />} />
        </Routes>
      );
    }
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Student Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiredRole="student">
            <StudentLayout>
              <DashboardPage />
            </StudentLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/attendance"
        element={
          <ProtectedRoute requiredRole="student">
            <StudentLayout>
              <AttendancePage />
            </StudentLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/timetable"
        element={
          <ProtectedRoute requiredRole="student">
            <StudentLayout>
              <TimetablePage />
            </StudentLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/events"
        element={
          <ProtectedRoute requiredRole="student">
            <StudentLayout>
              <EventsPage />
            </StudentLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute requiredRole="student">
            <StudentLayout>
              <NotificationsPage />
            </StudentLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute requiredRole="student">
            <StudentLayout>
              <ProfilePage />
            </StudentLayout>
          </ProtectedRoute>
        }
      />

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div
          className="app-bg min-h-screen"
          style={{ ['--app-bg-image' as any]: `url(${APP_LOGO_PATH})` }}
        >
          <AppContent />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
