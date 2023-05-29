import { useEffect, useRef, useState } from "react";
import Card from "../../ui-components/Card";
import Modal from "../../ui-components/Modal";
import styles from "./Home.module.css";

import DoughnutChartExample from "../../components/DoughnutChartExample";
import HeaderSection from "../../ui-components/HeaderSection";
import DataCard from "../../ui-components/DataCard";
import { SlCalender } from "react-icons/sl";
import ActionButton from "../../ui-components/ActionButton";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Section from "../../ui-components/Section";

import BillingHistory from "../../components/BillingHistory";
import Paragraph from "../../components/Paragraph";
import BarChartExample from "../../components/BarChartExample";

export default function Dashboard() {
  const [modal, setModal] = useState(false);

  const handleClose = () => {
    //alert('closing');
    setModal(false);
  };

  const handleCancel = () => {
    setModal(false);
  }

  const handleSubmit = () => {
    alert('Submit is working..!');
    handleClose();
  }

  return (
    <>
      {/* <HeaderSection
        heading={"Dashboard"}
        subHeading={"Welcome to Sistem Peternakan Sapi"}
      />

      <Section> */}
        <DataCard
          label={"Total Sapi"}
          value={"23"}
          percentageValue={56.4}
          inverse={true}
        />
        <DataCard
          label={"Total Pakan"}
          value={"45"}
          percentageValue={3.45}
        />
        <DataCard
          label={"Total Obat"}
          value={"43"}
          percentageValue={10.89}
        />
        <DataCard
          label={"Total Karyawan"}
          value={"9"}
          percentageValue={10.89}
        />
      {/* </Section> */}

      
    </>
  );
}
