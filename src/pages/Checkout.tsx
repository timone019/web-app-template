import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Types
interface ShippingInfo {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  email: string;
  phone: string;
}

interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
}

const steps = ['Shipping Information', 'Payment Details', 'Review Order'];

function Checkout() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    email: '',
    phone: '',
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleShippingInfoChange = (field: keyof ShippingInfo) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShippingInfo({ ...shippingInfo, [field]: event.target.value });
  };

  const handlePaymentInfoChange = (field: keyof PaymentInfo) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentInfo({ ...paymentInfo, [field]: event.target.value });
  };

  const handlePlaceOrder = async () => {
    try {
      // TODO: Implement actual order placement and payment processing
      console.log('Processing order...');
      // Simulate order processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error processing order:', error);
    }
  };

  const ShippingForm = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="First Name"
          value={shippingInfo.firstName}
          onChange={handleShippingInfoChange('firstName')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Last Name"
          value={shippingInfo.lastName}
          onChange={handleShippingInfoChange('lastName')}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Address"
          value={shippingInfo.address}
          onChange={handleShippingInfoChange('address')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="City"
          value={shippingInfo.city}
          onChange={handleShippingInfoChange('city')}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          required
          fullWidth
          label="State"
          value={shippingInfo.state}
          onChange={handleShippingInfoChange('state')}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          required
          fullWidth
          label="ZIP Code"
          value={shippingInfo.zipCode}
          onChange={handleShippingInfoChange('zipCode')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Email"
          type="email"
          value={shippingInfo.email}
          onChange={handleShippingInfoChange('email')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Phone"
          value={shippingInfo.phone}
          onChange={handleShippingInfoChange('phone')}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Shipping Method</FormLabel>
          <RadioGroup
            row
            value={shippingMethod}
            onChange={(e) => setShippingMethod(e.target.value)}
          >
            <FormControlLabel
              value="standard"
              control={<Radio />}
              label="Standard Shipping (3-5 business days) - Free"
            />
            <FormControlLabel
              value="express"
              control={<Radio />}
              label="Express Shipping (1-2 business days) - $9.99"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );

  const PaymentForm = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Card Number"
          value={paymentInfo.cardNumber}
          onChange={handlePaymentInfoChange('cardNumber')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="MM/YY"
          placeholder="MM/YY"
          value={paymentInfo.expiryDate}
          onChange={handlePaymentInfoChange('expiryDate')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="CVV"
          value={paymentInfo.cvv}
          onChange={handlePaymentInfoChange('cvv')}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Name on Card"
          value={paymentInfo.nameOnCard}
          onChange={handlePaymentInfoChange('nameOnCard')}
        />
      </Grid>
    </Grid>
  );

  const OrderReview = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Shipping Information
        </Typography>
        <Typography>
          {shippingInfo.firstName} {shippingInfo.lastName}
        </Typography>
        <Typography>{shippingInfo.address}</Typography>
        <Typography>
          {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
        </Typography>
        <Typography>{shippingInfo.email}</Typography>
        <Typography>{shippingInfo.phone}</Typography>
        <Typography sx={{ mt: 1 }}>
          Shipping Method: {shippingMethod === 'standard' ? 'Standard' : 'Express'} Shipping
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Payment Information
        </Typography>
        <Typography>
          Card ending in {paymentInfo.cardNumber.slice(-4)}
        </Typography>
        <Typography>
          {paymentInfo.nameOnCard}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        {/* TODO: Add order summary details */}
        <Alert severity="info" sx={{ mt: 2 }}>
          By placing your order, you agree to our terms and conditions.
        </Alert>
      </Grid>
    </Grid>
  );

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <ShippingForm />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <OrderReview />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mb: 4 }}>
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {getStepContent(activeStep)}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default Checkout;
