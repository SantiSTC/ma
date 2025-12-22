import Link from "next/link";
import React from "react";
import { IoIosArrowBack, IoMdPin, IoMdSearch } from "react-icons/io";
import { filtrosDisponibles } from "../data/filters";
import { mockDoctors } from "../data/doctors";
import { GoStarFill } from "react-icons/go";

const page = () => {
  return (
    <div className='w-full h-full flex flex-col gap-4 px-6 pt-6 bg-zinc-50/50 relative'>
      {/* Top Navbar Home */}
      <div className='w-full flex flex-row justify-between items-center'>
        {/* Back Button */}
        <Link href={"/MobileHome"} className='z-50 active:scale-90 active:text-zinc-500 text-zinc-800 transition-all'>
          <button className="hover:scale-95 transition-all">
            <IoIosArrowBack size={28} className='text-zinc-800' />
          </button>
        </Link>
        {/* Title */}
        <div className='absolute py-6 w-screen top-0 left-0 flex justify-center'>
          <h2 className='text-zinc-800 text-xl font-bold'>Especialistas</h2>
        </div>
      </div>

      {/* Search Bar | Barra de Busqueda */}
      <div className='w-full bg-zinc-100 h-12 mt-2 rounded-xl flex flex-row items-center px-4'>
        {/* Search/Lupa Icon */}
        <div className='mr-4'>
          <IoMdSearch size={24} className='text-zinc-700' />
        </div>
        {/* Input */}
        <div className='w-full h-full flex items-center'>
          <input
            type='text'
            className='w-full h-[70%] outline-none border-none focus:outline-none focus:ring-0 caret-zinc-700'
            placeholder='Buscar por nombre o especialidad'
          />
        </div>
      </div>

      {/* Filtros */}
      <div className='w-full overflow-x-auto scrollbar-hide'>
        <div className='flex flex-row gap-2 pb-2'>
          {filtrosDisponibles.map((filtro) => (
            <button
              key={filtro.id}
              className='px-4 py-2 bg-zinc-100 border border-zinc-200 rounded-full whitespace-nowrap flex items-center gap-2 hover:bg-zinc-200 transition-colors'
            >
              <span className='text-zinc-700 text-sm font-medium'>{filtro.icon}</span>
              <span className='text-zinc-700 text-sm'>{filtro.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Especialistas */}
      <div className='mt-2 w-full flex flex-col gap-4 pb-8'>
        {mockDoctors.map((doctor) => (
          <div key={doctor.id} className='w-full bg-white p-4 flex flex-row gap-2 shadow-sm rounded-xl'>
            {/* Imagen del especialista */}
            <div className="w-26 h-full">
              <img src={doctor.imageUrl} alt='' className='h-18 w-18 rounded-full object-cover' />
            </div>
            {/* Datos del especialista */}
            <div className='w-full flex flex-col'>
              <p className='text-zinc-800 text-lg font-semibold'>{doctor.name}</p>
              <p className="text-sm text-zinc-500">{doctor.specialty}</p>
              <div className='flex flex-row gap-1 items-center mt-0.5'>
                <GoStarFill size={12} className='text-yellow-500' />
                <p className='text-zinc-600 font-semibold'>{doctor.rating}</p>
              </div>
              <div className='flex flex-row gap-1 items-center'>
                <IoMdPin size={14} className='text-zinc-500' />
                <p className='text-zinc-600 font-medium'>{doctor.location}</p>
              </div>
              {/* Boton de Ver Perfil del especialista */}
              <div className="w-full flex justify-end">
                <button className="rounded-full bg-[#2346D3] px-5 py-1.5 text-white font-medium mt-2">
                  Ver Perfil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
