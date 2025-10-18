import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Briefcase } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userRole, setUserRole] = useState<'student' | 'staff'>('student');
  const navigate = useNavigate();

  const handleAuthAction = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Simulating ${isLogin ? 'login' : 'registration'} for ${userRole}...`);
    navigate('/dashboard');
  };

  return (
    <div className="flex justify-center items-center py-12">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold font-heading text-center text-text-primary mb-2">
          {isLogin ? `Welcome Back` : `Create Account`}
        </h2>
        <p className="text-center text-text-secondary mb-6">
          {isLogin ? 'Sign in to continue to your dashboard' : `Get started as a ${userRole}`}
        </p>

        <div className="bg-navy p-1 rounded-xl flex justify-center gap-2 mb-8">
            <button
                onClick={() => setUserRole('student')}
                type="button"
                className={`flex items-center justify-center w-1/2 gap-2 px-4 py-2 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                userRole === 'student'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-text-secondary hover:bg-white/5'
                }`}
            >
                <User size={20} />
                Student
            </button>
            <button
                onClick={() => setUserRole('staff')}
                type="button"
                className={`flex items-center justify-center w-1/2 gap-2 px-4 py-2 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                userRole === 'staff'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-text-secondary hover:bg-white/5'
                }`}
            >
                <Briefcase size={20} />
                Staff
            </button>
        </div>

        <form className="space-y-6" onSubmit={handleAuthAction}>
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input 
                type="text" 
                placeholder="Full Name" 
                required
                className="w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white/10 border-white/20 placeholder:text-text-secondary text-text-primary"
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input 
              type="email" 
              placeholder="Email Address" 
              required
              className="w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white/10 border-white/20 placeholder:text-text-secondary text-text-primary"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input 
              type="password" 
              placeholder="Password" 
              required
              className="w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white/10 border-white/20 placeholder:text-text-secondary text-text-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 rounded-lg font-semibold hover:scale-105 transition-transform transform shadow-lg"
          >
            {isLogin ? 'Login →' : 'Register'}
          </button>
        </form>

        <p className="text-center text-sm text-text-secondary mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-accent hover:underline ml-1">
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;