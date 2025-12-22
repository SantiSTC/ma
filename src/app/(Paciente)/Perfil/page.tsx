"use client";

import Link from "next/link";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { exampleUser } from "../data/actualUser";
import { FaUserLarge } from "react-icons/fa6";
import { FaIdCard, FaPhoneAlt } from "react-icons/fa";
import { IoCalendar } from "react-icons/io5";
import { MdEmail, MdMedicalInformation } from "react-icons/md";

const page = () => {
  const [tabSelected, setTabSelected] = useState("Informacion");

  return (
    <div className='w-full h-full flex flex-col gap-8 px-6 py-6 bg-zinc-100'>
      {/* Top Navbar Home */}
      <div className='w-full flex flex-row justify-between items-center relative'>
        {/* Back Button */}
        <Link href={"/MobileHome"} className='z-10'>
          <button className="hover:scale-95 transition-all">
            <IoIosArrowBack size={28} className='text-zinc-800' />
          </button>
        </Link>
        {/* Title */}
        <div className='absolute z-0 w-full flex justify-center'>
          <h2 className='text-zinc-800 text-[22px] font-bold'>Mi Perfil</h2>
        </div>
        {/* Notifications Bell */}
        <div className='z-10'>
          <p className='text-[#2346D3] font-semibold'>Editar</p>
        </div>
      </div>

      {/* Datos generales del usuario */}
      <div className='w-full flex flex-col items-center gap-'>
        {/* Imagen de Perfil del Usuario */}
        <div className='w-full flex justify-center'>
          <img src={exampleUser.img} alt='' className='h-36 w-3h-36 rounded-full' />
        </div>
        {/* Nombre del Usuario */}
        <p className='text-zinc-800 text-2xl font-bold mt-2'>{exampleUser.name}</p>
        {/* E-Mail del Usuario */}
        <p className='text-lg text-zinc-500 font-medium'>{exampleUser.email}</p>
      </div>

      {/* Informacion/Ajustes Switcher */}
      <div className='w-full bg-slate-200 h-10 rounded-lg p-1 gap-2 flex flex-row relative'>
        {/* Sliding Background Indicator */}
        <div
          className={`absolute top-1 bottom-1 w-[calc(50%-8px)] bg-white rounded-lg shadow-sm transition-all duration-300 ease-out ${
            tabSelected === "Informacion" ? "left-1" : "left-[calc(50%+4px)]"
          }`}
        />

        {/* Informacion Tab Button */}
        <button
          onClick={() => setTabSelected("Informacion")}
          className='w-1/2 h-full rounded-lg flex justify-center items-center relative z-10 transition-all duration-300'
        >
          <p
            className={`text-sm font-semibold tracking-wide transition-colors duration-300 ${
              tabSelected === "Informacion" ? "text-zinc-800" : "text-zinc-500"
            }`}
          >
            Informacion
          </p>
        </button>

        {/* Ajustes Tab Button */}
        <button
          onClick={() => setTabSelected("Ajustes")}
          className='w-1/2 h-full rounded-lg flex justify-center items-center relative z-10 transition-all duration-300'
        >
          <p
            className={`text-sm font-semibold tracking-wide transition-colors duration-300 ${
              tabSelected === "Ajustes" ? "text-zinc-800" : "text-zinc-500"
            }`}
          >
            Ajustes
          </p>
        </button>
      </div>

      {/* Informacion del usuario */}
      <div className='w-full flex flex-col gap-2'>
        {/* Nombre del usuario */}
        <div className='w-full bg-white flex flex-row p-4 gap-4 items-center rounded-lg'>
          {/* Icono de Nombre del usuario */}
          <div className='bg-[#2346D3]/20 h-full p-4 aspect-square rounded-lg'>
            <FaUserLarge size={20} className='text-[#2346D3]' />
          </div>
          {/* Nombre del usuario y Label */}
          <div className='flex flex-col leading-tight'>
            <p className='text-lg text-zinc-800 font-semibold'>Nombre Completo</p>
            <p className='text-zinc-500 textsm font-semibold'>{exampleUser.name}</p>
          </div>
        </div>
        {/* DNI del usuario */}
        <div className='w-full bg-white flex flex-row p-4 gap-4 items-center rounded-lg'>
          {/* Icono de DNI del usuario */}
          <div className='bg-[#2346D3]/20 h-full p-4 aspect-square rounded-lg'>
            <FaIdCard size={20} className='text-[#2346D3]' />
          </div>
          {/* DNI del usuario y Label */}
          <div className='flex flex-col leading-tight'>
            <p className='text-lg text-zinc-800 font-semibold'>DNI</p>
            <p className='text-zinc-500 textsm font-semibold'>{exampleUser.dni}</p>
          </div>
        </div>
        {/* Fecha de Nacimiento del usuario */}
        <div className='w-full bg-white flex flex-row p-4 gap-4 items-center rounded-lg'>
          {/* Icono de Fecha de Nacimiento del usuario */}
          <div className='bg-[#2346D3]/20 h-full p-4 aspect-square rounded-lg'>
            <IoCalendar size={20} className='text-[#2346D3]' />
          </div>
          {/* Fecha de Nacimiento del usuario y Label */}
          <div className='flex flex-col leading-tight'>
            <p className='text-lg text-zinc-800 font-semibold'>Fecha de Nacimiento</p>
            <p className='text-zinc-500 textsm font-semibold'>{exampleUser.fechaNacimiento}</p>
          </div>
        </div>
        {/* Teléfono del usuario */}
        <div className='w-full bg-white flex flex-row p-4 gap-4 items-center rounded-lg'>
          {/* Icono de Teléfono del usuario */}
          <div className='bg-[#2346D3]/20 h-full p-4 aspect-square rounded-lg'>
            <FaPhoneAlt size={20} className='text-[#2346D3]' />
          </div>
          {/* Teléfono del usuario y Label */}
          <div className='flex flex-col leading-tight'>
            <p className='text-lg text-zinc-800 font-semibold'>Teléfono</p>
            <p className='text-zinc-500 textsm font-semibold'>{exampleUser.telefono}</p>
          </div>
        </div>
        {/* E-Mail del usuario */}
        <div className='w-full bg-white flex flex-row p-4 gap-4 items-center rounded-lg'>
          {/* Icono de E-Mail del usuario */}
          <div className='bg-[#2346D3]/20 h-full p-4 aspect-square rounded-lg'>
            <MdEmail size={20} className='text-[#2346D3]' />
          </div>
          {/* E-Mail del usuario y Label */}
          <div className='flex flex-col leading-tight'>
            <p className='text-lg text-zinc-800 font-semibold'>E-Mail</p>
            <p className='text-zinc-500 textsm font-semibold'>{exampleUser.email}</p>
          </div>
        </div>
        {/* Obra Social del usuario */}
        <div className='w-full bg-white flex flex-row p-4 gap-4 items-center rounded-lg'>
          {/* Icono de Obra Social del usuario */}
          <div className='bg-[#2346D3]/20 h-full p-4 aspect-square rounded-lg'>
            <MdMedicalInformation size={20} className='text-[#2346D3]' />
          </div>
          {/* Obra Social del usuario y Label */}
          <div className='flex flex-col leading-tight'>
            <p className='text-lg text-zinc-800 font-semibold'>Obra Social</p>
            <p className='text-zinc-500 textsm font-semibold'>
              {exampleUser.obraSocial} - Plan {exampleUser.planObraSocial}
            </p>
          </div>
        </div>
      </div>

      {/* Cerrar Sesion Button */}
      <div className='w-full flex justify-center'>
        <Link href={"/"} className='w-full'>
          <button className='rounded-lg bg-red-400/10 w-full h-14 flex justify-center items-center hover:bg-red-400/50 hover:scale-[0.97] transition-all'>
            <p className='text-red-500 font-bold text-lg'>Cerrar Sesión</p>
          </button>
        </Link>
      </div>

      {/* Version de la app */}
      <div className="w-full flex justify-center -mt-2">
        <p className="text-xs text-zinc-500">Version de la app 1.0.0</p>
      </div>
    </div>
  );
};

export default page;
