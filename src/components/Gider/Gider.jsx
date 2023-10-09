import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import "./Gider.scss";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const initialState = {
  netgider: "",
  kiragider: "",
  faturagider: "",
  mutfakgider: "",
};

const Gider = ({ handlesignout, user, setuser }) => {
  const [form, setForm] = useState(initialState);
  const [gider, setgider] = useState("");
  const navigate = useNavigate()
  const {netgider,kiragider,faturagider,mutfakgider}=form;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  useEffect(() => {
    const oncekigider = async () => {
      const giderref = doc(db, "Gider", user.uid);
      const giderdocsnap = await getDoc(giderref);

      if (giderdocsnap.exists()) {
        const oncekigider = giderdocsnap.data().ayliknetgider;
        setgider(oncekigider);
      }
    };
    oncekigider()
  }, [user?.uid]);
  
  if (!user?.uid) {
    console.error("user.uid tanımlı değil veya null/undefined.");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (netgider && mutfakgider && faturagider && kiragider) {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, "Gider"), where("userId", "==", user.uid))
        );
  
        if (!querySnapshot.empty) {
          // User already has a record, update it
          const doc = querySnapshot.docs[0];
          await updateDoc(doc.ref, {
            ...form,
            timestamps: serverTimestamp(),
          });
          message.success("Başarıyla güncellendi");
        } else {
          // Create a new record if it doesn't exist
          await addDoc(collection(db, "Gider"), {
            ...form,
            timestamps: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          message.success("Başarıyla oluşturuldu");
        }
        navigate("/");
      } catch (error) {
        console.log(error);
        message.error("Hata oluştu");
      }
    } else {
      message.error("Lütfen gider bilgilerini eksiksiz doldurun.");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar  handlesignout={ handlesignout} user={user} setuser={setuser}/>
        <div className="top">
          <h1>Gelir Düzenle</h1>
        </div>
        <div className="gider-container">
          <form onSubmit={handleSubmit}>
            <div className="gider-content">
              <label htmlFor="">Aylık Net Giderinizi Giriniz</label>
              <input
                type="number"
                name="netgider"
                value={form.netgider}
                onChange={handleChange}
                placeholder="Örneğin: 1000"
              />
            </div>
            <div className="gider-content">
              <label htmlFor="">Kira Giderinizi Giriniz</label>
              <input
                type="number"
                name="kiragider"
                value={form.kiragider}
                onChange={handleChange}
                placeholder="Örneğin: 1000"
              />
            </div>
            <div className="gider-content">
              <label htmlFor="">Toplam fatura ödemelerinizi Giriniz</label>
              <input
                type="number"
                name="faturagider"
                value={form.faturagider}
                onChange={handleChange}
                placeholder="Örneğin: 1000"
              />
            </div>
            <div className="gider-content">
              <label htmlFor="">Toplam mutfak giderlerinizi Giriniz</label>
              <input
                type="number"
                name="mutfakgider"
                value={form.mutfakgider}
                onChange={handleChange}
                placeholder="Örneğin: 1000"
              />
            </div>
            <div>
              <button type="submit">Kaydet</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Gider;
