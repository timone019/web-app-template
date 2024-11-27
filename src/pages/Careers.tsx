import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Divider,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import PaidIcon from '@mui/icons-material/Paid';

// Mock job listings data
const jobListings = [
  {
    id: 1,
    title: 'Senior Full Stack Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'Full-time',
    experience: '5+ years',
    salary: '$140,000 - $180,000',
    description: 'Join our core engineering team to build and scale our platform...',
    requirements: [
      'Experience with React, Node.js, and TypeScript',
      'Strong understanding of cloud services (AWS/GCP)',
      'Experience with microservices architecture',
    ],
    slug: 'senior-full-stack-engineer',
  },
  {
    id: 2,
    title: 'Product Manager',
    department: 'Product',
    location: 'New York, NY',
    type: 'Full-time',
    experience: '3+ years',
    salary: '$120,000 - $150,000',
    description: 'Lead product strategy and development for our platform...',
    requirements: [
      'Experience in B2B SaaS products',
      'Strong analytical and communication skills',
      'Track record of successful product launches',
    ],
    slug: 'product-manager',
  },
  {
    id: 3,
    title: 'Senior UX Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    experience: '4+ years',
    salary: '$130,000 - $160,000',
    description: 'Create beautiful and intuitive user experiences...',
    requirements: [
      'Strong portfolio of B2B/SaaS products',
      'Experience with design systems',
      'Proficiency in Figma and prototyping tools',
    ],
    slug: 'senior-ux-designer',
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Seattle, WA',
    type: 'Full-time',
    experience: '3+ years',
    salary: '$130,000 - $170,000',
    description: 'Build and maintain our cloud infrastructure...',
    requirements: [
      'Experience with Kubernetes and Docker',
      'Strong knowledge of AWS services',
      'Experience with CI/CD pipelines',
    ],
    slug: 'devops-engineer',
  },
];

const departments = ['All', 'Engineering', 'Product', 'Design', 'Marketing', 'Sales'];
const locations = ['All Locations', 'San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Remote'];

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom align="center">
            Join Our Team
          </Typography>
          <Typography variant="h5" align="center" paragraph>
            Help us build the future of software development
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 4 }}>
            Open positions across engineering, design, and product
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Search and Filters */}
        <Box sx={{ mb: 6 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Search jobs..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </Grid>
          </Grid>

          {/* Department Filter */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Department
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {departments.map((dept) => (
                <Chip
                  key={dept}
                  label={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  color={selectedDepartment === dept ? 'primary' : 'default'}
                  sx={{ m: 0.5 }}
                />
              ))}
            </Box>
          </Box>

          {/* Location Filter */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Location
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {locations.map((loc) => (
                <Chip
                  key={loc}
                  label={loc}
                  onClick={() => setSelectedLocation(loc)}
                  color={selectedLocation === loc ? 'primary' : 'default'}
                  sx={{ m: 0.5 }}
                />
              ))}
            </Box>
          </Box>
        </Box>

        {/* Job Listings */}
        <Grid container spacing={3}>
          {jobListings.map((job) => (
            <Grid item key={job.id} xs={12}>
              <Card
                sx={{
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                      <Typography variant="h5" gutterBottom>
                        {job.title}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <WorkIcon sx={{ mr: 0.5, fontSize: 20 }} />
                          <Typography variant="body2" color="text.secondary">
                            {job.department}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationOnIcon sx={{ mr: 0.5, fontSize: 20 }} />
                          <Typography variant="body2" color="text.secondary">
                            {job.location}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <PaidIcon sx={{ mr: 0.5, fontSize: 20 }} />
                          <Typography variant="body2" color="text.secondary">
                            {job.salary}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" paragraph>
                        {job.description}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        <Chip label={job.type} size="small" />
                        <Chip label={job.experience} size="small" />
                      </Box>
                      <Button
                        component={RouterLink}
                        to={`/careers/${job.slug}`}
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        View Position
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Values Section */}
        <Box sx={{ my: 8 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Why Join Us?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Innovation First
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Work on cutting-edge technology and help shape the future of software development.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Growth & Learning
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Continuous learning opportunities and mentorship to help you grow professionally.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Work-Life Balance
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Flexible work arrangements and competitive benefits to support your wellbeing.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Careers;
