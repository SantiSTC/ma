"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  FaArrowRight,
  FaBriefcaseMedical,
  FaCalendarCheck,
  FaCheck,
  FaClock,
  FaIdCard,
  FaMoon,
  FaRegCalendar,
  FaRegCalendarTimes,
  FaSun,
  FaUser,
} from "react-icons/fa";
import { IoIosArrowBack, IoMdPin, IoMdSearch } from "react-icons/io";
import { specialtiesIcons } from "../data/specialtiesIcons";
import { mockDoctors } from "../data/doctors";
import { TiTick } from "react-icons/ti";
import { GoStarFill } from "react-icons/go";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { Doctor, Turno } from "../../types";
import { filtrosDisponibles } from "../data/filters";
import { exampleUser } from "../data/actualUser";
import { acortarDireccion } from "../../utils/acortarDireccion";

const page = () => {
  const [tab, setTab] = useState("eligiendoEspecialidad");
  const [step, setStep] = useState(1);

  const [especialidadElegida, setEspecialidadElegida] = useState<any>(null);
  const [especialistaElegido, setEspecialistaElegido] = useState<Doctor | null>(null);

  const [fechaElegida, setFechaElegida] = useState<string | null>(null);
  const [horarioElegido, setHorarioElegido] = useState<string | null>(null);

  const [resumenDeLaConsulta, setResumenDeLaConsulta] = useState<string>("");

  const [fechaCalendario, setfechaCalendario] = useState(() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  });

  const [confirmandoTurno, setConfirmandoTurno] = useState(false);
  const [confirmandoCancelar, setConfirmandoCancelar] = useState(false);

  const [turno, setTurno] = useState<Turno | null>(null);

  const diasSemana = ["L", "M", "M", "J", "V", "S", "D"];
  const meses = [
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

  const horariosMañana = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"];
  const horariosTarde = ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];

  const parseDate = (fecha: string): Date => {
    const [day, month, year] = fecha.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const formatDate = (date: Date): string => {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();

    return `${dd}-${mm}-${yyyy}`;
  };

  // Funciones para el calendario
  const obtenerDiasDelMes = (fecha: string) => {
    const baseDate = parseDate(fecha);
    const año = baseDate.getFullYear();
    const mes = baseDate.getMonth();

    const primerDia = new Date(año, mes, 1);
    const ultimoDia = new Date(año, mes + 1, 0);

    const diasMes: (string | null)[] = [];
    const primerDiaSemana = primerDia.getDay();
    const ajuste = primerDiaSemana === 0 ? 6 : primerDiaSemana - 1;

    for (let i = 0; i < ajuste; i++) {
      diasMes.push(null);
    }

    for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
      diasMes.push(formatDate(new Date(año, mes, dia)));
    }

    return diasMes;
  };

  const cambiarMes = (direccion: number) => {
    const hoy = new Date();
    const limiteMaximo = new Date(hoy.getFullYear(), hoy.getMonth() + 6, 1);

    const fechaCalendarioDate = parseDate(fechaCalendario);
    const nuevoMes = new Date(fechaCalendarioDate.getFullYear(), fechaCalendarioDate.getMonth() + direccion, 1);

    if (nuevoMes < new Date(hoy.getFullYear(), hoy.getMonth(), 1)) return;
    if (nuevoMes >= limiteMaximo) return;

    setfechaCalendario(formatDate(nuevoMes));
  };

  const esFechaSeleccionada = (fecha: string | null) => {
    if (!fecha || !fechaElegida) return false;
    return fecha === fechaElegida;
  };

  const esHoy = (fecha: string | null) => {
    if (!fecha) return false;
    return fecha === formatDate(new Date());
  };

  const esFechaPasada = (fecha: string | null) => {
    if (!fecha) return false;

    const fechaDate = parseDate(fecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return fechaDate < hoy;
  };

  const formatearFechaCompleta = (fecha: string | null) => {
    if (!fecha) return "";

    const date = parseDate(fecha);
    const dia = date.getDate();
    const mes = meses[date.getMonth()];

    return `${dia} ${mes}`;
  };

  const transicionPaso1a2 = () => {
    if (especialidadElegida) {
      setStep(2);
      setTab("eligiendoEspecialista");
    }
  };

  const transicionPaso2a3 = () => {
    if (especialistaElegido) {
      setStep(3);
      setTab("eligiendoFechaYHora");
    }
  };

  const transicionPaso3a4 = () => {
    if (fechaElegida && horarioElegido) {
      setStep(4);
      setTab("confirmandoDatos");
    }
  };

  const volverAtras = (to: string) => {
    setTimeout(() => {
      switch (to) {
        case "eligiendoEspecialidad":
          setTab("eligiendoEspecialidad");
          setStep(1);
          break;
        case "eligiendoEspecialista":
          setTab("eligiendoEspecialista");
          setStep(2);
          break;
        case "eligiendoFechaYHora":
          setTab("eligiendoFechaYHora");
          setStep(3);
          break;
      }
    }, 200);
  };

  const confirmarReserva = () => {
    let objTurno: Turno = {
      id: crypto.randomUUID(),
      paciente_dni: exampleUser.dni,
      paciente_name: exampleUser.name,
      especialista: especialistaElegido as Doctor,
      fecha: fechaElegida as string,
      hora: horarioElegido as string,
      estado: "pendiente",
      modalidad: "presencial",
      resumen: resumenDeLaConsulta,
    };

    setTurno(objTurno);
    setConfirmandoTurno(false);
  };

  const cancelarReserva = () => {
    setConfirmandoCancelar(false);
  };

  const obtenerNombreDePaso = () => {
    switch (step) {
      case 1:
        return "Especialidad";
      case 2:
        return "Especialista";
      case 3:
        return "Fecha y Hora";
      case 4:
        return "Confirmar Datos";
      default:
        return "";
    }
  };

  const diasDelMes = obtenerDiasDelMes(fechaCalendario);

  const confirmarTurno = () => {
    if (resumenDeLaConsulta != "" && resumenDeLaConsulta.length >= 20) {
      setConfirmandoTurno(true);
    }
  };

  return (
    <div className='w-full h-full flex flex-col gap-6 px-6 pt-6 bg-zinc-50/50 relative'>
      {/* Top Navbar Home */}
      <div className='w-full flex flex-row justify-between items-center'>
        {/* Back Button */}
        <Link href={"/MobileHome"} className='z-50 active:scale-90 active:text-zinc-500 text-zinc-800 transition-all'>
          <button className='hover:scale-95 transition-all'>
            <IoIosArrowBack size={28} className='text-zinc-800' />
          </button>
        </Link>
        {/* Title */}
        <div className='absolute py-6 w-screen top-0 left-0 flex justify-center'>
          <h2 className='text-zinc-800 text-xl font-bold'>Solicitar Nuevo Turno</h2>
        </div>
      </div>

      {/* Indicador de pagina */}
      <div className='pt-2 w-full flex justify-center items-center flex-col gap-6'>
        {/* Puntos azules */}
        <div className='flex flex-row gap-4'>
          <div
            className={`h-3 ${step == 1 ? "bg-[#2346D3] w-10" : "w-3"} ${
              step > 1 ? "bg-blue-300" : ""
            } rounded-full transition-all duration-500 ease-out`}
          ></div>
          <div
            className={`h-3 ${step == 2 ? "bg-[#2346D3] w-10" : "w-3"} ${step > 2 ? "bg-blue-300" : ""} rounded-full ${
              step < 2 ? "bg-slate-300" : ""
            } transition-all duration-500 ease-out`}
          ></div>
          <div
            className={`h-3 ${step == 3 ? "bg-[#2346D3] w-10" : "w-3"} ${step > 3 ? "bg-blue-300" : ""} rounded-full ${
              step < 3 ? "bg-slate-300" : ""
            } transition-all duration-500 ease-out`}
          ></div>
          <div
            className={`h-3 ${step == 4 ? "bg-[#2346D3] w-10" : "w-3"} ${
              step < 4 ? "bg-slate-300" : ""
            } rounded-full transition-all duration-500 ease-out`}
          ></div>
        </div>
        {/* Indicador de pagina */}
        <div>
          <p className='text-slate-400 text-sm'>
            Paso {step} de 4: {obtenerNombreDePaso()}
          </p>
        </div>
      </div>

      {/* Main Section */}

      {/* Pestaña de Especilidad */}
      {tab == "eligiendoEspecialidad" && (
        <div className='flex flex-col gap-4'>
          {/* Title */}
          <div className='w-full flex justify-start'>
            <h2 className='text-zinc-800 text-2xl font-bold'>Buscar Especialidad</h2>
          </div>

          {/* Search Bar */}
          <div className='w-full bg-zinc-100 border border-zinc-200 h-14 shadow- rounded-xl flex flex-row items-center px-4'>
            {/* Search/Lupa Icon */}
            <div className='mr-3'>
              <IoMdSearch size={24} className='text-zinc-700' />
            </div>
            {/* Input */}
            <div className='w-full h-full flex items-center'>
              <input
                type='text'
                className='w-full h-[70%] outline-none border-none focus:outline-none focus:ring-0 caret-zinc-700 placeholder:tex'
                placeholder='Buscar especialidad'
              />
            </div>
          </div>

          {/* Leyenda */}
          <p className='text-base font-semibold text-zinc-500 tracking-wide'>O SELECCIONA UNA DE LA LISTA</p>

          {/* Lista de Especialidades */}
          <div className='w-full flex flex-col gap-4 pb-20'>
            {specialtiesIcons.map((item) => (
              <div
                key={item.name}
                onClick={() => setEspecialidadElegida(item)}
                className={`w-full p-4 rounded-lg transition-all duration-200 ${
                  especialidadElegida != null && especialidadElegida.name == item.name
                    ? "bg-[#2346D3]/10 border-2 border-[#2346D3]"
                    : "bg-zinc-100 border-0"
                } flex flex-row items-center`}
              >
                {/* Icono de la especialidad */}
                <div className={`${item.color} p-4 rounded-lg`}>{item.icon}</div>
                {/* Nombre de la especialidad */}
                <div className='ml-4'>
                  <p className='text-zinc-800 text-xl font-semibold'>{item.name}</p>
                </div>
                {/* Selector */}
                <div
                  className={`h-6 w-6 rounded-full border-2 transition-all duration-200 ${
                    especialidadElegida != null && especialidadElegida.name == item.name
                      ? "border-[#2346D3] shadow-sm"
                      : "border-zinc-300"
                  } ml-auto mr-2 p-1`}
                >
                  <div
                    className={`h-full w-full transition-all duration-200 ${
                      especialidadElegida != null && especialidadElegida.name == item.name
                        ? "bg-[#2346D3]"
                        : "bg-transparent"
                    } rounded-full`}
                  ></div>
                </div>
              </div>
            ))}
            {/* Leyenda */}
            <div className='w-full pb-8 flex justify-center text-center text-sm tracking-wide text-slate-500'>
              <p>
                Si no encuentras la especialidad que buscas en la lista, puede que no haya especialistas en esa area
                disponibles por el momento
              </p>
            </div>
          </div>

          {/* Siguiente Button */}
          <div className='w-full fixed bottom-0 left-0 flex justify-center px-6 pb-6 pt-12 bg-linear-to-b from-zinc-100/0 via-zinc-100/80 to-zinc-100/95'>
            <button
              onClick={() => transicionPaso1a2()}
              className={`rounded-md ${
                especialidadElegida != null ? "bg-[#2346D3]" : "bg-zinc-500"
              } w-full h-14 flex justify-center items-center gap-2 flex-row shadow-lg transition-colors duration-200 active:scale-95`}
            >
              <p className='text-white font-medium text-lg tracking-wide'>Siguiente</p>
              <FaArrowRight size={16} className='text-white scale-90' />
            </button>
          </div>
        </div>
      )}

      {/* Pestaña de Especialista */}
      {tab == "eligiendoEspecialista" && (
        <div className='flex flex-col gap-4 pb-10'>
          {/* Title */}
          <div className='w-full flex justify-start'>
            <h2 className='text-zinc-800 text-2xl font-bold'>Buscar Especialista</h2>
          </div>

          {/* Search Bar */}
          <div className='w-full bg-zinc-100 border border-zinc-200 h-14 shadow- rounded-xl flex flex-row items-center px-4'>
            {/* Search/Lupa Icon */}
            <div className='mr-3'>
              <IoMdSearch size={24} className='text-zinc-700' />
            </div>
            {/* Input */}
            <div className='w-full h-full flex items-center'>
              <input
                type='text'
                className='w-full h-[70%] outline-none border-none focus:outline-none focus:ring-0 caret-zinc-700 placeholder:tex'
                placeholder='Buscar especialista'
              />
            </div>
          </div>

          {/* Filtros */}
          <div className='w-full overflow-x-auto scrollbar-hide'>
            <div className='flex flex-row gap-2 pb-2'>
              {filtrosDisponibles.map((filtro) => (
                <button
                  key={filtro.id}
                  className='px-4 py-2 bg-zinc-100 border border-zinc-200 rounded-full whitespace-nowrap flex items-center gap-2 hover:bg-zinc-200 transition-colors'
                >
                  <span className='text-zinc-700 text-sm font-medium'>{filtro.icon}</span>
                  <span className='text-zinc-700 text-sm'>{filtro.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Leyenda */}
          <p className='text-base font-semibold text-zinc-500 tracking-wide'>O SELECCIONA UNO DE LA LISTA</p>

          {/* Lista de Especialistas */}
          <div className='w-full flex flex-col gap-4 pb-20'>
            {mockDoctors.map(
              (doctor) =>
                doctor.specialty == especialidadElegida.name && (
                  // Item Doctor
                  <div
                    key={doctor.id}
                    onClick={() => setEspecialistaElegido(doctor)}
                    className={`w-full p-4 rounded-lg transition-all duration-200 ${
                      especialistaElegido != null && especialistaElegido.name == doctor.name
                        ? "bg-[#2346D3]/10 border-2 border-[#2346D3]"
                        : "bg-zinc-100 border-0"
                    } flex flex-row items-center`}
                  >
                    {/* Foto del Especialista */}
                    <div className={`bg-zinc-100 h-full rounded-md`}>
                      <img src={doctor.imageUrl} alt='' className='h-16 w-16 rounded-md' />
                    </div>
                    {/* Datos del Especialista */}
                    <div className='ml-4 flex flex-col gap-[-4px] flex-1'>
                      <p className='text-zinc-800 text-lg font-semibold'>{doctor.name}</p>
                      <div className='flex flex-row gap-1 items-center'>
                        <GoStarFill size={12} className='text-yellow-500' />
                        <p className='text-zinc-600 font-semibold'>{doctor.rating}</p>
                      </div>
                      <div className='flex flex-row gap-1 items-center'>
                        <IoMdPin size={14} className='text-zinc-500' />
                        <p className='text-zinc-600 font-medium text-sm'>{acortarDireccion(doctor.location)}</p>
                      </div>
                    </div>
                    {/* Selector */}
                    <div
                      className={`h-6 w-6 rounded-full border-2 transition-all duration-200 ${
                        especialistaElegido != null && especialistaElegido.name == doctor.name
                          ? "border-[#2346D3] shadow-sm"
                          : "border-zinc-300"
                      } ml-auto mr-2 p-1`}
                    >
                      <div
                        className={`h-full w-full transition-all duration-200 ${
                          especialistaElegido != null && especialistaElegido.name == doctor.name
                            ? "bg-[#2346D3]"
                            : "bg-transparent"
                        } rounded-full`}
                      ></div>
                    </div>
                  </div>
                )
            )}
          </div>

          {/* Botones Flotantes */}
          <div className='w-full fixed bottom-0 left-0 flex justify-center flex-row-reverse gap-2 px-6 pb-6 pt-12 bg-linear-to-b from-zinc-100/0 via-zinc-100/80 to-zinc-100/95'>
            {/* Siguiente Button */}
            <button
              onClick={() => transicionPaso2a3()}
              className={`rounded-md ${
                especialistaElegido != null ? "bg-[#2346D3]" : "bg-zinc-500"
              } w-full h-14 flex justify-center items-center gap-2 flex-row shadow-lg transition-all duration-200 active:scale-95`}
            >
              <p className='text-white font-medium text-lg tracking-wide'>Siguiente</p>
              <FaArrowRight size={16} className='text-white scale-90' />
            </button>
            {/* Volver un paso atras Button */}
            <button
              onClick={() => {
                setTab("eligiendoEspecialidad");
                setStep(1);
              }}
              className={`rounded-md bg-red-700 aspect-square h-14 flex justify-center items-center gap-2 flex-row-reverse shadow-lg transition-colors duration-200 active:scale-95`}
            >
              <FaArrowRight size={20} className='text-white scale-90 rotate-180' />
            </button>
          </div>
        </div>
      )}

      {/* Pestaña de Fecha y Hora */}
      {tab == "eligiendoFechaYHora" && (
        <div className='flex flex-col gap-4 pb-28'>
          {/* Selecciones Previas */}
          <div className='w-full flex flex-col gap-4'>
            {/* Title */}
            <div className='w-full flex justify-between flex-row items-center'>
              <p className='text-base font-semibold text-zinc-500 tracking-wide'>SELECCION PREVIA</p>
            </div>
            {/* Cajas de selecciones */}
            <div className='w-full flex flex-col gap-4'>
              {/* Especialidad Elegida */}
              <div
                onClick={() => volverAtras("eligiendoEspecialidad")}
                className='w-full p-4 rounded-xl bg-zinc-100 flex flex-row items-center shadow-md active:scale-[0.97] active:shadow-none transition-all'
              >
                {/* Icono de la especialidad */}
                <div className={`${especialidadElegida != null ? especialidadElegida.color : ""} p-4 rounded-lg`}>
                  {especialidadElegida != null && especialidadElegida.icon}
                </div>
                {/* Nombre de la especialidad */}
                <div className='ml-4 flex flex-col'>
                  <p className='text-zinc-500'>Especialidad</p>
                  <p className='text-zinc-800 text-xl font-semibold'>
                    {especialidadElegida != null && especialidadElegida.name}
                  </p>
                </div>
                {/* Selector */}
                <div className={`h-6 w-6 rounded-full ml-auto mr-2 bg-green-500 flex justify-center items-center`}>
                  <TiTick size={14} className='text-white' />
                </div>
              </div>
              {/* Especialista Seleccionado */}
              <div
                onClick={() => volverAtras("eligiendoEspecialista")}
                className='w-full p-4 rounded-xl bg-zinc-100 flex flex-row items-center shadow-md active:scale-[0.97] active:shadow-none transition-all'
              >
                {/* Foto del Especialista*/}
                <div className={`h-16 w-16 rounded-lg`}>
                  {especialistaElegido != null && (
                    <img src={especialistaElegido.imageUrl} alt='' className='h-full w-full rounded-lg' />
                  )}
                </div>
                {/* Nombre del Especialista */}
                <div className='ml-4 flex flex-col'>
                  <p className='text-zinc-500'>Especialista</p>
                  <p className='text-zinc-800 text-xl font-semibold'>
                    {especialistaElegido != null && especialistaElegido.name}
                  </p>
                </div>
                {/* Selector */}
                <div className={`h-6 w-6 rounded-full ml-auto mr-2 bg-green-500 flex justify-center items-center`}>
                  <TiTick size={14} className='text-white' />
                </div>
              </div>
            </div>
          </div>

          {/* Linea divisoria */}
          <div className='w-full h-px bg-zinc-200/80 my-2'></div>

          {/* Selector de Fecha */}
          <div className='w-full flex flex-col gap-4'>
            {/* Title */}
            <div className='w-full flex justify-start'>
              <h2 className='text-zinc-800 text-xl font-bold'>Seleccionar Fecha</h2>
            </div>

            {/* Calendario */}
            <div className='w-full bg-white border border-zinc-200 rounded-xl p-4 shadow-sm'>
              {/* Header del mes */}
              <div className='flex justify-between items-center mb-4'>
                <button onClick={() => cambiarMes(-1)} className='p-2 hover:bg-zinc-100 rounded-lg transition-colors'>
                  <IoChevronBack size={20} className='text-zinc-600' />
                </button>

                <h3 className='text-zinc-800 font-semibold'>
                  {(() => {
                    const date = parseDate(fechaCalendario);
                    return `${meses[date.getMonth()]} ${date.getFullYear()}`;
                  })()}
                </h3>

                <button onClick={() => cambiarMes(1)} className='p-2 hover:bg-zinc-100 rounded-lg transition-colors'>
                  <IoChevronForward size={20} className='text-zinc-600' />
                </button>
              </div>

              {/* Días de la semana */}
              <div className='grid grid-cols-7 gap-2 mb-2'>
                {diasSemana.map((dia, index) => (
                  <div key={index} className='text-center text-zinc-400 text-sm font-medium'>
                    {dia}
                  </div>
                ))}
              </div>

              {/* Días del mes */}
              <div className='grid grid-cols-7 gap-2'>
                {diasDelMes.map((fecha, index) => (
                  <button
                    key={index}
                    onClick={() => fecha && !esFechaPasada(fecha) && setFechaElegida(fecha)}
                    disabled={!fecha || esFechaPasada(fecha)}
                    className={`aspect-square flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200 ${
                      !fecha
                        ? "invisible"
                        : esFechaSeleccionada(fecha)
                        ? "bg-[#2346D3] text-white shadow-md scale-110"
                        : esHoy(fecha)
                        ? "border-2 border-[#2346D3] text-[#2346D3] hover:bg-blue-50"
                        : esFechaPasada(fecha)
                        ? "text-zinc-300 cursor-not-allowed"
                        : "text-zinc-700 hover:bg-zinc-100 active:scale-95"
                    }`}
                  >
                    {fecha ? fecha.split("-")[0] : ""}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Horarios Disponibles */}
          <div className='w-full flex flex-col gap-4 mt-4'>
            {/* Title */}
            <div className='w-full flex justify-start'>
              <h2 className='text-zinc-800 text-xl font-bold'>Horarios Disponibles</h2>
            </div>

            {/* Mañana */}
            <div className='flex flex-col gap-3'>
              <div className='flex items-center gap-2'>
                <FaSun size={14} className='text-zinc-500' />
                <p className='text-zinc-500 text-sm font-semibold tracking-wide'>MAÑANA</p>
              </div>
              <div className='grid grid-cols-3 gap-3'>
                {horariosMañana.map((horario) => (
                  <button
                    key={horario}
                    onClick={() => setHorarioElegido(horario)}
                    className={`py-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                      horarioElegido === horario
                        ? "bg-[#2346D3] border-[#2346D3] text-white shadow-md scale-105"
                        : "bg-white border-zinc-200 text-zinc-700 hover:border-blue-300 active:scale-95"
                    }`}
                  >
                    {horario}
                  </button>
                ))}
              </div>
            </div>

            {/* Tarde */}
            <div className='flex flex-col gap-3'>
              <div className='flex items-center gap-2'>
                <FaMoon size={14} className='text-zinc-500' />
                <p className='text-zinc-500 text-sm font-semibold tracking-wide'>TARDE</p>
              </div>
              <div className='grid grid-cols-3 gap-3'>
                {horariosTarde.map((horario) => (
                  <button
                    key={horario}
                    onClick={() => setHorarioElegido(horario)}
                    className={`py-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                      horarioElegido === horario
                        ? "bg-[#2346D3] border-[#2346D3] text-white shadow-md scale-105"
                        : "bg-white border-zinc-200 text-zinc-700 hover:border-blue-300 active:scale-95"
                    }`}
                  >
                    {horario}
                  </button>
                ))}
              </div>
            </div>

            {/* Turno Seleccionado */}
            {fechaElegida && horarioElegido && (
              <div className='mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg animate-in fade-in slide-in-from-bottom-2 duration-300'>
                <p className='text-zinc-600 text-sm'>Turno seleccionado:</p>
                <p className='text-zinc-800 font-semibold text-lg'>
                  {formatearFechaCompleta(fechaElegida)}, {horarioElegido} hs
                </p>
              </div>
            )}
          </div>

          {/* Botones Flotantes */}
          <div className='w-full fixed bottom-0 left-0 flex justify-center flex-row-reverse gap-2 px-6 pb-6 pt-12 bg-linear-to-b from-zinc-100/0 via-zinc-100/80 to-zinc-100/95'>
            {/* Siguiente Button */}
            <button
              onClick={() => transicionPaso3a4()}
              className={`rounded-md ${
                fechaElegida && horarioElegido ? "bg-[#2346D3]" : "bg-zinc-500"
              } w-full h-14 flex justify-center items-center gap-2 flex-row shadow-lg transition-all duration-200 active:scale-95`}
            >
              <p className='text-white font-medium text-lg tracking-wide'>Siguiente</p>
              <FaArrowRight size={16} className='text-white scale-90' />
            </button>
            {/* Volver Button */}
            <button
              onClick={() => {
                setTab("eligiendoEspecialista");
                setStep(2);
              }}
              className={`rounded-md bg-red-700 aspect-square h-14 flex justify-center items-center gap-2 flex-row-reverse shadow-lg transition-colors duration-200 active:scale-95`}
            >
              <FaArrowRight size={20} className='text-white scale-90 rotate-180' />
            </button>
          </div>
        </div>
      )}

      {/* Pestaña de Confirmar Datos */}
      {tab == "confirmandoDatos" && (
        <div className='flex flex-col gap-4 pb-6'>
          {/* Title */}
          <div className='w-full flex justify-start'>
            <h2 className='text-zinc-800 text-2xl font-bold'>Revisá los detalles</h2>
          </div>

          {/* Especialista Seleccionado */}
          <div
            onClick={() => volverAtras("eligiendoEspecialista")}
            className='w-full p-4 rounded-xl bg-white flex flex-row items-center justify-between gap-4 border border-zinc-100 shadow-sm hover:shadow-none transition-all'
          >
            {/* Datos del especialista */}
            <div className='flex flex-col justify-center'>
              <p className='text-[#2346D3] font-medium'>ESPECIALISTA</p>
              {/* Nombre del especialista */}
              <p className='text-xl text-zinc-800 font-semibold'>{especialistaElegido?.name}</p>
              {/* Especialidad del especialista */}
              <p className='text-zinc-500'>{especialistaElegido?.specialty}</p>
              {/* Rating del especialista */}
              <div className='flex flex-row gap-1 items-center'>
                <GoStarFill size={12} className='text-yellow-500' />
                <p className='text-sm text-zinc-800'>{especialistaElegido?.rating}</p>
              </div>
            </div>
            {/* Foto del especialista */}
            <div className='h-full rounded-xl ml-auto'>
              <img src={especialistaElegido?.imageUrl} alt='' className='h-28 aspect-square rounded-xl' />
            </div>
          </div>

          {/* Dia y Hora Seleccionado */}
          <div className='flex flex-col gap-2 mt-1'>
            {/* Title & Edit Button */}
            <div className='w-full flex flex-row justify-between items-center'>
              <h2 className='text-lg font-bold text-zinc-800'>Cuándo</h2>
              <p
                onClick={() => volverAtras("eligiendoFechaYHora")}
                className='text-[#2346D3] font-medium active:text-blue-300 transition-colors'
              >
                Editar
              </p>
            </div>
            <div
              onClick={() => volverAtras("eligiendoFechaYHora")}
              className='w-full p-4 gap-4 rounded-xl bg-white flex flex-col border border-zinc-100 shadow-sm hover:shadow-none transition-all'
            >
              {/* Fecha */}
              <div className='w-full flex flex-row gap-4 items-center'>
                {/* Icono de Fecha */}
                <div className='bg-[#2346D3]/20 rounded-full p-2'>
                  <FaRegCalendar className='text-[#2346D3]' size={20} />
                </div>
                {/* Datos de Fecha */}
                <div className='flex flex-col gap-1'>
                  <p className='text-zinc-500 text-sm'>FECHA</p>
                  <p className='text-lg text-zinc-800 leading-tight font-bold'>
                    {formatearFechaCompleta(fechaElegida)}
                  </p>
                </div>
              </div>

              {/* Linea divisoria */}
              <div className='w-full h-px bg-zinc-200'></div>

              {/* Hora */}
              <div className='w-full flex flex-row gap-4 items-center'>
                {/* Icono de Fecha */}
                <div className='bg-[#2346D3]/20 rounded-full p-2'>
                  <FaClock className='text-[#2346D3]' size={20} />
                </div>
                {/* Datos de Fecha */}
                <div className='flex flex-col gap-1'>
                  <p className='text-zinc-500 text-sm'>HORARIO</p>
                  <p className='text-lg text-zinc-800 leading-tight font-bold'>{horarioElegido}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Resumen de consulta */}
          <div className='flex flex-col gap-2 mt-1'>
            {/* Title */}
            <div className='w-full flex flex-row justify-between items-center'>
              <h2 className='text-lg font-bold text-zinc-800'>Resumen de la consulta</h2>
            </div>

            {/* Input wrapper */}
            <div className='relative'>
              <textarea
                id='resumenDeLaConsulta'
                minLength={20}
                maxLength={240}
                placeholder='Explicá brevemente el motivo por el que solicitás el turno.'
                value={resumenDeLaConsulta}
                onChange={(e) => setResumenDeLaConsulta(e.target.value)}
                className='w-full rounded-xl p-4 min-h-40 bg-white border border-zinc-100 shadow-sm text-zinc-800 placeholder:text-zinc-400 pr-16'
              />

              {/* Contador */}
              <span
                className={`absolute bottom-3 right-3 text-xs transition-colors ${
                  resumenDeLaConsulta.length < 20 ? "text-red-500" : "text-zinc-500"
                }`}
              >
                {resumenDeLaConsulta.length}/240
              </span>
            </div>
          </div>

          {/* Datos del Paciente */}
          <div className='flex flex-col gap-2'>
            {/* Title */}
            <div className='w-full flex flex-row justify-between items-center'>
              <h2 className='text-lg font-bold text-zinc-800'>Datos del Paciente</h2>
            </div>
            <div className='w-full py-4 px-6 gap-4 rounded-xl bg-white flex flex-col border border-zinc-100 shadow-sm hover:shadow-none transition-all'>
              {/* Nombre del Paciente */}
              <div className='w-full flex flex-row justify-between items-center'>
                {/* Icono de Nombre del Paciente */}
                <div className='flex flex-row items-center gap-3'>
                  <FaUser className='text-zinc-500' size={20} />
                  <p className='text-zinc-500 text-[15px]'>Paciente</p>
                </div>
                {/* Nombre del Paciente */}
                <div className='flex flex-col gap-1'>
                  <p className='text-zinc-800 font-semibold text-lg'>{exampleUser.name}</p>
                </div>
              </div>

              {/* Linea divisoria */}
              <div className='w-full h-px bg-zinc-200'></div>

              {/* DNI/ID del Paciente */}
              <div className='w-full flex flex-row justify-between items-center'>
                {/* Icono de DNI/ID del Paciente */}
                <div className='flex flex-row items-center gap-3'>
                  <FaIdCard className='text-zinc-500' size={20} />
                  <p className='text-zinc-500 text-[15px]'>DNI/ID</p>
                </div>
                {/* DNI/ID del Paciente */}
                <div className='flex flex-col gap-1'>
                  <p className='text-zinc-800 font-semibold text-lg'>{exampleUser.dni}</p>
                </div>
              </div>

              {/* Linea divisoria */}
              <div className='w-full h-px bg-zinc-200'></div>

              {/* Obra Social y Plan del Paciente */}
              <div className='w-full flex flex-row justify-between items-center'>
                {/* Icono de Obra Social y Plan del Paciente */}
                <div className='flex flex-row items-center gap-3'>
                  <FaBriefcaseMedical className='text-zinc-500' size={20} />
                  <p className='text-zinc-500 text-[15px]'>Cobertura</p>
                </div>
                {/* Obra Social y Plan del Paciente */}
                <div className='flex flex-row gap-1'>
                  <p className='text-zinc-800 font-semibold text-lg'>{exampleUser.obraSocial}</p>
                  <p className='text-zinc-800 font-semibold text-lg'>{exampleUser.planObraSocial}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Confirmar Button */}
          <button
            onClick={() => confirmarTurno()}
            className={`rounded-md w-full mt-2 ${
              resumenDeLaConsulta.length >= 20 ? "bg-[#2346D3] active:scale-95" : "bg-zinc-500"
            } h-14 flex justify-center items-center gap-2 flex-row shadow-lg transition-all duration-200`}
          >
            <p className='text-white font-semibold text-lg tracking-wide'>Confirmar Reserva</p>
            <FaCheck size={16} className='text-white scale-90' />
          </button>
          {/* Cancelar Button */}
          <button
            onClick={() => setConfirmandoCancelar(true)}
            className='group w-full flex flex-row justify-center mt-1 hover:scale-95 transition-all'
          >
            <p className='text-zinc-500 text-lg font-medium tracking-wide group-hover:text-red-500'>Cancelar</p>
          </button>
        </div>
      )}

      {/* Modal de Confirmar Reserva en curso */}
      {confirmandoTurno && (
        <div className='fixed z-1000 left-0 top-0 h-screen w-screen backdrop-blur-md p-4 bg-white/20 flex justify-center items-center shadow-xl'>
          <div className='bg-white rounded-lg shadow-lg px-4 py-8 flex flex-col items-center gap-4 border border-zinc-200'>
            <FaCalendarCheck className='text-[#2346D3]' size={70} />
            <p className='text-center text-xl text-zinc-800 font-semibold'>¿Estas seguro de confirmar esta reserva?</p>
            <p className='text-center text-sm text-zinc-500'>
              Asegurate de poder asistir. Tu cuenta podria ser desactivada si no asistes a una reserva sin aviso.
            </p>
            <Link href={"/MobileHome"}>
              <button
                onClick={confirmarReserva}
                className='bg-[#2346D3] mt-1 px-6 gap-3 rounded-md flex justify-center items-center w-full h-14 shadow-lg transition-all duration-200 active:scale-95'
              >
                <p className='text-white font-semibold text-lg tracking-wide'>Reservar Turno</p>
                <FaCheck size={16} className='text-white scale-90' />
              </button>
            </Link>
            <button
              onClick={() => setConfirmandoTurno(false)}
              className='w-full flex justify-center items-center font-medium text-red-500 hover:scale-95 hover:text-red-300 transition-all'
            >
              Volver
            </button>
          </div>
        </div>
      )}

      {/* Modal de Cancelar Reserva en curso */}
      {confirmandoCancelar && (
        <div className='fixed z-1000 left-0 top-0 h-screen w-screen backdrop-blur-md p-4 bg-white/20 flex justify-center items-center shadow-xl'>
          <div className='bg-white rounded-lg shadow-lg px-4 py-8 flex flex-col items-center gap-4 border border-zinc-200'>
            <FaRegCalendarTimes className='text-red-500' size={70} />
            <p className='text-center text-xl text-zinc-800 font-semibold'>
              ¿Estas seguro de cancelar la reserva en curso?
            </p>
            <p className='text-center font-medium text-zinc-500'>Regresarás a la pagina principal</p>
            <Link href={"/MobileHome"}>
              <button
                onClick={cancelarReserva}
                className='bg-red-500 mt-1 px-6 gap-3 rounded-md flex justify-center items-center w-full h-14 shadow-lg transition-all duration-200 active:scale-95'
              >
                <p className='text-white font-semibold text-lg tracking-wide'>Cancelar ahora</p>
                <FaCheck size={16} className='text-white scale-90' />
              </button>
            </Link>
            <button
              onClick={() => setConfirmandoCancelar(false)}
              className='w-full flex justify-center items-center font-medium text-[#2346D3] hover:scale-95 hover:text-blue-300 transition-all'
            >
              Volver
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
