import React, { useContext }               from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext }       from './AuthContext';

import NavBar                               from './components/NavBar';

import Login                                from './pages/Login';
import SignUp                               from './pages/SignUp';
import Home                                 from './pages/Home';
import Quiz                                 from './pages/Quiz';
import Rules                                from './pages/Rules';
import Leaderboard                          from './pages/Leaderboard';
import Profile                              from './pages/Profile';
import GameOver                             from './pages/GameOver';

/** Protect routes—redirect to /login if no user */
function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* NavBar only when logged in */}
        {user && <NavBar />}

        {/* Main content area */}
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            {/* Public */}
            <Route path="/login"  element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/quiz"
              element={
                <PrivateRoute>
                  <Quiz />
                </PrivateRoute>
              }
            />
            <Route
              path="/rules"
              element={
                <PrivateRoute>
                  <Rules />
                </PrivateRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <PrivateRoute>
                  <Leaderboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/gameover"
              element={
                <PrivateRoute>
                  <GameOver />
                </PrivateRoute>
              }
            />

            {/* Fallback */}
            <Route
              path="*"
              element={
                user
                  ? <Navigate to="/" replace />
                  : <Navigate to="/login" replace />
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default function WrappedApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}