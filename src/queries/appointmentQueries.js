// Appointment Query functions
import { api } from '../api/axios';

// Fetch appointments with optional filters
export const fetchAppointments = async ({ date, patientId, patientName, tokenNo, doctorId }) => {
  // Use the getAppointmentByDoctorId endpoint as specified
  const payload = {
    AppointmentDate: date ? `${date}T00:00:00` : new Date().toISOString(),
    DoctorId: doctorId || 1 // Default to doctor ID 1 if not provided
  };
  
  try {
    const res = await api.post('/appointment/getAppointmentByDoctorId', payload);
    
    if (!res.data) throw new Error('Network error');
    
    // Transform the response to match the expected format
    const appointments = [];
    let stats = {
      booked: 0,
      reviewed: 0,
      cancelled: 0,
      completed: 0,
      total: 0
    };
    
    if (res.data.appointmentId && res.data.appointmentId.slots) {
      // Extract doctor information
      const doctorInfo = {
        doctorId: res.data.appointmentId.doctorId,
        doctorName: res.data.appointmentId.doctorName,
        date: res.data.appointmentId.date,
        day: res.data.appointmentId.day,
        branchId: res.data.appointmentId.branchId
      };
      
      // Process slots
      res.data.appointmentId.slots.forEach((slot, index) => {
        // Count total slots
        stats.total++;
        
        // Determine status for statistics
        if (slot.status === 'Booked') {
          stats.booked++;
        } else if (slot.status === 'Available') {
          // Don't count available slots in any category
        } else if (slot.appointment) {
          // Count based on appointment status
          const status = slot.appointment.appointmentStatus;
          if (status === 'Scheduled') stats.booked++;
          else if (status === 'Completed') stats.completed++;
          else if (status === 'Cancelled') stats.cancelled++;
          else if (status === 'Reviewed') stats.reviewed++;
        }
        
        // Add all slots to the appointments array, even if they don't have an appointment
        const appointment = slot.appointment || {};
        appointments.push({
          id: appointment.appointmentId || `slot-${slot.slotStart}-${index}`,
          tokenNo: appointment.appointmentId ? `T${appointment.appointmentId}` : '',
          time: slot.slotStart, // Map time to slot start
          inTime: appointment.appointmentStartTime || '',
          outTime: appointment.appointmentEndTime || '',
          patientId: appointment.patientId || '',
          patientName: appointment.patientName || '',
          visitPurpose: appointment.visitingPurpose || '',
          status: appointment.appointmentStatus || slot.status,
          billing: appointment.appointmentId ? 'Pending' : 'N/A',
          nextVisit: 'N/A',
          isTeleconsultant: slot.isTeleconsultant, // Add teleconsultation flag
          doctorInfo: doctorInfo,
          isEmpty: !slot.appointment && slot.status === 'Available',
          slotEnd: slot.slotEnd
        });
      });
    }
    
    return { 
      appointments,
      stats,
      doctorInfo: res.data.appointmentId ? {
        doctorId: res.data.appointmentId.doctorId,
        doctorName: res.data.appointmentId.doctorName,
        date: res.data.appointmentId.date,
        day: res.data.appointmentId.day
      } : null
    };
  } 
  catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

// Mock data for development (will be removed in production)
export const getMockAppointments = () => {
  const appointments = [
    {
      id: 1,
      tokenNo: 'T1',
      time: '09:00',
      inTime: '08:55',
      outTime: '09:30',
      patientId: 'PT001',
      patientName: 'John Smith',
      visitPurpose: 'General Checkup',
      status: 'Booked',
      billing: 'Pending',
      nextVisit: '15 Dec 2023',
      isTeleconsultant: true,
      isEmpty: false,
      slotEnd: '09:30'
    },
    {
      id: 'slot-09:30-1',
      tokenNo: '',
      time: '09:30',
      inTime: '',
      outTime: '',
      patientId: '',
      patientName: '',
      visitPurpose: '',
      status: 'Available',
      billing: 'N/A',
      nextVisit: 'N/A',
      isTeleconsultant: true,
      isEmpty: true,
      slotEnd: '09:45'
    },
    {
      id: 2,
      tokenNo: 'T2',
      time: '10:00',
      inTime: '09:55',
      outTime: '10:40',
      patientId: 'PT002',
      patientName: 'Sarah Johnson',
      visitPurpose: 'Follow-up',
      status: 'Reviewed',
      billing: 'Completed',
      nextVisit: '22 Dec 2023',
      isTeleconsultant: false,
      isEmpty: false,
      slotEnd: '10:30'
    },
    {
      id: 'slot-10:30-3',
      tokenNo: '',
      time: '10:30',
      inTime: '',
      outTime: '',
      patientId: '',
      patientName: '',
      visitPurpose: '',
      status: 'Available',
      billing: 'N/A',
      nextVisit: 'N/A',
      isTeleconsultant: false,
      isEmpty: true,
      slotEnd: '10:45'
    },
    {
      id: 3,
      tokenNo: 'T3',
      time: '11:00',
      inTime: '10:50',
      outTime: '11:25',
      patientId: 'PT003',
      patientName: 'Michael Brown',
      visitPurpose: 'Consultation',
      status: 'Booked',
      billing: 'Pending',
      nextVisit: '18 Dec 2023',
      isTeleconsultant: true,
      isEmpty: false,
      slotEnd: '11:15'
    },
    {
      id: 4,
      tokenNo: 'T4',
      time: '12:00',
      inTime: '11:55',
      outTime: '12:30',
      patientId: 'PT004',
      patientName: 'Emily Davis',
      visitPurpose: 'Vaccination',
      status: 'Cancelled',
      billing: 'N/A',
      nextVisit: 'N/A',
      isTeleconsultant: false,
      isEmpty: false,
      slotEnd: '12:15'
    },
    {
      id: 'slot-13:00-6',
      tokenNo: '',
      time: '13:00',
      inTime: '',
      outTime: '',
      patientId: '',
      patientName: '',
      visitPurpose: '',
      status: 'Available',
      billing: 'N/A',
      nextVisit: 'N/A',
      isTeleconsultant: true,
      isEmpty: true,
      slotEnd: '13:15'
    },
    {
      id: 'slot-13:30-7',
      tokenNo: '',
      time: '13:30',
      inTime: '',
      outTime: '',
      patientId: '',
      patientName: '',
      visitPurpose: '',
      status: 'Available',
      billing: 'N/A',
      nextVisit: 'N/A',
      isTeleconsultant: false,
      isEmpty: true,
      slotEnd: '13:45'
    },
    {
      id: 5,
      tokenNo: 'T5',
      time: '14:00',
      inTime: '13:55',
      outTime: '14:35',
      patientId: 'PT005',
      patientName: 'Robert Wilson',
      visitPurpose: 'Lab Results',
      status: 'Completed',
      billing: 'Completed',
      nextVisit: '05 Jan 2024',
      isTeleconsultant: false,
      isEmpty: false,
      slotEnd: '14:15'
    },
    {
      id: 6,
      tokenNo: 'T6',
      time: '15:00',
      inTime: '14:55',
      outTime: '15:20',
      patientId: 'PT006',
      patientName: 'Jennifer Lee',
      visitPurpose: 'Prescription Refill',
      status: 'Booked',
      billing: 'Pending',
      nextVisit: '20 Dec 2023',
      isTeleconsultant: true,
      isEmpty: false,
      slotEnd: '15:15'
    },
    {
      id: 7,
      tokenNo: 'T7',
      time: '16:00',
      inTime: '15:50',
      outTime: '16:30',
      patientId: 'PT007',
      patientName: 'David Miller',
      visitPurpose: 'Annual Checkup',
      status: 'Booked',
      billing: 'Pending',
      nextVisit: '10 Dec 2024',
      isTeleconsultant: false,
      isEmpty: false,
      slotEnd: '16:15'
    },
  ];
  
  // Calculate stats from the appointments
  const stats = {
    booked: appointments.filter(a => a.status === 'Booked').length,
    reviewed: appointments.filter(a => a.status === 'Reviewed').length,
    cancelled: appointments.filter(a => a.status === 'Cancelled').length,
    completed: appointments.filter(a => a.status === 'Completed').length,
    total: appointments.length
  };
  
  // Mock doctor info
  const doctorInfo = {
    doctorId: 1,
    doctorName: "Dr. John Smith",
    date: "2025-03-03",
    day: "Monday",
    branchId: 1
  };
  
  return {
    appointments,
    stats,
    doctorInfo
  };
};

// Mock stats are now included in the getMockAppointments function
export const getMockStats = () => {
  return {
    booked: 15,
    reviewed: 8,
    cancelled: 3,
    completed: 12,
    total: 38
  };
};

// Book a new appointment
export const bookAppointment = async (appointmentData) => {
  try {
    const response = await api.post('/appointment/book', appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error booking appointment:', error);
    throw error;
  }
};