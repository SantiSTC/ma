import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { ImManWoman } from "react-icons/im";
import { LiaLaptopMedicalSolid } from "react-icons/lia";
import { MdFamilyRestroom, MdOutlineMedicalInformation } from "react-icons/md";
import { TbBuildingHospital } from "react-icons/tb";

  export const filtrosDisponibles = [
    {
      name: "Mas Filtros",
      icon: <HiOutlineAdjustmentsHorizontal size={16} className='text-zinc-700' />,
      id: "mas_filtros",
    },
    {
      name: "Valorado por pacientes de mi edad",
      icon: <MdFamilyRestroom size={16} className='text-zinc-700' />,
      id: "pacientes_de_mi_edad",
    },
    {
      name: "Valorado por pacientes de mi genero",
      icon: <ImManWoman size={16} className='text-zinc-700' />,
      id: "pacientes_de_mi_genero",
    },
    {
      name: "Atiende Fisicamente",
      icon: <TbBuildingHospital size={16} className='text-zinc-700' />,
      id: "atiende_fisicamente",
    },
    {
      name: "Atiende Virtual",
      icon: <LiaLaptopMedicalSolid size={16} className='text-zinc-700' />,
      id: "atiende_virtual",
    },
    {
      name: "Trabaja con Obras Sociales",
      icon: <MdOutlineMedicalInformation size={16} className='text-zinc-700' />,
      id: "trabaja_con_obras_sociales",
    },
  ];