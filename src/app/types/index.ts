export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  gender: string;
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