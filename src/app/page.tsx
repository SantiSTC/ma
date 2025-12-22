"use client";

import Link from "next/link";
import React from "react";

export default function App() {
  return (
    <div className='h-screen w-screen bg-white flex flex-col justify-center items-center p-8'>
      <img src='/welcome_app.jpg' alt='' className='w-[85%] bg-red-500 translate-y-8' />
      <h1 className='text-zinc-800 text-3xl text-center font-bold -mt-8 translate-y-8'>
        La nueva era de<br />la medicina Argentina está acá
      </h1>
      <p className='text-zinc-500 text-center font-medium mt-4 translate-y-8'>
        MA no es solo un gestor de turnos, es una revolucion en la manera de conectar con la medicina Argentina.
      </p>
      <div className='mt-auto w-full flex flex-col gap-4'>
        <Link href={"/registrarse"}>
          <button className='h-14 w-full rounded-xl bg-[#2346D3] text-white font-bold text-lg flex justify-center items-center'>
            Registrarse
          </button>
        </Link>
        <Link href={"/login"}>
          <button className='h-14 w-full rounded-xl bg-[#2346D3]/10 text-[#2346D3] font-bold text-lg flex justify-center items-center'>
            Iniciar Sesión
          </button>
        </Link>
      </div>
    </div>
  );
}
