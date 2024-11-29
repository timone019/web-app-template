import React, { useState, useEffect, useCallback } from 'react';
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
  Alert,
  AlertTitle,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { useNavigate } from 'react-router-dom';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useAuth } from '../../contexts/AuthContext';
import { useSnackbar } from '../../contexts/SnackbarContext';

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

interface SubscriptionDetails {
  planId: string;
  interval: 'monthly' | 'yearly';
  isTrial: boolean;
  price: number;
}

interface PlanTier {
  free: { planId: string; price: number };
  pro: { planId: string; price: number };
  enterprise: { planId: string; price: null };
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

const faqData = [
  {
    question: "How do I get started with the free plan?",
    answer: "Getting started is easy! Simply create an account and you'll automatically be enrolled in our Free plan. You can start listing products and exploring our basic features immediately. No credit card required."
  },
  {
    question: "Can I upgrade or downgrade my plan at any time?",
    answer: "Yes, you can change your plan at any time. When upgrading, you'll have immediate access to new features and will be billed the prorated amount for the remainder of your billing cycle. When downgrading, changes will take effect at the start of your next billing cycle."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual enterprise plans. All payments are processed securely through our payment partners."
  },
  {
    question: "Is there a long-term contract?",
    answer: "No, our monthly plans are pay-as-you-go with no long-term commitment. Annual plans offer a 20% discount and can be cancelled before renewal. Enterprise plans may have custom terms based on your needs."
  },
  {
    question: "What kind of support can I expect?",
    answer: "Support varies by plan. Free users get email support with 48-hour response time. Pro users receive priority email support with 24-hour response time. Enterprise customers get 24/7 phone support and a dedicated account manager."
  },
  {
    question: "Do you offer a free trial of Pro features?",
    answer: "Yes! We offer a 14-day free trial of our Pro plan. You'll get full access to all Pro features during the trial period. No credit card is required to start the trial."
  },
  {
    question: "How secure is my data?",
    answer: "We take security seriously. All data is encrypted in transit and at rest, we perform regular security audits, and maintain compliance with industry standards. We offer two-factor authentication and regular backups across all plans."
  },
  {
    question: "What happens if I exceed my plan limits?",
    answer: "We'll notify you when you're approaching your plan limits. If you exceed them, we'll work with you to either upgrade to a more suitable plan or optimize your usage. We never automatically charge for overages without your consent."
  }
];

const plans: PlanTier = {
  free: {
    planId: 'free_tier',
    price: 0,
  },
  pro: {
    planId: 'pro_monthly',
    price: 29.99,
  },
  enterprise: {
    planId: 'enterprise_monthly',
    price: null,
  },
} as const;

const getPlanDetails = (tier: 'free' | 'pro' | 'enterprise', isYearly: boolean): SubscriptionDetails => {
  const selectedPlan = plans[tier];
  const price = tier === 'pro' && isYearly ? 299.88 : selectedPlan.price;
  const planId = tier === 'pro' && isYearly ? 'pro_yearly' : selectedPlan.planId;

  return {
    planId,
    interval: isYearly ? 'yearly' : 'monthly',
    isTrial: false,
    price: price ?? 0,
  };
};

function Pricing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { showSnackbar } = useSnackbar();
  const [isYearly, setIsYearly] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [timeLeft, setTimeLeft] = useState(14);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 14));
    }, 86400000);
    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = useCallback(async (tier: 'free' | 'pro' | 'enterprise', isTrial: boolean = false) => {
    setIsProcessing(true);
    try {
      if (!isAuthenticated) {
        sessionStorage.setItem('subscriptionIntent', JSON.stringify({
          tier,
          isTrial,
          isYearly,
        }));
        showSnackbar('Please log in to continue with subscription', 'info');
        navigate('/login', { state: { from: '/pricing' } });
        return;
      }

      const subscriptionDetails = getPlanDetails(tier, isYearly);
      subscriptionDetails.isTrial = isTrial;

      if (tier === 'free') {
        showSnackbar('Successfully switched to Free plan', 'success');
        navigate('/dashboard');
        return;
      }

      if (tier === 'enterprise') {
        navigate('/contact', {
          state: {
            subject: 'Enterprise Plan Inquiry',
            message: `I'm interested in the Enterprise plan with ${isYearly ? 'yearly' : 'monthly'} billing.`,
          },
        });
        return;
      }

      navigate('/checkout', {
        state: {
          plan: subscriptionDetails,
          returnUrl: '/dashboard',
        },
      });

    } catch (error) {
      console.error('Subscription error:', error);
      showSnackbar(
        'There was an error processing your request. Please try again.',
        'error'
      );
    } finally {
      setIsProcessing(false);
    }
  }, [isAuthenticated, isYearly, navigate, showSnackbar]);

  const handleFreeTrial = useCallback(() => {
    handleSubscribe('pro', true);
  }, [handleSubscribe]);

  useEffect(() => {
    if (isAuthenticated) {
      const intent = sessionStorage.getItem('subscriptionIntent');
      if (intent) {
        const { tier, isTrial, isYearly: yearlyBilling } = JSON.parse(intent);
        sessionStorage.removeItem('subscriptionIntent');
        setIsYearly(yearlyBilling);
        handleSubscribe(tier, isTrial);
      }
    }
  }, [isAuthenticated, handleSubscribe]);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Free Trial Banner */}
      <Collapse in={showBanner}>
        <Alert
          severity="info"
          sx={{
            mt: 2,
            mb: 3,
            backgroundColor: 'primary.light',
            color: 'primary.contrastText',
            '& .MuiAlert-icon': {
              color: 'primary.contrastText',
            },
            borderRadius: 2,
            boxShadow: 2,
          }}
          icon={<TimerOutlinedIcon />}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setShowBanner(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle sx={{ fontWeight: 'bold' }}>
            Special Offer: 14-Day Free Trial
          </AlertTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1">
              Try all Pro features free for 14 days. No credit card required!
            </Typography>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                bgcolor: 'primary.main',
                px: 2,
                py: 0.5,
                borderRadius: 1,
                ml: 2,
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                {timeLeft} days left
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              size="small"
              disabled={isProcessing}
              onClick={handleFreeTrial}
              sx={{
                bgcolor: 'common.white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'grey.100',
                },
                ml: 2,
              }}
            >
              {isProcessing ? 'Processing...' : 'Start Free Trial'}
            </Button>
          </Box>
        </Alert>
      </Collapse>

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
      <Grid container spacing={4} justifyContent="center">
        {pricingTiers.map((tier) => (
          <Grid
            item
            key={tier.title}
            xs={12}
            sm={tier.title === 'Pro' ? 12 : 6}
            md={4}
          >
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                ...tier.title === 'Pro' && {
                  transform: 'scale(1.05)',
                  zIndex: 1,
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
              <CardActions sx={{ mt: 'auto', p: 2 }}>
                <Button
                  fullWidth
                  variant={tier.title === 'Pro' ? 'contained' : 'outlined'}
                  color="primary"
                  disabled={isProcessing}
                  onClick={() => handleSubscribe(tier.title.toLowerCase() as 'free' | 'pro' | 'enterprise')}
                >
                  {isProcessing ? 'Processing...' : tier.buttonText}
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
      <Box sx={{ mt: 8, mb: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Have questions? We're here to help.
        </Typography>

        <Container maxWidth="md">
          <Stack spacing={2}>
            {faqData.map((faq, index) => (
              <Accordion key={index} elevation={1}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`faq-content-${index}`}
                  id={`faq-header-${index}`}
                  sx={{
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="medium">
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>

          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Still have questions?
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              We're here to help! Contact our support team.
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => window.location.href = 'mailto:support@example.com'}
              sx={{ mt: 2 }}
            >
              Contact Support
            </Button>
          </Box>
        </Container>
      </Box>
    </Container>
  );
}

export default Pricing;
