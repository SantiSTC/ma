"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import { mockAppointments  } from "@/app/data/appointments";
import { formatAppointment } from "@/app/utils/formatDate"

import { FaArrowRight } from "react-icons/fa";

export default function DoctorsSlider() {
  const [ref] = useKeenSlider({
    loop: false,
    rubberband: false, 
    slides: { perView: 1.2, spacing: 10 },
  });

  return (
    <div ref={ref} className="keen-slider px-8 py-1">
      {(mockAppointments.map((appointment) => (
        <div key={appointment.id} className="keen-slider__slide bg-white p-4 shadow-sm rounded-md flex flex-col gap-4">
            {/* Appointment Data */}
            <div className="h-full w-full flex flex-row gap-4">
                {/* Doctor Image */}
                <div>
                    <img src={appointment.imageUrl} alt="" className="h-20 w-20 rounded-lg"/>
                </div>
                {/* Appointment Data */}
                <div className=" h-full flex flex-col gap-0.5">
                    <p className="text-xl font-bold text-zinc-800 whitespace-nowrap">{appointment.doctorName}</p>
                    <p className="text-lg font-medium text-zinc-600 leading-tight">{formatAppointment(appointment.date, appointment.time)}</p>
                    <p className="text-zinc-600">{appointment.specialty}</p>
                    <p className="text-zinc-600">{appointment.location}</p>
                </div>
            </div>
            {/* Details Button */}
            <div className="h-12 w-full">
                <button className="w-full h-full rounded-md bg-blue-600/10 text-blue-600 flex flex-row justify-center items-center gap-4 active:scale-95 transition-all duration-200">
                    <p className="font-semibold">Ver detalles del turno</p>
                    <FaArrowRight size={16} />
                </button>
            </div>
        </div>
      )))}
    </div>
  );
}
