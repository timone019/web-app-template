import React from 'react';
import { Container, Grid, Paper, Typography, Box, Button } from '@mui/material';
import StatCard from '../components/dashboard/StatCard';
import ActivityTimeline, { Activity } from '../components/dashboard/ActivityTimeline';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import {
  Person,
  Assignment,
  AccessTime,
  TrendingUp,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  const chartData = [
    { name: 'Completed', value: 45, color: '#4CAF50' },
    { name: 'In Progress', value: 30, color: '#2196F3' },
    { name: 'Pending', value: 15, color: '#FFC107' },
    { name: 'Delayed', value: 10, color: '#F44336' },
  ];

  const activities: Activity[] = [
    {
      id: 1,
      title: 'New Project Created',
      description: 'Team started working on Project X',
      time: '5 minutes ago',
      type: 'success',
    },
    {
      id: 2,
      title: 'Bug Fixed',
      description: 'Critical issue resolved in production',
      time: '2 hours ago',
      type: 'info',
    },
    {
      id: 3,
      title: 'Deployment Complete',
      description: 'Version 2.1.0 deployed to production',
      time: '1 day ago',
      type: 'success',
    },
    {
      id: 4,
      title: 'Server Alert',
      description: 'High memory usage detected',
      time: '2 days ago',
      type: 'warning',
    },
  ];

  const quickActions = [
    { title: 'Create New Project', description: 'Start a new project from scratch' },
    { title: 'Invite Team Member', description: 'Add new members to your team' },
    { title: 'Schedule Meeting', description: 'Set up a meeting with your team' },
    { title: 'Generate Report', description: 'Create a new performance report' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Welcome Message */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, User!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your projects today.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Row */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value="2,573"
            icon={<Person />}
            color="#2196F3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Projects"
            value="12"
            icon={<Assignment />}
            color="#4CAF50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Hours"
            value="1,234"
            icon={<AccessTime />}
            color="#FFC107"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Growth"
            value="+15%"
            icon={<TrendingUp />}
            color="#F44336"
          />
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            {quickActions.map((action, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  sx={{
                    p: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                      cursor: 'pointer',
                    },
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom>
                    {action.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, flex: 1 }}
                  >
                    {action.description}
                  </Typography>
                  <Button
                    endIcon={<ArrowForwardIcon />}
                    size="small"
                    sx={{ alignSelf: 'flex-start' }}
                  >
                    Get Started
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Chart and Timeline Row */}
        <Grid item xs={12} md={8}>
          <PerformanceChart data={chartData} />
        </Grid>
        <Grid item xs={12} md={4}>
          <ActivityTimeline activities={activities} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
