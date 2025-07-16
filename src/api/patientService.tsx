import axiosInstance from './axiosInstance';

export interface Patient {
  id: number;
  fullName: string;
  dateOfBirth: string;
}

export const PatientService = {
  getPatients: async (): Promise<Patient[]> => {
    const response = await axiosInstance.get<Patient[]>('/patients');
    return response.data;
  },

};