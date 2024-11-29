import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  Link,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Gavel as LegalIcon,
  AccountCircle as UserIcon,
  Payment as PaymentIcon,
  Block as RestrictionsIcon,
  Copyright as IntellectualPropertyIcon,
  Security as SecurityIcon,
  Warning as DisclaimerIcon,
  Update as UpdateIcon,
  Gavel as DisputeIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

interface TermsSection {
  title: string;
  icon: React.ReactNode;
  content: string[];
}

const termsSections: TermsSection[] = [
  {
    title: 'Acceptance of Terms',
    icon: <LegalIcon />,
    content: [
      'By accessing or using our service, you agree to be bound by these Terms of Service.',
      'If you disagree with any part of the terms, you may not access the service.',
      'We reserve the right to update these terms at any time.',
      'Continued use of the service after changes constitutes acceptance of new terms.',
    ],
  },
  {
    title: 'User Accounts',
    icon: <UserIcon />,
    content: [
      'You are responsible for maintaining the confidentiality of your account credentials.',
      'You must be at least 18 years old to create an account.',
      'You are responsible for all activities that occur under your account.',
      'You must provide accurate and complete information when creating an account.',
      'We reserve the right to terminate accounts that violate our terms.',
    ],
  },
  {
    title: 'Payment Terms',
    icon: <PaymentIcon />,
    content: [
      'All payments are processed securely through our payment providers.',
      'Subscription fees are billed in advance on a recurring basis.',
      'You can cancel your subscription at any time through your account settings.',
      'Refunds are handled according to our refund policy.',
      'We reserve the right to modify pricing with notice to users.',
    ],
  },
  {
    title: 'Prohibited Activities',
    icon: <RestrictionsIcon />,
    content: [
      'Violating any applicable laws or regulations',
      'Impersonating others or providing false information',
      'Attempting to gain unauthorized access to our systems',
      'Transmitting malware or harmful code',
      'Engaging in activities that interfere with our service',
    ],
  },
  {
    title: 'Intellectual Property',
    icon: <IntellectualPropertyIcon />,
    content: [
      'All content and materials available through our service are our property.',
      'You may not use our intellectual property without permission.',
      'You retain ownership of content you upload to our service.',
      'You grant us a license to use your content for service operation.',
      'We respect intellectual property rights and expect users to do the same.',
    ],
  },
  {
    title: 'Data Security',
    icon: <SecurityIcon />,
    content: [
      'We implement reasonable security measures to protect your data.',
      'You are responsible for maintaining the security of your account credentials.',
      'We cannot guarantee absolute security of data transmission.',
      'We will notify users of any security breaches as required by law.',
    ],
  },
  {
    title: 'Disclaimers and Limitations',
    icon: <DisclaimerIcon />,
    content: [
      'Our service is provided "as is" without warranties of any kind.',
      'We are not liable for any indirect, incidental, or consequential damages.',
      'Our liability is limited to the amount paid for our service.',
      'Some jurisdictions do not allow certain limitations, so these may not apply.',
    ],
  },
  {
    title: 'Dispute Resolution',
    icon: <DisputeIcon />,
    content: [
      'Any disputes will be resolved through binding arbitration.',
      'Arbitration will be conducted in [Your Jurisdiction].',
      'You waive your right to participate in class actions.',
      'Small claims court actions are exempt from arbitration.',
    ],
  },
  {
    title: 'Changes to Terms',
    icon: <UpdateIcon />,
    content: [
      'We may modify these terms at any time.',
      'We will provide notice of significant changes.',
      'Continued use after changes constitutes acceptance.',
      'Previous versions will be archived and available upon request.',
    ],
  },
];

const Terms = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper elevation={0} sx={{ p: { xs: 2, md: 4 } }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Terms of Service
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" align="center" paragraph>
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </Typography>
          <Typography paragraph>
            Please read these Terms of Service ("Terms", "Terms of Service") carefully before using our service.
            Your access to and use of the service is conditioned on your acceptance of and compliance with these Terms.
          </Typography>
          <Typography paragraph>
            For information about how we collect and use your personal information, please review our{' '}
            <Link component={RouterLink} to="/privacy">
              Privacy Policy
            </Link>
            .
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          {termsSections.map((section, index) => (
            <Accordion
              key={index}
              defaultExpanded={index === 0}
              sx={{
                mb: 2,
                '&:before': {
                  display: 'none',
                },
                boxShadow: theme.shadows[1],
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ color: 'primary.main' }}>{section.icon}</Box>
                  <Typography variant="h6">{section.title}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {section.content.map((item, itemIndex) => (
                    <ListItem key={itemIndex} sx={{ py: 0.5 }}>
                      <ListItemText
                        primary={item}
                        sx={{
                          '& .MuiListItemText-primary': {
                            fontSize: '1rem',
                          },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <Typography paragraph>
            If you have any questions about these Terms of Service, please contact us:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Email: legal@yourcompany.com" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Address: Your Company Address" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Phone: Your Company Phone" />
            </ListItem>
          </List>
        </Box>
      </Paper>
    </Container>
  );
};

export default Terms;
