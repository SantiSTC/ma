// @/app/(Doctor)/data/availability.ts

export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface DaySchedule {
  enabled: boolean;
  slots: TimeSlot[];
}

export interface DoctorAvailability {
  availabilityEnabled: boolean;
  days: {
    lunes: DaySchedule;
    martes: DaySchedule;
    miercoles: DaySchedule;
    jueves: DaySchedule;
    viernes: DaySchedule;
    sabado: DaySchedule;
    domingo: DaySchedule;
  };
}

export type DayKey = keyof DoctorAvailability["days"];

export const dayNames: { key: DayKey; label: string }[] = [
  { key: "lunes", label: "Lunes" },
  { key: "martes", label: "Martes" },
  { key: "miercoles", label: "Miércoles" },
  { key: "jueves", label: "Jueves" },
  { key: "viernes", label: "Viernes" },
  { key: "sabado", label: "Sábado" },
  { key: "domingo", label: "Domingo" },
];

export const workDays: DayKey[] = ["lunes", "martes", "miercoles", "jueves", "viernes"];

// Disponibilidad del doctor (ejemplo con horarios ya seteados)
export const doctorAvailability: DoctorAvailability = {
  availabilityEnabled: true,
  days: {
    lunes: {
      enabled: true,
      slots: [
        { startTime: "08:00", endTime: "12:00" },
        { startTime: "14:00", endTime: "18:00" },
      ],
    },
    martes: {
      enabled: true,
      slots: [
        { startTime: "08:00", endTime: "12:00" },
        { startTime: "14:00", endTime: "18:00" },
      ],
    },
    miercoles: {
      enabled: true,
      slots: [
        { startTime: "09:00", endTime: "13:00" },
        { startTime: "15:00", endTime: "19:00" },
      ],
    },
    jueves: {
      enabled: true,
      slots: [
        { startTime: "08:00", endTime: "12:00" },
        { startTime: "14:00", endTime: "18:00" },
      ],
    },
    viernes: {
      enabled: true,
      slots: [
        { startTime: "08:00", endTime: "12:00" },
        { startTime: "14:00", endTime: "17:00" },
      ],
    },
    sabado: {
      enabled: true,
      slots: [
        { startTime: "09:00", endTime: "12:00" },
      ],
    },
    domingo: {
      enabled: false,
      slots: [],
    },
  },
};

// Helper: obtener el DayKey a partir de un Date
export const getDayKeyFromDate = (date: Date): DayKey => {
  const dayIndex = date.getDay(); // 0 = domingo, 1 = lunes, etc.
  const dayMap: DayKey[] = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
  return dayMap[dayIndex];
};

// Helper: generar todos los slots de 30 min entre dos horas
export const generateTimeSlotsInRange = (startTime: string, endTime: string): string[] => {
  const slots: string[] = [];
  const [startHour, startMin] = startTime.split(":").map(Number);
  const [endHour, endMin] = endTime.split(":").map(Number);
  
  let currentHour = startHour;
  let currentMin = startMin;
  
  while (currentHour < endHour || (currentHour === endHour && currentMin < endMin)) {
    slots.push(`${String(currentHour).padStart(2, "0")}:${String(currentMin).padStart(2, "0")}`);
    currentMin += 30;
    if (currentMin >= 60) {
      currentMin = 0;
      currentHour += 1;
    }
  }
  
  return slots;
};

// Helper: obtener todos los slots disponibles para un día específico
export const getAvailableSlotsForDay = (date: Date, availability: DoctorAvailability = doctorAvailability): string[] => {
  if (!availability.availabilityEnabled) return [];
  
  const dayKey = getDayKeyFromDate(date);
  const daySchedule = availability.days[dayKey];
  
  if (!daySchedule.enabled || daySchedule.slots.length === 0) return [];
  
  const allSlots: string[] = [];
  
  daySchedule.slots.forEach((slot) => {
    const slotsInRange = generateTimeSlotsInRange(slot.startTime, slot.endTime);
    allSlots.push(...slotsInRange);
  });
  
  return allSlots;
};

// Helper: verificar si una hora específica está dentro de la disponibilidad
export const isTimeInAvailability = (time: string, date: Date, availability: DoctorAvailability = doctorAvailability): boolean => {
  const availableSlots = getAvailableSlotsForDay(date, availability);
  return availableSlots.includes(time);
};

// Helper: obtener los rangos de descanso (huecos entre slots)
export const getBreakTimesForDay = (date: Date, availability: DoctorAvailability = doctorAvailability): { start: string; end: string }[] => {
  if (!availability.availabilityEnabled) return [];
  
  const dayKey = getDayKeyFromDate(date);
  const daySchedule = availability.days[dayKey];
  
  if (!daySchedule.enabled || daySchedule.slots.length <= 1) return [];
  
  const breaks: { start: string; end: string }[] = [];
  
  for (let i = 0; i < daySchedule.slots.length - 1; i++) {
    const currentSlotEnd = daySchedule.slots[i].endTime;
    const nextSlotStart = daySchedule.slots[i + 1].startTime;
    
    if (currentSlotEnd !== nextSlotStart) {
      breaks.push({ start: currentSlotEnd, end: nextSlotStart });
    }
  }
  
  return breaks;
};