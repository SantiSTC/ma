"use client"

import React from 'react';

export default function App() {

  return (
    <div className="h-screen w-screen bg-white flex flex-col justify-center items-center p-8">
        <img src="/welcome_app.jpg" alt="" className='w-[85%] bg-red-500 translate-y-8' />
        <h1 className='text-zinc-800 text-3xl text-center font-bold -mt-8 translate-y-8'>Gestioná tu salud de forma fácil y rápida</h1>
        <p className='text-zinc-500 text-center font-medium mt-4 translate-y-8'>Encontrá especialistas, reserva turnos y cuida de tu bienestar, todo desde un solo lugar.</p>
        <div className='mt-auto w-full flex flex-col gap-4'>
          <button className='h-14 w-full rounded-xl bg-[#2346D3] text-white font-bold text-lg flex justify-center items-center'>Registrarse</button>
          <button className='h-14 w-full rounded-xl bg-[#2346D3]/10 text-[#2346D3] font-bold text-lg flex justify-center items-center'>Iniciar Sesión</button>
        </div>
    </div>
  );
}