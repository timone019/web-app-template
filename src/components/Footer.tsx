import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, ListItem } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material';

interface FooterLink {
  name: string;
  path?: string;
  href?: string;
}

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks: Record<string, FooterLink[]> = {
    product: [
      { name: 'Features', href: '#' },
      { name: 'Pricing', path: '/pricing' },
      { name: 'Resources', path: '/resources' },
      { name: 'Roadmap', path: '/roadmap' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '/contact' },
      { name: 'Blog', href: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookie' },
      { name: 'Security', path: '/security' },
    ],
  };

  const socialLinks = [
    { icon: <FacebookIcon />, href: '#', label: 'Facebook' },
    { icon: <TwitterIcon />, href: '#', label: 'Twitter' },
    { icon: <LinkedInIcon />, href: '#', label: 'LinkedIn' },
    { icon: <GitHubIcon />, href: '#', label: 'GitHub' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 6,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Product Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Product
            </Typography>
            <Box>
              {footerLinks.product.map((link) => (
                <ListItem key={link.name} sx={{ pb: 0, pt: 1 }}>
                  {link.path ? (
                    <RouterLink
                      to={link.path}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                      <Link
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          cursor: 'pointer',
                          '&:hover': {
                            color: 'primary.main',
                          },
                        }}
                      >
                        {link.name}
                      </Link>
                    </RouterLink>
                  ) : (
                    <Link
                      href={link.href}
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    >
                      {link.name}
                    </Link>
                  )}
                </ListItem>
              ))}
            </Box>
          </Grid>

          {/* Company Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Company
            </Typography>
            <Box>
              {footerLinks.company.map((link) => (
                <ListItem key={link.name} sx={{ pb: 0, pt: 1 }}>
                  {link.path ? (
                    <RouterLink
                      to={link.path}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                      <Link
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          cursor: 'pointer',
                          '&:hover': {
                            color: 'primary.main',
                          },
                        }}
                      >
                        {link.name}
                      </Link>
                    </RouterLink>
                  ) : (
                    <Link
                      href={link.href}
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    >
                      {link.name}
                    </Link>
                  )}
                </ListItem>
              ))}
            </Box>
          </Grid>

          {/* Legal Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Box>
              {footerLinks.legal.map((link) => (
                <ListItem key={link.name} sx={{ pb: 0, pt: 1 }}>
                  {link.path ? (
                    <RouterLink
                      to={link.path}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                      <Link
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          cursor: 'pointer',
                          '&:hover': {
                            color: 'primary.main',
                          },
                        }}
                      >
                        {link.name}
                      </Link>
                    </RouterLink>
                  ) : (
                    <Link
                      href={link.href}
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    >
                      {link.name}
                    </Link>
                  )}
                </ListItem>
              ))}
            </Box>
          </Grid>

          {/* Social Links and Copyright */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Connect With Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  sx={{ 
                    '&:hover': { 
                      color: 'primary.main',
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s'
                    }
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
            <Typography variant="body2" color="text.secondary">
              Subscribe to our newsletter
            </Typography>
          </Grid>

          {/* Copyright */}
          <Grid item xs={12}>
            <Box
              sx={{
                pt: 4,
                borderTop: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {currentYear} Your Company Name. All rights reserved.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Made with by Your Team
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
