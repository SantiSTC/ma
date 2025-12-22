"use client";

import { mockAppointments } from "../../data/appointments";
import { Turno } from "@/app/types";
import { capitalizar } from "@/app/utils/capitalizar";
import { fechaATexto } from "@/app/utils/formatDate";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaBriefcaseMedical, FaCheck, FaQuestion, FaRegCalendarAlt } from "react-icons/fa";
import { FaMoneyBills } from "react-icons/fa6";
import { GoStarFill } from "react-icons/go";
import { HiBadgeCheck } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { LuBadgeHelp, LuBadgeX } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";

const page = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [turno, setTurno] = useState<Turno | null>(null);

  useEffect(() => {
    mockAppointments.map((itemTurno) => {
      if (itemTurno.id === params.id) {
        setTurno(itemTurno);
      }
    });
  }, [params.id]);

  const reprogrmarTurno = () => {
    router.push("/MobileHome");
  };

  const cancelarTurno = () => {
    router.push("/MobileHome");
  };

  return (
    <div className='w-full min-h-screen flex flex-col gap-4 px-6 py-6 bg-zinc-100 relative'>
      {/* Top Navbar Home */}
      <div className='w-full flex flex-row justify-between items-center'>
        {/* Back Button */}
        <Link href={"/MobileHome"} className='z-50 active:scale-90 active:text-zinc-500 text-zinc-800 transition-all'>
          <button className='hover:scale-95 transition-all'>
            <IoIosArrowBack size={28} className='text-zinc-800' />
          </button>
        </Link>
        {/* Title */}
        <div className='absolute py-6 w-screen top-0 left-0 flex justify-center'>
          <h2 className='text-zinc-800 text-xl font-bold'>Detalles del Turno</h2>
        </div>
      </div>

      {/* Especialista & Datos del turno */}
      <div className='my-2 bg-white w-full rounded-xl flex flex-col p-4 gap-4'>
        {/* Datos del especialista */}
        <div className='w-full flex flex-row gap-2 items-center'>
          {/* Imagen del especialista */}
          <div className='relative'>
            <div
              className={`h-6 w-6 rounded-full border-2 border-white ${
                turno?.estado == "confirmado" ? "bg-green-600" : ""
              } ${turno?.estado == "pendiente" ? "bg-orange-500" : ""} ${
                turno?.estado == "cancelado" ? "bg-red-600" : ""
              } absolute right-1 bottom-1 flex justify-center items-center`}
            >
              {turno?.estado == "confirmado" && <FaCheck size={10} className='text-white' />}
              {turno?.estado == "pendiente" && <FaQuestion size={10} className='text-white' />}
              {turno?.estado == "cancelado" && <RxCross2 size={14} className='text-white' />}
            </div>
            <img src={turno?.especialista.imageUrl} alt='' className='h-24 w-24 rounded-full object-cover' />
          </div>
          {/* Informacion del especialista */}
          <div className='w-full flex flex-col flex-1'>
            <p className='text-zinc-800 text-2xl font-bold'>{turno?.especialista.name}</p>
            <p className='text-[#2346D3]'>{turno?.especialista.specialty}</p>
            <div className='flex flex-row gap-1 items-center mt-0.5'>
              <GoStarFill size={12} className='text-yellow-500' />
              <p className='text-zinc-600 font-semibold'>{turno?.especialista.rating}</p>
            </div>
          </div>
        </div>
        {/* Estado del turno */}
        <div className='w-full'>
          <div
            className={`${turno?.estado == "confirmado" ? "bg-green-600/10" : ""} ${
              turno?.estado == "pendiente" ? "bg-orange-400/10" : ""
            } ${turno?.estado == "cancelado" ? "bg-red-600/10" : ""} px-3 py-1.5 rounded-lg w-fit`}
          >
            {turno?.estado == "confirmado" && (
              <div className='flex flex-row items-center gap-2'>
                <HiBadgeCheck size={18} className='text-green-700' />
                <p className='text-sm font-medium text-green-700 translate-y-px'>Turno Confirmado</p>
              </div>
            )}
            {turno?.estado == "pendiente" && (
              <div className='flex flex-row items-center gap-2'>
                <LuBadgeHelp size={18} className='text-orange-400' />
                <p className='text-sm font-medium text-orange-400 translate-y-px'>Turno Pendiente</p>
              </div>
            )}
            {turno?.estado == "cancelado" && (
              <div className='flex flex-row items-center gap-2'>
                <LuBadgeX size={18} className='text-red-700' />
                <p className='text-sm font-medium text-red-700 translate-y-px'>Turno Cancelado</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Fecha y Hora del turno */}
      <div className='w-full bg-white p-3 rounded-xl flex flex-row gap-4 items-center'>
        {/* Icono de Fecha y Hora */}
        <div className='p-4 rounded-full bg-[#2346D3]/15'>
          <FaRegCalendarAlt size={22} className='text-[#2346D3]' />
        </div>
        {/* Informacion de Fecha y Hora */}
        <div className='flex flex-col leading-tight'>
          <p className='text-sm text-zinc-500'>FECHA Y HORA</p>
          <p className='font-bold text-zinc-800'>{fechaATexto(turno?.fecha)}</p>
          <p className='text-[#2346D3] font-bold text-sm'>{turno?.hora} hs</p>
        </div>
      </div>
      {/* Modalidad del turno */}
      <div className='w-full bg-white p-3 rounded-xl flex flex-row gap-4 items-center'>
        {/* Icono de Modalidad */}
        <div className='p-4 rounded-full bg-[#9333ea]/15'>
          <FaBriefcaseMedical size={22} className='text-[#9333ea]' />
        </div>
        {/* Informacion de Modalidad */}
        <div className='flex flex-col leading-tight'>
          <p className='text-sm text-zinc-500'>MODALIDAD</p>
          <p className='text-zinc-800 font-bold'>{capitalizar(turno?.modalidad as string)}</p>
        </div>
      </div>
      {/* Pago del turno */}
      <div className='w-full bg-white p-3 rounded-xl flex flex-row gap-4 items-center'>
        {/* Icono de Pago */}
        <div className='p-4 rounded-full bg-green-700/15'>
          <FaMoneyBills size={22} className='text-green-700' />
        </div>
        {/* Informacion de Pago */}
        <div className='flex flex-col leading-tight'>
          <p className='text-sm text-zinc-500'>PAGO</p>
          <p className='text-zinc-800 font-bold'>En el lugar</p>
        </div>
      </div>
      {/* Resumen de la consulta */}
      <div className='w-full flex flex-col gap-2 mt-2'>
        <p className='text-xl text-zinc-800 font-bold'>Resumen de la consulta</p>
        <div className='w-full rounded-xl p-4 min-h-40 bg-white'>
          <p className='text-zinc-500'>{turno?.resumen}</p>
        </div>
      </div>
      {/* Ubicación */}
      <div className='w-full flex flex-col gap-2 mt-2'>
        <p className='text-xl text-zinc-800 font-bold'>Ubicación</p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            turno?.especialista.location as string
          )}`}
          target='_blank'
          rel='noopener noreferrer'
          className='w-full rounded-xl overflow-hidden bg-white active:scale-[0.98] transition'
        >
          <div className='w-full h-40'>
            <iframe
              title='Mapa'
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                turno?.especialista.location as string
              )}&output=embed`}
              className='w-full h-full border-0 pointer-events-none'
              loading='lazy'
            />
          </div>

          <div className='p-3'>
            <p className='text-sm text-zinc-700 font-medium'>{turno?.especialista.location}</p>
            <p className='text-xs text-[#2346D3] font-semibold mt-1'>Ver en el mapa</p>
          </div>
        </a>
      </div>
      {/* Botones */}
      <div className='mt-2 w-full flex flex-col gap-4'>
        <button onClick={reprogrmarTurno} className='w-full bg-[#2346D3] h-14 rounded-xl flex justify-center items-center text-white font-semibold'>
          Reprogramar Turno
        </button>
        <button onClick={cancelarTurno} className='w-full bg-red-500/10 h-14 rounded-xl flex justify-center items-center text-red-600 font-semibold'>
          Cancelar Turno
        </button>
      </div>
    </div>
  );
};

export default page;
