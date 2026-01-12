"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { actualDoctor } from "../data/actualDoctor";
import { FaCalendarAlt, FaPhoneAlt, FaRegBell } from "react-icons/fa";
import { IoTodaySharp } from "react-icons/io5";
import { MdFreeCancellation, MdOutlinePendingActions } from "react-icons/md";
import { mockAppointments } from "@/app/(Paciente)/data/appointments";
import { Turno } from "@/app/types";
import { obtenerPacientePorDNI } from "@/app/utils/obtenerPacientePorDNI";
import { capitalizar } from "@/app/utils/capitalizar";
import { GoHomeFill } from "react-icons/go";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";

const page = () => {
  const [turnosDelDoctor, setTurnosDelDoctor] = useState<Turno[]>([]);
  const [turnosProximos, setTurnosProximos] = useState<Turno[]>([]);
  const [turnosDeHoy, setTurnosDeHoy] = useState<Turno[]>([]);

  const now = new Date();
  const today = now.toISOString().split("T")[0];

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

  useEffect(() => {
    const hoyNoPasados = turnosDelDoctor.filter((turno) => {
      if (turno.fecha !== today) return false;

      const turnoHora = turnoDateTime(turno);
      return turnoHora > now;
    });

    setTurnosDeHoy(hoyNoPasados);
  }, [turnosDelDoctor]);

  const ordenarPorFechaHoraAsc = (a: Turno, b: Turno) => {
    const dateA = new Date(`${a.fecha}T${a.hora}`);
    const dateB = new Date(`${b.fecha}T${b.hora}`);
    return dateA.getTime() - dateB.getTime();
  };

  return (
    <div className='min-h-screen w-full bg-zinc-100 px-6 pt-6 pb-26 flex flex-col gap-4'>
      {/* Top Navbar Home */}
      <div className='w-full flex flex-row justify-between items-center'>
        {/* Profile Icon */}
        <Link href={"/Perfil"}>
          <div className='rounded-full p-px bg-white shadow-sm'>
            <img src={actualDoctor.imageUrl} alt='' className='rounded-full h-10 w-10 object-cover' />
          </div>
        </Link>
        {/* Notifications Bell */}
        <div className='bg-white p-2 rounded-full'>
          <FaRegBell size={22} className='text-zinc-800' />
        </div>
      </div>
      {/* Saludo */}
      <div className='w-full flex flex-col mt-2'>
        <p className='text-zinc-500 font-semibold'>Bienvenido de nuevo,</p>
        {actualDoctor.gender == "male" && (
          <p className='text-2xl text-zinc-800 font-bold'>Hola, Dr. {actualDoctor.name}</p>
        )}
        {actualDoctor.gender == "female" && (
          <p className='text-2xl text-zinc-800 font-bold'>Hola, Dra. {actualDoctor.name}</p>
        )}
      </div>
      {/* Cajas indicadoras de turnos/citas */}
      <div className='w-full grid grid-cols-3 gap-2'>
        <div className='bg-white rounded-xl flex flex-col p-4 w-full shadow-sm'>
          <IoTodaySharp size={22} className='text-[#2346D3]' />
          <p className='text-zinc-500 text-xs mt-1.5'>CITAS HOY</p>
          <p className='text-zinc-800 font-bold text-3xl'>
            {turnosDeHoy.filter((turno) => turno.estado == "confirmado").length}
          </p>
        </div>
        <div className='bg-white rounded-xl flex flex-col p-4 w-full shadow-sm'>
          <MdOutlinePendingActions size={22} className='text-orange-400' />
          <p className='text-zinc-500 text-xs mt-1.5'>PENDIENTES</p>
          <p className='text-zinc-800 font-bold text-3xl'>
            {turnosProximos.filter((turno) => turno.estado == "pendiente").length}
          </p>
        </div>
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
        <div className='bg-[#2346D3] p-4 w-full flex flex-col gap-4 rounded-xl shadow-[0_8px_20px_rgba(35,70,211,0.5)]'>
          <div className='w-full flex flex-row justify-between'>
            {/* Informacion del paciente */}
            <div className='flex flex-col'>
              <div className='bg-white/15 border border-white/20 rounded-lg px-2 py-0.5 w-fit'>
                <p className='text-white text-sm'>
                  {turnosDeHoy[0]?.hora} - {capitalizar(turnosDeHoy[0]?.estado)}
                </p>
              </div>
              <p className='text-2xl font-bold text-white mt-1'>
                {obtenerPacientePorDNI(turnosDeHoy[0]?.paciente_dni)?.name}
              </p>
              <p className='text-white/75 text-sm'>
                {turnosDeHoy[0]?.especialista.specialty} - {capitalizar(turnosDeHoy[0]?.modalidad)}
              </p>
            </div>
            {/* Foto del paciente */}
            <div>
              <img
                src={obtenerPacientePorDNI(turnosDeHoy[0]?.paciente_dni)?.img}
                alt=''
                className='h-14 w-14 rounded-full border border-white object-cover object-top'
              />
            </div>
          </div>
          {/* Botones */}
          <div className='w-full flex flex-row gap-2'>
            {/* Ver detalles del turno */}
            <button className='w-full h-10 rounded-xl bg-white text-[#2346D3] font-medium'>Ver detalles</button>
            {/* Boton de telefono */}
            <button className='bg-white/15 rounded-xl h-10 min-w-10 flex justify-center items-center'>
              <FaPhoneAlt size={20} className='text-white' />
            </button>
          </div>
        </div>
      </div>
      {/* Agenda de hoy */}
      <div className='w-full flex flex-col gap-2 mt-2'>
        <div className='w-full flex flex-row justify-between items-center'>
          <p className='text-xl text-zinc-800 font-bold'>Agenda de hoy</p>
          <p className='font-medium text-[#2346D3]'>Ver todo</p>
        </div>
        {/* Lista de Turnos del dia */}
        <div className='w-full flex flex-col gap-2'>
          {turnosDeHoy.slice(1).map((turno) => (
            // Item turno
            <div
              key={turno.id}
              className='bg-white rounded-xl shadow-sm w-full p-4 flex flex-row items-center justify-between'
            >
              {/* Datos del paciente y del turno */}
              <div className='flex flex-row items-center gap-4'>
                <div className='px-4 aspect-square rounded-xl bg-zinc-100 flex items-center'>
                  <p className='text-zinc-800 font-bold text-sm'>{turno.hora}</p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-zinc-800 font-bold text-lg'>{obtenerPacientePorDNI(turno.paciente_dni)?.name}</p>
                  <p className='text-sm text-zinc-500'>{capitalizar(turno.modalidad)}</p>
                </div>
              </div>
              {/* Imagen del paciente */}
              <div>
                <img src={obtenerPacientePorDNI(turno.paciente_dni)?.img} alt='' className='h-12 w-12 rounded-full' />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Navegacion */}
      <div className='w-full h-20 fixed bottom-0 left-0 bg-white flex border-t border-zinc-200 px-4'>
        {/* Inicio (activo) */}
        <div className='w-1/4 h-full flex flex-col items-center justify-center gap-1'>
          <GoHomeFill size={20} className='text-[#2346D3]' />
          <p className='text-xs text-[#2346D3]'>Inicio</p>
        </div>

        {/* Turnos */}
        <Link href='/turnosDoctor' className='w-1/4 h-full'>
          <div className='h-full flex flex-col items-center justify-center gap-1'>
            <FaCalendarAlt size={20} className='text-zinc-500' />
            <p className='text-xs text-zinc-500'>Turnos</p>
          </div>
        </Link>

        {/* Pacientes */}
        <Link href='/pacientesDoctor' className='w-1/4 h-full'>
          <div className='h-full flex flex-col items-center justify-center gap-1'>
            <BsFillPeopleFill size={20} className='text-zinc-500' />
            <p className='text-xs text-zinc-500'>Pacientes</p>
          </div>
        </Link>

        {/* Ajustes */}
        <Link href='/ajustes' className='w-1/4 h-full'>
          <div className='h-full flex flex-col items-center justify-center gap-1'>
            <IoMdSettings size={20} className='text-zinc-500' />
            <p className='text-xs text-zinc-500'>Ajustes</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default page;
