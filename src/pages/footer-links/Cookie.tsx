import React from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Cookie = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Cookie Policy
        </Typography>
        
        <Typography paragraph sx={{ mb: 4 }}>
          Last updated: {new Date().toLocaleDateString()}
        </Typography>

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">What Are Cookies</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
              They are widely used to make websites work more efficiently and provide a better user experience.
            </Typography>
            <Typography paragraph>
              These cookies allow us to distinguish you from other users of our website, which helps us to provide 
              you with an enhanced browsing experience.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">How We Use Cookies</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              We use different types of cookies for various purposes:
            </Typography>
            <Typography component="div">
              <ul>
                <li>
                  <strong>Essential Cookies:</strong> Required for the website to function properly. They enable basic 
                  functions like page navigation and access to secure areas of the website.
                </li>
                <li>
                  <strong>Performance Cookies:</strong> Help us understand how visitors interact with our website by 
                  collecting and reporting information anonymously.
                </li>
                <li>
                  <strong>Functionality Cookies:</strong> Allow the website to remember choices you make (such as your 
                  username, language, or region) and provide enhanced features.
                </li>
                <li>
                  <strong>Targeting Cookies:</strong> These cookies may be set through our site by our advertising 
                  partners to build a profile of your interests and show you relevant ads on other sites.
                </li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Managing Cookies</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Most web browsers allow you to control cookies through their settings preferences. However, limiting 
              cookies may impact your experience of the site and the services we are able to offer.
            </Typography>
            <Typography paragraph>
              You can set your browser to refuse all or some browser cookies, or to alert you when websites set or 
              access cookies. If you disable or refuse cookies, please note that some parts of this website may 
              become inaccessible or not function properly.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Types of Cookies We Use</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="div">
              <ul>
                <li>
                  <strong>Session Cookies:</strong> These are temporary cookies that expire when you close your browser.
                </li>
                <li>
                  <strong>Persistent Cookies:</strong> These remain on your device until they expire or you delete them.
                </li>
                <li>
                  <strong>First-party Cookies:</strong> Set by our website directly.
                </li>
                <li>
                  <strong>Third-party Cookies:</strong> Set by third-party services we use, such as analytics or advertising.
                </li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Changes to This Cookie Policy</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new 
              Cookie Policy on this page and updating the "Last updated" date at the top of this policy.
            </Typography>
            <Typography paragraph>
              You are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie Policy 
              are effective when they are posted on this page.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <Typography paragraph>
            If you have any questions about our Cookie Policy, please contact us at:{' '}
            <Link href="mailto:privacy@example.com">privacy@example.com</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Cookie;
