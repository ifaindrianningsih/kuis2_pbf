import React from "react";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as SiIcons from "react-icons/si";
import * as GiIcons from "react-icons/gi";
import { Link } from 'react-router-dom';

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Sapi',
        path: '/sapi',
        icon: <SiIcons.SiHappycow />,
        cName: 'nav-text'
    },
    {
        title: 'Pakan',
        path: '/pakan',
        icon: <GiIcons.GiChipsBag />,
        cName: 'nav-text'
    },
    {
        title: 'Obat',
        path: '/obat',
        icon: <RiIcons.RiMedicineBottleFill />,
        cName: 'nav-text'
    },
    {
        title: 'Karyawan',
        path: '/karyawan',
        icon: <GiIcons.GiFarmer />,
        cName: 'nav-text'
    },
]