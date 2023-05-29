import { useEffect, useState } from "react";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { RiDeleteBin2Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { database } from "../../../firebase";
import styles from "../obat/style.module.css";
import Card from "../../ui-components/Card";
import { useRouter } from 'next/router';

export default function Sapi() {
  const [id, setID] = useState(null);
  const [nis, setNis] = useState('');
  const [jenisSapi, setJenisSapi] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [kondisi, setKondisi] = useState('');
  const [fireData, setFireData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const databaseRef = collection(database, 'sapi');
  let router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  const addData = (event) => {
    event.preventDefault();
    addDoc(databaseRef, {
      nis: nis,
      jenisSapi: jenisSapi,
      jenisKelamin: jenisKelamin,
      kondisi: kondisi
    })
    .then(() => {
      alert('Apakah anda yakin akan menambahkan data Sapi?');
      getData();
      setNis('');
      setJenisSapi('');
      setJenisKelamin('');
      setKondisi('');
    })
    .catch((err) => {
      console.error(err);
      alert('Failed to add data');
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

  const getID = (id, nis, jenisSapi, jenisKelamin, kondisi) => {
    setID(id)
    setNis(nis)
    setJenisSapi(jenisSapi)
    setJenisKelamin(jenisKelamin)
    setKondisi(kondisi)
    setIsUpdate(true)
  }

  const updateFields = (event) => {
    event.preventDefault();
    let fieldToEdit = doc(database, 'sapi', id);
    updateDoc(fieldToEdit, {
      nis: nis,
      jenisSapi: jenisSapi,
      jenisKelamin: jenisKelamin,
      kondisi: kondisi
    })
    .then(() => {
      alert('Apakah anda yakin akan mengupdate data sapi?')
      getData()
      setNis('')
      setJenisSapi('')
      setJenisKelamin('')
      setKondisi('')
      setIsUpdate(false)
    })
    .catch((err) => {
      console.error(err);
      alert('Failed to update data');
    });
  }


  const deleteDocument = (id) => {
    let documentToDelete = doc(database, 'sapi', id);
    deleteDoc(documentToDelete)
    .then(() => {
      alert('Apakah anda yakin akan menghapus data sapi?')
      getData()
    })
    .catch((err) => {
      console.error(err);
      alert('Failed to delete data');
    });
  }

  const resetFormFields = () => {
    setNis('')
    setJenisSapi('')
    setJenisKelamin('')
    setKondisi('')
  };

  return (
    <>
        <div className={styles.content}>
          <main id="main" className={styles.main}>
            <section className={styles.section}>
              <div className={styles.row}>
                <div className={styles["col-lg-12"]}>
                    <h2>Kelola Data Sapi</h2>
                  <div className={styles.card}>
                    <div className={styles["card-body"]}>
                      <h5 className={styles["card-title"]}>Data Sapi</h5>
                      {isUpdate ? (
                        <form className={`${styles.row} ${styles['g-3']}`}>
                          <div className={styles['input-container']}>
                            <label htmlFor="nis" className={`${styles['form-label']}`}>
                              <strong>Nomor Induk Sapi (NIS)</strong>
                            </label>
                             <br></br>
                            <input
                              type="text"
                              className={styles['input-style']}
                              value={nis}
                              onChange={(event) => setNis(event.target.value)}
                            />
                          </div>
                             <br></br>
                          <div className={styles['input-container']}>
                            <label htmlFor="jenisSapi" className={`${styles['form-label']}`}>
                              <strong>jenisSapi</strong>
                            </label>
                             <br></br>
                            <input
                              type="text"
                              className={styles['input-style']}
                              value={jenisSapi}
                              onChange={(event) => setJenisSapi(event.target.value)}
                            />
                          </div>
                             <br></br>
                          <div className={styles['input-container']}>
                            <label htmlFor="jenisKelamin" className={`${styles['form-label']}`}>
                              <strong>Jenis Kelamin</strong>
                            </label>
                             <br></br>
                            <div>
                              <input
                                type="checkbox"
                                checked={jenisKelamin === "Jantan"}
                                onChange={(event) =>
                                  setJenisKelamin(event.target.checked ? "Jantan" : "Betina")
                                }
                              />
                              <label htmlFor="Jantan">Jantan</label>
                            </div>
                            <div>
                              <input
                                type="checkbox"
                                checked={jenisKelamin === "Betina"}
                                onChange={(event) =>
                                  setJenisKelamin(event.target.checked ? "Betina" : "Jantan")
                                }
                              />
                              <label htmlFor="Betina">Betina</label>
                            </div>
                          </div>
                             <br></br>
                          <div className={styles['input-container']}>
                            <label htmlFor="kondisi" className={`${styles['form-label']}`}>
                              <strong>Kondisi</strong>
                            </label>
                             <br></br>
                            <div>
                              <input
                                type="checkbox"
                                checked={kondisi === "Sehat"}
                                onChange={(event) =>
                                  setKondisi(event.target.checked ? "Sehat" : "Sakit")
                                }
                              />
                              <label htmlFor="Sehat">Sehat</label>
                            </div>
                            <div>
                              <input
                                type="checkbox"
                                checked={kondisi === "Sakit"}
                                onChange={(event) =>
                                  setKondisi(event.target.checked ? "Sakit" : "Sehat")
                                }
                              />
                              <label htmlFor="Sakit">Sakit</label>
                            </div>
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
                            <label htmlFor="nis" className={`${styles['form-label']}`}>
                              <strong>Nomor Induk Sapi (NIS)</strong>
                            </label>
                             <br></br>
                            <input
                              type="text"
                              className={styles['input-style']}
                              onChange={(event) => setNis(event.target.value)}
                            />
                          </div>
                             <br></br>
                          <div className={styles['input-container']}>
                            <label htmlFor="jenisSapi" className={`${styles['form-label']}`}>
                              <strong>Jenis Sapi</strong>
                            </label>
                             <br></br>
                            <input
                              type="text"
                              className={styles['input-style']}
                              onChange={(event) => setJenisSapi(event.target.value)}
                            />
                          </div>
                          <br></br>
                          <div className={styles['input-container']}>
                            <label htmlFor="jenisKelamin" className={`${styles['form-label']}`}>
                              <strong>Jenis Kelamin</strong>
                            </label>
                             <br></br>
                            <div>
                              <input
                                type="checkbox"
                                value="Jantan"
                                onChange={(event) => setJenisKelamin(event.target.value)}
                              />
                              <label htmlFor="Jantan">Jantan</label>
                            </div>
                            <div>
                              <input
                                type="checkbox"
                                value="Betina"
                                onChange={(event) => setJenisKelamin(event.target.value)}
                              />
                              <label htmlFor="Betina">Betina</label>
                            </div>
                          </div>
                             <br></br>
                          <div className={styles['input-container']}>
                            <label htmlFor="kondisi" className={`${styles['form-label']}`}>
                              <strong>Kondisi</strong>
                            </label>
                             <br></br>
                            <div>
                              <input
                                type="checkbox"
                                value="Sehat"
                                onChange={(event) => setKondisi(event.target.value)}
                              />
                              <label htmlFor="Sehat">Sehat</label>
                            </div>
                            <div>
                              <input
                                type="checkbox"
                                value="Sakit"
                                onChange={(event) => setKondisi(event.target.value)}
                              />
                              <label htmlFor="Sakit">Sakit</label>
                            </div>
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
                            <h5>Data Sapi</h5>
                          </div>
                        </div>
                        <div className={styles["table-wrapper"]}>
                          <table className={styles["table"]}>
                            <thead>
                              <tr>
                                <th scope="col">Nomor Induk Sapi (NIS)</th>
                                <th scope="col">Jenis Sapi</th>
                                <th scope="col">Jenis Kelamin</th>
                                <th scope="col">Kondisi</th>
                                <th scope="col">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {fireData.map((data) => (
                                <tr key={data.id}>
                                  <td>{data.nis}</td>
                                  <td>{data.jenisSapi}</td>
                                  <td>{data.jenisKelamin}</td>
                                  <td>{data.kondisi}</td>
                                  <td>
                                    <div className={styles['button-container']}>
                                      <button
                                        className={`${styles.btn} ${styles['btn-sm']} ${styles['btn-warning']} ${styles['btn-icon']}`}
                                        onClick={() => getID(data.id, data.nis, data.jenisSapi, data.jenisKelamin, data.kondisi)}
                                      >
                                        <AiOutlineEdit />
                                        Edit
                                      </button>
                                      <button
                                        className={`${styles.btn} ${styles['btn-sm']} ${styles['btn-danger']} ${styles['btn-icon']}`}
                                        onClick={() => deleteDocument(data.id)}
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
