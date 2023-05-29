import React from "react";
import { AiFillHome } from 'react-icons/ai';
import { SiHappycow } from 'react-icons/si';
import { GiChipsBag, GiFarmer } from 'react-icons/gi';
import { RiMedicineBottleFill } from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Sapi',
    path: '/sapi',
    icon: <SiHappycow />,
    cName: 'nav-text'
  },
  {
    title: 'Pakan',
    path: '/pakan',
    icon: <GiChipsBag />,
    cName: 'nav-text'
  },
  {
    title: 'Obat',
    path: '/obat',
    icon: <RiMedicineBottleFill />,
    cName: 'nav-text'
  },
  {
    title: 'Karyawan',
    path: '/karyawan',
    icon: <GiFarmer />,
    cName: 'nav-text'
  },
];
