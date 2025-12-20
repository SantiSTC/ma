export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  imageUrl: string;
}

export interface Turno {
  id: string;
  paciente_dni: string;
  paciente_name: string;
  especialista: Doctor;
  fecha: string;
  hora: string;
}