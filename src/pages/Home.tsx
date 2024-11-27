import React from 'react';
import { Container, Typography, Box, Button, Grid, Paper, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  color: 'white',
  padding: theme.spacing(15, 0),
  textAlign: 'center',
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

function Home() {
  const features = [
    {
      title: 'E-commerce Platform',
      description: 'Launch your online store with our comprehensive e-commerce solution. Manage products, orders, and customers with ease.',
      link: '/ecommerce'
    },
    {
      title: 'Budget Tracker Platform',
      description: 'Keep track of your finances with our intuitive budget tracker. Monitor income, expenses, set savings goals, and visualize your financial data.',
      link: '/budget-tracker'
    },
    {
      title: 'Feature 3',
      description: 'Description of feature 3. This is a placeholder text that showcases what this feature does.',
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
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <FeatureCard elevation={2}>
                <Typography variant="h5" component="h2" gutterBottom sx={{ minHeight: 60 }}>
                  {feature.title}
                </Typography>
                <Typography sx={{ mb: 2 }}>
                  {feature.description}
                </Typography>
                {feature.link && (
                  <Box sx={{ mt: 'auto' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      component={RouterLink}
                      to={feature.link}
                    >
                      Explore
                    </Button>
                  </Box>
                )}
              </FeatureCard>
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
