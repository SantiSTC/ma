"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowBack, IoMdLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { TbMedicalCrossCircle } from "react-icons/tb";

const page = () => {
  const router = useRouter();

  const login = () => {
    router.push("/MobileHome");
  };

  return (
    <div className='w-full min-h-screen flex flex-col gap-4 px-6 py-6 bg-zinc-100 relative'>
      {/* Top Navbar Home */}
      <div className='w-full flex flex-row justify-between items-center'>
        {/* Back Button */}
        <Link href={"/"} className='z-50 active:scale-90 active:text-zinc-500 text-zinc-800 transition-all'>
          <button className='hover:scale-95 transition-all'>
            <IoIosArrowBack size={28} className='text-zinc-800' />
          </button>
        </Link>
      </div>
      {/* Main section */}
      <div className='w-full flex flex-col items-center gap-6'>
        {/* Logo */}
        <div className=''>
          <img src={"/icon.png"} className="h-16 aspect-square" />
        </div>
        {/* Title & Subtitle */}
        <div className='flex flex-col items-center text-center gap-2'>
          <h1 className='text-zinc-800 text-[34px] font-bold'>Bienvenido de nuevo</h1>
          <p className='text-zinc-500 font-medium'>Gestiona tus turnos medicos facilmente</p>
        </div>
        {/* Inputs */}
        <div className='w-full flex flex-col gap-4 mt-2'>
          {/* Input Email */}
          <div className='flex flex-col gap-2'>
            <label htmlFor='email' className='font-medium text-gray-700'>
              Correo electrónico
            </label>
            <div className='relative'>
              <MdEmail className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
              <input
                id='email'
                type='email'
                placeholder='ejemplo@correo.com'
                className='w-full pl-11 pr-4 py-2.5 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
          </div>
          {/* Input Password */}
          <div className='flex flex-col gap-2'>
            <label htmlFor='password' className='font-medium text-gray-700'>
              Contraseña
            </label>
            <div className='relative'>
              <IoMdLock className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
              <input
                id='password'
                type='password'
                placeholder='********'
                className='w-full pl-11 pr-4 py-2.5 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
          </div>
        </div>
        {/* Recuperar Contraseña */}
        <p className='text-[#2346D3] text-end w-full hover:text-blue-500 transition-colors'>
          ¿Olvidaste tu contraseña?
        </p>
        {/* Iniciar Sesion Button */}
        <button onClick={login} className='bg-[#2346D3] rounded-xl w-full h-14 flex justify-center items-center text-white text-lg font-medium hover:text-blue-500 hover:scale-95 transition-all'>
          Iniciar Sesión
        </button>
        {/* Linea divisoria */}
        <div className='w-full flex flex-row items-center gap-1.5'>
          <div className='h-px w-full bg-zinc-300'></div>
          <p className='text-sm text-zinc-400 whitespace-nowrap'>O CONTINÚA CON</p>
          <div className='h-px w-full bg-zinc-300'></div>
        </div>
        {/* Google Login Button */}
        <button className='w-full h-12 rounded-xl border border-zinc-200 flex flex-row items-center gap-1.5 justify-center bg-white'>
          <img src='https://www.svgrepo.com/show/303108/google-icon-logo.svg' alt='' className='h-5' />
          <p className='font-medium tracking-tight translate-px'>Google</p>
        </button>
        {/* Registrarse redireccion */}
        <div className='w-full flex justify-center items-center gap-1 mt-1'>
          <p className='text-zinc-500 text-sm'>¿No tienes cuenta?</p>
          <Link href={"/registrarse"}>
            <p className='font-medium text-[#2346D3] text-sm hover:text-blue-500 transition-colors'>Registrate</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
