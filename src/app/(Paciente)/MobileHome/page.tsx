import React from "react";
import { FaRegBell } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";

import FastAccess from "../components/FastAccess";
import Link from "next/link";
import { exampleUser } from "../data/actualUser";
import { TbMedicalCrossCircle } from "react-icons/tb";
import TurnosSlider from "../components/TurnosSlider";

const MobileHome = () => {
  return (
    <div className='w-full min-h-screen flex flex-col gap-8 bg-zinc-100 '>
      {/* Hero Section */}
      <div className='w-full flex flex-col gap-8 bg-[#2346D3] px-6 pt-30 -mt-20 rounded-[200px/20px] shadow-[0_8px_20px_rgba(35,70,211,0.5)]'>
        {/* Top Navbar Home */}
        <div className='w-full flex flex-row justify-between items-center'>
          {/* Profile Icon */}
          <Link href={"/Perfil"}>
            <div className='rounded-full p-px bg-white shadow-sm'>
              <img src={exampleUser.img} alt='' className='rounded-full h-9 w-9' />
            </div>
          </Link>
          {/* Notifications Bell */}
          <div>
            <FaRegBell size={22} className='text-white' />
          </div>
        </div>

        {/* Header */}
        <div>
          <h2 className='text-4xl translate-y-6 text-white font-bold'>Hola, {exampleUser.name.split(" ")[0]}!</h2>
        </div>

        {/* Search Bar */}
        <div className='w-full translate-y-4 bg-white h-14 shadow-md rounded-md flex flex-row items-center px-4'>
          {/* Search/Lupa Icon */}
          <div className='mr-4'>
            <IoMdSearch size={24} className='text-zinc-700' />
          </div>
          {/* Input */}
          <div className='w-full h-full flex items-center'>
            <input
              type='text'
              className='w-full h-[70%] outline-none border-none focus:outline-none focus:ring-0 caret-zinc-700'
              placeholder='Buscar médico o especialidad'
            />
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className='w-full h-full flex flex-col gap-8 pt-10'>
        {/* Next Turns */}
        <div className='w-full flex flex-col gap-2'>
          {/* Title */}
          <h3 className='text-xl text-zinc-900 font-bold px-6'>Tus próximos turnos</h3>
          {/* Doctors Slider */}
          <div>
            <TurnosSlider />
          </div>
        </div>

        {/* Fast access */}
        <div className='w-full flex flex-col gap-2 px-6'>
          {/* Title */}
          <h3 className='text-xl text-zinc-900 font-bold'>Accesos rápidos</h3>
          {/* Botones de acceso rapido */}
          <div className='w-full'>
            <FastAccess />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className='w-full bg-white border-t border-zinc-200 mt-4'>
        <div className='px-6 py-8 flex flex-col gap-6'>
          {/* Logo y descripción */}
          <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-2'>
              <div className='p-2 rounded-lg bg-[#2346D3]/10'>
                <TbMedicalCrossCircle size={24} className='text-[#2346D3]' />
              </div>
              <span className='text-lg font-bold text-zinc-800'>Medicos Argentina</span>
            </div>
            <div className='w-full flex flex-row items-center gap-2'>
              <p className='text-sm text-zinc-500 flex-1 whitespace-nowrap'>La nueva era de la medicina Argentina</p>
              <div className='w-full h-px bg-zinc-200'></div>
            </div>
          </div>

          {/* Links */}
          <div className='grid grid-cols-2 gap-4 text-sm'>
            <div className='flex flex-col gap-2'>
              <a href='#' className='text-zinc-600 hover:text-[#2346D3] transition-colors'>
                Sobre nosotros
              </a>
              <a href='#' className='text-zinc-600 hover:text-[#2346D3] transition-colors'>
                Ayuda
              </a>
            </div>
            <div className='flex flex-col gap-2'>
              <a href='#' className='text-zinc-600 hover:text-[#2346D3] transition-colors'>
                Términos
              </a>
              <a href='#' className='text-zinc-600 hover:text-[#2346D3] transition-colors'>
                Privacidad
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className='pt-4 border-t border-zinc-200'>
            <p className='text-xs text-zinc-400 text-center'>© 2024 MA. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MobileHome;
