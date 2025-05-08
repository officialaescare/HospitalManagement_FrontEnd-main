import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  IconButton, 
  useMediaQuery, 
  useTheme 
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import AppointmentBookingForm from './AppointmentBookingForm';

const AppointmentBookingModal = ({ 
  open, 
  onClose, 
  doctorId, 
  doctorName, 
  selectedDate, 
  selectedTime, 
  onSuccess 
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleSuccess = (data) => {
    if (onSuccess) {
      onSuccess(data);
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="lg"
      fullWidth
      scroll="paper"
      aria-labelledby="appointment-booking-dialog-title"
    >
      <DialogTitle id="appointment-booking-dialog-title" sx={{ m: 0, p: 2 }}>
        Book New Appointment
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <AppointmentBookingForm
          doctorId={doctorId}
          doctorName={doctorName}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onSuccess={handleSuccess}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentBookingModal;