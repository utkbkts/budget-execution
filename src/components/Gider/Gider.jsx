import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import "./Gider.scss";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  serverTimestamp,
  where,
  getDocs,
  query,
  getDoc,
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
  const navigate = useNavigate();
  const { netgider, kiragider, faturagider, mutfakgider } = form;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    const checkPreviousGider = async () => {
      const giderRef = doc(db, "Gider", user.uid);
      const giderDoc = await getDoc(giderRef);

      if (giderDoc.exists()) {
        const previousGider = giderDoc.data();
        setForm(previousGider);
      }
    };

    checkPreviousGider();
  }, [user?.uid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (netgider && kiragider && faturagider && mutfakgider) {
      try {
        const giderRef = doc(db, "Gider", user.uid);
        const giderDoc = await getDoc(giderRef);

        if (giderDoc.exists()) {
          // User already has a record, update it
          await updateDoc(giderRef, {
            ...form,
            timestamps: serverTimestamp(),
            userId: user.uid,
          });
          message.success("Gider bilgileri güncellendi");
        } else {
          // User doesn't have a record, create a new one
          await addDoc(collection(db, "Gider"), {
            ...form,
            timestamps: serverTimestamp(),
            userId: user.uid,
          });
          message.success("Gider bilgileri kaydedildi");
        }

        navigate("/");
      } catch (error) {
        console.error("Hata:", error);
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
        <Navbar handlesignout={handlesignout} user={user} setuser={setuser} />
        <div className="top">
          <h1>Gider Düzenle</h1>
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
