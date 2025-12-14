"use client";

import React, { useState } from "react";
import { FaBaby, FaRegBell } from "react-icons/fa";
import { IoIosArrowBack, IoMdAdd } from "react-icons/io";

import { mockAppointments } from "@/app/data/appointments";

import { formatAppointment } from "../utils/formatDate";
import Link from "next/link";
import { specialtiesIcons } from "../data/specialtiesIcons";

const Page = () => {
  const [tabSelected, setTabSelected] = useState("Proximos");

  return (
    <div className='w-full h-full min-h-screen flex flex-col gap-8 antialiased font-sans px-6 py-6 bg-zinc-50/50'>
      {/* Top Navbar Home */}
      <div className='w-full flex flex-row justify-between items-center'>
        {/* Back Button */}
        <Link href={"/MobileHome"}>
          <button>
            <IoIosArrowBack size={28} className='text-zinc-800' />
          </button>
        </Link>
        {/* Title */}
        <div>
          <h2 className='text-zinc-800 text-[22px] font-bold'>Mis Turnos</h2>
        </div>
        {/* Notifications Bell */}
        <div>
          <FaRegBell size={22} className='text-zinc-800' />
        </div>
      </div>

      {/* Proximos/Anteriores Switcher */}
      <div className='w-full bg-slate-200 h-10 rounded-lg p-1 gap-2 flex flex-row relative'>
        {/* Sliding Background Indicator */}
        <div
          className={`absolute top-1 bottom-1 w-[calc(50%-8px)] bg-white rounded-lg shadow-sm transition-all duration-300 ease-out ${
            tabSelected === "Proximos" ? "left-1" : "left-[calc(50%+4px)]"
          }`}
        />

        {/* Proximos Tab Button */}
        <button
          onClick={() => setTabSelected("Proximos")}
          className='w-1/2 h-full rounded-lg flex justify-center items-center relative z-10 transition-all duration-300'
        >
          <p
            className={`text-sm font-semibold tracking-wide transition-colors duration-300 ${
              tabSelected === "Proximos" ? "text-zinc-800" : "text-zinc-500"
            }`}
          >
            Proximos
          </p>
        </button>

        {/* Anteriores Tab Button */}
        <button
          onClick={() => setTabSelected("Anteriores")}
          className='w-1/2 h-full rounded-lg flex justify-center items-center relative z-10 transition-all duration-300'
        >
          <p
            className={`text-sm font-semibold tracking-wide transition-colors duration-300 ${
              tabSelected === "Anteriores" ? "text-zinc-800" : "text-zinc-500"
            }`}
          >
            Anteriores
          </p>
        </button>
      </div>

      {/* Lista de Turnos */}
      <div className='w-full flex flex-col gap-6 pb-20'>
        {/* Item Turno */}
        {mockAppointments.map((appointment) => (
          <div key={appointment.id} className='w-full px-4 py-4 flex flex-row items-center gap-4 bg-white rounded-md'>
            {/* Caja de Color con Icono de Especialidad */}
            <div>
              {specialtiesIcons.map(
                (specialty) =>
                  specialty.name == appointment.specialty && (
                    <div key={specialty.color} className={`p-5 rounded-lg h-min ${specialty.color}`}>
                      {specialty.icon}
                    </div>
                  )
              )}
            </div>
            {/* Descripcion del Turno */}
            <div className='h-full flex flex-col gap-0'>
              <p className='text-lg font-bold text-zinc-800'>{appointment.specialty}</p>
              <p className='text-xs font-medium text-zinc-600'>
                {formatAppointment(appointment.date, appointment.time)}
              </p>
              <p className='text-sm font-medium text-zinc-600'>{appointment.doctorName}</p>
              <p className='text-sm font-medium text-zinc-600'>{appointment.location}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Solicitar Nuevo Turno Button */}
      <div className='w-full fixed bottom-0 left-0 flex justify-center px-6 pb-6 pt-12 bg-gradient-to-b from-zinc-100/0 via-zinc-100/80 to-zinc-100/95'>
        <Link href={"/NuevoTurno"} className="w-full">
          <button className='rounded-md bg-blue-600 w-full h-14 flex justify-center items-center gap-2 flex-row shadow-lg'>
            <IoMdAdd size={24} className='text-white' />
            <p className='text-white font-bold text-lg tracking-wide'>Solicitar Nuevo Turno</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
