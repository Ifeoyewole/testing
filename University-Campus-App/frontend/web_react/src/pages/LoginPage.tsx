import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiArrowRight, FiHash } from 'react-icons/fi';
import { useAuth, User } from '../context/AuthContext';
import { APP_NAME } from '../config/appConfig';

type UserRole = 'student' | 'teacher' | 'admin';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserRole>('student');
  const [isSignup, setIsSignup] = useState(false);
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, updateProfile } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (userType === 'student' && !studentId.trim()) {
      setError('Please enter your Matric / Student ID');
      setLoading(false);
      return;
    }
    if (userType === 'teacher' && !teacherId.trim()) {
      setError('Please enter your Staff ID / Passcode');
      setLoading(false);
      return;
    }

    try {
      let result;
      if (isSignup) {
        result = await signup(email, password, userType, fullName);
      } else {
        result = await login(email, password, userType);
      }

      if (result.success) {
        const fromLocation = (location.state as { from?: string } | null)?.from;
        const fallbackPath =
          userType === 'admin' ? '/admin' : userType === 'teacher' ? '/teacher' : '/dashboard';

        if (userType === 'student' && studentId) {
          updateProfile({ studentId } as Partial<User>);
        }
        if (userType === 'teacher' && teacherId) {
          updateProfile({ staffId: teacherId } as Partial<User>);
        }

        navigate(fromLocation || fallbackPath, { replace: true });
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">{APP_NAME}</h1>
          <p className="text-gray-300">{isSignup ? 'Create your account' : 'Welcome back'}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8 mb-6">
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-3">I am a</label>
              <div className="grid grid-cols-3 gap-3">
                {(['student', 'teacher', 'admin'] as UserRole[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setUserType(type)}
                    className={`py-2 px-4 rounded-lg font-semibold transition capitalize ${
                      userType === type
                        ? 'bg-gradient-to-r from-[#5a381e] to-[#8c5c32] text-white shadow-lg'
                        : 'bg-white/5 text-gray-200 hover:bg-white/15 border border-white/15'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {isSignup && (
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#8c5c32] focus:ring-2 focus:ring-[#8c5c32]/60 transition"
                    required={isSignup}
                  />
                </div>
              </div>
            )}

            {userType === 'student' && (
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Matric / Student ID</label>
                <div className="relative">
                  <FiHash className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="LAU/CSC/2023/001"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#8c5c32] focus:ring-2 focus:ring-[#8c5c32]/60 transition"
                  />
                </div>
              </div>
            )}

            {userType === 'teacher' && (
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Staff ID / Passcode</label>
                <div className="relative">
                  <FiHash className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={teacherId}
                    onChange={(e) => setTeacherId(e.target.value)}
                    placeholder="LAU-STAFF-204"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#8c5c32] focus:ring-2 focus:ring-[#8c5c32]/60 transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@university.edu"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#8c5c32] focus:ring-2 focus:ring-[#8c5c32]/60 transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#8c5c32] focus:ring-2 focus:ring-[#8c5c32]/60 transition"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#5a381e] to-[#8c5c32] text-white font-semibold hover:opacity-95 disabled:opacity-50 transition flex items-center justify-center gap-2 mt-6 shadow-lg"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {isSignup ? 'Creating Account...' : 'Signing In...'}
                </>
              ) : (
                <>
                  {isSignup ? 'Create Account' : 'Sign In'}
                  <FiArrowRight size={20} />
                </>
              )}
            </button>

            {!isSignup && (
              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-[#f5c542] hover:text-[#ffd76a] transition"
                >
                  Forgot password?
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="text-center text-gray-300">
          <p>
            {isSignup ? 'Already have an account? ' : "Don't have an account? "}
            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setError('');
                setFullName('');
                setEmail('');
                setPassword('');
                setStudentId('');
                setTeacherId('');
              }}
              className="text-[#f5c542] hover:text-[#ffd76a] font-semibold transition"
            >
              {isSignup ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-gray-300 text-sm transition"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
