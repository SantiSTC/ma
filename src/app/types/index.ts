export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  imageUrl: string;
}

export interface Paciente {
  name: string;
  dni: string;
  fechaNacimiento: string;
  obraSocial: string;
  planObraSocial: string;
  email: string;
  telefono: string;
  img: string;
}

export interface Turno {
  id: string;
  paciente_dni: string;
  paciente_name: string;
  especialista: Doctor;
  fecha: string;
  hora: string;
  estado: string;
  modalidad: string;
  resumen: string;
}