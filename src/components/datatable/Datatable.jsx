import { useEffect, useState } from "react";
import "./datatable.scss";
import { Link } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import moment from "moment";
import { message } from "antd";

const Datatable = ({ user, setuser, handlesignout }) => {
  const [blogs, setblogs] = useState([]);
  useEffect(() => {
    if (user && user.uid) {
      const unsub = onSnapshot(
        query(collection(db, "alısveris"), where("userId", "==", user.uid)),
        (snapshot) => {
          let list = [];

          snapshot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setblogs(list);
        }
      );
      return () => {
        unsub();
      };
    }
  }, [user, setuser]);
  const handleDelete = async (id) => {
    const confirm = window.confirm("Silmek istediğine emin misin ?");
    if (confirm) {
      try {
        await deleteDoc(doc(db, "alısveris", id));
        message.success("Veri Başarıyla Silindi");
      } catch (error) {
        message.error("Veri silinirken hata oluştu");
      }
    } else {
      message.info("Veri silinmedi");
    }
  };
  console.log(blogs);
  const [editItemId, setEditItemId] = useState(null);
  const handleEdit = async (id, newData) => {
    try {
      // Update data in Firebase
      await updateDoc(doc(db, "alısveris", id), newData);
      message.success("Veri Başarıyla Güncellendi");
      setEditItemId(null);
    } catch (error) {
      message.error("Veri güncellenirken hata oluştu");
    }
  };
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Yeni Fatura Ekle
        <Link to="/users/new" className="link">
          Ekle
        </Link>
      </div>
      <div className="tableContainer ">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Resim</th>
            <th>isim</th>
            <th>Ödeme Şekli</th>
            <th>Adet</th>
            <th>Fiyat</th>
            <th>Tarih</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((x, index) => (
            <tr key={x.id}>
              <td>{index + 1}</td>
              <td>
                <img
                  style={{ width: "50px", height: "50px" }}
                  src={x.resim}
                  alt=""
                />
              </td>
              <td>{x.isim}</td>
              <td>{x.odemesekli}</td>
              <td>{x.adet}</td>
              <td>{x.fiyat}₺</td>
              <td>{moment(x.timestamps?.toDate()).format("L")}</td>
              <td>
                <button onClick={() => handleDelete(x.id)}>Sil</button>
                <button onClick={() => handleEdit(x.id)}>Düzenle</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Datatable;
