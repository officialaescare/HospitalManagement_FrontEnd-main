import React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';

const RegistrationStepper = ({ steps, activeStep }) => {
  return (
    <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default RegistrationStepper;