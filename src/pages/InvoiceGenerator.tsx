import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Download as DownloadIcon,
  Preview as PreviewIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { usePDF } from 'react-to-pdf';

interface InvoiceItem {
  id: string;
  description: string;
  hours: number;
  rate: number;
}

interface InvoiceDetails {
  invoiceNumber: string;
  date: Dayjs;
  dueDate: Dayjs;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  items: InvoiceItem[];
  notes: string;
}

const InvoiceGenerator = () => {
  const { toPDF, targetRef } = usePDF({
    filename: `invoice-${Date.now()}.pdf`,
    page: { format: 'a4' }
  });
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetails>({
    invoiceNumber: `INV-${Date.now()}`,
    date: dayjs(),
    dueDate: dayjs().add(30, 'day'),
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    items: [],
    notes: '',
  });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [newItem, setNewItem] = useState<Partial<InvoiceItem>>({
    description: '',
    hours: 0,
    rate: 0,
  });

  const handleAddItem = () => {
    if (newItem.description && newItem.hours && newItem.rate) {
      const item: InvoiceItem = {
        id: Date.now().toString(),
        description: newItem.description,
        hours: newItem.hours,
        rate: newItem.rate,
      };
      setInvoiceDetails({
        ...invoiceDetails,
        items: [...invoiceDetails.items, item],
      });
      setNewItem({
        description: '',
        hours: 0,
        rate: 0,
      });
    }
  };

  const handleDeleteItem = (id: string) => {
    setInvoiceDetails({
      ...invoiceDetails,
      items: invoiceDetails.items.filter(item => item.id !== id),
    });
  };

  const calculateSubtotal = () => {
    return invoiceDetails.items.reduce((sum, item) => sum + (item.hours * item.rate), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    // You could add tax calculation here if needed
    return subtotal;
  };

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  const handleDownload = async () => {
    try {
      await toPDF();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Invoice Generator
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Client Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Client Name"
                  value={invoiceDetails.clientName}
                  onChange={(e) => setInvoiceDetails({ ...invoiceDetails, clientName: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Client Email"
                  type="email"
                  value={invoiceDetails.clientEmail}
                  onChange={(e) => setInvoiceDetails({ ...invoiceDetails, clientEmail: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Client Address"
                  multiline
                  rows={2}
                  value={invoiceDetails.clientAddress}
                  onChange={(e) => setInvoiceDetails({ ...invoiceDetails, clientAddress: e.target.value })}
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Invoice Items
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Hours</TableCell>
                    <TableCell align="right">Rate ($)</TableCell>
                    <TableCell align="right">Amount ($)</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoiceDetails.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.description}</TableCell>
                      <TableCell align="right">{item.hours}</TableCell>
                      <TableCell align="right">{item.rate}</TableCell>
                      <TableCell align="right">{(item.hours * item.rate).toFixed(2)}</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => handleDeleteItem(item.id)} size="small">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>
                      <TextField
                        fullWidth
                        label="Description"
                        value={newItem.description}
                        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        type="number"
                        value={newItem.hours}
                        onChange={(e) => setNewItem({ ...newItem, hours: parseFloat(e.target.value) })}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        type="number"
                        value={newItem.rate}
                        onChange={(e) => setNewItem({ ...newItem, rate: parseFloat(e.target.value) })}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {newItem.hours && newItem.rate ? (newItem.hours * newItem.rate).toFixed(2) : '0.00'}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={handleAddItem} color="primary" size="small">
                        <AddIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">
                Total: ${calculateTotal().toFixed(2)}
              </Typography>
            </Box>

            <Box sx={{ mt: 3 }}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={3}
                value={invoiceDetails.notes}
                onChange={(e) => setInvoiceDetails({ ...invoiceDetails, notes: e.target.value })}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Invoice Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Invoice Number"
                  value={invoiceDetails.invoiceNumber}
                  onChange={(e) => setInvoiceDetails({ ...invoiceDetails, invoiceNumber: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Invoice Date"
                    value={invoiceDetails.date}
                    onChange={(newValue: Dayjs | null) => 
                      newValue && setInvoiceDetails({ ...invoiceDetails, date: newValue })}
                    sx={{ width: '100%' }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Due Date"
                    value={invoiceDetails.dueDate}
                    onChange={(newValue: Dayjs | null) => 
                      newValue && setInvoiceDetails({ ...invoiceDetails, dueDate: newValue })}
                    sx={{ width: '100%' }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PreviewIcon />}
                onClick={handlePreview}
                fullWidth
              >
                Preview
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DownloadIcon />}
                onClick={handleDownload}
                fullWidth
              >
                Download
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Invoice Preview</DialogTitle>
        <DialogContent>
          <Container maxWidth="md" sx={{ py: 4 }} ref={targetRef}>
            {/* Company Information */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" gutterBottom>INVOICE</Typography>
              <Typography variant="body1">Your Company Name</Typography>
              <Typography variant="body2" color="text.secondary">
                123 Business Street<br />
                City, State 12345<br />
                contact@yourcompany.com
              </Typography>
            </Box>

            {/* Client & Invoice Details */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>Bill To:</Typography>
                <Typography variant="body1">{invoiceDetails.clientName}</Typography>
                <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
                  {invoiceDetails.clientAddress}
                </Typography>
                <Typography variant="body2">{invoiceDetails.clientEmail}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="body2">
                    Invoice #: {invoiceDetails.invoiceNumber}
                  </Typography>
                  <Typography variant="body2">
                    Date: {invoiceDetails.date.format('MMMM D, YYYY')}
                  </Typography>
                  <Typography variant="body2">
                    Due Date: {invoiceDetails.dueDate.format('MMMM D, YYYY')}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Invoice Items */}
            <TableContainer component={Paper} sx={{ mb: 4 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'primary.main' }}>
                    <TableCell sx={{ color: 'white' }}>Description</TableCell>
                    <TableCell align="right" sx={{ color: 'white' }}>Hours</TableCell>
                    <TableCell align="right" sx={{ color: 'white' }}>Rate ($)</TableCell>
                    <TableCell align="right" sx={{ color: 'white' }}>Amount ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoiceDetails.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.description}</TableCell>
                      <TableCell align="right">{item.hours}</TableCell>
                      <TableCell align="right">{item.rate.toFixed(2)}</TableCell>
                      <TableCell align="right">{(item.hours * item.rate).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} align="right" sx={{ fontWeight: 'bold' }}>
                      Total:
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                      ${calculateTotal().toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {/* Notes */}
            {invoiceDetails.notes && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>Notes:</Typography>
                <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
                  {invoiceDetails.notes}
                </Typography>
              </Box>
            )}

            {/* Payment Terms */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Payment Terms: Net {invoiceDetails.dueDate.diff(invoiceDetails.date, 'day')} days
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Please include the invoice number with your payment.
              </Typography>
            </Box>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>Close</Button>
          <Button onClick={handleDownload} variant="contained" color="primary" startIcon={<DownloadIcon />}>
            Download PDF
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InvoiceGenerator;
