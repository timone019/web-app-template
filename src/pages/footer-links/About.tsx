import React from 'react';
import { Container, Typography, Box, Grid, Avatar, Paper, Divider, IconButton, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Code as CodeIcon,
  Brush as BrushIcon,
  Speed as SpeedIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  GitHub as GitHubIcon
} from '@mui/icons-material';

const TeamMemberCard = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(4),
  height: '100%',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  marginBottom: theme.spacing(2),
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  backgroundColor: theme.palette.background.default,
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(0.5),
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

function About() {
  const features = [
    {
      icon: <CodeIcon fontSize="large" color="primary" />,
      title: 'Modern Technology',
      description: 'Built with the latest web technologies including React, TypeScript, and Material UI.',
    },
    {
      icon: <BrushIcon fontSize="large" color="primary" />,
      title: 'Beautiful Design',
      description: 'Carefully crafted UI components with attention to detail and user experience.',
    },
    {
      icon: <SpeedIcon fontSize="large" color="primary" />,
      title: 'High Performance',
      description: 'Optimized for speed and efficiency to provide the best user experience.',
    },
  ];

  const teamMembers = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      description: 'Former tech lead at Google with over 12 years of experience in building scalable applications.',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        github: 'https://github.com',
      },
    },
    {
      name: 'David Park',
      role: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      description: 'Full-stack developer with expertise in React, Node.js, and cloud architecture.',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        github: 'https://github.com',
      },
    },
    {
      name: 'Emily Rodriguez',
      role: 'UX Designer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      description: 'Award-winning designer focused on creating intuitive and accessible user experiences.',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        github: 'https://github.com',
      },
    },
  ];

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ mb: 10, textAlign: 'center' }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Innovating the Future of Web
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom color="text.secondary" sx={{ mb: 4 }}>
            We're passionate about creating exceptional digital experiences
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: '800px', mx: 'auto' }}>
            Our team of experts combines creativity and technical excellence to deliver cutting-edge web solutions
            that help businesses thrive in the digital age.
          </Typography>
        </Box>

        {/* Features Section */}
        <Box sx={{ mb: 10 }}>
          <Typography variant="h3" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
            What Sets Us Apart
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <FeatureCard elevation={0}>
                  {feature.icon}
                  <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ mb: 10 }} />

        {/* Team Section */}
        <Box>
          <Typography variant="h3" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
            Meet Our Team
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} md={4} key={index}>
                <TeamMemberCard elevation={2}>
                  <StyledAvatar src={member.image} alt={member.name} />
                  <Typography variant="h5" component="h3" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    {member.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {member.description}
                  </Typography>
                  <Box>
                    <Link href={member.social.linkedin} target="_blank" rel="noopener">
                      <SocialButton size="small">
                        <LinkedInIcon />
                      </SocialButton>
                    </Link>
                    <Link href={member.social.twitter} target="_blank" rel="noopener">
                      <SocialButton size="small">
                        <TwitterIcon />
                      </SocialButton>
                    </Link>
                    <Link href={member.social.github} target="_blank" rel="noopener">
                      <SocialButton size="small">
                        <GitHubIcon />
                      </SocialButton>
                    </Link>
                  </Box>
                </TeamMemberCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default About;
