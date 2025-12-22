import { Turno } from "../../types";
import { mockDoctors } from "./doctors";

// Datos de turnos médicos de ejemplo (resúmenes realistas)
export const mockAppointments: Turno[] = [
  {
    id: 't1',
    paciente_dni: '40123456',
    paciente_name: 'Lucas Fernández',
    especialista: mockDoctors[0], // Cardiología
    fecha: '2025-01-05',
    hora: '09:30',
    estado: "confirmado",
    modalidad: "presencial",
    resumen: "Consulta cardiológica inicial por episodios de palpitaciones y cansancio. Control de presión arterial, electrocardiograma y evaluación de antecedentes familiares."
  },
  {
    id: 't2',
    paciente_dni: '38987654',
    paciente_name: 'María López',
    especialista: mockDoctors[1], // Neurología
    fecha: '2025-02-12',
    hora: '11:00',
    estado: "confirmado",
    modalidad: "presencial",
    resumen: "Consulta neurológica por cefaleas frecuentes y mareos. Evaluación clínica, revisión de estudios previos y ajuste de medicación analgésica."
  },
  {
    id: 't3',
    paciente_dni: '41222333',
    paciente_name: 'Juan Pérez',
    especialista: mockDoctors[2], // Pediatría
    fecha: '2025-03-20',
    hora: '15:00',
    estado: "confirmado",
    modalidad: "presencial",
    resumen: "Control pediátrico de rutina. Seguimiento de crecimiento y desarrollo, control de calendario de vacunación y orientación a los padres."
  },
  {
    id: 't4',
    paciente_dni: '39555111',
    paciente_name: 'Camila Torres',
    especialista: mockDoctors[0], // Cardiología
    fecha: '2025-04-08',
    hora: '10:15',
    estado: "confirmado",
    modalidad: "presencial",
    resumen: "Seguimiento cardiológico por hipertensión arterial. Revisión de hábitos, control de presión y ajustes en el tratamiento indicado."
  },
  {
    id: 't5',
    paciente_dni: '42111999',
    paciente_name: 'Nicolás Romero',
    especialista: mockDoctors[1], // Neurología
    fecha: '2025-06-03',
    hora: '14:30',
    estado: "confirmado",
    modalidad: "presencial",
    resumen: "Evaluación neurológica por hormigueos en extremidades superiores. Examen clínico completo y solicitud de estudios complementarios."
  },
  {
    id: 't6',
    paciente_dni: '37777888',
    paciente_name: 'Florencia Díaz',
    especialista: mockDoctors[2], // Pediatría
    fecha: '2025-07-19',
    hora: '09:00',
    estado: "confirmado",
    modalidad: "presencial",
    resumen: "Consulta pediátrica por cuadro respiratorio leve. Evaluación general, indicaciones de tratamiento y recomendaciones de seguimiento."
  },
  {
    id: 't7',
    paciente_dni: '40999888',
    paciente_name: 'Tomás Álvarez',
    especialista: mockDoctors[0], // Cardiología
    fecha: '2025-08-27',
    hora: '16:45',
    estado: "confirmado",
    modalidad: "presencial",
    resumen: "Chequeo cardiológico preventivo. Control clínico general, evaluación de factores de riesgo y recomendaciones de actividad física."
  },
  {
    id: 't8',
    paciente_dni: '38888777',
    paciente_name: 'Valentina Suárez',
    especialista: mockDoctors[1], // Neurología
    fecha: '2025-10-10',
    hora: '13:00',
    estado: "confirmado",
    modalidad: "presencial",
    resumen: "Consulta por trastornos del sueño y fatiga persistente. Entrevista clínica detallada y planificación de estudios diagnósticos."
  },
  {
    id: 't9',
    paciente_dni: '43444555',
    paciente_name: 'Mateo Herrera',
    especialista: mockDoctors[2], // Pediatría
    fecha: '2025-11-22',
    hora: '17:30',
    estado: "confirmado",
    modalidad: "presencial",
    resumen: "Control pediátrico previo al ingreso escolar. Evaluación integral, controles de peso y talla, y certificación médica."
  },
  {
    id: 't10',
    paciente_dni: '39666777',
    paciente_name: 'Agustina Molina',
    especialista: mockDoctors[0], // Cardiología
    fecha: '2025-12-23',
    hora: '08:45',
    estado: "confirmado",
    modalidad: "presencial",
    resumen: "Consulta cardiológica por dolor torácico atípico. Evaluación clínica, electrocardiograma y definición de conducta a seguir."
  },
];
