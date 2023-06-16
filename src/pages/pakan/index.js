import { useEffect, useState } from "react";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { RiDeleteBin2Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { database } from "../../../firebase";
import styles from "../obat/style.module.css";
import Card from "../../ui-components/Card";
import { useRouter } from 'next/router';
import axios from "axios";

export default function Pakan() {
  const [id, setID] = useState(null);
  const [jenisPakan, setJenisPakan] = useState('');
  const [harga, setHarga] = useState('');
  const [status, setStatus] = useState('');
  const [total, setTotal] = useState('');
  const [fireData, setFireData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const databaseRef = collection(database, 'pakan');
  let router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  const addData = (event) => {
    event.preventDefault();
    addDoc(databaseRef, {
      jenisPakan: jenisPakan,
      harga: parseInt(harga),
      status: status,
      total: parseInt(total)
    })
    .then(() => {
      alert('Apakah anda yakin akan menambahkan data pakan?');
      //send data to laravel API
      axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/pakans`, {
        jenisPakan: jenisPakan,
        harga: parseInt(harga),
        status: status,
        total: parseInt(total)
      })
      .then((response) => {
        // Success handling
        alert('Berhasil Menambahkan Data');
        getData();
        setJenisPakan('');
        setHarga('');
        setStatus('');
        setTotal('');
      })
      .catch((error) => {
        // Error handling
        console.error(error);
        alert('Gagal menambahkan data ke MySQL');
      });
    })
    .catch((err) => {
      console.error(err);
      alert('Gagal menambahkan data');
    });
  };

  const getData = async () => {
    await getDocs(databaseRef)
      .then((response) => {
        setFireData(response.docs.map((data) => {
          return { ...data.data(), id: data.id }
        }))
      })
  }

  const getID = (id, jenisPakan, harga, status, total) => {
    setID(id)
    setJenisPakan(jenisPakan);
    setHarga(harga);
    setStatus(status);
    setTotal(total);
    setIsUpdate(true)
  }

  const updateFields = (event) => {
    event.preventDefault();
    let fieldToEdit = doc(database, 'pakan', id);
    updateDoc(fieldToEdit, {
      jenisPakan: jenisPakan,
      harga: Number(harga),
      status: status,
      total: Number(total)
    })
    .then(() => {
      alert('Apakah anda yakin akan mengedit data pakan?');
      // Update data ke API Laravel
      axios.put(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/pakans/${jenisPakan}`, {
        jenisPakan: jenisPakan,
        harga: parseInt(harga),
        status: status,
        total: parseInt(total)
      })
      .then((response) => {
        // Handling sukses
        alert('Berhasil Mengupdate Data');
        getData();
        setJenisPakan('');
        setHarga('');
        setStatus('');
        setTotal('');
        setIsUpdate(false);
      })
      .catch((error) => {
        // Handling error
        console.error(error);
        alert('Gagal mengupdate data di MySQL');
      });
    })
    .catch((err) => {
      console.error(err);
      alert('Failed to update data');
    });
  }


  const deleteDocument = (id, jenisPakan) => {
    let documentToDelete = doc(database, 'pakan', id);
    deleteDoc(documentToDelete)
    .then(() => {
      alert('Apakah anda yakin akan menghapus data pakan?');
      // Hapus data dari API Laravel
      axios
        .delete(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/pakans/${jenisPakan}`)
        .then((response) => {
          // Handling sukses
          alert('Berhasil Menghapus Data');
          getData();
        })
        .catch((error) => {
          // Handling error
          console.error(error);
          alert('Gagal menghapus data di MySQL');
        });
    })
    .catch((err) => {
      console.error(err);
      alert('Failed to delete data');
    });
  }

  const resetFormFields = () => {
    setNis('')
    setJenisPakan('')
    setHarga('')
    setStatus('')
    setTotal('')
  };

  return (
    <>
        <div className={styles.content}>
          <main id="main" className={styles.main}>
            <section className={styles.section}>
              <div className={styles.row}>
                <div className={styles["col-lg-12"]}>
                    <h2>Kelola Data Pakan</h2>
                  <div className={styles.card}>
                    <div className={styles["card-body"]}>
                      <h5 className={styles["card-title"]}>Data Pakan</h5>
                      {isUpdate ? (
                        <form className={`${styles.row} ${styles['g-3']}`}>
                          <div className={styles['input-container']}>
                            <label htmlFor="jenisPakan" className={`${styles['form-label']}`}>
                              <strong>Jenis Pakan</strong>
                            </label>
                             <br></br>
                            <input
                              type="text"
                              className={styles['input-style']}
                              value={jenisPakan}
                              onChange={(event) => setJenisPakan(event.target.value)}
                            />
                          </div>
                             <br></br>
                          <div className={styles['input-container']}>
                            <label htmlFor="harga" className={`${styles['form-label']}`}>
                              <strong>Harga</strong>
                            </label>
                             <br></br>
                            <input
                              type="number"
                              className={styles['input-style']}
                              value={harga}
                              onChange={(event) => setHarga(event.target.value)}
                            />
                          </div>
                             <br></br>
                          <div className={styles['input-container']}>
                            <label htmlFor="status" className={`${styles['form-label']}`}>
                              <strong>Status</strong>
                            </label>
                             <br></br>
                            <div>
                              <input
                                type="checkbox"
                                checked={status === "Tersedia"}
                                onChange={(event) =>
                                  setStatus(event.target.checked ? "Tersedia" : "Tidak Tersedia")
                                }
                              />
                              <label htmlFor="Tersedia">Tersedia</label>
                            </div>
                            <div>
                              <input
                                type="checkbox"
                                checked={status === "Tidak Tersedia"}
                                onChange={(event) =>
                                  setStatus(event.target.checked ? "Tidak Tersedia" : "Tersedia")
                                }
                              />
                              <label htmlFor="Tidak Tersedia">Tidak Tersedia</label>
                            </div>
                          </div>
                             <br></br>
                          <div className={styles['input-container']}>
                            <label htmlFor="total" className={`${styles['form-label']}`}>
                              <strong>Total (ton)</strong>
                            </label>
                             <br></br>
                            <input
                              type="number"
                              className={styles['input-style']}
                              value={total}
                              onChange={(event) => setTotal(event.target.value)}
                            />
                          </div>
                          <br></br>
                          <div className={`${styles['text-center']}`}>
                            <button
                              type="submit"
                              className={`${styles.btn} ${styles['btn-success']}`}
                              onClick={updateFields}
                            >
                              Update
                            </button>
                            &nbsp;
                            <button type="reset" className={`${styles.btn} ${styles['btn-warning']}`} onClick={() => resetFormFields()}>
                              Reset
                            </button>
                          </div>
                        </form>
                      ) : (
                        <form className={`${styles.row} ${styles['g-3']}`}>
                          <div className={styles['input-container']}>
                            <label htmlFor="jenisPakan" className={`${styles['form-label']}`}>
                              <strong>Jenis Pakan</strong>
                            </label>
                             <br></br>
                            <input
                              type="text"
                              className={styles['input-style']}
                              onChange={(event) => setJenisPakan(event.target.value)}
                            />
                          </div>
                             <br></br>
                          <div className={styles['input-container']}>
                            <label htmlFor="harga" className={`${styles['form-label']}`}>
                              <strong>Harga</strong>
                            </label>
                             <br></br>
                            <input
                              type="number"
                              className={styles['input-style']}
                              onChange={(event) => setHarga(event.target.value)}
                            />
                          </div>
                          <br></br>
                          <div className={styles['input-container']}>
                            <label htmlFor="status" className={`${styles['form-label']}`}>
                              <strong>Status</strong>
                            </label>
                             <br></br>
                            <div>
                              <input
                                type="checkbox"
                                value="Tersedia"
                                onChange={(event) => setStatus(event.target.value)}
                              />
                              <label htmlFor="Tersedia">Tersedia</label>
                            </div>
                            <div>
                              <input
                                type="checkbox"
                                value="Tidak Tersedia"
                                onChange={(event) => setStatus(event.target.value)}
                              />
                              <label htmlFor="Tidak Tersedia">Tidak Tersedia</label>
                            </div>
                          </div>
                             <br></br>
                          <div className={styles['input-container']}>
                            <label htmlFor="total" className={`${styles['form-label']}`}>
                              <strong>Total (ton)</strong>
                            </label>
                             <br></br>
                            <input
                              type="number"
                              className={styles['input-style']}
                              onChange={(event) => setTotal(event.target.value)}
                            />
                          </div>
                             <br></br>
                          <div className={`${styles['text-center']}`}>
                            <button
                              type="submit"
                              className={`${styles.btn} ${styles['btn-success']}`}
                              onClick={addData}
                            >
                              Add
                            </button>
                            &nbsp;
                            <button type="reset" className={`${styles.btn} ${styles['btn-warning']}`} onClick={() => resetFormFields()}>
                              Reset
                            </button>
                          </div>
                        </form>
                      )}

                      <br></br><br></br>

                      <Card>
                      
                      
                      <section className={styles["table-container"]}>
                        <div className={styles["table-header"]}>
                          <div>
                            <h5>Data Pakan</h5>
                          </div>
                        </div>
                        <div className={styles["table-wrapper"]}>
                          <table className={styles["table"]}>
                            <thead>
                              <tr>
                                <th scope="col">Jenis Pakan</th>
                                <th scope="col">Harga</th>
                                <th scope="col">Status</th>
                                <th scope="col">Total (ton)</th>
                                <th scope="col">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {fireData.map((data) => (
                                <tr key={data.id}>
                                  <td>{data.jenisPakan}</td>
                                  <td>{data.harga}</td>
                                  <td>{data.status}</td>
                                  <td>{data.total}</td>
                                  <td>
                                    <div className={styles['button-container']}>
                                      <button
                                        className={`${styles.btn} ${styles['btn-sm']} ${styles['btn-warning']} ${styles['btn-icon']}`}
                                        onClick={() => getID(data.id, data.jenisPakan, data.harga, data.status, data.total)}
                                      >
                                        <AiOutlineEdit />
                                        Edit
                                      </button>
                                      <button
                                        className={`${styles.btn} ${styles['btn-sm']} ${styles['btn-danger']} ${styles['btn-icon']}`}
                                        onClick={() => deleteDocument(data.id, data.jenisPakan)}
                                      >
                                        <RiDeleteBin2Line />
                                        Hapus
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                          </table>
                        </div>
                        
                      </section>
                    
                      </Card>
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
