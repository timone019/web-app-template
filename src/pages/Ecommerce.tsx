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
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

// Types
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

// Sample product data
const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Premium Product 1',
    description: 'High-quality product with amazing features.',
    price: 99.99,
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 2,
    name: 'Premium Product 2',
    description: 'Another excellent product for your needs.',
    price: 149.99,
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 3,
    name: 'Premium Product 3',
    description: 'Top-tier product with premium features.',
    price: 199.99,
    image: 'https://via.placeholder.com/300',
  },
];

function Ecommerce() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const deleteFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
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
    <Container sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Our Products
        </Typography>
        <IconButton
          color="primary"
          onClick={() => setIsCartOpen(true)}
          sx={{ position: 'relative' }}
        >
          <Badge badgeContent={getTotalItems()} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Box>

      {/* Products Grid */}
      <Grid container spacing={4}>
        {sampleProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {product.description}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h6" color="primary">
                    ${product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => addToCart(product)}
                    startIcon={<AddIcon />}
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
    </Container>
  );
}

export default Ecommerce;
