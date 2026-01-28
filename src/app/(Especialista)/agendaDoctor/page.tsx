// Agenda Médica - page.tsx
"use client";

import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowBack, IoMdSettings } from "react-icons/io";
import {
  IoChevronForward,
  IoVideocam,
  IoLocation,
  IoClose,
  IoPlayCircle,
  IoCalendarOutline,
  IoAddCircleOutline,
} from "react-icons/io5";
import { FaCalendarAlt, FaCoffee } from "react-icons/fa";
import { mockAppointments } from "@/app/(Paciente)/data/appointments";
import {
  doctorAvailability,
  getAvailableSlotsForDay,
  getBreakTimesForDay,
  generateTimeSlotsInRange,
  getDayKeyFromDate,
} from "../data/availability";
import { Turno } from "@/app/types";
import { GoHomeFill } from "react-icons/go";
import { MdDateRange } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import Navegacion from "../components/navegacion";

const DOCTOR_ID = "d1";

const page: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTurno, setSelectedTurno] = useState<Turno | null>(null);
  const dateSliderRef = useRef<HTMLDivElement>(null);

  const doctorAppointments = (mockAppointments as Turno[]).filter((turno) => turno.especialista.id === DOCTOR_ID);

  const generateDates = (): Date[] => {
    const dates: Date[] = [];
    const today = new Date();

    // Ayer
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    dates.push(yesterday);

    // Hoy + 15 días adelante
    for (let i = 0; i <= 15; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  const dates = generateDates();

  const formatDateForComparison = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getDayName = (date: Date): string => {
    const days = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];
    return days[date.getDay()];
  };

  const getMonthName = (date: Date): string => {
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return months[date.getMonth()];
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return formatDateForComparison(date) === formatDateForComparison(today);
  };

  const isSelected = (date: Date): boolean => {
    return formatDateForComparison(date) === formatDateForComparison(selectedDate);
  };

  const getTurnosForSelectedDate = (): Turno[] => {
    const dateStr = formatDateForComparison(selectedDate);
    return doctorAppointments.filter((turno) => turno.fecha === dateStr).sort((a, b) => a.hora.localeCompare(b.hora));
  };

  const turnosDelDia = getTurnosForSelectedDate();

  const getEstadoColor = (estado: string): string => {
    switch (estado) {
      case "confirmado":
        return "text-green-600";
      case "pendiente":
        return "text-orange-400";
      case "cancelado":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

  const getEstadoText = (estado: string): string => {
    switch (estado) {
      case "confirmado":
        return "Confirmado";
      case "pendiente":
        return "Pendiente";
      case "cancelado":
        return "Cancelado";
      default:
        return estado;
    }
  };

  const getShadowByEstado = (estado: string): string => {
    switch (estado) {
      case "confirmado":
        return "shadow-[-4px_0px_0px_0px_rgba(35,70,211,0.8)]"; // azul original
      case "pendiente":
        return "shadow-[-4px_0px_0px_0px_rgba(251,146,60,1)]"; // orange-400
      case "cancelado":
        return "shadow-[-4px_0px_0px_0px_rgba(220,38,38,1)]"; // red-600
      default:
        return "shadow-[-4px_0px_0px_0px_rgba(35,70,211,0.8)]";
    }
  };

  const getAvatarBgByEstado = (estado: string): string => {
    switch (estado) {
      case "confirmado":
        return "bg-blue-100";
      case "pendiente":
        return "bg-orange-100";
      case "cancelado":
        return "bg-red-100";
      default:
        return "bg-blue-100";
    }
  };

  const getAvatarTextByEstado = (estado: string): string => {
    switch (estado) {
      case "confirmado":
        return "text-[#2346D3]";
      case "pendiente":
        return "text-orange-400";
      case "cancelado":
        return "text-red-600";
      default:
        return "text-[#2346D3]";
    }
  };

  const getIconColorByEstado = (estado: string): string => {
    switch (estado) {
      case "confirmado":
        return "text-[#2346D3]";
      case "pendiente":
        return "text-orange-400";
      case "cancelado":
        return "text-red-600";
      default:
        return "text-[#2346D3]";
    }
  };

  const formatHoraRango = (hora: string): string => {
    const [hours, minutes] = hora.split(":").map(Number);
    const endMinutes = minutes + 30;
    const endHour = endMinutes >= 60 ? hours + 1 : hours;
    const endMin = endMinutes >= 60 ? endMinutes - 60 : endMinutes;
    return `${hora} - ${String(endHour).padStart(2, "0")}:${String(endMin).padStart(2, "0")}`;
  };

  // Scroll al día seleccionado (hoy) al montar
  useEffect(() => {
    if (dateSliderRef.current) {
      const todayIndex = 1;
      const itemWidth = 56;
      const scrollPosition = todayIndex * itemWidth - 20;
      dateSliderRef.current.scrollLeft = scrollPosition;
    }
  }, []);

  // Verificar si una hora está en un período de descanso
  const isBreakTime = (time: string): boolean => {
    const breaks = getBreakTimesForDay(selectedDate, doctorAvailability);
    for (const breakPeriod of breaks) {
      const breakSlots = generateTimeSlotsInRange(breakPeriod.start, breakPeriod.end);
      if (breakSlots.includes(time)) {
        return true;
      }
    }
    return false;
  };

  // Generar slots de hora para el día basado en la disponibilidad
  const generateTimeSlots = () => {
    const slots: { hora: string; turno: Turno | null; tipo: "turno" | "disponible" | "descanso" | "no-disponible" }[] =
      [];

    const dayKey = getDayKeyFromDate(selectedDate);
    const daySchedule = doctorAvailability.days[dayKey];

    // Si el día no está habilitado o la disponibilidad general está apagada
    if (!doctorAvailability.availabilityEnabled || !daySchedule.enabled) {
      return slots;
    }

    // Obtener todos los slots disponibles del día
    const availableSlots = getAvailableSlotsForDay(selectedDate, doctorAvailability);

    // Para cada slot disponible, verificar si hay turno, es descanso o está libre
    availableSlots.forEach((hora) => {
      const turno = turnosDelDia.find((t) => t.hora === hora);

      if (turno) {
        slots.push({ hora, turno, tipo: "turno" });
      } else {
        slots.push({ hora, turno: null, tipo: "disponible" });
      }
    });

    // Agregar los descansos (huecos entre slots de disponibilidad)
    const breaks = getBreakTimesForDay(selectedDate, doctorAvailability);
    breaks.forEach((breakPeriod) => {
      const breakSlots = generateTimeSlotsInRange(breakPeriod.start, breakPeriod.end);
      breakSlots.forEach((hora) => {
        // Insertar en la posición correcta
        const insertIndex = slots.findIndex((s) => s.hora > hora);
        const breakSlot = { hora, turno: null, tipo: "descanso" as const };
        if (insertIndex === -1) {
          slots.push(breakSlot);
        } else {
          slots.splice(insertIndex, 0, breakSlot);
        }
      });
    });

    // Ordenar por hora
    slots.sort((a, b) => a.hora.localeCompare(b.hora));

    return slots;
  };

  const timeSlots = generateTimeSlots();

  const TurnoItem: React.FC<{ turno: Turno }> = ({ turno }) => {
    const isVirtual = turno.modalidad === "virtual";

    return (
      <button
        onClick={() => setSelectedTurno(turno)}
        className={`w-full flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 active:scale-[0.98] transition-all ${getShadowByEstado(turno.estado)}`}
      >
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getAvatarBgByEstado(turno.estado)}`}>
          <span className={`font-semibold text-lg ${getAvatarTextByEstado(turno.estado)}`}>{turno.paciente_name.charAt(0).toUpperCase()}</span>
        </div>

        <div className='flex-1 text-left'>
          <p className='text-gray-800 font-semibold'>{turno.paciente_name}</p>
          <div className='flex items-center gap-2 text-sm'>
            {isVirtual ? (
              <IoVideocam className={`w-4 h-4 ${getIconColorByEstado(turno.estado)}`} />
            ) : (
              <IoLocation className={`w-4 h-4 ${getIconColorByEstado(turno.estado)}`} />
            )}
            <span className='text-gray-500 whitespace-nowrap'>
              {isVirtual ? "Virtual" : "Presencial"} • {getEstadoText(turno.estado)}
            </span>
          </div>
        </div>

        <IoChevronForward className='text-gray-300 w-5 h-5' />
      </button>
    );
  };

  const EspacioDisponible: React.FC<{ hora: string }> = ({ hora }) => (
    <div className='w-full flex items-center gap-3 p-3 bg-white rounded-2xl shadow-sm border border-dashed border-gray-200'>
      <div className='w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border-2 border-dashed border-gray-200'>
        <IoAddCircleOutline className='text-gray-300 w-6 h-6' />
      </div>

      <div className='flex-1 text-left'>
        <p className='text-gray-400 font-medium'>Espacio disponible</p>
      </div>

      <button className='px-3 py-1.5 border border-[#2346D3] text-[#2346D3] text-sm font-medium rounded-lg hover:bg-blue-50 active:scale-95 transition-all'>
        BLOQUEAR
      </button>
    </div>
  );

  const Descanso: React.FC<{ hora: string }> = ({ hora }) => (
    <div className='w-full flex items-center gap-3 p-3 bg-gray-50 rounded-2xl'>
      <div className='w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center'>
        <FaCoffee className='text-gray-400 w-5 h-5' />
      </div>

      <div className='flex-1 text-left'>
        <p className='text-gray-600 font-medium'>Receso / Descanso</p>
        <p className='text-gray-400 text-sm'>No disponible para turnos</p>
      </div>
    </div>
  );

  const TurnoDetailSheet: React.FC = () => {
    if (!selectedTurno) return null;

    return (
      <div className='fixed inset-0 z-50 flex items-end justify-center'>
        <div className='absolute inset-0 bg-black/30' onClick={() => setSelectedTurno(null)} />
        <div className='relative w-full max-w-md bg-white rounded-t-3xl p-6 pb-8 animate-slide-up'>
          <button
            onClick={() => setSelectedTurno(null)}
            className='absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600'
          >
            <IoClose className='w-6 h-6' />
          </button>

          <div className='flex items-center gap-4 mb-6'>
            <div className='w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center'>
              <span className='text-[#2346D3] font-bold text-xl'>
                {selectedTurno.paciente_name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className='text-xl font-bold text-gray-800'>{selectedTurno.paciente_name}</h3>
              <p className='text-gray-500'>
                DNI: {selectedTurno.paciente_dni} • {selectedTurno.resumen}
              </p>
            </div>
          </div>

          <div className='flex gap-4 mb-4'>
            <div className='flex-1 bg-gray-50 rounded-xl p-4'>
              <p className='text-gray-400 text-xs uppercase mb-1'>Hora</p>
              <p className='text-gray-800 font-semibold'>{formatHoraRango(selectedTurno.hora)}</p>
            </div>
            <div className='flex-1 bg-gray-50 rounded-xl p-4'>
              <p className='text-gray-400 text-xs uppercase mb-1'>Estado</p>
              <p className={`font-semibold flex items-center gap-1 ${getEstadoColor(selectedTurno.estado)}`}>
                <span className='w-2 h-2 rounded-full bg-current' />
                {getEstadoText(selectedTurno.estado)}
              </p>
            </div>
          </div>

          <div className='flex gap-4 mb-6'>
            <div className='flex-1 bg-gray-50 rounded-xl p-4'>
              <p className='text-gray-400 text-xs uppercase mb-1'>Modalidad</p>
              <p className='text-gray-800 font-semibold flex items-center gap-2'>
                {selectedTurno.modalidad === "virtual" ? (
                  <IoVideocam className='text-[#2346D3] w-4 h-4' />
                ) : (
                  <IoLocation className='text-[#2346D3] w-4 h-4' />
                )}
                {selectedTurno.modalidad === "virtual" ? "Virtual" : "Presencial"}
              </p>
            </div>
            <div className='flex-1 bg-gray-50 rounded-xl p-4'>
              <p className='text-gray-400 text-xs uppercase mb-1'>Fecha</p>
              <p className='text-gray-800 font-semibold'>{selectedTurno.fecha}</p>
            </div>
          </div>

          {selectedTurno.estado === "cancelado" && selectedTurno.motivoCancelacion && (
            <div className='bg-red-50 rounded-xl p-4 mb-6'>
              <p className='text-red-400 text-xs uppercase mb-1'>Motivo de cancelación</p>
              <p className='text-red-600 font-medium'>{selectedTurno.motivoCancelacion}</p>
              <p className='text-red-400 text-sm mt-1'>
                Cancelado por: {selectedTurno.rechazadoPor === "paciente" ? "Paciente" : "Doctor"}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const isDayAvailable = (): boolean => {
    if (!doctorAvailability.availabilityEnabled) return false;
    const dayKey = getDayKeyFromDate(selectedDate);
    return doctorAvailability.days[dayKey].enabled;
  };

  return (
    <div className='min-h-screen bg-linear-to-b from-blue-50 to-white'>
      <div className='max-w-md mx-auto bg-white min-h-screen shadow-lg overflow-hidden'>
        {/* Header */}
        <div className='flex items-center justify-between px-4 py-4 border-b border-gray-100'>
          <Link href={"/homeDoctor"} className='active:scale-90 active:text-zinc-500 text-zinc-800 transition-all'>
            <button className='hover:scale-95 transition-all'>
              <IoIosArrowBack size={28} className='text-zinc-800' />
            </button>
          </Link>
          <h1 className='text-zinc-800 text-xl font-bold'>Agenda Médica</h1>
          <div className='w-7' />
        </div>

        {/* Month & Year */}
        <div className='px-5 pt-4 flex items-center justify-between'>
          <h2 className='text-lg font-semibold text-gray-800'>
            {getMonthName(selectedDate)} {selectedDate.getFullYear()}
          </h2>
          <button className='p-2 text-gray-400'>
            <IoCalendarOutline className='w-5 h-5' />
          </button>
        </div>

        {/* Date Slider */}
        <div
          ref={dateSliderRef}
          className='flex gap-2 px-5 py-4 overflow-x-auto scrollbar-hide'
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {dates.map((date, index) => {
            const dayKey = getDayKeyFromDate(date);
            const dayEnabled = doctorAvailability.availabilityEnabled && doctorAvailability.days[dayKey].enabled;

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(date)}
                className={`flex flex-col items-center min-w-12 py-2 px-2 rounded-xl transition-all ${
                  isSelected(date)
                    ? "bg-[#2346D3] text-white"
                    : dayEnabled
                      ? "text-gray-600 hover:bg-gray-100"
                      : "text-gray-300"
                }`}
              >
                <span
                  className={`text-xs font-medium ${isSelected(date) ? "text-blue-200" : dayEnabled ? "text-gray-400" : "text-gray-300"}`}
                >
                  {getDayName(date)}
                </span>
                <span
                  className={`text-lg font-bold mt-1 ${isSelected(date) ? "text-white" : dayEnabled ? "text-gray-800" : "text-gray-300"}`}
                >
                  {date.getDate()}
                </span>
                {isToday(date) && !isSelected(date) && <div className='w-1.5 h-1.5 rounded-full bg-[#2346D3] mt-1' />}
                {isToday(date) && isSelected(date) && <div className='w-1.5 h-1.5 rounded-full bg-white mt-1' />}
              </button>
            );
          })}
        </div>

        {/* Turnos del Día */}
        <div className='px-5 pb-24'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>
            {isToday(selectedDate)
              ? "Turnos de Hoy"
              : `Turnos del ${selectedDate.getDate()} de ${getMonthName(selectedDate)}`}
          </h3>

          {!isDayAvailable() ? (
            <div className='flex flex-col items-center justify-center py-12 text-gray-400'>
              <IoCalendarOutline className='w-16 h-16 mb-4' />
              <p className='text-lg font-medium'>Día no disponible</p>
              <p className='text-sm text-center px-4'>
                {!doctorAvailability.availabilityEnabled
                  ? "La disponibilidad está desactivada"
                  : "No tienes horario configurado para este día"}
              </p>
            </div>
          ) : timeSlots.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-12 text-gray-400'>
              <IoCalendarOutline className='w-16 h-16 mb-4' />
              <p className='text-lg font-medium'>No hay turnos</p>
              <p className='text-sm'>No tienes turnos programados para este día</p>
            </div>
          ) : (
            <div className='space-y-3'>
              {timeSlots.map((slot, index) => (
                <div key={index} className='flex gap-3'>
                  <div className='w-12 pt-3'>
                    <span className='text-sm text-gray-400 font-medium'>{slot.hora}</span>
                  </div>
                  <div className='flex-1'>
                    {slot.tipo === "turno" && slot.turno && <TurnoItem turno={slot.turno} />}
                    {slot.tipo === "disponible" && <EspacioDisponible hora={slot.hora} />}
                    {slot.tipo === "descanso" && <Descanso hora={slot.hora} />}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Turno Detail Sheet */}
        <TurnoDetailSheet />
      </div>

      <Navegacion ubicacion='agenda' />

      {/* CSS para la animación */}
      <style jsx global>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default page;