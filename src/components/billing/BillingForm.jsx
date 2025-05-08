import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Autocomplete,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Print as PrintIcon,
  Close as CloseIcon,
  Save as SaveIcon
} from '@mui/icons-material';

// Mock data for billing items
const BILLING_ITEMS = [
  { id: 1, name: 'CONSULTATION FEE', defaultRate: 500 },
  { id: 2, name: 'CONSULTANT FEES (DR.KRISHNA)', defaultRate: 1000 },
  { id: 3, name: 'X-RAY', defaultRate: 800 },
  { id: 4, name: 'BLOOD TEST - COMPLETE', defaultRate: 1200 },
  { id: 5, name: 'BLOOD TEST - BASIC', defaultRate: 600 },
  { id: 6, name: 'ECG', defaultRate: 500 },
  { id: 7, name: 'ULTRASOUND', defaultRate: 1500 },
  { id: 8, name: 'CT SCAN', defaultRate: 5000 },
  { id: 9, name: 'MRI', defaultRate: 8000 },
  { id: 10, name: 'ROOM CHARGES - GENERAL', defaultRate: 1000 },
  { id: 11, name: 'ROOM CHARGES - PRIVATE', defaultRate: 3000 },
  { id: 12, name: 'ROOM CHARGES - ICU', defaultRate: 5000 },
  { id: 13, name: 'MEDICINE CHARGES', defaultRate: 0 },
  { id: 14, name: 'INJECTION FEE', defaultRate: 100 },
  { id: 15, name: 'DRESSING CHARGES', defaultRate: 200 }
];

const BillingForm = ({ open, onClose, patientData }) => {
  // Default patient data if not provided
  const defaultPatient = {
    patientId: 'PT12345',
    patientName: 'John Doe',
    age: 45,
    gender: 'Male',
    contactNumber: '9876543210'
  };

  const patient = patientData || defaultPatient;

  // State for billing items
  const [billingItems, setBillingItems] = useState([
    { id: 1, particular: null, quantity: 1, rate: 0, discount: 0, amount: 0 }
  ]);

  // State for summary
  const [summary, setSummary] = useState({
    total: 0,
    discount: 0,
    net: 0,
    amountPaid: 0,
    dueAmount: 0
  });

  // State for print dialog
  const [printDialogOpen, setPrintDialogOpen] = useState(false);

  // Calculate amount for a single item
  const calculateItemAmount = (item) => {
    if (!item.particular) return 0;
    const amount = (item.quantity * item.rate) - item.discount;
    return amount > 0 ? amount : 0;
  };

  // Calculate summary totals
  const calculateSummary = (items) => {
    const total = items.reduce((sum, item) => sum + calculateItemAmount(item), 0);
    const totalDiscount = items.reduce((sum, item) => sum + (item.discount || 0), 0);
    const net = total;
    const dueAmount = net - summary.amountPaid;

    setSummary({
      ...summary,
      total,
      discount: totalDiscount,
      net,
      dueAmount
    });
  };

  // Update calculations when billing items change
  useEffect(() => {
    const updatedItems = billingItems.map(item => ({
      ...item,
      amount: calculateItemAmount(item)
    }));
    setBillingItems(updatedItems);
    calculateSummary(updatedItems);
  }, [billingItems.map(item => `${item.quantity}-${item.rate}-${item.discount}`)]);

  // Handle adding a new billing item
  const handleAddItem = () => {
    setBillingItems([
      ...billingItems,
      { 
        id: billingItems.length + 1, 
        particular: null, 
        quantity: 1, 
        rate: 0, 
        discount: 0, 
        amount: 0 
      }
    ]);
  };

  // Handle removing a billing item
  const handleRemoveItem = (index) => {
    const updatedItems = billingItems.filter((_, i) => i !== index);
    setBillingItems(updatedItems);
  };

  // Handle changes to billing item fields
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...billingItems];
    
    if (field === 'particular') {
      updatedItems[index].particular = value;
      // Set default rate if a particular is selected
      if (value) {
        const selectedItem = BILLING_ITEMS.find(item => item.name === value.name);
        updatedItems[index].rate = selectedItem ? selectedItem.defaultRate : 0;
      } else {
        updatedItems[index].rate = 0;
      }
    } else {
      updatedItems[index][field] = value;
    }
    
    // Calculate the amount
    updatedItems[index].amount = calculateItemAmount(updatedItems[index]);
    
    setBillingItems(updatedItems);
  };

  // Handle amount paid change
  const handleAmountPaidChange = (e) => {
    const amountPaid = parseFloat(e.target.value) || 0;
    setSummary({
      ...summary,
      amountPaid,
      dueAmount: summary.net - amountPaid
    });
  };

  // Handle print button click
  const handlePrint = () => {
    setPrintDialogOpen(true);
  };

  // Handle save button click
  const handleSave = () => {
    console.log('Saving billing data:', { patient, billingItems, summary });
    // Here you would typically make an API call to save the data
    alert('Billing data saved successfully!');
  };

  // Print view component
  const PrintView = () => (
    <Box sx={{ p: 3, bgcolor: 'white', color: 'black' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">HOSPITAL MANAGEMENT SYSTEM</Typography>
        <Typography variant="h6">INVOICE</Typography>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Typography variant="body1"><strong>Patient ID:</strong> {patient.patientId}</Typography>
          <Typography variant="body1"><strong>Patient Name:</strong> {patient.patientName}</Typography>
          <Typography variant="body1"><strong>Age/Gender:</strong> {patient.age}/{patient.gender}</Typography>
          <Typography variant="body1"><strong>Contact:</strong> {patient.contactNumber}</Typography>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <Typography variant="body1"><strong>Invoice No:</strong> INV-{Math.floor(Math.random() * 10000)}</Typography>
          <Typography variant="body1"><strong>Date:</strong> {new Date().toLocaleDateString()}</Typography>
        </Grid>
      </Grid>
      
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
              <TableCell>S.No</TableCell>
              <TableCell>Particulars</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Rate</TableCell>
              <TableCell align="right">Discount</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {billingItems.map((item, index) => (
              item.particular && (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.particular.name}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">₹{item.rate.toFixed(2)}</TableCell>
                  <TableCell align="right">₹{item.discount.toFixed(2)}</TableCell>
                  <TableCell align="right">₹{item.amount.toFixed(2)}</TableCell>
                </TableRow>
              )
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Grid container spacing={1} sx={{ maxWidth: 300 }}>
          <Grid item xs={6}><Typography variant="body1">Total:</Typography></Grid>
          <Grid item xs={6} sx={{ textAlign: 'right' }}><Typography variant="body1">₹{summary.total.toFixed(2)}</Typography></Grid>
          
          <Grid item xs={6}><Typography variant="body1">Discount:</Typography></Grid>
          <Grid item xs={6} sx={{ textAlign: 'right' }}><Typography variant="body1">₹{summary.discount.toFixed(2)}</Typography></Grid>
          
          <Grid item xs={6}><Typography variant="body1"><strong>Net Amount:</strong></Typography></Grid>
          <Grid item xs={6} sx={{ textAlign: 'right' }}><Typography variant="body1"><strong>₹{summary.net.toFixed(2)}</strong></Typography></Grid>
          
          <Grid item xs={6}><Typography variant="body1">Amount Paid:</Typography></Grid>
          <Grid item xs={6} sx={{ textAlign: 'right' }}><Typography variant="body1">₹{summary.amountPaid.toFixed(2)}</Typography></Grid>
          
          <Grid item xs={6}><Typography variant="body1"><strong>Due Amount:</strong></Typography></Grid>
          <Grid item xs={6} sx={{ textAlign: 'right' }}><Typography variant="body1"><strong>₹{summary.dueAmount.toFixed(2)}</strong></Typography></Grid>
        </Grid>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body2">Thank you for choosing our services!</Typography>
        <Typography variant="body2">For any queries, please contact: 1800-123-4567</Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose}
        maxWidth="md"
        fullWidth
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: '#f5f5f5' }}>
          <Typography variant="h6">Billing</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <DialogContent>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1"><strong>Patient ID:</strong> {patient.patientId}</Typography>
                  <Typography variant="body1"><strong>Patient Name:</strong> {patient.patientName}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1"><strong>Age/Gender:</strong> {patient.age}/{patient.gender}</Typography>
                  <Typography variant="body1"><strong>Contact:</strong> {patient.contactNumber}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          
          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                  <TableCell>S.No</TableCell>
                  <TableCell>Particulars</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Rate</TableCell>
                  <TableCell align="right">Discount</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {billingItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell sx={{ minWidth: 200 }}>
                      <Autocomplete
                        options={BILLING_ITEMS}
                        getOptionLabel={(option) => option.name}
                        value={item.particular}
                        onChange={(_, newValue) => handleItemChange(index, 'particular', newValue)}
                        renderInput={(params) => <TextField {...params} size="small" placeholder="Select item" />}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        size="small"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', Math.max(1, parseInt(e.target.value) || 1))}
                        inputProps={{ min: 1, style: { textAlign: 'right' } }}
                        sx={{ width: 80 }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        size="small"
                        value={item.rate}
                        onChange={(e) => handleItemChange(index, 'rate', Math.max(0, parseFloat(e.target.value) || 0))}
                        inputProps={{ min: 0, style: { textAlign: 'right' } }}
                        sx={{ width: 100 }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        size="small"
                        value={item.discount}
                        onChange={(e) => handleItemChange(index, 'discount', Math.max(0, parseFloat(e.target.value) || 0))}
                        inputProps={{ min: 0, style: { textAlign: 'right' } }}
                        sx={{ width: 100 }}
                      />
                    </TableCell>
                    <TableCell align="right">₹{item.amount.toFixed(2)}</TableCell>
                    <TableCell align="center">
                      <IconButton 
                        size="small" 
                        color="error" 
                        onClick={() => handleRemoveItem(index)}
                        disabled={billingItems.length === 1}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Button 
              variant="outlined" 
              startIcon={<AddIcon />} 
              onClick={handleAddItem}
            >
              Add Item
            </Button>
            
            <Grid container spacing={1} sx={{ maxWidth: 300 }}>
              <Grid item xs={6}><Typography variant="body1">Total:</Typography></Grid>
              <Grid item xs={6} sx={{ textAlign: 'right' }}><Typography variant="body1">₹{summary.total.toFixed(2)}</Typography></Grid>
              
              <Grid item xs={6}><Typography variant="body1">Discount:</Typography></Grid>
              <Grid item xs={6} sx={{ textAlign: 'right' }}><Typography variant="body1">₹{summary.discount.toFixed(2)}</Typography></Grid>
              
              <Grid item xs={6}><Typography variant="body1"><strong>Net Amount:</strong></Typography></Grid>
              <Grid item xs={6} sx={{ textAlign: 'right' }}><Typography variant="body1"><strong>₹{summary.net.toFixed(2)}</strong></Typography></Grid>
              
              <Grid item xs={6}><Typography variant="body1">Amount Paid:</Typography></Grid>
              <Grid item xs={6}>
                <TextField
                  type="number"
                  size="small"
                  value={summary.amountPaid}
                  onChange={handleAmountPaidChange}
                  inputProps={{ min: 0, style: { textAlign: 'right' } }}
                  sx={{ width: '100%' }}
                />
              </Grid>
              
              <Grid item xs={6}><Typography variant="body1"><strong>Due Amount:</strong></Typography></Grid>
              <Grid item xs={6} sx={{ textAlign: 'right' }}><Typography variant="body1"><strong>₹{summary.dueAmount.toFixed(2)}</strong></Typography></Grid>
            </Grid>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
          <Button variant="outlined">Indent</Button>
          <Box>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<PrintIcon />} 
              onClick={handlePrint}
              sx={{ mr: 1 }}
            >
              Print
            </Button>
            <Button 
              variant="contained" 
              color="success" 
              startIcon={<SaveIcon />} 
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      
      {/* Print Dialog */}
      <Dialog 
        open={printDialogOpen} 
        onClose={() => setPrintDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <PrintView />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPrintDialogOpen(false)}>Close</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => {
              window.print();
              // Alternatively, you could use a library like react-to-print
            }}
          >
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BillingForm;