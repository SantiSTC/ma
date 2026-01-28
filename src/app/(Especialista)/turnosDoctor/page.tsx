"use client";

import { mockAppointments } from "@/app/(Paciente)/data/appointments";
import { Turno } from "@/app/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoMdChatbubbles, IoMdSettings } from "react-icons/io";
import { actualDoctor } from "../data/actualDoctor";
import { GoHomeFill } from "react-icons/go";
import { FaBriefcaseMedical, FaCalendarAlt, FaCheck, FaClock } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { obtenerPacientePorDNI } from "@/app/utils/obtenerPacientePorDNI";
import { capitalizar } from "@/app/utils/capitalizar";
import { MdDateRange } from "react-icons/md";
import Navegacion from "../components/navegacion";

const page = () => {
  const [turnosDelDoctor, setTurnosDelDoctor] = useState<Turno[]>([]);
  const [turnosProximos, setTurnosProximos] = useState<Turno[]>([]);

  const [estadoAVisualizar, setEstadoAVisualizar] = useState<string>("pendiente");

  const now = new Date();

  const turnoDateTime = (turno: Turno) => new Date(`${turno.fecha}T${turno.hora}`);

  useEffect(() => {
    const turnos = mockAppointments
      .filter((turno) => turno.especialista.id === actualDoctor.id)
      .sort(ordenarPorFechaHoraAsc);

    setTurnosDelDoctor(turnos);
  }, [mockAppointments]);

  useEffect(() => {
    const proximos = turnosDelDoctor.filter((turno) => {
      const turnoHora = turnoDateTime(turno);
      return turnoHora > now;
    });

    setTurnosProximos(proximos);
  }, [turnosDelDoctor]);

  const ordenarPorFechaHoraAsc = (a: Turno, b: Turno) => {
    const dateA = new Date(`${a.fecha}T${a.hora}`);
    const dateB = new Date(`${b.fecha}T${b.hora}`);
    return dateA.getTime() - dateB.getTime();
  };

  const confirmarTurno = (objTurno: Turno) => {
    objTurno.estado = "confirmado";
  };

  const rechazarTurno = (objTurno: Turno) => {
    objTurno.estado = "cancelado";
  };

  return (
    <div className='min-h-screen w-full bg-zinc-100 px-6 pt-6 pb-26 flex flex-col gap-4'>
      {/* Top Navbar Home */}
      <div className='w-full flex flex-row justify-between items-center'>
        {/* Back Button */}
        <Link href={"/homeDoctor"} className='z-50 active:scale-90 active:text-zinc-500 text-zinc-800 transition-all'>
          <button className='hover:scale-95 transition-all'>
            <IoIosArrowBack size={28} className='text-zinc-800' />
          </button>
        </Link>
        {/* Title */}
        <div className='absolute py-6 w-screen top-0 left-0 flex justify-center'>
          <h2 className='text-zinc-800 text-xl font-bold'>Gestión de Turnos</h2>
        </div>
      </div>
      {/* Indicadores de turnos de cada estado */}
      <div className='w-full grid grid-cols-3 gap-2 mt-4'>
        <div className='w-full py-4 bg-white rounded-xl border border-zinc-200 shadow-sm flex flex-col items-center justify-center'>
          <p className='text-3xl font-bold text-green-600'>
            {turnosProximos.filter((turno) => turno.estado == "confirmado").length}
          </p>
          <p className='text-sm text-zinc-500 text-center'>Confirmados</p>
        </div>
        <div className='w-full py-4 bg-white rounded-xl border border-zinc-200 shadow-sm flex flex-col items-center justify-center'>
          <p className='text-3xl font-bold text-orange-400'>
            {turnosProximos.filter((turno) => turno.estado == "pendiente").length}
          </p>
          <p className='text-sm text-zinc-500 text-center'>Pendientes</p>
        </div>
        <div className='w-full py-4 bg-white rounded-xl border border-zinc-200 shadow-sm flex flex-col items-center justify-center'>
          <p className='text-3xl font-bold text-red-600'>
            {turnosProximos.filter((turno) => turno.estado == "cancelado").length}
          </p>
          <p className='text-sm text-zinc-500 text-center'>Cancelados</p>
        </div>
      </div>
      {/* Estado Switcher */}
      <div className='w-full bg-zinc-200 h-10 rounded-lg p-1 relative'>
        {/* Sliding indicator */}
        <div
          className={`absolute top-1 left-1 h-8 w-[calc(33.333%-3px)] bg-white rounded-lg shadow-sm
      transition-transform duration-300 ease-out
      ${
        estadoAVisualizar === "confirmado"
          ? "translate-x-0"
          : estadoAVisualizar === "pendiente"
            ? "translate-x-full"
            : "translate-x-[200%]"
      }`}
        />

        <div className='grid grid-cols-3 h-full relative z-10'>
          <button onClick={() => setEstadoAVisualizar("confirmado")} className='flex items-center justify-center'>
            <p
              className={`text-sm font-semibold ${
                estadoAVisualizar === "confirmado" ? "text-[#2346D3]" : "text-zinc-500"
              }`}
            >
              Confirmados
            </p>
          </button>

          <button onClick={() => setEstadoAVisualizar("pendiente")} className='flex items-center justify-center'>
            <p
              className={`text-sm font-semibold ${
                estadoAVisualizar === "pendiente" ? "text-[#2346D3]" : "text-zinc-500"
              }`}
            >
              Pendientes
            </p>
          </button>

          <button onClick={() => setEstadoAVisualizar("cancelado")} className='flex items-center justify-center'>
            <p
              className={`text-sm font-semibold ${
                estadoAVisualizar === "cancelado" ? "text-[#2346D3]" : "text-zinc-500"
              }`}
            >
              Cancelados
            </p>
          </button>
        </div>
      </div>
      {/* Lista de turnos */}
      <div className='w-full flex flex-col gap-4'>
        {turnosProximos
          .filter((turnoProximo) => turnoProximo.estado == estadoAVisualizar)
          .map((turno) => (
            // Item turno
            <div key={turno.id} className='w-full p-4 flex flex-col gap-4 bg-white rounded-xl shadow-sm'>
              {/* Foto y nombre del paciente & Horario y Modalidad del turno */}
              <div className='w-full flex flex-row justify-between'>
                {/* Foto y nombre del paciente & Modalidad del turno */}
                <div className='flex flex-row gap-4'>
                  {/* Foto del paciente */}
                  <div>
                    <img
                      src={obtenerPacientePorDNI(turno.paciente_dni)?.img}
                      alt=''
                      className='w-12 h-12 rounded-full'
                    />
                  </div>
                  {/* Nombre del paciente & Modalidad del turno */}
                  <div className='flex flex-col'>
                    <p className='text-xl font-bold text-zinc-800'>{obtenerPacientePorDNI(turno.paciente_dni)?.name}</p>
                    <p className='text-sm text-zinc-500'>{capitalizar(turno.modalidad)}</p>
                  </div>
                </div>
                {/* Horario del turno */}
                <div
                  className={`px-2 py-0.5 h-fit rounded-lg gap-1 flex flex-row items-center ${
                    estadoAVisualizar == "pendiente" ? "bg-orange-400/15 border border-orange-400/20" : ""
                  } ${estadoAVisualizar == "confirmado" ? "bg-green-600/15 border border-green-600/20" : ""} ${
                    estadoAVisualizar == "cancelado" ? "bg-red-600/15 border border-red-600/20" : ""
                  }`}
                >
                  <FaClock
                    size={12}
                    className={`${estadoAVisualizar == "pendiente" ? "text-orange-400/75" : ""} ${
                      estadoAVisualizar == "pendiente" ? "text-green-600" : ""
                    } ${estadoAVisualizar == "pendiente" ? "text-red-600" : ""}`}
                  />
                  <p
                    className={`text-xs font-medium ${estadoAVisualizar == "pendiente" ? "text-orange-400/75" : ""} ${
                      estadoAVisualizar == "pendiente" ? "text-green-600" : ""
                    } ${estadoAVisualizar == "pendiente" ? "text-red-600" : ""}`}
                  >
                    {turno.hora}
                  </p>
                </div>
              </div>
              {/* Especialidad y Resumen del turno */}
              <div className='flex flex-col gap-2'>
                {/* Especialidad del turno */}
                <div className='flex flex-row items-center gap-2'>
                  <FaBriefcaseMedical size={12} className='text-zinc-500' />
                  <p className='text-sm font-medium text-zinc-500 translate-y-px'>{turno.especialista.specialty}</p>
                </div>
                {/* Resumen del turno */}
                <div className='p-2 bg-zinc-100 rounded-xl'>
                  <p className='text-zinc-400 text-sm italic'>"{turno.resumen}"</p>
                </div>
              </div>
              {/* Botones */}
              <div className='w-full flex items-center'>
                {/* Si el turno esta pendiente: */}
                {turno.estado == "pendiente" && (
                  <div className='w-full flex flex-row items-center gap-2'>
                    {/* Boton de Rechazar turno */}
                    <button
                      onClick={() => rechazarTurno(turno)}
                      className='w-full py-1.5 rounded-lg border-2 border-zinc-400 flex justify-center flex-row gap-2 items-center hover:scale-[0.97] active:scale-95 transition-all duration-200'
                    >
                      <p className='text-zinc-400 text-[15px] font-medium'>Rechazar</p>
                    </button>
                    {/* Boton de Aceptar turno */}
                    <button
                      onClick={() => confirmarTurno(turno)}
                      className='w-full py-1.5 rounded-lg border-2 border-[#2346D3] bg-[#2346D3] flex justify-center flex-row gap-2 items-center hover:scale-[0.97] active:scale-95 transition-all duration-200'
                    >
                      <FaCheck size={14} className='text-white' />
                      <p className='text-white text-[15px] font-medium'>Confirmar</p>
                    </button>
                  </div>
                )}
                {/* Si el turno esta confirmado: */}
                {turno.estado == "confirmado" && (
                  <div className='w-full flex flex-row items-center gap-2'>
                    {/* Boton de chat con el paciente */}
                    <button className='group w-full py-1 rounded-lg border-2 border-[#2346D3] flex justify-center flex-row gap-2 items-center hover:scale-[0.97] active:bg-[#2346D3] active:scale-95 transition-all duration-200'>
                      <IoMdChatbubbles
                        size={14}
                        className='text-[#2346D3] group-active:text-white transition-all duration-200'
                      />
                      <p className='text-[#2346D3] text-base font-medium group-active:text-white transition-all duration-200'>
                        Contactar
                      </p>
                    </button>
                  </div>
                )}
                {/* Si el turno esta cancelado: */}
                {turno.estado == "cancelado" && (
                  <div className='w-full flex flex-col gap-1'>
                    {/* Rechazado por */}
                    <div>
                      <p className='text-sm text-red-600'>
                        Rechazado por{" "}
                        <b className='text-sm font-normal text-zinc-500'>{capitalizar(turno.rechazadoPor as string)}</b>
                      </p>
                    </div>
                    {/* Motivo de cancelación */}
                    <div>
                      <p className='text-sm text-red-600'>
                        Motivo de cancelación:{" "}
                        <b className='text-sm font-normal text-zinc-500 italic'>{turno.motivoCancelacion}</b>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      {/* Navegacion */}
      <Navegacion ubicacion='turnos' />
    </div>
  );
};

export default page;
