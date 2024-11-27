import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  Switch,
  FormGroup,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import {
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface PricingTier {
  title: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: {
    text: string;
    included: boolean;
  }[];
  buttonText: string;
  highlighted?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    title: 'Free',
    price: {
      monthly: 0,
      yearly: 0,
    },
    description: 'Perfect for trying out our services',
    features: [
      { text: 'Basic features', included: true },
      { text: 'Up to 10 products', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'Community support', included: true },
      { text: 'Advanced features', included: false },
      { text: 'Priority support', included: false },
      { text: 'Custom domain', included: false },
    ],
    buttonText: 'Start Free',
  },
  {
    title: 'Pro',
    price: {
      monthly: 29,
      yearly: 290,
    },
    description: 'Best for growing businesses',
    features: [
      { text: 'Everything in Free', included: true },
      { text: 'Unlimited products', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Priority support', included: true },
      { text: 'Custom domain', included: true },
      { text: 'API access', included: true },
      { text: 'White-label solution', included: false },
    ],
    buttonText: 'Start Pro Trial',
    highlighted: true,
  },
  {
    title: 'Enterprise',
    price: {
      monthly: 99,
      yearly: 990,
    },
    description: 'For large-scale operations',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'White-label solution', included: true },
      { text: 'Dedicated support', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'Advanced security', included: true },
      { text: 'SLA guarantee', included: true },
      { text: 'Custom features', included: true },
    ],
    buttonText: 'Contact Sales',
  },
];

function Pricing() {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);

  const handleSubscribe = (tier: string) => {
    // TODO: Implement subscription logic
    console.log(`Subscribing to ${tier} plan`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Header */}
      <Box textAlign="center" mb={8}>
        <Typography
          component="h1"
          variant="h2"
          color="text.primary"
          gutterBottom
        >
          Simple, transparent pricing
        </Typography>
        <Typography variant="h5" color="text.secondary" component="p">
          Choose the perfect plan for your business
        </Typography>
        
        {/* Billing Toggle */}
        <FormGroup sx={{ mt: 4, display: 'flex', alignItems: 'center' }}>
          <FormControlLabel
            control={
              <Switch
                checked={isYearly}
                onChange={() => setIsYearly(!isYearly)}
                color="primary"
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography>Bill Yearly</Typography>
                <Chip
                  label="Save 20%"
                  color="success"
                  size="small"
                  sx={{ display: isYearly ? 'inline-flex' : 'none' }}
                />
              </Box>
            }
            labelPlacement="end"
          />
        </FormGroup>
      </Box>

      {/* Pricing Cards */}
      <Grid container spacing={4} alignItems="flex-start">
        {pricingTiers.map((tier) => (
          <Grid
            item
            key={tier.title}
            xs={12}
            md={4}
          >
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transform: tier.highlighted ? 'scale(1.05)' : 'none',
                border: tier.highlighted ? '2px solid primary.main' : 'none',
                boxShadow: tier.highlighted ? 3 : 1,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: tier.highlighted ? 'scale(1.07)' : 'scale(1.02)',
                },
              }}
            >
              {tier.highlighted && (
                <Chip
                  label="Most Popular"
                  color="primary"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                  }}
                />
              )}
              <CardHeader
                title={tier.title}
                subheader={tier.description}
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{ align: 'center' }}
                sx={{ pb: 0 }}
              />
              <CardContent sx={{ pt: 0, px: 3, flexGrow: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'baseline',
                    mb: 2,
                    mt: 2,
                  }}
                >
                  <Typography component="h2" variant="h3" color="text.primary">
                    ${isYearly ? tier.price.yearly : tier.price.monthly}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    /{isYearly ? 'year' : 'month'}
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <List sx={{ py: 0 }}>
                  {tier.features.map((feature) => (
                    <ListItem key={feature.text} sx={{ py: 1, px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        {feature.included ? (
                          <CheckIcon color="success" />
                        ) : (
                          <CloseIcon color="disabled" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={feature.text}
                        sx={{
                          '& .MuiListItemText-primary': {
                            color: feature.included ? 'text.primary' : 'text.disabled',
                          },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <CardActions sx={{ p: 3, pt: 0 }}>
                <Button
                  fullWidth
                  variant={tier.highlighted ? 'contained' : 'outlined'}
                  color="primary"
                  onClick={() => handleSubscribe(tier.title)}
                >
                  {tier.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* FAQ Section */}
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Typography color="text.secondary">
          Need help? Check out our FAQ or contact our support team.
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => navigate('/contact')}
        >
          Contact Support
        </Button>
      </Box>
    </Container>
  );
}

export default Pricing;
