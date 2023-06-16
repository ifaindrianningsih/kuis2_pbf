import { useEffect,useState } from "react";
import styles from "../obat/style.module.css";
import { database } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Dashboard() {
  //Untuk atur waktu otomatis
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setToday(new Date());
    }, 1000 * 60); // update every minute

    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // untuk atur jumlah data
  const [sapiCount, setSapiCount] = useState(0);
  const [pakanCount, setPakanCount] = useState(0);
  const [obatCount, setObatCount] = useState(0);
  const [karyawanCount, setKaryawanCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const sapiSnapshot = await getDocs(collection(database, "sapi"));
      setSapiCount(sapiSnapshot.size);

      const pakanSnapshot = await getDocs(collection(database, "pakan"));
      setPakanCount(pakanSnapshot.size);

      const obatSnapshot = await getDocs(collection(database, "obat"));
      setObatCount(obatSnapshot.size);

      const karyawanSnapshot = await getDocs(collection(database, "karyawan"));
      setKaryawanCount(karyawanSnapshot.size);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className={styles.content}>
        <main id="main" className={styles.main}>
          <section className={styles.section}>
            <div className={styles.row}>
              <div className={styles["col-lg-10"]}>
                <h2>Dashboard</h2>
                <div className={styles.card}>
                  <div className={styles["card-body"]}>
                    <h5 className={styles["card-title"]}>Peternakan Sapi CV. Delvina</h5>
                    <div className={`${styles["row"]}`}>
                      <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles["d-flex"]} ${styles["flex-column"]} ${styles["h-100"]} ${styles["ps-3"]}`}>
                          <p className={`${styles["fw-bold"]}`}>
                            {formattedDate}
                          </p>
                        </div>
                      </div>

                      <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles["d-flex"]} ${styles["flex-column"]} ${styles["h-100"]} ${styles["ps-3"]}`}>
                          <p className={`${styles["mb-5"]}`}>
                            Jl. Dusun Kutukan Timur RT.03 RW.05, Desa Lecari, Kec. Sukorejo, Kab. Pasuruan, Jawa Timur 67161
                          </p>
                        </div>
                      </div>

                      <div className={`${styles["col-lg-6"]} ${styles["ms-auto"]} ${styles["text-center"]} ${styles["mt-lg-0"]}`}>
                        <div className={`${styles["position-relative"]} ${styles["d-flex"]} ${styles["align-items-center"]} ${styles["justify-content-center"]}`}>
                          <img className={`${styles["w-50"]} ${styles["position-relative"]} ${styles["z-index-2"]}`} src="../images/logo perusahaan.png" alt="rocket" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles["col-lg-12"]}>
              <div className={styles.row}>
                <div className={`${styles["col-xxl-4"]} ${styles["col-md-5"]}`}>
                  <div className={`${styles.card} ${styles["info-card"]} ${styles["sales-card"]}`}>
                    <div className={styles["card-body"]}>
                      <h5 className={styles["card-title"]}>Jumlah Sapi</h5>
                      <div className={styles["d-flex align-items-center"]}>
                        <div className={`${styles["card-icon"]} ${styles["rounded-circle"]} ${styles["d-flex align-items-center"]} ${styles["justify-content-center"]}`}>
                        </div>
                        <div className={styles.ps-3}>
                          <h3>{sapiCount}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${styles["col-xxl-4"]} ${styles["col-md-5"]}`}>
                  <div className={`${styles.card} ${styles["info-card"]} ${styles["revenue-card"]}`}>
                    <div className={styles["card-body"]}>
                      <h5 className={styles["card-title"]}>Jumlah Pakan</h5>
                      <div className={styles["d-flex align-items-center"]}>
                        <div className={`${styles["card-icon"]} ${styles["rounded-circle"]} ${styles["d-flex align-items-center"]} ${styles["justify-content-center"]}`}>
                          <i className="bi bi-cart-x"></i>
                        </div>
                        <div className={styles.ps-3}>
                          <h3>{pakanCount}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${styles["col-xxl-4"]} ${styles["col-md-5"]}`}>
                  <div className={`${styles.card} ${styles["info-card"]} ${styles["revenue-card"]}`}>
                    <div className={styles["card-body"]}>
                      <h5 className={styles["card-title"]}>Jumlah Obat</h5>
                      <div className={styles["d-flex align-items-center"]}>
                        <div className={`${styles["card-icon"]} ${styles["rounded-circle"]} ${styles["d-flex align-items-center"]} ${styles["justify-content-center"]}`}>
                          <i className="bi bi-cart-x"></i>
                        </div>
                        <div className={styles.ps-3}>
                          <h3>{obatCount}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${styles["col-xxl-4"]} ${styles["col-md-5"]}`}>
                  <div className={`${styles.card} ${styles["info-card"]} ${styles["revenue-card"]}`}>
                    <div className={styles["card-body"]}>
                      <h5 className={styles["card-title"]}>Jumlah Karyawan</h5>
                      <div className={styles["d-flex align-items-center"]}>
                        <div className={`${styles["card-icon"]} ${styles["rounded-circle"]} ${styles["d-flex align-items-center"]} ${styles["justify-content-center"]}`}>
                          <i className="bi bi-cart-x"></i>
                        </div>
                        <div className={styles.ps-3}>
                          <h3>{karyawanCount}</h3>
                        </div>
                      </div>
                    </div>
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
