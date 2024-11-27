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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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

const featuresList = [
  {
    category: 'Core Features',
    features: [
      { name: 'Product Listings', free: true, pro: true, enterprise: true, info: 'List and manage your products' },
      { name: 'Basic Analytics', free: true, pro: true, enterprise: true, info: 'View basic sales metrics' },
      { name: 'Customer Management', free: false, pro: true, enterprise: true, info: 'Manage customer data and interactions' },
      { name: 'Advanced Analytics', free: false, pro: true, enterprise: true, info: 'Detailed insights and reporting' },
      { name: 'Custom Reporting', free: false, pro: false, enterprise: true, info: 'Create and schedule custom reports' }
    ]
  },
  {
    category: 'Support',
    features: [
      { name: 'Email Support', free: true, pro: true, enterprise: true, info: 'Get help via email' },
      { name: 'Priority Support', free: false, pro: true, enterprise: true, info: 'Fast response times' },
      { name: 'Dedicated Account Manager', free: false, pro: false, enterprise: true, info: 'Personal support contact' },
      { name: '24/7 Phone Support', free: false, pro: false, enterprise: true, info: 'Round-the-clock assistance' }
    ]
  },
  {
    category: 'E-commerce Features',
    features: [
      { name: 'Inventory Management', free: true, pro: true, enterprise: true, info: 'Track and manage stock' },
      { name: 'Multiple Payment Gateways', free: false, pro: true, enterprise: true, info: 'Accept various payment methods' },
      { name: 'Advanced Shipping Rules', free: false, pro: true, enterprise: true, info: 'Complex shipping configurations' },
      { name: 'Bulk Order Management', free: false, pro: false, enterprise: true, info: 'Handle large order volumes' }
    ]
  }
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

      {/* Comparison Table Section */}
      <Box sx={{ mt: 8, mb: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Feature Comparison
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Compare plans to find the perfect fit for your business
        </Typography>
        
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>Feature</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Free</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', bgcolor: 'primary.light', color: 'primary.contrastText' }}>Pro</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Enterprise</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {featuresList.map((category) => (
                <>
                  <TableRow>
                    <TableCell colSpan={4} sx={{ bgcolor: 'grey.100', fontWeight: 'bold' }}>
                      {category.category}
                    </TableCell>
                  </TableRow>
                  {category.features.map((feature) => (
                    <TableRow key={feature.name}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {feature.name}
                          <InfoOutlinedIcon
                            fontSize="small"
                            color="action"
                            sx={{ 
                              cursor: 'help',
                              '&:hover': { color: 'primary.main' }
                            }}
                            titleAccess={feature.info}
                          />
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        {feature.free ? (
                          <CheckIcon color="success" />
                        ) : (
                          <CloseIcon color="error" />
                        )}
                      </TableCell>
                      <TableCell align="center" sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                        {feature.pro ? (
                          <CheckIcon sx={{ color: 'primary.contrastText' }} />
                        ) : (
                          <CloseIcon sx={{ color: 'error.light' }} />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {feature.enterprise ? (
                          <CheckIcon color="success" />
                        ) : (
                          <CloseIcon color="error" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

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
