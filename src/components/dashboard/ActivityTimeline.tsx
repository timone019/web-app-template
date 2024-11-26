import React from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import { Paper, Typography, Box } from '@mui/material';

export interface Activity {
  id: number;
  title: string;
  description: string;
  time: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export interface ActivityTimelineProps {
  activities: Activity[];
}

const getTimelineDotColor = (type: Activity['type']) => {
  switch (type) {
    case 'success':
      return 'success';
    case 'error':
      return 'error';
    case 'warning':
      return 'warning';
    case 'info':
    default:
      return 'info';
  }
};

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities }) => {
  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Recent Activity
      </Typography>
      <Box sx={{ maxHeight: 350, overflow: 'auto' }}>
        <Timeline>
          {activities.map((activity, index) => (
            <TimelineItem key={activity.id}>
              <TimelineSeparator>
                <TimelineDot color={getTimelineDotColor(activity.type)} />
                {index < activities.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="subtitle2">{activity.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {activity.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {activity.time}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Box>
    </Paper>
  );
};

export default ActivityTimeline;
