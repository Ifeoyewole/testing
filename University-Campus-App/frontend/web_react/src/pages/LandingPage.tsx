import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiBook, FiUsers, FiBarChart2, FiBell } from 'react-icons/fi';
import { APP_NAME } from '../config/appConfig';

function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: FiBook,
      title: 'Course Management',
      description: 'Access all your courses, materials, and assignments in one place',
    },
    {
      icon: FiUsers,
      title: 'Collaboration',
      description: 'Connect with peers, teachers, and collaborate on projects',
    },
    {
      icon: FiBarChart2,
      title: 'Track Progress',
      description: 'Monitor attendance, grades, and academic performance',
    },
    {
      icon: FiBell,
      title: 'Stay Updated',
      description: 'Get real-time notifications about events and deadlines',
    },
  ];

  return (
    <div className="min-h-screen text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{APP_NAME}</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 rounded-lg border border-white/30 hover:border-white/60 transition"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition font-semibold"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Connect,{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Learn
              </span>
              ,<br />
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Collaborate
              </span>
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
              Your all-in-one platform for campus life. Manage courses, track attendance, collaborate with peers, and stay connected with your university community.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition transform hover:scale-105"
            >
              Start Exploring <FiArrowRight size={20} />
            </button>
          </div>

          {/* Demo Video or Image Placeholder */}
          <div className="mb-32">
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition cursor-pointer">
                  <div className="w-0 h-0 border-l-8 border-l-white border-t-5 border-t-transparent border-b-5 border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Powerful Features</h3>
            <p className="text-gray-400 text-lg">Everything you need for academic success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-white/30 transition hover:bg-white/20 cursor-pointer transform hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <Icon size={24} />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent mb-2">
                50K+
              </p>
              <p className="text-gray-300">Active Students</p>
            </div>
            <div>
              <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent mb-2">
                200+
              </p>
              <p className="text-gray-300">Courses Available</p>
            </div>
            <div>
              <p className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-pink-300 bg-clip-text text-transparent mb-2">
                98%
              </p>
              <p className="text-gray-300">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-y border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to transform your campus experience?</h3>
          <p className="text-gray-300 mb-8">Join thousands of students and teachers already using {APP_NAME}</p>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition"
          >
            Sign In Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
          <p>&copy; 2025 {APP_NAME}. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}

export default LandingPage;
