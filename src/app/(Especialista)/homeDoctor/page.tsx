"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { actualDoctor } from "../data/actualDoctor";
import { FaPhoneAlt, FaRegBell } from "react-icons/fa";
import { IoTodaySharp } from "react-icons/io5";
import { MdFreeCancellation, MdOutlinePendingActions } from "react-icons/md";
import { mockAppointments } from "@/app/(Paciente)/data/appointments";
import { Turno } from "@/app/types";
import { obtenerPacientePorDNI } from "@/app/utils/obtenerPacientePorDNI";
import { capitalizar } from "@/app/utils/capitalizar";
import Navegacion from "../components/navegacion";

const page = () => {
  // Estados
  // Turnos filtrados del doctor actual
  const [turnosDelDoctor, setTurnosDelDoctor] = useState<Turno[]>([]);
  // Turnos que aún no han pasado (futuros)
  const [turnosProximos, setTurnosProximos] = useState<Turno[]>([]);
  // Turnos de hoy que aún no han pasado
  const [turnosDeHoy, setTurnosDeHoy] = useState<Turno[]>([]);
  // Turnos programados para mañana
  const [turnosDeMañana, setTurnosDeMañana] = useState<Turno[]>([]);

  // Fechas
  // Fecha y hora actual
  const now = new Date();
  // Fecha de hoy en formato YYYY-MM-DD
  const today = now.toISOString().split("T")[0];

  // Calcular fecha de mañana en formato YYYY-MM-DD
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  // Funciones auxiliares
  /**
   * Convierte un turno a objeto Date combinando fecha y hora
   * @param turno - El turno a convertir
   * @returns Date con la fecha y hora del turno
   */
  const turnoDateTime = (turno: Turno) => new Date(`${turno.fecha}T${turno.hora}`);

  /**
   * Ordena turnos por fecha y hora de forma ascendente
   * @param a - Primer turno a comparar
   * @param b - Segundo turno a comparar
   * @returns Número negativo si a < b, positivo si a > b, 0 si iguales
   */
  const ordenarPorFechaHoraAsc = (a: Turno, b: Turno) => {
    const dateA = new Date(`${a.fecha}T${a.hora}`);
    const dateB = new Date(`${b.fecha}T${b.hora}`);
    return dateA.getTime() - dateB.getTime();
  };

  /**
   * Formatea la fecha del turno para mostrar de forma amigable
   * @param turno - El turno cuya fecha se quiere formatear
   * @returns "Hoy", "Mañana" o la fecha en formato legible
   */
  const formatearFechaTurno = (turno: Turno): string => {
    if (turno.fecha === today) return "Hoy";
    if (turno.fecha === tomorrowStr) return "Mañana";

    // Formatear fecha en formato legible (ej: "15 de Enero")
    const fechaTurno = new Date(turno.fecha + "T00:00:00");
    return fechaTurno.toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
    });
  };

  // Efectos
  // Filtrar y ordenar turnos del doctor actual
  useEffect(() => {
    const turnos = mockAppointments
      .filter((turno) => turno.especialista.id === actualDoctor.id)
      .sort(ordenarPorFechaHoraAsc);

    setTurnosDelDoctor(turnos);
  }, [mockAppointments]);

  // Filtrar turnos próximos (futuros que aún no pasaron)
  useEffect(() => {
    const proximos = turnosDelDoctor.filter((turno) => {
      const turnoHora = turnoDateTime(turno);
      return turnoHora > now;
    });

    setTurnosProximos(proximos);
  }, [turnosDelDoctor]);

  // Filtrar turnos de hoy que aún no pasaron
  useEffect(() => {
    const hoyNoPasados = turnosDelDoctor.filter((turno) => {
      if (turno.fecha !== today) return false;

      const turnoHora = turnoDateTime(turno);
      return turnoHora > now;
    });

    setTurnosDeHoy(hoyNoPasados);
  }, [turnosDelDoctor]);

  // Filtrar turnos de mañana
  useEffect(() => {
    const mañana = turnosDelDoctor.filter((turno) => {
      return turno.fecha === tomorrowStr;
    });

    setTurnosDeMañana(mañana);
  }, [turnosDelDoctor]);

  // Lógica de visualización
  // Determinar qué turnos mostrar en la sección de agenda
  // Prioridad: turnos de hoy > turnos de mañana
  const turnosParaAgenda = turnosDeHoy.length > 0 ? turnosDeHoy : turnosDeMañana;

  // Título dinámico de la sección de agenda
  const tituloAgenda = turnosDeHoy.length > 0 ? "Agenda de hoy" : "Turnos de mañana";

  // Siguiente turno: el primero de los turnos próximos que esté confirmado (sin importar fecha)
  const siguienteTurno = turnosProximos.find((turno) => turno.estado === "confirmado");
  const siguientePaciente = siguienteTurno ? obtenerPacientePorDNI(siguienteTurno.paciente_dni) : null;

  // Verificar si el siguiente turno es de hoy (para no duplicarlo en la lista)
  const siguienteTurnoEsDeHoy = siguienteTurno?.fecha === today;

  // Render
  return (
    <div className='min-h-screen w-full bg-zinc-100 px-6 pt-6 pb-26 flex flex-col gap-4'>
      {/* Top Navbar Home */}
      <div className='w-full flex flex-row justify-between items-center'>
        {/* Profile Icon */}
        <Link href={"/perfilDoctor"}>
          <div className='rounded-full p-px bg-white shadow-sm'>
            <img src={actualDoctor.imageUrl} alt='' className='rounded-full h-10 w-10 object-cover' />
          </div>
        </Link>
        {/* Notifications Bell */}
        <div className='bg-white p-2 rounded-full'>
          <FaRegBell size={22} className='text-zinc-800' />
        </div>
      </div>

      {/* Saludo personalizado */}
      <div className='w-full flex flex-col mt-2'>
        <p className='text-zinc-500 font-semibold'>Bienvenido de nuevo,</p>
        {/* Saludo con título según género */}
        {actualDoctor.gender == "male" && (
          <p className='text-2xl text-zinc-800 font-bold'>Hola, Dr. {actualDoctor.name}</p>
        )}
        {actualDoctor.gender == "female" && (
          <p className='text-2xl text-zinc-800 font-bold'>Hola, Dra. {actualDoctor.name}</p>
        )}
      </div>

      {/* Cajas indicadoras de turnos/citas */}
      <div className='w-full grid grid-cols-3 gap-2'>
        {/* Citas confirmadas de hoy */}
        <div className='bg-white rounded-xl flex flex-col p-4 w-full shadow-sm'>
          <IoTodaySharp size={22} className='text-[#2346D3]' />
          <p className='text-zinc-500 text-xs mt-1.5'>CITAS HOY</p>
          <p className='text-zinc-800 font-bold text-3xl'>
            {turnosDeHoy.filter((turno) => turno.estado == "confirmado").length}
          </p>
        </div>
        {/* Turnos pendientes de confirmar */}
        <div className='bg-white rounded-xl flex flex-col p-4 w-full shadow-sm'>
          <MdOutlinePendingActions size={22} className='text-orange-400' />
          <p className='text-zinc-500 text-xs mt-1.5'>PENDIENTES</p>
          <p className='text-zinc-800 font-bold text-3xl'>
            {turnosProximos.filter((turno) => turno.estado == "pendiente").length}
          </p>
        </div>
        {/* Turnos cancelados */}
        <div className='bg-white rounded-xl flex flex-col p-4 w-full shadow-sm'>
          <MdFreeCancellation size={22} className='text-red-600' />
          <p className='text-zinc-500 text-xs mt-1.5'>CANCELADAS</p>
          <p className='text-zinc-800 font-bold text-3xl'>
            {turnosProximos.filter((turno) => turno.estado == "cancelado").length}
          </p>
        </div>
      </div>

      {/* Siguiente Paciente */}
      <div className='w-full flex flex-col gap-2'>
        <p className='text-xl text-zinc-800 font-bold'>Siguiente paciente</p>
        {/* Mostrar tarjeta si hay siguiente turno, mensaje vacío si no hay ninguno */}
        {siguienteTurno && siguientePaciente ? (
          <div className='bg-[#2346D3] p-4 w-full flex flex-col gap-4 rounded-xl shadow-[0_8px_20px_rgba(35,70,211,0.5)]'>
            <div className='w-full flex flex-row justify-between'>
              {/* Información del paciente y turno */}
              <div className='flex flex-col'>
                {/* Badge con fecha, hora y estado */}
                <div className='bg-white/15 border border-white/20 rounded-lg px-2 py-0.5 w-fit'>
                  <p className='text-white text-sm'>
                    {formatearFechaTurno(siguienteTurno)} - {siguienteTurno.hora} - {capitalizar(siguienteTurno.estado)}
                  </p>
                </div>
                {/* Nombre del paciente */}
                <p className='text-2xl font-bold text-white mt-1'>{siguientePaciente.name}</p>
                {/* Especialidad y modalidad */}
                <p className='text-white/75 text-sm'>
                  {siguienteTurno.especialista.specialty} - {capitalizar(siguienteTurno.modalidad)}
                </p>
              </div>
              {/* Foto del paciente */}
              <div>
                <img
                  src={siguientePaciente.img}
                  alt=''
                  className='h-14 w-14 rounded-full border border-white object-cover object-top'
                />
              </div>
            </div>
            {/* Botones de acción */}
            <div className='w-full flex flex-row gap-2'>
              {/* Ver detalles del turno */}
              <button className='w-full h-10 rounded-xl bg-white text-[#2346D3] font-medium'>Ver detalles</button>
              {/* Botón de llamar por teléfono */}
              <button className='bg-white/15 rounded-xl h-10 min-w-10 flex justify-center items-center'>
                <FaPhoneAlt size={20} className='text-white' />
              </button>
            </div>
          </div>
        ) : (
          // Mensaje cuando no hay ningún turno programado
          <div className='bg-zinc-200 p-4 w-full flex items-center justify-center rounded-xl'>
            <p className='text-zinc-500'>No hay turnos programados</p>
          </div>
        )}
      </div>

      {/* Agenda de hoy / Turnos de mañana */}
      <div className='w-full flex flex-col gap-2 mt-2'>
        {/* Header con título y enlace a ver todos */}
        <div className='w-full flex flex-row justify-between items-center'>
          <p className='text-xl text-zinc-800 font-bold'>{tituloAgenda}</p>
          <Link href={"/agendaDoctor"}>
            <p className='font-medium text-[#2346D3]'>Ver todo</p>
          </Link>
        </div>

        {/* Lista de Turnos */}
        <div className='w-full flex flex-col gap-2'>
          {(() => {
            // Filtrar turnos cancelados y preparar lista para mostrar
            const turnosFiltrados = turnosParaAgenda.filter((turno) => turno.estado !== "cancelado");

            // Si es agenda de hoy y el siguiente turno confirmado es de hoy, excluirlo (ya está en "Siguiente paciente")
            const turnosAMostrar =
              turnosDeHoy.length > 0 && siguienteTurnoEsDeHoy
                ? turnosFiltrados.filter((turno) => turno.id !== siguienteTurno?.id)
                : turnosFiltrados;

            if (turnosAMostrar.length > 0) {
              return turnosAMostrar.map((turno) => {
                const paciente = obtenerPacientePorDNI(turno.paciente_dni);
                const esConfirmado = turno.estado === "confirmado";

                return (
                  // Item de turno individual
                  <Link key={turno.id} href={"/turnosDoctor"}>
                    <div className='bg-white rounded-2xl shadow-sm w-full p-4 flex flex-row items-center justify-between border border-zinc-100 hover:shadow-md transition-shadow'>
                      {/* Datos del paciente y del turno */}
                      <div className='flex flex-row items-center gap-3'>
                        {/* Badge con hora del turno e indicador de estado */}
                        <div className='relative'>
                          <div className='px-3 py-3 rounded-xl bg-zinc-100 flex items-center justify-center'>
                            <p className='text-zinc-800 font-bold text-sm'>{turno.hora}</p>
                          </div>
                          {/* Indicador de estado (punto de color) */}
                          <div
                            className={`absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${
                              esConfirmado ? "bg-green-500" : "bg-orange-400"
                            }`}
                          />
                        </div>
                        {/* Nombre del paciente, modalidad y estado */}
                        <div className='flex flex-col'>
                          <p className='text-zinc-800 font-bold text-base'>{paciente?.name}</p>
                          <div className='flex flex-row items-center gap-2'>
                            <p className='text-sm text-zinc-500'>{capitalizar(turno.modalidad)}</p>
                            <span className='text-zinc-300'>•</span>
                            {/* Badge de estado */}
                            <span
                              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                esConfirmado ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-500"
                              }`}
                            >
                              {capitalizar(turno.estado)}
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* Imagen del paciente */}
                      <div>
                        <img
                          src={paciente?.img}
                          alt=''
                          className='h-11 w-11 rounded-full object-cover object-top border-2 border-zinc-100'
                        />
                      </div>
                    </div>
                  </Link>
                );
              });
            } else if (turnosFiltrados.length > 0 && turnosAMostrar.length === 0) {
              // Mensaje cuando hay turnos pero todos ya están mostrados en "Siguiente paciente"
              return (
                <div className='bg-zinc-200 p-4 w-full flex items-center justify-center rounded-xl'>
                  <p className='text-zinc-500'>No hay más turnos para hoy</p>
                </div>
              );
            } else {
              // Mensaje cuando no hay turnos programados para hoy/mañana
              return (
                <div className='bg-zinc-200 p-4 w-full flex items-center justify-center rounded-xl'>
                  <p className='text-zinc-500'>
                    {turnosDeHoy.length === 0 && turnosDeMañana.length === 0
                      ? "No hay turnos para hoy ni mañana"
                      : "No hay turnos programados"}
                  </p>
                </div>
              );
            }
          })()}
        </div>
      </div>

      {/* Barra de Navegación inferior */}
      <Navegacion ubicacion='home' />
    </div>
  );
};

export default page;
