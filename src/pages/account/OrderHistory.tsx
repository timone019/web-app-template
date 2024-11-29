import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  GetApp as DownloadIcon,
} from '@mui/icons-material';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  trackingNumber?: string;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    date: '2024-01-15',
    total: 129.99,
    status: 'delivered',
    items: [
      { name: 'Product 1', quantity: 2, price: 49.99 },
      { name: 'Product 2', quantity: 1, price: 30.01 },
    ],
    trackingNumber: 'TRK123456789',
  },
  {
    id: 'ORD-2024-002',
    date: '2024-01-20',
    total: 79.99,
    status: 'shipped',
    items: [
      { name: 'Product 3', quantity: 1, price: 79.99 },
    ],
    trackingNumber: 'TRK987654321',
  },
  {
    id: 'ORD-2024-003',
    date: '2024-01-25',
    total: 199.99,
    status: 'processing',
    items: [
      { name: 'Product 4', quantity: 1, price: 149.99 },
      { name: 'Product 5', quantity: 2, price: 25.00 },
    ],
  },
];

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'processing':
      return 'warning';
    case 'shipped':
      return 'info';
    case 'delivered':
      return 'success';
    case 'cancelled':
      return 'error';
    default:
      return 'default';
  }
};

const OrderHistory = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleDownloadInvoice = (orderId: string) => {
    // TODO: Implement invoice download
    console.log(`Downloading invoice for order ${orderId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockOrders
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>
                          {new Date(order.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Chip
                            label={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            color={getStatusColor(order.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            onClick={() => handleViewOrder(order)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDownloadInvoice(order.id)}
                          >
                            <DownloadIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={mockOrders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Order Date"
                    secondary={new Date(selectedOrder.date).toLocaleDateString()}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Status"
                    secondary={
                      <Chip
                        label={
                          selectedOrder.status.charAt(0).toUpperCase() +
                          selectedOrder.status.slice(1)
                        }
                        color={getStatusColor(selectedOrder.status)}
                        size="small"
                      />
                    }
                  />
                </ListItem>
                {selectedOrder.trackingNumber && (
                  <>
                    <Divider />
                    <ListItem>
                      <ListItemText
                        primary="Tracking Number"
                        secondary={selectedOrder.trackingNumber}
                      />
                    </ListItem>
                  </>
                )}
                <Divider />
                <ListItem>
                  <ListItemText primary="Items" />
                </ListItem>
                {selectedOrder.items.map((item, index) => (
                  <ListItem key={index} sx={{ pl: 4 }}>
                    <ListItemText
                      primary={item.name}
                      secondary={`Quantity: ${item.quantity} | Price: $${item.price.toFixed(
                        2
                      )}`}
                    />
                  </ListItem>
                ))}
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Total"
                    secondary={`$${selectedOrder.total.toFixed(2)}`}
                  />
                </ListItem>
              </List>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDownloadInvoice(selectedOrder?.id || '')}>
            Download Invoice
          </Button>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OrderHistory;
