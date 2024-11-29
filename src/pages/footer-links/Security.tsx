import React from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockIcon from '@mui/icons-material/Lock';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ShieldIcon from '@mui/icons-material/Shield';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import DataUsageIcon from '@mui/icons-material/DataUsage';

const Security = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Security Policy
        </Typography>
        
        <Typography paragraph sx={{ mb: 4 }}>
          Last updated: {new Date().toLocaleDateString()}
        </Typography>

        <Typography paragraph sx={{ mb: 4 }}>
          At [Company Name], we take the security of your data seriously. This security policy outlines our 
          commitment to protecting your information and ensuring the safety of our platform.
        </Typography>

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LockIcon sx={{ mr: 2 }} />
              <Typography variant="h6">Data Protection</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Encryption at Rest"
                  secondary="All sensitive data is encrypted using industry-standard AES-256 encryption when stored in our databases."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Encryption in Transit"
                  secondary="We use TLS 1.3 for all data transmission, ensuring your information is protected while traveling between your device and our servers."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Access Controls"
                  secondary="Strict access controls and authentication mechanisms are in place to ensure only authorized personnel can access sensitive data."
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <VerifiedUserIcon sx={{ mr: 2 }} />
              <Typography variant="h6">Infrastructure Security</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Cloud Security"
                  secondary="Our infrastructure is hosted on secure cloud platforms with multiple layers of security controls and compliance certifications."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Network Security"
                  secondary="We employ firewalls, intrusion detection systems, and regular security scans to protect our network infrastructure."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Monitoring"
                  secondary="24/7 monitoring systems alert us to any suspicious activity or potential security threats."
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ShieldIcon sx={{ mr: 2 }} />
              <Typography variant="h6">Application Security</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Secure Development"
                  secondary="Our development process follows security best practices and includes regular security reviews and testing."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Vulnerability Management"
                  secondary="Regular security assessments and penetration testing help us identify and address potential vulnerabilities."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Dependencies"
                  secondary="We regularly update and monitor all third-party dependencies to ensure they are free from known vulnerabilities."
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <VpnLockIcon sx={{ mr: 2 }} />
              <Typography variant="h6">Authentication & Access</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Strong Authentication"
                  secondary="We support multi-factor authentication and enforce strong password policies."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Session Management"
                  secondary="Secure session handling with automatic timeouts and secure cookie policies."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Access Logging"
                  secondary="All access attempts and changes to security settings are logged and monitored."
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <DataUsageIcon sx={{ mr: 2 }} />
              <Typography variant="h6">Incident Response</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              We maintain a comprehensive incident response plan that includes:
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Quick Response"
                  secondary="Our security team is available 24/7 to respond to potential security incidents."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Communication"
                  secondary="We commit to transparent communication with affected users in case of any security incidents."
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Recovery"
                  secondary="Documented procedures for incident containment, eradication, and service restoration."
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Security Contact
          </Typography>
          <Typography paragraph>
            If you discover a potential security issue, please contact our security team immediately at:{' '}
            <Link href="mailto:security@example.com">security@example.com</Link>
          </Typography>
          <Typography paragraph>
            For general security inquiries, you can reach us at:{' '}
            <Link href="mailto:security-info@example.com">security-info@example.com</Link>
          </Typography>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            This security policy is regularly reviewed and updated to reflect our ongoing commitment to security. 
            While we strive to protect your data, no method of transmission over the Internet or electronic 
            storage is 100% secure. We continuously work to improve our security measures and protect your information.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Security;
