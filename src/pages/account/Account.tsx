import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../contexts/SnackbarContext';
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import {
  Edit as EditIcon,
  History as HistoryIcon,
  Notifications as NotificationsIcon,
  Payment as PaymentIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

const Account = () => {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '',
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    orderUpdates: true,
    promotionalEmails: false,
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setProfileData({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        phone: profileData.phone,
      });
    }
  };

  const handleProfileUpdate = async () => {
    try {
      // TODO: Implement profile update functionality
      showSnackbar('Profile updated successfully', 'success');
      setIsEditing(false);
    } catch (error) {
      showSnackbar('Failed to update profile', 'error');
    }
  };

  const handleNotificationChange = (setting: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev],
    }));
  };

  const displayName = `${profileData.firstName} ${profileData.lastName}`;
  const initials = `${profileData.firstName[0]}${profileData.lastName[0]}`;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Account Settings
      </Typography>
      
      <Grid container spacing={3}>
        {/* Profile Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box display="flex" alignItems="center" mb={3}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: 'primary.main',
                  mr: 2,
                }}
              >
                {initials}
              </Avatar>
              <Box>
                <Typography variant="h6">{displayName}</Typography>
                <Typography color="textSecondary">{profileData.email}</Typography>
              </Box>
              <IconButton onClick={handleEditToggle}>
                <EditIcon />
              </IconButton>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  disabled={!isEditing}
                />
              </Grid>
            </Grid>

            {isEditing && (
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleProfileUpdate}
                  sx={{ mr: 1 }}
                >
                  Save Changes
                </Button>
                <Button variant="outlined" onClick={handleEditToggle}>
                  Cancel
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <List>
              <ListItemButton onClick={() => navigate('/account-security')}>
                <ListItemText primary="Security Settings" />
                <SecurityIcon />
              </ListItemButton>
              <ListItemButton onClick={() => navigate('/payment-methods')}>
                <ListItemText primary="Payment Methods" />
                <PaymentIcon />
              </ListItemButton>
              <ListItemButton onClick={() => navigate('/order-history')}>
                <ListItemText primary="Order History" />
                <HistoryIcon />
              </ListItemButton>
            </List>
          </Paper>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <NotificationsIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Notification Settings</Typography>
            </Box>
            <List>
              {Object.entries(notificationSettings).map(([key, value]) => (
                <ListItem key={key}>
                  <ListItemText
                    primary={key
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, str => str.toUpperCase())}
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={value}
                      onChange={() => handleNotificationChange(key)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Account;
