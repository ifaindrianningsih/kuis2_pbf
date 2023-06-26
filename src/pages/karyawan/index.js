import { useEffect, useState } from "react";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { RiDeleteBin2Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { database } from "../../../firebase";
import styles from "../obat/style.module.css";
import Card from "../../ui-components/Card";
import { useRouter } from 'next/router';
import axios from "axios";

export default function Karyawan() {
  const [id, setID] = useState(null);
  const [nomorKaryawan, setNomorKaryawan] = useState('');
  const [nama, setNama] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [jamKerja, setJamKerja] = useState('');
  const [status, setStatus] = useState('');
  const [fireData, setFireData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const databaseRef = collection(database, 'karyawan');
  let router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  const addData = (event) => {
    event.preventDefault();
    addDoc(databaseRef, {
      nomorKaryawan: nomorKaryawan,
      nama: nama,
      jenisKelamin: jenisKelamin,
      jamKerja: parseInt(jamKerja),
      status: status
    })
    .then(() => {
      alert('Apakah anda yakin akan menambahkan data karyawan?');
      //send data to laravel API
      axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/karyawans`, {
        nomorKaryawan: nomorKaryawan,
        nama: nama,
        jenisKelamin: jenisKelamin,
        jamKerja: parseInt(jamKerja),
        status: status
      })
      .then((response) => {
        // Success handling
        alert('Berhasil Menambahkan Data');
        getData();
        setNomorKaryawan('');
        setNama('');
        setJenisKelamin('');
        setJamKerja('');
        setStatus('');

        // Redirect to http://localhost:3000/karyawan
        window.location.href = 'http://localhost:3000/karyawan';
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

  const getID = (id, nomorKaryawan, nama, jenisKelamin, jamKerja, status) => {
    setID(id)
    setNomorKaryawan(nomorKaryawan)
    setNama(nama)
    setJenisKelamin(jenisKelamin)
    setJamKerja(jamKerja)
    setStatus(status)
    setIsUpdate(true)
  }

  const updateFields = (event) => {
    event.preventDefault();
    let fieldToEdit = doc(database, 'karyawan', id);
    updateDoc(fieldToEdit, {
      nomorKaryawan: nomorKaryawan,
      nama: nama,
      jenisKelamin: jenisKelamin,
      jamKerja: Number(jamKerja),
      status: status
    })
    .then(() => {
      alert('Apakah anda yakin akan mengedit data karyawan?');
      // Update data ke API Laravel
      axios.put(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/karyawans/${nomorKaryawan}`, {
        nomorKaryawan: nomorKaryawan,
        nama: nama,
        jenisKelamin: jenisKelamin,
        jamKerja: parseInt(jamKerja),
        status: status
      })
      .then((response) => {
        // Handling sukses
        alert('Berhasil Mengupdate Data');
        getData();
        setNomorKaryawan('');
        setNama('');
        setJenisKelamin('');
        setJamKerja('');
        setStatus('');
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
      alert('Gagal mengupdate data');
    });
  }


  const deleteDocument = (id, nomorKaryawan) => {
    let documentToDelete = doc(database, 'karyawan', id);
    deleteDoc(documentToDelete)
      .then(() => {
        alert('Apakah anda yakin akan menghapus data karyawan?');
        // Hapus data dari API Laravel
        axios
          .delete(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/karyawans/${nomorKaryawan}`)
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
        alert('Gagal Menghapus Data');
      });
  };

  const resetFormFields = () => {
    setNomorKaryawan('')
    setNama('')
    setJenisKelamin('')
    setJamKerja('')
    setStatus('')
  };

  return (
    <>
        <div className={styles.content}>
          <main id="main" className={styles.main}>
            <section className={styles.section}>
              <div className={styles.row}>
                <div className={styles["col-lg-12"]}>
                    <h2>Kelola Data Karyawan</h2>
                  <div className={styles.card}>
                    <div className={styles["card-body"]}>
                      <h5 className={styles["card-title"]}>Data Karyawan</h5>
                      {isUpdate ? (
                        <form className={`${styles.row} ${styles['g-3']}`}>
                          <div className={styles['input-container']}>
                            <label htmlFor="nomorKaryawan" className={`${styles['form-label']}`}>
                              <strong>Nomor Karyawan</strong>
                            </label>
                             <br></br>
                            <input
                              type="text"
                              className={styles['input-style']}
                              value={nomorKaryawan}
                              onChange={(event) => setNomorKaryawan(event.target.value)}
                            />
                          </div>
                             <br></br>
                          <div className={styles['input-container']}>
                            <label htmlFor="nama" className={`${styles['form-label']}`}>
                              <strong>Nama</strong>
                            </label>
                             <br></br>
                            <input
                              type="text"
                              className={styles['input-style']}
                              value={nama}
                              onChange={(event) => setNama(event.target.value)}
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
                                checked={jenisKelamin === "Laki-laki"}
                                onChange={(event) =>
                                  setJenisKelamin(event.target.checked ? "Laki-laki" : "Perempuan")
                                }
                              />
                              <label htmlFor="Laki-laki">Laki-laki</label>
                            </div>
                            <div>
                              <input
                                type="checkbox"
                                checked={jenisKelamin === "Perempuan"}
                                onChange={(event) =>
                                  setJenisKelamin(event.target.checked ? "Perempuan" : "Laki-laki")
                                }
                              />
                              <label htmlFor="Perempuan">Perempuan</label>
                            </div>
                          </div>
                             <br></br>
                          <div className={styles['input-container']}>
                            <label htmlFor="jamKerja" className={`${styles['form-label']}`}>
                              <strong>Jam Kerja (jam)</strong>
                            </label>
                             <br></br>
                            <input
                              type="number"
                              className={styles['input-style']}
                              value={jamKerja}
                              onChange={(event) => setJamKerja(event.target.value)}
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
                                checked={status === "Aktif"}
                                onChange={(event) =>
                                  setStatus(event.target.checked ? "Aktif" : "Tidak Aktif")
                                }
                              />
                              <label htmlFor="Aktif">Aktif</label>
                            </div>
                            <div>
                              <input
                                type="checkbox"
                                checked={status === "Tidak Aktif"}
                                onChange={(event) =>
                                  setStatus(event.target.checked ? "Tidak Aktif" : "Aktif")
                                }
                              />
                              <label htmlFor="Tidak Aktif">Tidak Aktif</label>
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
                            <label htmlFor="nomorKaryawan" className={`${styles['form-label']}`}>
                              <strong>Nomor Karyawan</strong>
                            </label>
                             <br></br>
                            <input
                              type="text"
                              className={styles['input-style']}
                              onChange={(event) => setNomorKaryawan(event.target.value)}
                            />
                          </div>
                             <br></br>
                          <div className={styles['input-container']}>
                            <label htmlFor="nama" className={`${styles['form-label']}`}>
                              <strong>Nama</strong>
                            </label>
                             <br></br>
                            <input
                              type="text"
                              className={styles['input-style']}
                              onChange={(event) => setNama(event.target.value)}
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
                                value="Laki-laki"
                                onChange={(event) => setJenisKelamin(event.target.value)}
                              />
                              <label htmlFor="Laki-laki">Laki-laki</label>
                            </div>
                            <div>
                              <input
                                type="checkbox"
                                value="Perempuan"
                                onChange={(event) => setJenisKelamin(event.target.value)}
                              />
                              <label htmlFor="Perempuan">Perempuan</label>
                            </div>
                          </div>
                             <br></br>
                          <div className={styles['input-container']}>
                            <label htmlFor="jamKerja" className={`${styles['form-label']}`}>
                              <strong>Jam Kerja (jam)</strong>
                            </label>
                             <br></br>
                            <input
                              type="number"
                              className={styles['input-style']}
                              onChange={(event) => setJamKerja(event.target.value)}
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
                                value="Aktif"
                                onChange={(event) => setStatus(event.target.value)}
                              />
                              <label htmlFor="Aktif">Aktif</label>
                            </div>
                            <div>
                              <input
                                type="checkbox"
                                value="Tidak Aktif"
                                onChange={(event) => setStatus(event.target.value)}
                              />
                              <label htmlFor="Tidak Aktif">Tidak Aktif</label>
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
                            <h5>Daftar Karyawan</h5>
                            <p>Berikut daftar karyawan yang bekerja di CV. Delvina</p>
                          </div>
                        </div>
                        <div className={styles["table-wrapper"]}>
                          <table className={styles["table"]}>
                            <thead>
                              <tr>
                                <th scope="col">Nomor Karyawan</th>
                                <th scope="col">Nama</th>
                                <th scope="col">Jenis Kelamin</th>
                                <th scope="col">Jam Kerja (jam)</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {fireData.map((data) => (
                                <tr key={data.id}>
                                  <td>{data.nomorKaryawan}</td>
                                  <td>{data.nama}</td>
                                  <td>{data.jenisKelamin}</td>
                                  <td>{data.jamKerja}</td>
                                  <td>{data.status}</td>
                                  <td>
                                    <div className={styles['button-container']}>
                                      <button
                                        className={`${styles.btn} ${styles['btn-sm']} ${styles['btn-warning']} ${styles['btn-icon']}`}
                                        onClick={() => getID(data.id, data.nomorKaryawan, data.nama, data.jenisKelamin, data.jamKerja, data.status)}
                                      >
                                        <AiOutlineEdit />
                                        Edit
                                      </button>
                                      <button
                                        className={`${styles.btn} ${styles['btn-sm']} ${styles['btn-danger']} ${styles['btn-icon']}`}
                                        onClick={() => deleteDocument(data.id, data.nomorKaryawan)}
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
