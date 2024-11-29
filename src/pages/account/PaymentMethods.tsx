import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Divider,
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useSnackbar } from '../../contexts/SnackbarContext';

interface PaymentMethod {
  id: string;
  type: 'credit' | 'debit';
  cardNumber: string;
  expiryDate: string;
  isDefault: boolean;
}

const PaymentMethods = () => {
  const { showSnackbar } = useSnackbar();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'credit',
      cardNumber: '**** **** **** 1234',
      expiryDate: '12/24',
      isDefault: true,
    },
    {
      id: '2',
      type: 'debit',
      cardNumber: '**** **** **** 5678',
      expiryDate: '06/25',
      isDefault: false,
    },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCard, setEditingCard] = useState<PaymentMethod | null>(null);
  const [formData, setFormData] = useState({
    type: 'credit',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleAddCard = () => {
    setEditingCard(null);
    setFormData({
      type: 'credit',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    });
    setOpenDialog(true);
  };

  const handleEditCard = (card: PaymentMethod) => {
    setEditingCard(card);
    setFormData({
      type: card.type,
      cardNumber: card.cardNumber,
      expiryDate: card.expiryDate,
      cvv: '',
    });
    setOpenDialog(true);
  };

  const handleDeleteCard = (cardId: string) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== cardId));
    showSnackbar('Payment method removed successfully', 'success');
  };

  const handleSetDefault = (cardId: string) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === cardId,
      }))
    );
    showSnackbar('Default payment method updated', 'success');
  };

  const handleSubmit = () => {
    // TODO: Implement card validation and processing
    if (editingCard) {
      setPaymentMethods(methods =>
        methods.map(method =>
          method.id === editingCard.id
            ? {
                ...method,
                type: formData.type as 'credit' | 'debit',
                expiryDate: formData.expiryDate,
              }
            : method
        )
      );
      showSnackbar('Payment method updated successfully', 'success');
    } else {
      const newCard: PaymentMethod = {
        id: Date.now().toString(),
        type: formData.type as 'credit' | 'debit',
        cardNumber: '**** **** **** ' + formData.cardNumber.slice(-4),
        expiryDate: formData.expiryDate,
        isDefault: paymentMethods.length === 0,
      };
      setPaymentMethods([...paymentMethods, newCard]);
      showSnackbar('Payment method added successfully', 'success');
    }
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Payment Methods</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddCard}
        >
          Add Payment Method
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <List>
              {paymentMethods.map((method, index) => (
                <React.Fragment key={method.id}>
                  {index > 0 && <Divider />}
                  <ListItem>
                    <ListItemIcon>
                      <CreditCardIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${method.type.charAt(0).toUpperCase() + method.type.slice(1)} Card ${
                        method.isDefault ? '(Default)' : ''
                      }`}
                      secondary={`${method.cardNumber} | Expires ${method.expiryDate}`}
                    />
                    <ListItemSecondaryAction>
                      {!method.isDefault && (
                        <Button
                          size="small"
                          onClick={() => handleSetDefault(method.id)}
                          sx={{ mr: 1 }}
                        >
                          Set as Default
                        </Button>
                      )}
                      <IconButton
                        edge="end"
                        onClick={() => handleEditCard(method)}
                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={() => handleDeleteCard(method.id)}
                        disabled={method.isDefault}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </React.Fragment>
              ))}
              {paymentMethods.length === 0 && (
                <ListItem>
                  <ListItemText
                    primary="No payment methods"
                    secondary="Click the button above to add a payment method"
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingCard ? 'Edit Payment Method' : 'Add Payment Method'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Card Type"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                >
                  <MenuItem value="credit">Credit Card</MenuItem>
                  <MenuItem value="debit">Debit Card</MenuItem>
                </TextField>
              </Grid>
              {!editingCard && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Card Number"
                    value={formData.cardNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, cardNumber: e.target.value })
                    }
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Expiry Date (MM/YY)"
                  value={formData.expiryDate}
                  onChange={(e) =>
                    setFormData({ ...formData, expiryDate: e.target.value })
                  }
                  placeholder="MM/YY"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="CVV"
                  type="password"
                  value={formData.cvv}
                  onChange={(e) =>
                    setFormData({ ...formData, cvv: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingCard ? 'Update' : 'Add'} Card
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PaymentMethods;
