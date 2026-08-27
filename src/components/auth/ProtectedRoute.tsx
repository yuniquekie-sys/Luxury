import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, Lock, ArrowRight } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { isAuthenticated, isAdmin } = useApp();
  const location = useLocation();

  if (!isAuthenticated) {
    const targetPath = requireAdmin ? '/admin/login' : `/signin?redirect=${encodeURIComponent(location.pathname)}`;
    return <Navigate to={targetPath} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen bg-velocity-black flex items-center justify-center p-6 pt-28">
        <div className="max-w-md w-full text-center border border-rose-500/30 bg-velocity-surface p-8">
          <div className="w-14 h-14 bg-rose-500/10 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert size={24} />
          </div>
          <p className="text-rose-400 text-xs font-semibold tracking-widest uppercase mb-1">RESTRICTED ACCESS</p>
          <h1 className="font-display text-3xl text-velocity-white mb-3">ADMINISTRATOR PERMISSION REQUIRED</h1>
          <p className="text-velocity-subtle text-xs mb-6 leading-relaxed">
            Your current account does not have administrator privileges. Please sign in with an official VELOCITY admin account to access fleet management and financial control.
          </p>

          <div className="space-y-3">
            <a href="/admin/login" className="btn-primary w-full justify-center text-xs">
              Sign In as Administrator
              <ArrowRight size={14} />
            </a>
            <a href="/account" className="btn-outline w-full justify-center text-xs">
              Return to Customer Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
