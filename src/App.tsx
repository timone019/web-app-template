import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import { CustomThemeProvider, useCustomTheme } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { SnackbarProvider } from './contexts/SnackbarContext';
import { getTheme } from './theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Ecommerce from './pages/Ecommerce';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Pricing from './pages/Pricing';
import Resources from './pages/Resources';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CustomThemeProvider>
          <SnackbarProvider>
            <AppContent />
          </SnackbarProvider>
        </CustomThemeProvider>
      </AuthProvider>
    </Router>
  );
};

const AppContent = () => {
  const { darkMode } = useCustomTheme();
  const theme = getTheme(darkMode ? 'dark' : 'light');

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box component="main" sx={{ flex: 1 }}>
          <Routes>
            <Route
              path="/"
              element={
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                  <Box sx={{ flex: 1 }}>
                    <Home />
                  </Box>
                  <Footer />
                </Box>
              }
            />
            <Route
              path="/about"
              element={
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                  <Box sx={{ flex: 1 }}>
                    <About />
                  </Box>
                  <Footer />
                </Box>
              }
            />
            <Route
              path="/contact"
              element={
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                  <Box sx={{ flex: 1 }}>
                    <Contact />
                  </Box>
                  <Footer />
                </Box>
              }
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/ecommerce"
              element={
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                  <Box sx={{ flex: 1 }}>
                    <Ecommerce />
                  </Box>
                  <Footer />
                </Box>
              }
            />
            <Route
              path="/checkout"
              element={
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                  <Box sx={{ flex: 1 }}>
                    <Checkout />
                  </Box>
                  <Footer />
                </Box>
              }
            />
            <Route
              path="/order-confirmation"
              element={
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                  <Box sx={{ flex: 1 }}>
                    <OrderConfirmation />
                  </Box>
                  <Footer />
                </Box>
              }
            />
            <Route
              path="/pricing"
              element={
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                  <Box sx={{ flex: 1 }}>
                    <Pricing />
                  </Box>
                  <Footer />
                </Box>
              }
            />
            <Route
              path="/resources"
              element={
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                  <Box sx={{ flex: 1, mt: 8 }}>
                    <Resources />
                  </Box>
                  <Footer />
                </Box>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Box>
    </MuiThemeProvider>
  );
};

export default App;
