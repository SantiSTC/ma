import React from "react";

import { MdPersonSearch } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";

const FastAccess = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Botón principal */}
      <Link href="/NuevoTurno">
        <div className="group w-full h-36 bg-white active:bg-[#2346D3] shadow-sm rounded-md flex flex-col gap-2 justify-center items-center transition-all">
          {/* Icono */}
          <div className="p-3 rounded-full bg-[#2346D3]/20 group-active:bg-white/20 text-[#2346D3] group-active:text-white transition-all">
            <IoMdAdd size={24} />
          </div>
          {/* Título */}
          <p className="text-zinc-800 group-active:text-white font-medium transition-all">
            Nuevo Turno
          </p>
        </div>
      </Link>

      {/* Botones secundarios */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/Especialistas">
          <div className="group w-full aspect-square bg-white active:bg-[#2346D3] shadow-sm rounded-md flex flex-col gap-2 justify-center items-center transition-all">
            <div className="p-2.5 rounded-full bg-[#2346D3]/20 group-active:bg-white/20 text-[#2346D3] group-active:text-white transition-all">
              <MdPersonSearch size={24} />
            </div>
            <p className="text-zinc-800 group-active:text-white text-sm font-medium transition-all text-center px-2">
              Especialistas
            </p>
          </div>
        </Link>

        <Link href="/MisTurnos">
          <div className="group w-full aspect-square bg-white active:bg-[#2346D3] shadow-sm rounded-md flex flex-col gap-2 justify-center items-center transition-all">
            <div className="p-2.5 rounded-full bg-[#2346D3]/20 group-active:bg-white/20 text-[#2346D3] group-active:text-white transition-all">
              <FaRegCalendarAlt size={24} />
            </div>
            <p className="text-zinc-800 group-active:text-white text-sm font-medium transition-all text-center px-2">
              Mis Turnos
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FastAccess;
