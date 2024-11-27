import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Badge,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Snackbar,
  Alert,
  TextField,
  InputAdornment,
  Rating,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Star as StarIcon,
} from '@mui/icons-material';

// Types
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  fastShipping: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

// Sample categories
const categories = [
  'All Categories',
  'Electronics',
  'Home & Kitchen',
  'Books',
  'Fashion',
  'Sports & Outdoors',
  'Toys & Games',
  'Beauty & Personal Care',
];

// Sample product data
const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality.',
    price: 299.99,
    image: 'https://via.placeholder.com/300',
    category: 'Electronics',
    rating: 4.5,
    reviews: 2547,
    inStock: true,
    fastShipping: true,
  },
  {
    id: 2,
    name: 'Smart Home Security Camera',
    description: '1080p HD indoor wireless security camera with night vision, two-way audio, and motion detection.',
    price: 39.99,
    image: 'https://via.placeholder.com/300',
    category: 'Electronics',
    rating: 4.3,
    reviews: 15234,
    inStock: true,
    fastShipping: true,
  },
  {
    id: 3,
    name: 'Non-Stick Cookware Set',
    description: '10-piece non-stick cookware set including pans, pots, and utensils. Dishwasher safe.',
    price: 89.99,
    image: 'https://via.placeholder.com/300',
    category: 'Home & Kitchen',
    rating: 4.7,
    reviews: 8432,
    inStock: true,
    fastShipping: true,
  },
  {
    id: 4,
    name: 'Bestselling Novel',
    description: 'Award-winning fiction novel. New York Times Bestseller with over 1 million copies sold.',
    price: 14.99,
    image: 'https://via.placeholder.com/300',
    category: 'Books',
    rating: 4.8,
    reviews: 23156,
    inStock: true,
    fastShipping: true,
  },
  {
    id: 5,
    name: 'Running Shoes',
    description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper.',
    price: 129.99,
    image: 'https://via.placeholder.com/300',
    category: 'Fashion',
    rating: 4.4,
    reviews: 3567,
    inStock: false,
    fastShipping: true,
  },
  {
    id: 6,
    name: 'Yoga Mat',
    description: '6mm thick premium yoga mat with carrying strap. Non-slip surface and excellent cushioning.',
    price: 29.99,
    image: 'https://via.placeholder.com/300',
    category: 'Sports & Outdoors',
    rating: 4.6,
    reviews: 5789,
    inStock: true,
    fastShipping: true,
  },
];

function Ecommerce() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const filteredProducts = sampleProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        setSnackbar({
          open: true,
          message: `Added another ${product.name} to your cart`,
          severity: 'success',
        });
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      setSnackbar({
        open: true,
        message: `${product.name} added to your cart`,
        severity: 'success',
      });
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const item = prevCart.find((i) => i.id === productId);
      if (item && item.quantity === 1) {
        setSnackbar({
          open: true,
          message: `${item.name} removed from your cart`,
          severity: 'success',
        });
      }
      return prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const deleteFromCart = (productId: number) => {
    setCart((prevCart) => {
      const item = prevCart.find((i) => i.id === productId);
      if (item) {
        setSnackbar({
          open: true,
          message: `${item.name} removed from your cart`,
          severity: 'success',
        });
      }
      return prevCart.filter((item) => item.id !== productId);
    });
  };

  const getTotalItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    // TODO: Implement Stripe checkout
    console.log('Proceeding to checkout...');
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header and Search Section */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                input={<OutlinedInput label="Category" />}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={7}>
            <TextField
              fullWidth
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={1} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
            <IconButton
              color="primary"
              onClick={() => setIsCartOpen(true)}
              sx={{ 
                position: 'relative',
                '&:hover': {
                  transform: 'scale(1.1)',
                  transition: 'transform 0.2s'
                }
              }}
            >
              <Badge 
                badgeContent={getTotalItems()} 
                color="secondary"
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#f50057',
                    color: 'white',
                  }
                }}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Grid>
        </Grid>
      </Box>

      {/* Products Grid */}
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h2" noWrap>
                  {product.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={product.rating} precision={0.1} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({product.reviews.toLocaleString()})
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {product.description}
                </Typography>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="h6" component="span" color="primary">
                    ${product.price.toFixed(2)}
                  </Typography>
                  {product.fastShipping && (
                    <Chip
                      label="Fast Shipping"
                      size="small"
                      color="success"
                      sx={{ ml: 1 }}
                    />
                  )}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography
                    variant="body2"
                    color={product.inStock ? 'success.main' : 'error.main'}
                  >
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => addToCart(product)}
                    startIcon={<AddIcon />}
                    disabled={!product.inStock}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Shopping Cart Drawer */}
      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      >
        <Box sx={{ width: 350, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Shopping Cart
          </Typography>
          <List>
            {cart.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem>
                  <ListItemText
                    primary={item.name}
                    secondary={`$${item.price} x ${item.quantity}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => removeFromCart(item.id)}
                      size="small"
                    >
                      <RemoveIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => addToCart(item)}
                      size="small"
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => deleteFromCart(item.id)}
                      size="small"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          {cart.length > 0 ? (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Total: ${getTotalPrice().toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </Box>
          ) : (
            <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
              Your cart is empty
            </Typography>
          )}
        </Box>
      </Drawer>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Ecommerce;
