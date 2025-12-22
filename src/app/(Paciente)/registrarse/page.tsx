"use client";

import { Mail, Eye, EyeOff, Calendar } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    birthdate: "",
    password: "",
    termsAccepted: false,
  });

  const router = useRouter();

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.surname.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.birthdate !== "" &&
    selectedGender !== "" &&
    formData.password.length >= 8 &&
    formData.termsAccepted;

  const handleInputChange = (field: any, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const register = () => {
    router.push("/MobileHome");
  };

  return (
    <div className='w-full h-screen flex flex-col gap-4 px-6 py-6 bg-zinc-100 relative overflow-y-auto'>
      {/* Top Navbar Home */}
      <div className='w-full flex flex-row justify-between items-center'>
        {/* Back Button */}
        <Link href={"/"} className='z-50 active:scale-90 active:text-zinc-500 text-zinc-800 transition-all'>
          <button className='hover:scale-95 transition-all'>
            <IoIosArrowBack size={28} className='text-zinc-800' />
          </button>
        </Link>
      </div>

      {/* Title & Subtitle */}
      <div className='flex w-full flex-col gap-2 mt-2'>
        <h1 className='text-4xl font-bold text-zinc-800'>Crear Cuenta</h1>
        <h3 className='text-zinc-500'>
          Ingresá tus datos para comenzar. Bienvenido a la nueva era de la medicina en Argentina.
        </h3>
      </div>

      {/* Inputs */}
      <div className='w-full flex flex-col gap-4 relative mt-2'>
        {/* Inputs de nombre y apellido */}
        <div className='w-full grid grid-cols-2 gap-4'>
          <div className='flex flex-col gap-2 min-w-0'>
            <label htmlFor='name' className='font-medium text-gray-700'>
              Nombre/s
            </label>
            <input
              id='name'
              type='text'
              placeholder='Juan'
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className='w-full bg-white h-12 px-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-200'
            />
          </div>

          <div className='flex flex-col gap-2 min-w-0'>
            <label htmlFor='surname' className='font-medium text-gray-700'>
              Apellido
            </label>
            <input
              id='surname'
              type='text'
              placeholder='Perez'
              value={formData.surname}
              onChange={(e) => handleInputChange("surname", e.target.value)}
              className='w-full bg-white h-12 px-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-200'
            />
          </div>
        </div>

        {/* Input de Email */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='email' className='font-medium text-gray-700'>
            Correo electrónico
          </label>
          <div className='relative'>
            <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
            <input
              id='email'
              type='email'
              placeholder='ejemplo@correo.com'
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className='w-full h-12 pl-11 pr-4 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:border-zinc-200'
            />
          </div>
        </div>

        {/* Input de Fecha de Nacimiento */}
        <div className='flex flex-col gap-2 min-w-0'>
          <label htmlFor='birthdate' className='font-medium text-gray-700'>
            Fecha de nacimiento
          </label>
          <div className='relative w-full min-w-0 overflow-hidden rounded-xl border border-zinc-200'>
            <Calendar className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none' />
            <input
              id='birthdate'
              type='date'
              value={formData.birthdate}
              onChange={(e) => handleInputChange("birthdate", e.target.value)}
              className='w-full h-12 px-3 pr-10 bg-white rounded-xl text-gray-500 focus:outline-none focus:border-zinc-200 box-border min-w-0 [&::-webkit-calendar-picker-indicator]:opacity-0'
            />
          </div>
        </div>

        {/* Selector de Género */}
        <div className='flex flex-col gap-2'>
          <label className='font-medium text-gray-700'>Género</label>
          <div className='grid grid-cols-3 gap-1 p-1 rounded-xl bg-white'>
            <button
              onClick={() => setSelectedGender("femenino")}
              className={`h-12 rounded-xl border transition-all ${
                selectedGender === "femenino"
                  ? "bg-blue-50 border-blue-500 text-blue-700"
                  : "bg-gray-100 border-zinc-200 text-gray-600"
              }`}
            >
              Femenino
            </button>
            <button
              onClick={() => setSelectedGender("masculino")}
              className={`h-12 rounded-xl border transition-all ${
                selectedGender === "masculino"
                  ? "bg-blue-50 border-blue-500 text-blue-700"
                  : "bg-gray-100 border-zinc-200 text-gray-600"
              }`}
            >
              Masculino
            </button>
            <button
              onClick={() => setSelectedGender("otro")}
              className={`h-12 rounded-xl border transition-all ${
                selectedGender === "otro"
                  ? "bg-blue-50 border-blue-500 text-blue-700"
                  : "bg-gray-100 border-zinc-200 text-gray-600"
              }`}
            >
              Otro
            </button>
          </div>
        </div>

        {/* Input de Contraseña */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='password' className='font-medium text-gray-700'>
            Contraseña
          </label>
          <div className='relative'>
            <input
              id='password'
              type={showPassword ? "text" : "password"}
              placeholder='••••••••'
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className='w-full h-12 px-3 pr-11 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:border-zinc-200'
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <p className='text-xs text-gray-500'>Debe tener al menos 8 caracteres</p>
        </div>

        {/* Checkbox de Términos y Condiciones */}
        <div className='flex items-start gap-2 mt-2'>
          <input
            id='terms'
            type='checkbox'
            checked={formData.termsAccepted}
            onChange={(e) => handleInputChange("termsAccepted", e.target.checked)}
            className='mt-1 w-4 h-4 rounded border-zinc-300 text-blue-600 focus:ring-0 focus:ring-offset-0'
          />
          <label htmlFor='terms' className='text-sm text-gray-600'>
            Acepto los{" "}
            <a href='#' className='text-blue-600 hover:underline'>
              Términos y Condiciones
            </a>{" "}
            y la{" "}
            <a href='#' className='text-blue-600 hover:underline'>
              Política de Privacidad
            </a>
            .
          </label>
        </div>

        {/* Botón de Crear Cuenta */}
        <button
          disabled={!isFormValid}
          className={`w-full h-12 rounded-xl font-semibold transition-all mt-2 ${
            isFormValid
              ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={register}
        >
          Crear Cuenta
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
          <p className='text-zinc-500 text-sm'>Ya tienes cuenta?</p>
          <Link href={"/login"}>
            <p className='font-medium text-[#2346D3] text-sm hover:text-blue-500 transition-colors'>Iniciá Sesión</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
