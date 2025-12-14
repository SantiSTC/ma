 import { PiHeartHalfDuotone } from "react-icons/pi";
 import { LuBrain } from "react-icons/lu";
 import { GiMedicalDrip } from "react-icons/gi";
 import { MdFaceRetouchingNatural } from "react-icons/md";
import { FaBaby } from "react-icons/fa";
 
 export const specialtiesIcons = [
    {
      name: "Cardiología",
      icon: <PiHeartHalfDuotone size={26} className='text-red-500' />,
      color: "bg-red-500/30",
    },
    {
      name: "Neurología",
      icon: <LuBrain size={26} className='text-green-700' />,
      color: "bg-green-700/30",
    },
    {
      name: "Pediatría",
      icon: <FaBaby size={26} className='text-blue-500' />,
      color: "bg-blue-500/30",
    },
    {
      name: "Oncología",
      icon: <GiMedicalDrip size={26} className='text-orange-500' />,
      color: "bg-orange-500/30",
    },
    {
      name: "Dermatología",
      icon: <MdFaceRetouchingNatural size={26} className='text-fuchsia-500' />,
      color: "bg-fuchsia-500/30",
    },
  ];