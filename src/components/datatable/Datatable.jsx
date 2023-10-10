import { useEffect, useState } from "react";
import "./datatable.scss";
import { Link } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
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
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Yeni Fatura Ekle
        <Link to="/users/new" className="link">
          Ekle
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Resim</th>
            <th>isim</th>
            <th>Ödeme Şekli</th>
            <th>Adet</th>
            <th>Tarih</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((x) => (
            <tr key={x.id}>
              <td>1</td>
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
              <td>{moment(x.timestamps?.toDate()).format("L")}</td>
              <td>
                <button onClick={() => handleDelete(x.id)}>Sil</button>
                <button>Düzenle</button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Datatable;
