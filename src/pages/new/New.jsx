import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { message } from "antd";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import "./new.scss";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "firebase/auth";

const New = ({ user, setuser, handlesignout }) => {
  const [name, setname] = useState("");
  const [file, setFile] = useState(null);
  const [adet, setadet] = useState("");
  const [tarih, settarih] = useState("");
  const [selected, setselected] = useState("");
  const navigate = useNavigate();

  const koleksiyonolustur = async (e) => {
    e.preventDefault();

    if (name &&file&& adet && selected) {
      try {
        const querysnapshot = await getDocs(
          query(collection(db, "alısveris"), where("userId", "==", user.uid))
        );
        const existingDoc = querysnapshot.docs.find((doc) => doc.data().isim === name);
        const storaref = ref(storage,`alısveris/${user.uid}/${file.name}`)
        await uploadBytesResumable(storaref,file)
        const dowloadurl=await getDownloadURL(storaref)
        navigate("/")
        if (existingDoc) {
          const doc = querysnapshot.docs[0];

          await updateDoc(doc.ref, {
            isim:name,
            resim:dowloadurl,
            adet:adet,
            odemesekli:selected,
            tarih:serverTimestamp(),
          });
          message.success("Başarıyla güncellendi");
        } else {
          await addDoc(collection(db, "alısveris"), {
            timestamps: serverTimestamp(),
            userId: user.uid,
            isim:name,
            resim:dowloadurl,
            adet:adet,
            odemesekli:selected,
            tarih:serverTimestamp(),
          });
          message.success("Başarıyla oluşturuldu");
        }
        navigate("/users");
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
      <Sidebar handlesignout={handlesignout} />
      <div className="newContainer">
        <Navbar user={user} setuser={setuser} />
        <div className="top">
          <h1>Fatura Ekle</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={koleksiyonolustur}>
              <div className="formInput">
                <label
                  style={{ display: "flex", alignItems: "center" }}
                  htmlFor="file"
                >
                  Fiş Yükle: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div>
                <input
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  type="text"
                  placeholder="Ürün giriniz"
                />
              </div>
              <div>
                <input
                  value={adet}
                  onChange={(e) => setadet(e.target.value)}
                  type="number"
                  placeholder="Adet giriniz"
                />
              </div>
              <select
                value={selected}
                onChange={(e) => setselected(e.target.value)}
              >
                <option value="1" >Ödeme şekli seçiniz</option>
                <option value="KrediKartı">Kredi Kartı</option>
                <option value="Nakit">Nakit</option>
              </select>
              <button type="submit">İşlem Ekle</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
