import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  MenuBook as GuideIcon,
  VideoLibrary as TutorialIcon,
  Description as DocumentIcon,
  Code as APIIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`resources-tabpanel-${index}`}
      aria-labelledby={`resources-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Resources = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    console.log('Resources component mounted');
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const guides = [
    {
      title: 'Getting Started Guide',
      description: 'Learn the basics and set up your first project',
      icon: <GuideIcon />,
      link: '/docs/getting-started',
    },
    {
      title: 'User Manual',
      description: 'Detailed documentation of all features',
      icon: <DocumentIcon />,
      link: '/docs/manual',
    },
    {
      title: 'API Documentation',
      description: 'Complete API reference and examples',
      icon: <APIIcon />,
      link: '/docs/api',
    },
  ];

  const tutorials = [
    {
      title: 'Quick Start Tutorial',
      duration: '5 min',
      description: 'Get up and running in 5 minutes',
      thumbnail: '/images/tutorial-1.jpg',
    },
    {
      title: 'Advanced Features',
      duration: '15 min',
      description: 'Deep dive into advanced functionality',
      thumbnail: '/images/tutorial-2.jpg',
    },
    {
      title: 'Best Practices',
      duration: '10 min',
      description: 'Learn recommended patterns and practices',
      thumbnail: '/images/tutorial-3.jpg',
    },
  ];

  const downloads = [
    {
      title: 'Sample Project Template',
      size: '2.3 MB',
      description: 'Start with our pre-configured template',
      type: 'ZIP',
    },
    {
      title: 'Development Tools',
      size: '15 MB',
      description: 'Essential tools for local development',
      type: 'EXE',
    },
    {
      title: 'Documentation PDF',
      size: '5.1 MB',
      description: 'Offline documentation bundle',
      type: 'PDF',
    },
  ];

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: 8,
        position: 'relative',
        zIndex: 1,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Resources
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
        Everything you need to succeed with our platform
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant={isMobile ? 'scrollable' : 'fullWidth'}
          scrollButtons={isMobile ? 'auto' : false}
          aria-label="resources tabs"
        >
          <Tab icon={<GuideIcon />} label="Guides" />
          <Tab icon={<TutorialIcon />} label="Tutorials" />
          <Tab icon={<DownloadIcon />} label="Downloads" />
        </Tabs>
      </Box>

      <TabPanel value={selectedTab} index={0}>
        <Grid container spacing={3}>
          {guides.map((guide, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ color: 'primary.main', mr: 2 }}>{guide.icon}</Box>
                    <Typography variant="h6" component="h2">
                      {guide.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {guide.description}
                  </Typography>
                  <Button
                    component={RouterLink}
                    to={guide.link}
                    variant="outlined"
                    size="small"
                    endIcon={<DocumentIcon />}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={selectedTab} index={1}>
        <Grid container spacing={3}>
          {tutorials.map((tutorial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%' }}>
                <Box
                  sx={{
                    height: 140,
                    backgroundColor: 'grey.200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <TutorialIcon sx={{ fontSize: 40, color: 'grey.400' }} />
                </Box>
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {tutorial.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {tutorial.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                      Duration: {tutorial.duration}
                    </Typography>
                    <Button variant="text" size="small" endIcon={<TutorialIcon />}>
                      Watch Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={selectedTab} index={2}>
        <Paper variant="outlined">
          <List>
            {downloads.map((download, index) => (
              <React.Fragment key={index}>
                {index > 0 && <Divider />}
                <ListItem>
                  <ListItemIcon>
                    <DownloadIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={download.title}
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          {download.description}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Size: {download.size} • Type: {download.type}
                        </Typography>
                      </>
                    }
                  />
                  <Button variant="contained" size="small" startIcon={<DownloadIcon />}>
                    Download
                  </Button>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </TabPanel>
    </Container>
  );
};

export default Resources;
