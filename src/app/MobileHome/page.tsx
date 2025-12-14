import React from "react";
import { IoPerson } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";

import DoctorsSlider from "../components/DoctorsSlider";
import FastAccess from "../components/FastAccess";

const MobileHome = () => {
  return (
    <div className='w-full h-full flex flex-col gap-8 antialiased font-sans bg-zinc-50/50'>

      {/* Hero Section */}
      <div className='w-full flex flex-col gap-8 bg-blue-600 px-6 py-10 rounded-br-3xl'>

        {/* Top Navbar Home */}
        <div className='w-full flex flex-row justify-between items-center'>
          {/* Profile Icon */}
          <div className='rounded-full p-3 bg-orange-300 shadow-sm'>
            <IoPerson size={20} className='text-white' />
          </div>
          {/* Notifications Bell */}
          <div>
            <FaRegBell size={22} className='text-white' />
          </div>
        </div>

        {/* Header */}
        <div>
          <h2 className='text-4xl translate-y-16 text-white font-bold'>Hola, María!</h2>
        </div>

        {/* Search Bar */}
        <div className='w-full translate-y-16 bg-white h-14 shadow-md rounded-md flex flex-row items-center px-4'>
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
      <div className='w-full h-full flex flex-col gap-8 py-10'>
        {/* Next Turns */}
        <div className='w-full flex flex-col gap-2'>
          {/* Title */}
          <h3 className='text-xl text-zinc-900 font-bold px-6'>Tus próximos turnos</h3>
          {/* Doctors Slider */}
          <div>
            <DoctorsSlider />
          </div>
        </div>

        {/* Fast access */}
        <div className='w-full flex flex-col gap-2  px-6'>
          {/* Title */}
          <h3 className='text-xl text-zinc-900 font-bold'>Accesos rápidos</h3>
          {/* Botones de acceso rapido */}
          <div className='w-full'>
            <FastAccess />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHome;
