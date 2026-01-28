export interface Doctor {
  id: string;
  name: string;
  about: string;
  tuition: string;
  phone: string;
  email: string;
  university: string;
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
  fecha: string; // YYYY-MM-DD
  hora: string;  // HH:mm
  estado: "confirmado" | "pendiente" | "cancelado";
  modalidad: "presencial" | "virtual";
  resumen: string;
  rechazadoPor: "paciente" | "doctor" | null;
  motivoCancelacion: string | null;
}