import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import {
  Lock as LockIcon,
  PhoneAndroid as PhoneIcon,
  VpnKey as VpnKeyIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import { useSnackbar } from '../../contexts/SnackbarContext';

const Security = () => {
  const { showSnackbar } = useSnackbar();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showSnackbar('New passwords do not match', 'error');
      return;
    }
    // TODO: Implement password change functionality
    showSnackbar('Password updated successfully', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    showSnackbar(
      `Two-factor authentication ${!twoFactorEnabled ? 'enabled' : 'disabled'}`,
      'success'
    );
  };

  const handleLoginAlertsToggle = () => {
    setLoginAlerts(!loginAlerts);
    showSnackbar(
      `Login alerts ${!loginAlerts ? 'enabled' : 'disabled'}`,
      'success'
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Security Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Password Change Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: { xs: 3, md: 0 } }}>
            <Box display="flex" alignItems="center" mb={3}>
              <LockIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Change Password</Typography>
            </Box>
            <form onSubmit={handlePasswordChange}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="password"
                    label="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Update Password
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* Security Options */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" mb={3}>
              <VpnKeyIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Security Options</Typography>
            </Box>
            <List>
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Two-Factor Authentication"
                  secondary="Add an extra layer of security to your account"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={twoFactorEnabled}
                    onChange={handleTwoFactorToggle}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <HistoryIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Login Alerts"
                  secondary="Get notified of new sign-ins to your account"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={loginAlerts}
                    onChange={handleLoginAlertsToggle}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>

          {/* Recent Activity */}
          <Paper sx={{ p: 3, mt: 3 }}>
            <Box display="flex" alignItems="center" mb={3}>
              <HistoryIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Recent Activity</Typography>
            </Box>
            <List>
              <ListItem>
                <ListItemText
                  primary="Successful login"
                  secondary="Today, 10:30 AM - San Francisco, CA"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Password changed"
                  secondary="Yesterday, 2:15 PM"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Successful login"
                  secondary="Yesterday, 9:00 AM - San Francisco, CA"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Security;
