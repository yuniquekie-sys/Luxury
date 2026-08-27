import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import FleetPage from './pages/FleetPage';
import VehicleDetailPage from './pages/VehicleDetailPage';
import BookingPage from './pages/BookingPage';
import AccountPage from './pages/AccountPage';
import AdminPage from './pages/AdminPage';
import CustomerSignInPage from './pages/CustomerSignInPage';
import CustomerSignUpPage from './pages/CustomerSignUpPage';
import AdminLoginPage from './pages/AdminLoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          {/* Public Exhibition Routes */}
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/fleet"
            element={
              <Layout>
                <FleetPage />
              </Layout>
            }
          />
          <Route
            path="/vehicle/:id"
            element={
              <Layout>
                <VehicleDetailPage />
              </Layout>
            }
          />

          {/* Authentication Routes */}
          <Route
            path="/signin"
            element={
              <Layout hideFooter>
                <CustomerSignInPage />
              </Layout>
            }
          />
          <Route
            path="/signup"
            element={
              <Layout hideFooter>
                <CustomerSignUpPage />
              </Layout>
            }
          />
          <Route
            path="/admin/login"
            element={
              <Layout hideFooter>
                <AdminLoginPage />
              </Layout>
            }
          />

          {/* Protected Customer Routes */}
          <Route
            path="/booking/:vehicleId"
            element={
              <ProtectedRoute>
                <Layout>
                  <BookingPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Layout>
                  <AccountPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Protected Admin Routes (Requires Admin Role) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <Layout hideFooter>
                  <AdminPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* 404 Not Found */}
          <Route
            path="*"
            element={
              <Layout>
                <div className="min-h-screen flex items-center justify-center text-center pt-20">
                  <div>
                    <p className="section-label mb-4">404 — Page Not Found</p>
                    <h1 className="font-display text-[8rem] text-velocity-white leading-none mb-4">404</h1>
                    <p className="text-velocity-subtle mb-8">The machine or page you requested could not be located.</p>
                    <a href="/" className="btn-primary">Return to Showroom</a>
                  </div>
                </div>
              </Layout>
            }
          />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
