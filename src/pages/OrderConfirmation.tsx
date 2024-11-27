import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Divider,
} from '@mui/material';
import { CheckCircleOutline as CheckCircleOutlineIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function OrderConfirmation() {
  const navigate = useNavigate();
  const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <CheckCircleOutlineIcon
          color="success"
          sx={{ fontSize: 64, mb: 2 }}
        />
        <Typography variant="h4" gutterBottom>
          Order Confirmed!
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 3 }}>
          Thank you for your purchase
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" gutterBottom>
          Order Number: #{orderNumber}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          You will receive an email confirmation shortly
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/ecommerce')}
          >
            Continue Shopping
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/dashboard')}
          >
            View Orders
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default OrderConfirmation;
