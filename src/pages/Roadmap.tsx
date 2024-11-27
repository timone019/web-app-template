import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Chip,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import {
  Check as CheckIcon,
  Star as StarIcon,
  Pending as PendingIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';

interface RoadmapItem {
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  quarter: string;
  features: string[];
  priority: 'high' | 'medium' | 'low';
}

const roadmapData: RoadmapItem[] = [
  {
    title: 'Core Platform Launch',
    description: 'Initial release of our core platform features',
    status: 'completed',
    quarter: 'Q1 2024',
    features: [
      'User authentication system',
      'Basic dashboard interface',
      'Data visualization tools',
      'API integration framework',
    ],
    priority: 'high',
  },
  {
    title: 'Advanced Analytics',
    description: 'Enhanced analytics and reporting capabilities',
    status: 'in-progress',
    quarter: 'Q2 2024',
    features: [
      'Custom report builder',
      'Advanced data filters',
      'Export functionality',
      'Real-time analytics',
    ],
    priority: 'high',
  },
  {
    title: 'Collaboration Features',
    description: 'Team collaboration and sharing capabilities',
    status: 'planned',
    quarter: 'Q3 2024',
    features: [
      'Team workspaces',
      'Real-time collaboration',
      'Document sharing',
      'Comment system',
    ],
    priority: 'medium',
  },
  {
    title: 'Mobile Application',
    description: 'Native mobile applications for iOS and Android',
    status: 'planned',
    quarter: 'Q4 2024',
    features: [
      'Native iOS app',
      'Native Android app',
      'Offline functionality',
      'Push notifications',
    ],
    priority: 'medium',
  },
  {
    title: 'AI Integration',
    description: 'Advanced AI-powered features and automation',
    status: 'planned',
    quarter: 'Q1 2025',
    features: [
      'Predictive analytics',
      'Automated insights',
      'Smart recommendations',
      'Natural language processing',
    ],
    priority: 'high',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'in-progress':
      return 'warning';
    default:
      return 'info';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckIcon />;
    case 'in-progress':
      return <PendingIcon />;
    default:
      return <ScheduleIcon />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'error';
    case 'medium':
      return 'warning';
    default:
      return 'info';
  }
};

const Roadmap = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Product Roadmap
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Our vision and planned features for the upcoming quarters
        </Typography>
      </Box>

      <Timeline position={isMobile ? 'right' : 'alternate'}>
        {roadmapData.map((item, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot color={getStatusColor(item.status)}>
                {getStatusIcon(item.status)}
              </TimelineDot>
              {index < roadmapData.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Card>
                <CardContent>
                  <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" component="h2">
                      {item.title}
                    </Typography>
                    <Chip
                      label={item.quarter}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                  <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
                    <Chip
                      label={item.status.replace('-', ' ')}
                      size="small"
                      color={getStatusColor(item.status)}
                    />
                    <Chip
                      icon={<StarIcon />}
                      label={`${item.priority} priority`}
                      size="small"
                      color={getPriorityColor(item.priority)}
                    />
                  </Box>
                  <Typography color="text.secondary" paragraph>
                    {item.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Key Features:
                    </Typography>
                    <Grid container spacing={1}>
                      {item.features.map((feature, featureIndex) => (
                        <Grid item key={featureIndex}>
                          <Chip
                            label={feature}
                            size="small"
                            variant="outlined"
                            sx={{ borderRadius: 1 }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Container>
  );
};

export default Roadmap;
