# MA — Médicos Argentina

**MA (Médicos Argentina)** es un MVP de una aplicación de turnos médicos, desarrollada como proyecto personal y startup en etapa temprana.

El objetivo del proyecto es ofrecer una experiencia clara, rápida y mobile-first para la búsqueda de especialistas y la reserva de turnos médicos, apuntando tanto a **pacientes** como a **médicos** que trabajan de forma independiente.

Actualmente se encuentra en desarrollo y funciona sin backend, utilizando datos mock para validar UI, flujos y experiencia de usuario.

---

## 🎯 Objetivo del proyecto

- Mostrar el producto como MVP funcional
- Validar experiencia de usuario y flujos clave
- Servir como base para una futura app móvil nativa
- Evolucionar hacia una solución real de turnos médicos en Argentina

---

## 🚧 Estado actual

- 🧪 **MVP en desarrollo**
- ✅ Funcional a nivel UI y navegación
- ❌ Sin backend por el momento
- 📦 Datos mockeados
- 🔓 Repositorio público

---

## ⚙️ Funcionalidades implementadas

Actualmente la aplicación permite:

- 🆕 **Reservar turno** (flujo de selección)
- 🔍 **Buscar especialistas**
- 🧑‍⚕️ **Listado de médicos**
- 🎛️ **Filtros avanzados**, incluyendo:
  - Valorado por pacientes de mi edad
  - Valorado por pacientes de mi género
  - Atención virtual
  - Atención física
  - Trabaja con obras sociales
  - Filtros tradicionales (especialidad, etc.)

> Nota: la persistencia de datos y la lógica real de turnos se incorporarán en una etapa posterior con backend.

---

## 🔐 Autenticación

- Existe autenticación a nivel UI
- No hay persistencia real de usuarios todavía

---

## 🧱 Stack tecnológico

- **Framework:** Next.js
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Arquitectura:** Component-based
- **Enfoque:** Mobile-first

---

## 📱 Enfoque Mobile

El proyecto está diseñado **mobile-first** desde su concepción.

Una vez finalizado este MVP web, el siguiente stage del proyecto es la **migración a una app móvil nativa utilizando React Native**, reutilizando lógica, flujos y criterios de UX validados en esta etapa.

---

## ▶️ Instalación y ejecución

```bash
npm install
npm run dev
```

También puede ejecutarse con:

```bash
npm run dev -- --turbo
```

La aplicación estará disponible en:

http://localhost:3000

## 📂 Datos mock

El proyecto utiliza datos mockeados para médicos y turnos con fines de desarrollo y validación visual.

Estos datos serán reemplazados por información real cuando se incorpore el backend.

---

## 🗺️ Próximos pasos

- Integración de backend real  
- Persistencia de usuarios y turnos  
- Gestión de disponibilidad por médico  
- Migración a React Native  
- Publicación en stores (etapa futura)

---

## 👨‍💻 Autor

**Santiago Iannello**  
Creador del proyecto  
Responsable de la idea, diseño, desarrollo y planificación del producto

