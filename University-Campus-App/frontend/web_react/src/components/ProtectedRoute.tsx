import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: 'student' | 'teacher' | 'admin';
};

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  const userDefaultPath =
    user?.userType === 'admin'
      ? '/admin'
      : user?.userType === 'teacher'
      ? '/teacher'
      : '/dashboard';

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (requiredRole && user?.userType !== requiredRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-6">
        <div className="max-w-lg w-full bg-white/5 border border-white/10 rounded-2xl shadow-xl p-8 text-center text-white">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-500/20 text-orange-300 flex items-center justify-center text-xl">
            !
          </div>
          <h2 className="text-2xl font-semibold mb-2">Insufficient permissions</h2>
          <p className="text-white/80 mb-6">
            This page requires <span className="font-semibold">{requiredRole}</span> access. You are signed in as
            a <span className="font-semibold">{user?.userType ?? 'guest'}</span>.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition"
            >
              Go home
            </Link>
            <Link
              to={userDefaultPath}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              My dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
