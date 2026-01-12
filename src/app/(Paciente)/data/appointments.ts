import { Turno } from "../../types";
import { mockDoctors } from "./doctors";

export const mockAppointments: Turno[] = [
  {
    id: "t1",
    paciente_dni: "30123456",
    paciente_name: "Juan Pérez",
    especialista: mockDoctors[1], // d1 Traumatología
    fecha: "2025-12-15",
    hora: "09:00",
    estado: "confirmado",
    modalidad: "presencial",
    resumen: "Consulta por dolor persistente en rodilla derecha tras actividad deportiva."
  },
  {
    id: "t2",
    paciente_dni: "28987654",
    paciente_name: "María González",
    especialista: mockDoctors[1],
    fecha: "2025-12-26",
    hora: "10:30",
    estado: "pendiente",
    modalidad: "presencial",
    resumen: "Evaluación traumatológica por molestias cervicales y rigidez matinal."
  },
  {
    id: "t3",
    paciente_dni: "33456789",
    paciente_name: "Lucas Fernández",
    especialista: mockDoctors[3], // Pediatría
    fecha: "2025-12-10",
    hora: "15:00",
    estado: "confirmado",
    modalidad: "presencial",
    resumen: "Consulta de control general y seguimiento de desarrollo."
  },
  {
    id: "t4",
    paciente_dni: "31222444",
    paciente_name: "Camila Rodríguez",
    especialista: mockDoctors[1],
    fecha: "2025-12-29",
    hora: "11:15",
    estado: "pendiente",
    modalidad: "presencial",
    resumen: "Dolor lumbar bajo. Evaluación postural y solicitud de estudios."
  },
  {
    id: "t5",
    paciente_dni: "27888999",
    paciente_name: "Nicolás López",
    especialista: mockDoctors[0], // Cardiología
    fecha: "2025-12-05",
    hora: "08:45",
    estado: "confirmado",
    modalidad: "presencial",
    resumen: "Control cardiológico de rutina con medición de presión arterial."
  },
  {
    id: "t6",
    paciente_dni: "35666777",
    paciente_name: "Florencia Martínez",
    especialista: mockDoctors[1],
    fecha: "2025-12-23",
    hora: "09:45",
    estado: "confirmado",
    modalidad: "presencial",
    resumen: "Consulta por esguince de tobillo. Evaluación funcional."
  },
  {
    id: "t7",
    paciente_dni: "26777111",
    paciente_name: "Sebastián Romero",
    especialista: mockDoctors[2], // Neurología
    fecha: "2025-12-23",
    hora: "14:00",
    estado: "confirmado",
    modalidad: "presencial",
    resumen: "Consulta por cefaleas tensionales recurrentes."
  },
  {
    id: "t8",
    paciente_dni: "40123456",
    paciente_name: "Valentina Suárez",
    especialista: mockDoctors[1],
    fecha: "2025-12-23",
    hora: "10:00",
    estado: "confirmado",
    modalidad: "presencial",
    resumen: "Molestias en muñeca por uso prolongado de computadora."
  },
  {
    id: "t9",
    paciente_dni: "29555444",
    paciente_name: "Matías Herrera",
    especialista: mockDoctors[6], // Cardiología
    fecha: "2025-12-11",
    hora: "16:30",
    estado: "confirmado",
    modalidad: "presencial",
    resumen: "Chequeo cardiovascular preventivo."
  },
  {
    id: "t10",
    paciente_dni: "36888999",
    paciente_name: "Agustina Torres",
    especialista: mockDoctors[1],
    fecha: "2025-12-30",
    hora: "08:30",
    estado: "cancelado",
    modalidad: "presencial",
    resumen: "Dolor en hombro izquierdo. Evaluación por posible tendinitis."
  },
  {
    id: "t11",
    paciente_dni: "30123456",
    paciente_name: "Juan Pérez",
    especialista: mockDoctors[1],
    fecha: "2025-12-26",
    hora: "12:00",
    estado: "confirmado",
    modalidad: "presencial",
    resumen: "Seguimiento traumatológico post tratamiento."
  },
  {
    id: "t12",
    paciente_dni: "28987654",
    paciente_name: "María González",
    especialista: mockDoctors[5], // Dermatología
    fecha: "2025-12-14",
    hora: "13:15",
    estado: "confirmado",
    modalidad: "presencial",
    resumen: "Consulta dermatológica por lesiones cutáneas."
  },
  {
    id: "t13",
    paciente_dni: "33456789",
    paciente_name: "Lucas Fernández",
    especialista: mockDoctors[1],
    fecha: "2025-12-27",
    hora: "09:30",
    estado: "confirmado",
    modalidad: "presencial",
    resumen: "Evaluación por dolor en rodilla tras entrenamiento."
  },
  {
    id: "t14",
    paciente_dni: "31222444",
    paciente_name: "Camila Rodríguez",
    especialista: mockDoctors[7], // Pediatría
    fecha: "2025-12-09",
    hora: "10:00",
    estado: "confirmado",
    modalidad: "presencial",
    resumen: "Consulta pediátrica de control."
  },
  {
    id: "t15",
    paciente_dni: "27888999",
    paciente_name: "Nicolás López",
    especialista: mockDoctors[1],
    fecha: "2025-12-23",
    hora: "17:00",
    estado: "confirmado",
    modalidad: "presencial",
    resumen: "Consulta por dolor lumbar irradiado."
  },
  {
    id: "t16",
    paciente_dni: "35666777",
    paciente_name: "Florencia Martínez",
    especialista: mockDoctors[2],
    fecha: "2025-12-20",
    hora: "11:45",
    estado: "confirmado",
    modalidad: "presencial",
    resumen: "Evaluación neurológica por mareos."
  },
  {
    id: "t17",
    paciente_dni: "26777111",
    paciente_name: "Sebastián Romero",
    especialista: mockDoctors[1],
    fecha: "2025-12-28",
    hora: "15:30",
    estado: "confirmado",
    modalidad: "presencial",
    resumen: "Control traumatológico de rodilla operada."
  },
  {
    id: "t18",
    paciente_dni: "40123456",
    paciente_name: "Valentina Suárez",
    especialista: mockDoctors[0],
    fecha: "2025-12-13",
    hora: "09:15",
    estado: "confirmado",
    modalidad: "presencial",
    resumen: "Chequeo cardiológico preventivo."
  },
  {
    id: "t19",
    paciente_dni: "29555444",
    paciente_name: "Matías Herrera",
    especialista: mockDoctors[1],
    fecha: "2025-12-23",
    hora: "18:15",
    estado: "confirmado",
    modalidad: "presencial",
    resumen: "Dolor en cadera. Evaluación clínica."
  },
  {
    id: "t20",
    paciente_dni: "36888999",
    paciente_name: "Agustina Torres",
    especialista: mockDoctors[4], // Oncología
    fecha: "2025-12-19",
    hora: "10:45",
    estado: "confirmado",
    modalidad: "presencial",
    resumen: "Consulta oncológica de seguimiento."
  },
];
