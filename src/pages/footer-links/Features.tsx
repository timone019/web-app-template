import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const featuresData = [
  {
    title: 'Intuitive Dashboard',
    description: 'Easily navigate and manage your projects with our user-friendly dashboard.',
    image: 'https://source.unsplash.com/random/800x600?dashboard',
    points: [
      'Customizable widgets',
      'Real-time data updates',
      'User-friendly interface',
    ],
  },
  {
    title: 'Advanced Analytics',
    description: 'Gain insights with powerful analytics tools that drive decision-making.',
    image: 'https://source.unsplash.com/random/800x600?analytics',
    points: [
      'Detailed reports',
      'Predictive analytics',
      'Customizable dashboards',
    ],
  },
  {
    title: 'Collaboration Tools',
    description: 'Enhance team productivity with seamless collaboration features.',
    image: 'https://source.unsplash.com/random/800x600?collaboration',
    points: [
      'Real-time messaging',
      'File sharing',
      'Task management',
    ],
  },
  {
    title: 'Security and Compliance',
    description: 'Protect your data with industry-leading security and compliance measures.',
    image: 'https://source.unsplash.com/random/800x600?security',
    points: [
      'Data encryption',
      'Access controls',
      'Compliance certifications',
    ],
  },
];

const Features = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Key Features
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center" paragraph>
          Discover the powerful features that make our platform stand out
        </Typography>

        <Grid container spacing={4}>
          {featuresData.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={feature.image}
                  alt={feature.title}
                />
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {feature.description}
                  </Typography>
                  <List>
                    {feature.points.map((point, idx) => (
                      <ListItem key={idx} disableGutters>
                        <ListItemIcon>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={point} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Features;
