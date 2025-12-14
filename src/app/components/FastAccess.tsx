import React from "react";

import { MdPersonSearch } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegHospital } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";

const FastAccess = () => {
  const buttons = [
    {
      icon: <MdPersonSearch size={24} />,
      title: "Buscar Especialistas",
      href: "/MobileHome",
    },
    {
      icon: <FaRegCalendarAlt size={24} />,
      title: "Ver mis Turnos",
      href: "/MisTurnos",
    },
    {
      icon: <FaRegHospital size={24} />,
      title: "Centros Medicos",
      href: "/MobileHome",
    },
    {
      icon: <IoMdAdd size={24} />,
      title: "Nuevo Turno",
      href: "/NuevoTurno",
    },
  ];
  return (
    <div className='w-full h-full grid grid-cols-2 gap-4'>
      {/* Botones */}
      {buttons.map((item) => (
        <Link href={item.href} key={item.title}>
          <div
            className='group w-full aspect-square bg-white active:bg-blue-600 shadow-sm rounded-md flex flex-col gap-2 justify-center items-center transition-all'
          >
            {/* Icono del boton */}
            <div className='p-2.5 rounded-full bg-blue-600/20 group-active:bg-white/20 text-blue-600 group-active:text-white transition-all'>{item.icon}</div>
            {/* Button Title */}
            <div>
              <p className='text-zinc-800 group-active:text-white text-sm font-medium transition-all'>{item.title}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FastAccess;
