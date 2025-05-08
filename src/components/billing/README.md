# Billing Components

This directory contains components related to billing functionality in the Hospital Management System.

## BillingForm Component

The `BillingForm` component provides a comprehensive interface for creating and managing patient bills.

### Features

- **Patient Information Display**: Shows patient ID, name, age, gender, and contact information.
- **Dynamic Billing Items**: Add, edit, or remove billing items with auto-calculation of amounts.
- **Auto-suggest Particulars**: Dropdown with common billing items and their default rates.
- **Automatic Calculations**: 
  - Item amount = (Quantity × Rate) - Discount
  - Total, Net Amount, and Due Amount are calculated automatically.
- **Print View**: Generates a clean, printable invoice layout.

### Usage

```jsx
import { BillingForm } from '../components/billing';

// In your component:
const [billingOpen, setBillingOpen] = useState(false);
const [selectedPatient, setSelectedPatient] = useState(null);

// Open the billing form
const handleOpenBilling = (patient) => {
  setSelectedPatient(patient);
  setBillingOpen(true);
};

// In your JSX:
<BillingForm 
  open={billingOpen}
  onClose={() => setBillingOpen(false)}
  patientData={selectedPatient}
/>
```

### Props

- `open` (boolean): Controls the visibility of the billing form dialog.
- `onClose` (function): Callback function when the dialog is closed.
- `patientData` (object): Patient information with the following structure:
  ```js
  {
    patientId: 'PT12345',
    patientName: 'John Doe',
    age: 45,
    gender: 'Male',
    contactNumber: '9876543210'
  }
  ```

### Integration with Appointment Table

The BillingForm is integrated with the AppointmentsTable component. When a user clicks on an appointment row or the "Bill" button in the Billing column, the BillingForm opens with the patient information pre-filled.

### Customization

You can customize the billing items by modifying the `BILLING_ITEMS` array in the BillingForm component.