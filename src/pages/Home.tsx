import React from 'react';
import { Container, Typography, Box, Button, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import CalculateIcon from '@mui/icons-material/Calculate';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  color: 'white',
  padding: theme.spacing(15, 0),
  textAlign: 'center',
}));

function Home() {
  const features = [
    {
      title: 'E-commerce Platform',
      description: 'Launch your online store with our comprehensive e-commerce solution. Manage products, orders, and customers with ease.',
      icon: <ShoppingCartIcon sx={{ fontSize: 40 }} />,
      path: '/ecommerce',
      features: [
        'Product management',
        'Order processing',
        'Customer management',
        'Analytics dashboard'
      ]
    },
    {
      title: 'Budget Tracker Platform',
      description: 'Keep track of your finances with our intuitive budget tracker. Monitor income, expenses, set savings goals, and visualize your financial data.',
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 40 }} />,
      path: '/budget-tracker',
      features: [
        'Track income and expenses',
        'Set and monitor savings goals',
        'Visualize financial data',
        'Categorize transactions'
      ]
    },
    {
      title: 'Freelancer Rate Calculator',
      description: 'Calculate optimal hourly rates, manage client templates, and track your freelance income with our comprehensive calculator. Features include tax estimation, expense tracking, and customizable rate templates.',
      icon: <CalculateIcon sx={{ fontSize: 40 }} />,
      path: '/freelancer-calculator',
      features: [
        'Calculate hourly rates based on desired income and expenses',
        'Save and manage client-specific rate templates',
        'Track billable hours and generate invoices',
        'Estimate taxes and fees for accurate pricing'
      ]
    },
  ];

  return (
    <Box>
      <HeroSection>
        <Container>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to {process.env.REACT_APP_NAME || 'Our App'}
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Your one-stop solution for everything you need
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 4 }}
          >
            Get Started
          </Button>
        </Container>
      </HeroSection>

      <Container sx={{ mt: 8, mb: 8 }}>
        <Typography variant="h3" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
          Our Features
        </Typography>
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{ minHeight: { md: '64px' } }}
                >
                  {feature.title}
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {feature.description}
                </Typography>
                <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'center' }}>
                  <Button
                    component={RouterLink}
                    to={feature.path || '/'}
                    variant="contained"
                    color="primary"
                    sx={{ textDecoration: 'none', minWidth: '120px' }}
                  >
                    Explore
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Ready to get started?
          </Typography>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              component={RouterLink}
              to="/register"
            >
              Sign Up Now
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
