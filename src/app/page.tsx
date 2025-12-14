"use client"

import React, { useState, useEffect } from 'react';

// Datos de médicos de ejemplo
const mockDoctors = [
  {
    id: 1,
    name: 'Dra. Ana Pérez',
    specialty: 'Cardiología',
    location: 'Madrid, España',
    rating: 4.8,
    imageUrl: 'https://placehold.co/100x100/A855F7/FFFFFF?text=AP'
  },
  {
    id: 2,
    name: 'Dr. Juan García',
    specialty: 'Neurología',
    location: 'Barcelona, España',
    rating: 4.5,
    imageUrl: 'https://placehold.co/100x100/F97316/FFFFFF?text=JG'
  },
  {
    id: 3,
    name: 'Dra. Sofía Martínez',
    specialty: 'Pediatría',
    location: 'Valencia, España',
    rating: 4.9,
    imageUrl: 'https://placehold.co/100x100/10B981/FFFFFF?text=SM'
  },
  {
    id: 4,
    name: 'Dr. Carlos Sánchez',
    specialty: 'Oncología',
    location: 'Sevilla, España',
    rating: 5.0,
    imageUrl: 'https://placehold.co/100x100/EF4444/FFFFFF?text=CS'
  },
  {
    id: 5,
    name: 'Dra. Laura Gómez',
    specialty: 'Dermatología',
    location: 'Bilbao, España',
    rating: 4.7,
    imageUrl: 'https://placehold.co/100x100/3B82F6/FFFFFF?text=LG'
  },
  {
    id: 6,
    name: 'Dr. Pedro Fernández',
    specialty: 'Cardiología',
    location: 'Zaragoza, España',
    rating: 4.6,
    imageUrl: 'https://placehold.co/100x100/6366F1/FFFFFF?text=PF'
  },
  {
    id: 7,
    name: 'Dra. Elena Ruiz',
    specialty: 'Pediatría',
    location: 'Málaga, España',
    rating: 4.9,
    imageUrl: 'https://placehold.co/100x100/F59E0B/FFFFFF?text=ER'
  },
];

const specialties = ['Todas', 'Cardiología', 'Neurología', 'Pediatría', 'Oncología', 'Dermatología'];

export default function App() {

  return (
    <div className="min-h-screen w-screen bg-zinc-100 antialiased font-sans">
            
    </div>
  );
}