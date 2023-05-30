import { useEffect, useRef, useState } from "react";
import Card from "../../ui-components/Card";
import Modal from "../../ui-components/Modal";
import styles from "../obat/style.module.css";

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
      <div className={styles.content}>
          <main id="main" className={styles.main}>
            <section className={styles.section}>
              <div className={styles.row}>
                <div className={styles["col-lg-12"]}>
                    <h2>Dashboard</h2>
                  <div className={styles.card}>
                    <div className={styles["card-body"]}>
                      <h5 className={styles["card-title"]}>Welcome to Dashboard </h5>
                      
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>

      
    </>
  );
}
