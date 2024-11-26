import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

// Layout component for pages with footer
const WithFooterLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Box sx={{ flex: 1 }}>{children}</Box>
    <Footer />
  </Box>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box component="main" sx={{ flex: 1 }}>
            <Routes>
              <Route
                path="/"
                element={
                  <WithFooterLayout>
                    <Home />
                  </WithFooterLayout>
                }
              />
              <Route
                path="/about"
                element={
                  <WithFooterLayout>
                    <About />
                  </WithFooterLayout>
                }
              />
              <Route
                path="/contact"
                element={
                  <WithFooterLayout>
                    <Contact />
                  </WithFooterLayout>
                }
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
