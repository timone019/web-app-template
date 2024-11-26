import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { SvgIconProps } from '@mui/material';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactElement<SvgIconProps>;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color = 'primary.main' }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        height: '100%',
      }}
    >
      <Box
        sx={{
          bgcolor: `${color}15`,
          p: 2,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {React.cloneElement(icon, { 
          sx: { fontSize: 40, color },
          style: { fontSize: 40, color }
        })}
      </Box>
      <Box>
        <Typography color="text.secondary" variant="body2" fontWeight="medium">
          {title}
        </Typography>
        <Typography variant="h4" component="div" fontWeight="medium">
          {value}
        </Typography>
      </Box>
    </Paper>
  );
};

export default StatCard;
