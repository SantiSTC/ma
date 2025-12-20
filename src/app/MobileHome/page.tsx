import React from "react";
import { FaRegBell } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";

import DoctorsSlider from "../components/DoctorsSlider";
import FastAccess from "../components/FastAccess";
import Link from "next/link";
import { exampleUser } from "../data/actualUser";

const MobileHome = () => {
  return (
    <div className='w-full h-full flex flex-col gap-8 bg-zinc-100'>
      {/* Hero Section */}
      <div className='w-full flex flex-col gap-8 bg-[#2346D3] px-6 pt-30 -translate-y-20 rounded-[200px/20px] shadow-[0_8px_20px_rgba(35,70,211,0.5)]'>
        {/* Top Navbar Home */}
        <div className='w-full flex flex-row justify-between items-center'>
          {/* Profile Icon */}
          <Link href={"/Perfil"}>
            <div className='rounded-full p-px bg-white shadow-sm'>
              <img src={exampleUser.img} alt="" className="rounded-full h-9 w-9" />
            </div>
          </Link>
          {/* Notifications Bell */}
          <div>
            <FaRegBell size={22} className='text-white' />
          </div>
        </div>

        {/* Header */}
        <div>
          <h2 className='text-4xl translate-y-4 text-white font-bold'>Hola, {exampleUser.name.split(" ")[0]}!</h2>
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
      <div className='w-full h-full flex flex-col gap-8 pt-10 -translate-y-24 bgred'>
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
        <div className='w-full flex flex-col gap-2 px-6'>
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
