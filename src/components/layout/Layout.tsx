import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SearchOverlay from '../ui/SearchOverlay';
import Toast from '../ui/Toast';
import ScrollProgress from '../ui/ScrollProgress';
import ComparisonBar from '../ui/ComparisonBar';

interface LayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

export default function Layout({ children, hideFooter = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-velocity-black text-velocity-white flex flex-col font-sans relative selection:bg-velocity-gold selection:text-velocity-black">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Global Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">{children}</main>

      {/* Global Footer */}
      {!hideFooter && <Footer />}

      {/* Global Search Overlay */}
      <SearchOverlay />

      {/* Global Toast Notifications */}
      <Toast />

      {/* Global Vehicle Comparison Bar */}
      <ComparisonBar />
    </div>
  );
}
