import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  Link,
} from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import PaidIcon from '@mui/icons-material/Paid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';

// Mock job data (in a real app, this would come from an API)
const jobData = {
  title: 'Senior Full Stack Engineer',
  department: 'Engineering',
  location: 'San Francisco, CA',
  type: 'Full-time',
  experience: '5+ years',
  salary: '$140,000 - $180,000',
  description: `
    We're looking for a Senior Full Stack Engineer to join our core engineering team. You'll work on 
    building and scaling our platform, collaborating with cross-functional teams, and mentoring junior 
    engineers.
  `,
  responsibilities: [
    'Design and implement new features across the entire stack',
    'Write clean, maintainable, and efficient code',
    'Collaborate with product managers and designers',
    'Mentor junior engineers and provide technical leadership',
    'Participate in code reviews and architectural discussions',
    'Optimize applications for maximum performance',
  ],
  requirements: [
    "Bachelor's degree in Computer Science or equivalent experience",
    "5+ years of experience with React, Node.js, and TypeScript",
    "Strong understanding of cloud services (AWS/GCP)",
    "Experience with microservices architecture",
    "Excellent problem-solving and communication skills",
    "Experience with CI/CD pipelines and DevOps practices",
  ],
  benefits: [
    'Competitive salary and equity package',
    'Health, dental, and vision insurance',
    'Unlimited PTO policy',
    'Remote work flexibility',
    '401(k) with company match',
    'Professional development budget',
    'Company-sponsored events and team building',
  ],
  teamHighlights: [
    {
      title: 'Collaborative Environment',
      description: 'Work closely with product, design, and other engineering teams.',
    },
    {
      title: 'Growth Opportunities',
      description: 'Regular mentorship and learning opportunities to advance your career.',
    },
    {
      title: 'Impact',
      description: 'Direct influence on product direction and technical decisions.',
    },
  ],
};

const JobPosting = () => {
  useParams();

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        {/* Back Button */}
        <Button
          component={RouterLink}
          to="/careers"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 4 }}
        >
          Back to Careers
        </Button>

        {/* Job Header */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h3" component="h1" gutterBottom>
              {jobData.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WorkIcon sx={{ mr: 0.5 }} />
                <Typography variant="body1">{jobData.department}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOnIcon sx={{ mr: 0.5 }} />
                <Typography variant="body1">{jobData.location}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PaidIcon sx={{ mr: 0.5 }} />
                <Typography variant="body1">{jobData.salary}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
              <Chip label={jobData.type} color="primary" />
              <Chip label={jobData.experience} />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{ mb: 2 }}
                >
                  Apply Now
                </Button>
                <Typography variant="body2" color="text.secondary" align="center">
                  or email your resume to{' '}
                  <Link href="mailto:careers@example.com">careers@example.com</Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Job Description */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>
              About the Role
            </Typography>
            <Typography paragraph>{jobData.description}</Typography>

            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Key Responsibilities
            </Typography>
            <List>
              {jobData.responsibilities.map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>

            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Requirements
            </Typography>
            <List>
              {jobData.requirements.map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <StarIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>

            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Benefits
            </Typography>
            <List>
              {jobData.benefits.map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} md={4}>
            {/* Team Highlights */}
            <Typography variant="h5" gutterBottom>
              Team Highlights
            </Typography>
            <Grid container spacing={2}>
              {jobData.teamHighlights.map((highlight, index) => (
                <Grid item xs={12} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {highlight.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {highlight.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Apply Button (Sticky) */}
            <Box
              sx={{
                position: 'sticky',
                top: '2rem',
                mt: 4,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                Apply for this Position
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default JobPosting;
