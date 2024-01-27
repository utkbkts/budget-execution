import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import "./Gelir.scss";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import Spinner from "../spinner/Spinner";

const Gelir = ({ handlesignout, user, setuser }) => {
  const [gelir, setGelir] = useState("");
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  useEffect(() => {
    // Kullanıcının daha önce kaydedilmiş gelirini kontrol et
    const checkPreviousGelir = async () => {
      const gelirDocRef = doc(db, "Gelir", user.uid);
      const gelirDocSnap = await getDoc(gelirDocRef);
      setloading(false);
      if (gelirDocSnap.exists()) {
        const previousGelir = gelirDocSnap.data().gelir;
        setGelir(previousGelir);
      }
    };

    checkPreviousGelir();
  }, [user?.uid]);

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (gelir) {
      try {
        // Check if the user already has a record
        const querySnapshot = await getDocs(
          query(collection(db, "Gelir"), where("userId", "==", user.uid))
        );

        if (!querySnapshot.empty) {
          // User already has a record, update it
          const doc = querySnapshot.docs[0];
          await updateDoc(doc.ref, { gelir, timestamps: serverTimestamp() });
          message.success("Başarıyla güncellendi");
        } else {
          // User doesn't have a record, create a new one
          await addDoc(collection(db, "Gelir"), {
            gelir,
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
        setloading(false);
      }
    }
  };
  if (loading) {
    return <Spinner />;
  }
  const handleInputChange = (e) => {
    var value = e.target.value,
      value = value.split(".").join("");
    if (value.length > 3) {
      value =
        value.substring(0, value.length - 3) +
        "." +
        value.substring(value.length - 3, value.length);
    }
    setGelir(value)
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar handlesignout={handlesignout} user={user} setuser={setuser} />
        <div className="top">
          <h1>Gelir Düzenle</h1>
        </div>
        <div className="gelir-container">
          <form onSubmit={handlesubmit}>
            <label htmlFor="">Aylık Net gelirini Gir</label>
            <input
              type="number"
              value={gelir}
              onChange={handleInputChange}
              placeholder="Örneğin: 1000"
            />
            <div>
              <button type="submit">Kaydet</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Gelir;
