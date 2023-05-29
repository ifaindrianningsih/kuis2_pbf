import { IoGridOutline, IoHomeOutline } from "react-icons/io5";
import { BsSpeedometer2 } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineBarChart } from "react-icons/ai";

export default [
    {
        to: '/',
        name: 'Dashboard',
        Icon: IoHomeOutline
    },
    {
        to: '/sapi',
        name: 'Data Sapi',
        Icon: BiUserCircle
    },
    {
        to: '/pakan',
        name: 'Data Pakan',
        Icon: BsSpeedometer2
    },
    {
        to: '/obat',
        name: 'Data Obat',
        Icon: IoGridOutline
    },
    {
        to: '/karyawan',
        name: 'Data Karyawan',
        Icon: AiOutlineBarChart
    }
];