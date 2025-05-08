import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress
} from '@mui/material';

const DeleteConfirmationDialog = ({ 
  open, 
  patient, 
  loading, 
  onClose, 
  onConfirm 
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete patient {patient?.name}? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button 
          onClick={onConfirm}
          color="error"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;