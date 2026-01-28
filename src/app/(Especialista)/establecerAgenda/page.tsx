// Configurar Horario - page.tsx
"use client";

import Link from "next/link";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import {
  IoChevronDown,
  IoChevronUp,
  IoTimeOutline,
  IoCopyOutline,
  IoTrashOutline,
  IoAddOutline,
} from "react-icons/io5";
import {
  doctorAvailability as initialAvailability,
  dayNames,
  workDays,
  DoctorAvailability,
  DayKey,
  TimeSlot,
} from "../data/availability";

const page: React.FC = () => {
  const [schedule, setSchedule] = useState<DoctorAvailability>(initialAvailability);
  const [expandedDay, setExpandedDay] = useState<DayKey | null>("lunes");

  const toggleAvailability = () => {
    setSchedule((prev) => ({ ...prev, availabilityEnabled: !prev.availabilityEnabled }));
  };

  const toggleDayEnabled = (day: DayKey) => {
    if (!schedule.availabilityEnabled) return;
    setSchedule((prev) => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: {
          ...prev.days[day],
          enabled: !prev.days[day].enabled,
          slots:
            !prev.days[day].enabled && prev.days[day].slots.length === 0
              ? [{ startTime: "09:00", endTime: "18:00" }]
              : prev.days[day].slots,
        },
      },
    }));
  };

  const toggleExpand = (day: DayKey) => {
    if (!schedule.availabilityEnabled) return;
    setExpandedDay((prev) => (prev === day ? null : day));
  };

  const updateSlotTime = (day: DayKey, slotIndex: number, field: "startTime" | "endTime", value: string) => {
    if (!schedule.availabilityEnabled) return;
    setSchedule((prev) => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: {
          ...prev.days[day],
          slots: prev.days[day].slots.map((slot, idx) => (idx === slotIndex ? { ...slot, [field]: value } : slot)),
        },
      },
    }));
  };

  const addSlot = (day: DayKey) => {
    if (!schedule.availabilityEnabled) return;
    setSchedule((prev) => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: {
          ...prev.days[day],
          slots: [...prev.days[day].slots, { startTime: "09:00", endTime: "18:00" }],
        },
      },
    }));
  };

  const removeSlot = (day: DayKey, slotIndex: number) => {
    if (!schedule.availabilityEnabled) return;
    setSchedule((prev) => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: {
          ...prev.days[day],
          slots: prev.days[day].slots.filter((_, idx) => idx !== slotIndex),
        },
      },
    }));
  };

  const copyToDay = (fromDay: DayKey, toDay: DayKey) => {
    if (!schedule.availabilityEnabled) return;
    setSchedule((prev) => ({
      ...prev,
      days: {
        ...prev.days,
        [toDay]: { ...prev.days[fromDay] },
      },
    }));
  };

  const copyToAllWorkDays = () => {
    if (!schedule.availabilityEnabled) return;
    const lunesSchedule = schedule.days.lunes;
    setSchedule((prev) => ({
      ...prev,
      days: {
        ...prev.days,
        ...workDays.reduce(
          (acc, day) => ({
            ...acc,
            [day]: { ...lunesSchedule },
          }),
          {},
        ),
      },
    }));
  };

  const handleSave = () => {
    // Acá podrías enviar a una API o guardar en localStorage
    console.log("Saved schedule:", JSON.stringify(schedule, null, 2));
  };

  const formatTimeRange = (slots: TimeSlot[]): string => {
    if (slots.length === 0) return "No disponible";
    if (slots.length === 1) {
      return `${slots[0].startTime} - ${slots[0].endTime}`;
    }
    return `${slots[0].startTime} - ${slots[slots.length - 1].endTime}`;
  };

  const Toggle: React.FC<{ enabled: boolean; onToggle: () => void; size?: "sm" | "md"; disabled?: boolean }> = ({
    enabled,
    onToggle,
    size = "md",
    disabled = false,
  }) => {
    const sizeClasses = size === "sm" ? "w-10 h-5" : "w-12 h-6";
    const circleSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";
    const translateX = size === "sm" ? "translate-x-5" : "translate-x-6";

    return (
      <button
        onClick={onToggle}
        disabled={disabled}
        className={`${sizeClasses} rounded-full transition-colors duration-200 flex items-center px-0.5 ${
          enabled ? "bg-[#2346D3]" : "bg-gray-300"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <div
          className={`${circleSize} bg-white rounded-full shadow-md transform transition-transform duration-200 ${
            enabled ? translateX : "translate-x-0"
          }`}
        />
      </button>
    );
  };

  const TimeInput: React.FC<{ value: string; onChange: (value: string) => void; disabled?: boolean }> = ({
    value,
    onChange,
    disabled = false,
  }) => (
    <div className={`flex items-center gap-1 border border-gray-200 rounded-lg px-3 py-2 bg-white ${disabled ? "opacity-50" : ""}`}>
      <input
        type='time'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-20 text-sm text-gray-700 outline-none bg-transparent ${disabled ? "cursor-not-allowed" : ""}`}
      />
      <IoTimeOutline className='text-gray-400 w-4 h-4' />
    </div>
  );

  const DayRow: React.FC<{ dayKey: DayKey; label: string }> = ({ dayKey, label }) => {
    const daySchedule = schedule.days[dayKey];
    const isExpanded = expandedDay === dayKey;
    const isDisabled = !schedule.availabilityEnabled;

    return (
      <div className={`border-b border-gray-100 last:border-b-0 ${isDisabled ? "opacity-50" : ""}`}>
        <button
          onClick={() => toggleExpand(dayKey)}
          disabled={isDisabled}
          className={`w-full flex items-center justify-between py-4 px-1 ${isDisabled ? "cursor-not-allowed" : ""}`}
        >
          <div className='flex items-center gap-3'>
            <div className={`w-2 h-2 rounded-full ${daySchedule.enabled ? "bg-[#2346D3]" : "bg-gray-300"}`} />
            <span className='text-gray-800 font-medium'>{label}</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-gray-400 text-sm'>
              {daySchedule.enabled ? formatTimeRange(daySchedule.slots) : "No disponible"}
            </span>
            {isExpanded ? (
              <IoChevronUp className='text-gray-400 w-5 h-5' />
            ) : (
              <IoChevronDown className='text-gray-400 w-5 h-5' />
            )}
          </div>
        </button>

        {isExpanded && (
          <div className='pb-4 px-1'>
            <div className='flex items-center justify-between mb-4'>
              <span className='text-gray-600 text-sm'>Habilitar este día</span>
              <Toggle
                enabled={daySchedule.enabled}
                onToggle={() => toggleDayEnabled(dayKey)}
                size='sm'
                disabled={isDisabled}
              />
            </div>

            {daySchedule.enabled && (
              <>
                {daySchedule.slots.map((slot, idx) => (
                  <div key={idx} className='flex items-center gap-2 mb-3'>
                    <TimeInput
                      value={slot.startTime}
                      onChange={(v) => updateSlotTime(dayKey, idx, "startTime", v)}
                      disabled={isDisabled}
                    />
                    <TimeInput
                      value={slot.endTime}
                      onChange={(v) => updateSlotTime(dayKey, idx, "endTime", v)}
                      disabled={isDisabled}
                    />
                    <button
                      onClick={() => removeSlot(dayKey, idx)}
                      disabled={isDisabled}
                      className={`p-2 text-gray-400 hover:text-gray-600 transition-colors ${isDisabled ? "cursor-not-allowed" : ""}`}
                    >
                      <IoTrashOutline className='w-5 h-5' />
                    </button>
                  </div>
                ))}

                <div className='flex items-center justify-between mt-4'>
                  <button
                    onClick={() => addSlot(dayKey)}
                    disabled={isDisabled}
                    className={`flex items-center gap-1 text-[#2346D3] text-sm font-medium ${
                      isDisabled ? "cursor-not-allowed opacity-50" : "hover:opacity-80"
                    } transition-opacity`}
                  >
                    <IoAddOutline className='w-4 h-4' />
                    <span>Agregar intervalo</span>
                  </button>
                  <button
                    onClick={() => {
                      const nextDayIndex = dayNames.findIndex((d) => d.key === dayKey) + 1;
                      if (nextDayIndex < dayNames.length) {
                        copyToDay(dayKey, dayNames[nextDayIndex].key);
                      }
                    }}
                    disabled={isDisabled}
                    className={`flex items-center gap-1 text-gray-500 text-sm ${
                      isDisabled ? "cursor-not-allowed opacity-50" : "hover:text-gray-700"
                    } transition-colors`}
                  >
                    <IoCopyOutline className='w-4 h-4' />
                    <span>Copiar</span>
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='min-h-screen bg-linear-to-b from-blue-50 to-white'>
      <div className='max-w-md mx-auto bg-white min-h-screen shadow-lg overflow-hidden'>
        {/* Header */}
        <div className='flex items-center justify-between px-4 py-4 border-b border-gray-100'>
          <Link href={"/perfilDoctor"} className='z-50 active:scale-90 active:text-zinc-500 text-zinc-800 transition-all'>
            <button className='hover:scale-95 transition-all'>
              <IoIosArrowBack size={28} className='text-zinc-800' />
            </button>
          </Link>
          <h1 className='text-zinc-800 text-xl font-bold'>Configurar Horario</h1>
          <button
            onClick={handleSave}
            className='text-[#2346D3] font-semibold text-[15px] active:scale-95 hover:opacity-80 active:opacity-70 transition-all'
          >
            Guardar
          </button>
        </div>

        {/* Content */}
        <div className='px-5 py-6'>
          {/* Availability Toggle */}
          <div className='flex items-center justify-between mb-6'>
            <div>
              <p className='text-gray-800 font-medium'>Estado de disponibilidad</p>
              <p className={`text-sm ${schedule.availabilityEnabled ? "text-[#2346D3]" : "text-gray-400"}`}>
                {schedule.availabilityEnabled ? "Aceptando nuevos turnos" : "No aceptando turnos"}
              </p>
            </div>
            <Toggle enabled={schedule.availabilityEnabled} onToggle={toggleAvailability} />
          </div>

          {/* Weekly Schedule */}
          <div className='mb-6'>
            <h2 className={`text-lg font-semibold mb-1 ${schedule.availabilityEnabled ? "text-gray-800" : "text-gray-400"}`}>
              Agenda Semanal
            </h2>
            <p className={`text-sm mb-4 ${schedule.availabilityEnabled ? "text-gray-500" : "text-gray-300"}`}>
              Define tus bloques de atención para cada día.
            </p>

            <div className={`bg-gray-50 rounded-2xl px-4 ${!schedule.availabilityEnabled ? "pointer-events-none" : ""}`}>
              {dayNames.map(({ key, label }) => (
                <DayRow key={key} dayKey={key} label={label} />
              ))}
            </div>
          </div>

          {/* Copy to all work days button */}
          <button
            onClick={copyToAllWorkDays}
            disabled={!schedule.availabilityEnabled}
            className={`w-full flex items-center justify-center gap-2 py-4 bg-blue-50 text-[#2346D3] font-semibold rounded-xl border-2 border-dashed border-[#2346D3]/30 transition-all ${
              schedule.availabilityEnabled ? "hover:bg-blue-100 active:scale-[0.98]" : "opacity-50 cursor-not-allowed"
            }`}
          >
            <IoCopyOutline className='w-5 h-5' />
            <span>Copiar Lunes a todos los días hábiles</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;