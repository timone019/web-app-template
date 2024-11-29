import React from 'react';
import { Container, Typography, Box, Grid, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';

const TeamMemberCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(3),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  marginBottom: theme.spacing(2),
}));

function About() {
  const teamMembers = [
    {
      name: 'John Doe',
      role: 'CEO & Founder',
      image: 'https://via.placeholder.com/150',
      description: 'John has over 15 years of experience in software development.',
    },
    {
      name: 'Jane Smith',
      role: 'Lead Developer',
      image: 'https://via.placeholder.com/150',
      description: 'Jane is an expert in React and modern web technologies.',
    },
    {
      name: 'Mike Johnson',
      role: 'UX Designer',
      image: 'https://via.placeholder.com/150',
      description: 'Mike creates beautiful and intuitive user experiences.',
    },
  ];

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        {/* About Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h2" component="h1" gutterBottom align="center">
            About Us
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary">
            Building the future of web applications
          </Typography>
          <Typography variant="body1" paragraph align="center" sx={{ mt: 4 }}>
            We are a passionate team of developers, designers, and innovators dedicated to creating
            exceptional web experiences. Our mission is to help businesses and individuals bring their
            ideas to life through cutting-edge technology and beautiful design.
          </Typography>
        </Box>

        {/* Mission Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" component="h2" gutterBottom align="center">
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph align="center">
            To empower creators and businesses with powerful, easy-to-use web applications that make
            a difference in people's lives. We believe in innovation, quality, and user-centered design.
          </Typography>
        </Box>

        {/* Team Section */}
        <Box>
          <Typography variant="h3" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
            Our Team
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} md={4} key={index}>
                <TeamMemberCard>
                  <StyledAvatar src={member.image} alt={member.name} />
                  <Typography variant="h5" component="h3" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    {member.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.description}
                  </Typography>
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
