"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import { mockAppointments } from "../data/appointments";
import { formatAppointment } from "@/app/utils/formatDate";

import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import { acortarDireccion } from "../../utils/acortarDireccion";

export default function TurnosSlider() {
  const [ref] = useKeenSlider({
    loop: false,
    rubberband: false,
    slides: { perView: 1.2, spacing: 10 },
  });

  // Si no hay turnos, mostrar mensaje
  if (mockAppointments.length === 0) {
    return (
      <div className='px-6 py-1 w-full'>
        <div className='bg-white p-8 shadow-sm rounded-xl flex flex-col items-center justify-center gap-4 text-center'>
          <div className='p-4 bg-zinc-100 rounded-full'>
            <FaCalendarAlt size={32} className='text-zinc-400' />
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-lg font-semibold text-zinc-800'>No tienes turnos próximos</p>
            <p className='text-sm text-zinc-500'>Agenda tu primera consulta médica</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className='keen-slider px-8 py-1'>
      {mockAppointments.map((appointment) => (
        <div key={appointment.id} className='keen-slider__slide bg-white p-4 shadow-sm rounded-md flex flex-col gap-2'>
          {/* Appointment Data */}
          <div className='h-full w-full flex flex-row gap-4'>
            {/* Doctor Image */}
            <div>
              <img
                src={appointment.especialista.imageUrl}
                alt=''
                className='h-18 w-18 aspect-square rounded-full object-cover object-center'
              />
            </div>
            {/* Appointment Data */}
            <div className='h-full flex flex-col gap-0.5 flex-1'>
              <p className='text-xl font-bold text-zinc-800 whitespace-nowrap'>{appointment.especialista.name}</p>
              <p className='text-sm font-medium text-zinc-500 leading-tight'>
                {formatAppointment(appointment.fecha, appointment.hora)}
              </p>
              <p className='text-sm text-[#2346D3]'>{appointment.especialista.specialty}</p>
              <p className='text-zinc-600 text-sm'>{acortarDireccion(appointment.especialista.location)}</p>
            </div>
          </div>
          {/* Details Button */}
          <div className='h-12 w-full'>
            <Link href={`/turnDetails/${appointment.id}`}>
              <button className='w-full h-full rounded-md bg-[#2346D3]/15 text-[#2346D3] flex flex-row justify-center items-center gap-4 active:scale-95 transition-all duration-200'>
                <p className='font-semibold'>Ver detalles del turno</p>
                <FaArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
