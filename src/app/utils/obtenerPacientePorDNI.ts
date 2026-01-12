import { mockPacientes } from "../(Paciente)/data/pacientes";
import { Paciente } from "../types";

export const obtenerPacientePorDNI = (dni: string): Paciente | null => {
  const paciente = mockPacientes.find((paciente) => paciente.dni === dni);

  return paciente ?? null;
};
