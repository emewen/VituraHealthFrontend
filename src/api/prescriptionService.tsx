import axiosInstance from './axiosInstance';

export interface Prescription {
  id: number;
  patientId: number;
  drugName: string;
  dosage: string;
  datePrescribed: string;
}

export interface CreatePrescriptionPayload {
    patientId: number;
    drugName: string;
    dosage: string;
    datePrescribed: string;
}

export const PrescriptionService = {
  getPrescriptions: async (patientId: number): Promise<Prescription[]> => {
    const response = await axiosInstance.get<Prescription[]>('/prescriptions/' + patientId);
    return response.data;
  },

  createPrescription: async (payload: CreatePrescriptionPayload): Promise<Prescription> => {
    const response = await axiosInstance.post<Prescription>('/prescriptions', payload);
    return response.data;
  },
  // Add other API methods (put, delete, etc.) as needed
};