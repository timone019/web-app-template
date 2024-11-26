import React from 'react';
import { Container, Grid, Typography, Paper } from '@mui/material';
import {
  PeopleAlt as PeopleIcon,
  ShowChart as ChartIcon,
  AccessTime as TimeIcon,
  Assignment as TaskIcon,
} from '@mui/icons-material';
import StatCard from '../components/dashboard/StatCard';
import ActivityTimeline from '../components/dashboard/ActivityTimeline';

const Dashboard = () => {
  // Mock data for statistics
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      icon: <PeopleIcon />,
      color: '#1976d2',
    },
    {
      title: 'Active Projects',
      value: '42',
      icon: <TaskIcon />,
      color: '#2e7d32',
    },
    {
      title: 'Total Hours',
      value: '2,456',
      icon: <TimeIcon />,
      color: '#ed6c02',
    },
    {
      title: 'Growth',
      value: '+27%',
      icon: <ChartIcon />,
      color: '#9c27b0',
    },
  ];

  // Mock data for activities
  const activities = [
    {
      id: 1,
      title: 'New user registered',
      description: 'John Doe created a new account',
      time: '5 minutes ago',
      type: 'success' as const,
    },
    {
      id: 2,
      title: 'Project milestone reached',
      description: 'Project X completed phase 1',
      time: '2 hours ago',
      type: 'info' as const,
    },
    {
      id: 3,
      title: 'System alert',
      description: 'High CPU usage detected',
      time: '1 day ago',
      type: 'warning' as const,
    },
    {
      id: 4,
      title: 'Error reported',
      description: 'API endpoint /users/create failed',
      time: '2 days ago',
      type: 'error' as const,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 400,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Performance Overview
            </Typography>
            {/* Add your chart component here */}
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Chart placeholder - Add your preferred charting library
            </Typography>
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={4}>
          <ActivityTimeline activities={activities} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
