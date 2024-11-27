import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
} from '@mui/material';
import {
  Security as SecurityIcon,
  ExpandMore as ExpandMoreIcon,
  DataUsage as DataIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  Share as ShareIcon,
  DeleteForever as DeleteIcon,
  Cookie as CookieIcon,
  Update as UpdateIcon,
} from '@mui/icons-material';

interface PolicySection {
  title: string;
  icon: React.ReactNode;
  content: string[];
}

const policySections: PolicySection[] = [
  {
    title: 'Information We Collect',
    icon: <DataIcon />,
    content: [
      'Personal identification information (Name, email address, phone number, etc.)',
      'Usage data (How you interact with our services)',
      'Device information (Browser type, IP address, device type, etc.)',
      'Location data (If you choose to share it)',
      'Payment information (When you make purchases)',
    ],
  },
  {
    title: 'How We Use Your Information',
    icon: <VisibilityIcon />,
    content: [
      'To provide and maintain our service',
      'To notify you about changes to our service',
      'To provide customer support',
      'To gather analysis or valuable information to improve our service',
      'To detect, prevent and address technical issues',
    ],
  },
  {
    title: 'Information Sharing and Disclosure',
    icon: <ShareIcon />,
    content: [
      'We do not sell your personal information to third parties',
      'We may share your information with service providers who assist in our operations',
      'We may share information when required by law',
      'We may share anonymous, aggregated information for analytical purposes',
    ],
  },
  {
    title: 'Data Security',
    icon: <LockIcon />,
    content: [
      'We implement industry-standard security measures',
      'Data encryption in transit and at rest',
      'Regular security assessments and audits',
      'Limited access to personal information by employees',
      'Secure data centers and cloud infrastructure',
    ],
  },
  {
    title: 'Your Data Rights',
    icon: <SecurityIcon />,
    content: [
      'Right to access your personal information',
      'Right to correct inaccurate data',
      'Right to request deletion of your data',
      'Right to restrict processing of your data',
      'Right to data portability',
    ],
  },
  {
    title: 'Data Retention and Deletion',
    icon: <DeleteIcon />,
    content: [
      'We retain data only as long as necessary',
      'You can request deletion of your account and data',
      'Some information may be retained for legal purposes',
      'Backup data is securely deleted according to our retention schedule',
    ],
  },
  {
    title: 'Cookie Policy',
    icon: <CookieIcon />,
    content: [
      'We use essential cookies to maintain basic functionality',
      'Analytics cookies help us understand how you use our service',
      'You can control cookie preferences through your browser settings',
      'Third-party cookies are limited to essential service providers',
    ],
  },
  {
    title: 'Updates to This Policy',
    icon: <UpdateIcon />,
    content: [
      'We may update this policy from time to time',
      'You will be notified of significant changes',
      'Continued use of our service implies acceptance of changes',
      'Previous versions will be archived and available upon request',
    ],
  },
];

const Privacy = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper elevation={0} sx={{ p: { xs: 2, md: 4 } }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Privacy Policy
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" align="center" paragraph>
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </Typography>
          <Typography paragraph>
            We take your privacy seriously. This policy describes how we collect, use, and protect your personal information.
            Please read this policy carefully to understand our practices regarding your personal data.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          {policySections.map((section, index) => (
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
            If you have any questions about this Privacy Policy, please contact us:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Email: privacy@yourcompany.com" />
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

export default Privacy;
