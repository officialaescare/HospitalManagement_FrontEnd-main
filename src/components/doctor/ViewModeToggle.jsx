import React from 'react';
import { Box, Button, ToggleButtonGroup, ToggleButton, CircularProgress } from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';

const ViewModeToggle = ({ 
  viewMode, 
  onViewModeChange, 
  onSave, 
  isSaving, 
  isDisabled 
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <ToggleButtonGroup
        value={viewMode}
        exclusive
        onChange={onViewModeChange}
        aria-label="view mode"
        color="primary"
      >
        <ToggleButton value="day" aria-label="day wise">
          Day wise
        </ToggleButton>
        <ToggleButton value="date" aria-label="date wise">
          Date wise
        </ToggleButton>
      </ToggleButtonGroup>
      
      <Button 
        variant="contained" 
        color="primary" 
        startIcon={<SaveIcon />}
        onClick={onSave}
        disabled={isDisabled || isSaving}
      >
        {isSaving ? (
          <>
            <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
            Saving...
          </>
        ) : 'Save Changes'}
      </Button>
    </Box>
  );
};

export default ViewModeToggle;