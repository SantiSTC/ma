import Link from 'next/link'
import React from 'react'
import { BsFillPeopleFill } from 'react-icons/bs'
import { FaCalendarAlt } from 'react-icons/fa'
import { GoHomeFill } from 'react-icons/go'
import { IoMdSettings } from 'react-icons/io'
import { MdDateRange } from 'react-icons/md'

type Ubicacion = 'home' | 'turnos' | 'pacientes' | 'agenda' | 'ajustes'

interface NavegacionProps {
  ubicacion: Ubicacion
}

const Navegacion = ({ ubicacion }: NavegacionProps) => {
  const activeClass = 'text-[#2346D3]'
  const inactiveClass = 'text-zinc-500'

  return (
    <div className='w-full h-20 fixed bottom-0 left-0 bg-white grid grid-cols-5 border-t border-zinc-200 px-4'>
      {/* Inicio */}
      <Link href='/homeDoctor' className='w-full h-full'>
        <div className='h-full flex flex-col items-center justify-center gap-1'>
          <GoHomeFill size={20} className={ubicacion === 'home' ? activeClass : inactiveClass} />
          <p className={`text-xs ${ubicacion === 'home' ? activeClass : inactiveClass}`}>Inicio</p>
        </div>
      </Link>

      {/* Turnos */}
      <Link href='/turnosDoctor' className='w-full h-full'>
        <div className='h-full flex flex-col items-center justify-center gap-1'>
          <MdDateRange size={20} className={ubicacion === 'turnos' ? activeClass : inactiveClass} />
          <p className={`text-xs ${ubicacion === 'turnos' ? activeClass : inactiveClass}`}>Turnos</p>
        </div>
      </Link>

      {/* Pacientes */}
      <Link href='/pacientesDoctor' className='w-full h-full'>
        <div className='h-full flex flex-col items-center justify-center gap-1'>
          <BsFillPeopleFill size={20} className={ubicacion === 'pacientes' ? activeClass : inactiveClass} />
          <p className={`text-xs ${ubicacion === 'pacientes' ? activeClass : inactiveClass}`}>Pacientes</p>
        </div>
      </Link>

      {/* Agenda */}
      <Link href='/agendaDoctor' className='w-full h-full'>
        <div className='h-full flex flex-col items-center justify-center gap-1'>
          <FaCalendarAlt size={18} className={ubicacion === 'agenda' ? activeClass : inactiveClass} />
          <p className={`text-xs ${ubicacion === 'agenda' ? activeClass : inactiveClass}`}>Agenda</p>
        </div>
      </Link>

      {/* Ajustes */}
      <Link href='/perfilDoctor' className='w-full h-full'>
        <div className='h-full flex flex-col items-center justify-center gap-1'>
          <IoMdSettings size={20} className={ubicacion === 'ajustes' ? activeClass : inactiveClass} />
          <p className={`text-xs ${ubicacion === 'ajustes' ? activeClass : inactiveClass}`}>Ajustes</p>
        </div>
      </Link>
    </div>
  )
}

export default Navegacion