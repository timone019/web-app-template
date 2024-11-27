import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import { CustomThemeProvider, useCustomTheme } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { SnackbarProvider } from './contexts/SnackbarContext';
import { ShoppingListProvider } from './contexts/ShoppingListContext';
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
import Roadmap from './pages/Roadmap';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookie from './pages/Cookie';
import Security from './pages/Security';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Careers from './pages/Careers';
import JobPosting from './pages/JobPosting';
import Features from './pages/Features';
import BudgetTracker from './pages/BudgetTracker';
import FreelancerCalculator from './pages/FreelancerCalculator';
import InvoiceGenerator from './pages/InvoiceGenerator';
import ShoppingLists from './pages/ShoppingLists';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function AppContent() {
  const { darkMode } = useCustomTheme();
  
  return (
    <MuiThemeProvider theme={getTheme(darkMode ? 'dark' : 'light')}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/ecommerce" element={<Ecommerce />} />
              <Route path="/shopping-lists" element={<ShoppingLists />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookie" element={<Cookie />} />
              <Route path="/security" element={<Security />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/careers/:slug" element={<JobPosting />} />
              <Route path="/features" element={<Features />} />
              <Route path="/budget-tracker" element={<BudgetTracker />} />
              <Route path="/freelancer-calculator" element={<FreelancerCalculator />} />
              <Route path="/invoice-generator" element={<InvoiceGenerator />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </LocalizationProvider>
    </MuiThemeProvider>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CustomThemeProvider>
          <SnackbarProvider>
            <ShoppingListProvider>
              <AppContent />
            </ShoppingListProvider>
          </SnackbarProvider>
        </CustomThemeProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
