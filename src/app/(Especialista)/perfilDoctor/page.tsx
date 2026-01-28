// Mi Perfil Doctor - page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IoPencil, IoStar, IoSchoolOutline, IoCallOutline, IoMailOutline, IoClose, IoCheckmark } from "react-icons/io5";
import Navegacion from "../components/navegacion";
import { FaClock } from "react-icons/fa";

interface Doctor {
  id: string;
  name: string;
  about: string;
  tuition: string;
  phone: string;
  email: string;
  university: string;
  specialty: string;
  location: string;
  rating: number;
  gender: string;
  imageUrl: string;
}

const actualDoctor: Doctor = {
  id: "d1",
  name: "Pablo Rodriguez",
  about:
    "Soy médico traumatólogo, especializado en el diagnóstico y tratamiento de lesiones del sistema músculo-esquelético. Comprometido con el bienestar integral de mis pacientes a través de la prevención y la educación.",
  tuition: "45892",
  phone: "+54 11 4567-8900",
  email: "dr.rodriguez@email.com",
  university: "Universidad de Buenos Aires",
  specialty: "Traumatología",
  location: "Av. del Libertador 7325, CP C1428ARV, CABA, Argentina",
  rating: 4.8,
  gender: "male",
  imageUrl: "https://snibbs.co/cdn/shop/articles/What_are_the_Challenges_of_Being_a_Doctor.jpg?v=1684314843",
};

const Page: React.FC = () => {
  const [doctor, setDoctor] = useState<Doctor>(actualDoctor);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    about: doctor.about,
    location: doctor.location,
    phone: doctor.phone,
    email: doctor.email,
  });

  const handleSaveEdit = () => {
    setDoctor((prev) => ({
      ...prev,
      ...editForm,
    }));
    setIsEditModalOpen(false);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(doctor.email);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(doctor.phone);
  };

  return (
    <div className='min-h-screen bg-white pb-24'>
      <div className='max-w-md mx-auto bg-white min-h-screen overflow-hidden'>
        {/* Header */}
        <div className='flex items-center justify-between px-4 py-4'>
          <h1 className='text-zinc-800 text-xl font-bold'>Mi Perfil</h1>
          <Link
            href='/establecerAgenda'
            className='py-2 px-4 text-white bg-[#2346D3] active:bg-blue-400 active:scale-95 rounded-full flex flex-row items-center gap-2 transition-all'
          >
            <FaClock className='w-4 h-4' />
            <p className='text-xs font-medium'>Disponibilidad</p>
          </Link>
        </div>

        {/* Profile Header */}
        <div className='bg-white px-5 pt-4 pb-6'>
          <div className='flex flex-col items-center'>
            {/* Profile Image */}
            <div className='relative w-28 h-28 mb-4'>
              <div className='w-full h-full rounded-full overflow-hidden border-4 border-gray-100 shadow-lg'>
                <img
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  width={112}
                  height={112}
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center'>
                <IoCheckmark className='w-4 h-4 text-white' />
              </div>
            </div>

            {/* Name & Specialty */}
            <h2 className='text-2xl font-bold text-gray-800'>Dr. {doctor.name}</h2>
            <p className='text-[#2346D3] font-medium mt-1'>{doctor.specialty}</p>
            <div className='flex items-center gap-1 mt-1'>
              <div className='w-2 h-2 rounded-full bg-green-500' />
              <span className='text-gray-500 text-sm'>Matrícula Nº {doctor.tuition}</span>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditModalOpen(true)}
              className='flex items-center gap-2 mt-4 px-6 py-2.5 bg-[#2346D3] text-white font-semibold rounded-full hover:bg-[#1a3ba8] active:scale-[0.97] active:bg-blue-400 transition-all'
            >
              <IoPencil className='w-4 h-4' />
              Editar Perfil
            </button>
          </div>
        </div>

        {/* Content */}
        <div className='px-5 space-y-6'>
          {/* Reputación */}
          <div className='bg-gray-50 rounded-2xl p-4'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-semibold text-gray-800'>Reputación</h3>
              <button className='text-[#2346D3] text-sm font-medium'>Ver todas</button>
            </div>

            <div className='flex items-center justify-center gap-2'>
              <span className='text-5xl font-bold text-gray-800'>{doctor.rating}</span>
              <div className='flex flex-col'>
                <div className='flex items-center gap-1'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <IoStar
                      key={star}
                      className={`w-5 h-5 ${star <= Math.floor(doctor.rating) ? "text-yellow-400" : "text-gray-200"}`}
                    />
                  ))}
                </div>
                <span className='text-gray-400 text-sm mt-1'>120 Reseñas</span>
              </div>
            </div>
          </div>

          {/* Sobre mí */}
          <div>
            <h3 className='text-lg font-semibold text-gray-800 mb-3'>Sobre mí</h3>
            <p className='text-gray-600 leading-relaxed'>{doctor.about}</p>
          </div>

          {/* Formación */}
          <div>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>Formación</h3>
            <div className='flex items-start gap-4'>
              <div className='w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0'>
                <IoSchoolOutline className='w-5 h-5 text-[#2346D3]' />
              </div>
              <div>
                <p className='text-gray-400 text-xs uppercase'>Universidad</p>
                <p className='text-gray-800 font-medium'>{doctor.university}</p>
              </div>
            </div>
          </div>

          {/* Ubicación */}
          <div className='w-full flex flex-col gap-2'>
            <h3 className='text-lg font-semibold text-gray-800'>Ubicación</h3>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(doctor.location)}`}
              target='_blank'
              rel='noopener noreferrer'
              className='w-full rounded-xl overflow-hidden bg-gray-50 active:scale-[0.98] transition'
            >
              <div className='w-full h-40'>
                <iframe
                  title='Mapa'
                  src={`https://www.google.com/maps?q=${encodeURIComponent(doctor.location)}&output=embed`}
                  className='w-full h-full border-0 pointer-events-none'
                  loading='lazy'
                />
              </div>
              <div className='p-3'>
                <p className='text-sm text-zinc-700 font-medium'>{doctor.location}</p>
                <p className='text-xs text-[#2346D3] font-semibold mt-1'>Ver en el mapa</p>
              </div>
            </a>
          </div>

          {/* Contacto */}
          <div>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>Contacto</h3>

            {/* Teléfono */}
            <div className='flex items-center justify-between py-3 border-b border-gray-100'>
              <div className='flex items-center gap-4'>
                <div className='w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center'>
                  <IoCallOutline className='w-5 h-5 text-[#2346D3]' />
                </div>
                <span className='text-gray-800'>{doctor.phone}</span>
              </div>
              <button onClick={handleCopyPhone} className='text-[#2346D3] font-medium text-sm active:scale-95 hover:scale-95 active:text-blue-400 transition-all'>
                COPIAR
              </button>
            </div>

            {/* Email */}
            <div className='flex items-center justify-between py-3'>
              <div className='flex items-center gap-4'>
                <div className='w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center'>
                  <IoMailOutline className='w-5 h-5 text-[#2346D3]' />
                </div>
                <span className='text-gray-800'>{doctor.email}</span>
              </div>
              <button onClick={handleCopyEmail} className='text-[#2346D3] font-medium text-sm active:scale-95 hover:scale-95 active:text-blue-400 transition-all'>
                COPIAR
              </button>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
            <div className='absolute inset-0 bg-black/30' onClick={() => setIsEditModalOpen(false)} />
            <div className='relative w-full max-w-md bg-white rounded-2xl p-6 max-h-[90vh] overflow-y-auto'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-bold text-gray-800'>Editar Perfil</h2>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className='p-2 text-gray-400 hover:text-gray-600 transition-colors'
                >
                  <IoClose className='w-6 h-6' />
                </button>
              </div>

              <div className='space-y-4'>
                {/* Sobre mí */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Sobre mí</label>
                  <textarea
                    value={editForm.about}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, about: e.target.value }))}
                    rows={4}
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-[#2346D3] resize-none'
                    placeholder='Describe tu experiencia y especialización...'
                  />
                </div>

                {/* Ubicación */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Ubicación</label>
                  <input
                    type='text'
                    value={editForm.location}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, location: e.target.value }))}
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-[#2346D3]'
                    placeholder='Dirección completa'
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Teléfono</label>
                  <input
                    type='tel'
                    value={editForm.phone}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, phone: e.target.value }))}
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-[#2346D3]'
                    placeholder='+54 11 1234-5678'
                  />
                </div>

                {/* Email */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                  <input
                    type='email'
                    value={editForm.email}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-[#2346D3]'
                    placeholder='tu@email.com'
                  />
                </div>
              </div>

              {/* Botones */}
              <div className='flex gap-3 mt-6'>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className='flex-1 py-3 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 active:scale-[0.98] transition-all'
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveEdit}
                  className='flex-1 flex items-center justify-center gap-2 py-3 bg-[#2346D3] text-white font-semibold rounded-xl hover:bg-[#1a3ba8] active:scale-[0.98] transition-all'
                >
                  <IoCheckmark className='w-5 h-5' />
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navegación */}
      <Navegacion ubicacion='ajustes' />
    </div>
  );
};

export default Page;
