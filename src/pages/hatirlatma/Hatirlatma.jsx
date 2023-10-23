import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import tr from "date-fns/locale/tr";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { message } from "antd";
import moment from "moment";
import "moment/locale/tr";
const Hatirlatma = ({ setuser, user, handlesignout }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [konu, setkonu] = useState("");
  const [durum, setdurum] = useState("");
  const [randevubilgi, setrandevubilgi] = useState("");
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const todosData = await gettodo(user);
      setTodos(todosData);
    };

    fetchData();
  }, [user]);
  const createTodo = async (e) => {
    e.preventDefault();
    if (konu && durum && randevubilgi && startDate && endDate) {
      if (durum === "normal" || durum === "acil") {
        try {
          const colRef = collection(db, "yapilacaklar");
          const todoData = {
            konu: konu,
            durum: durum,
            randevubilgi: randevubilgi,
            startDate: startDate,
            endDate: endDate,
            uid: user.uid,
          };
          const docRef = await addDoc(colRef, todoData);
          // Firebase Firestore'a eklenen verinin ID'sini alıyoruz
          const docId = docRef.id;
          // Eklediğiniz verinin ID'sini kullanarak başka işlemler
          setkonu("");
          setdurum("");
          setrandevubilgi("");
          setStartDate(null);
          setEndDate(null);

          message.success("Veri başarıyla Firestore'a eklendi.: ", docId);
        } catch (error) {
          message.error("veri eklerken hata oluştu: ", error);
        }
      } else {
        message.error("Lütfen durum kısmına ya acil ya da normal olarak belirtin...");
      }
    }else {
      message.error("Lütfen tüm alanları doldurun.");
    }
  };
  const gettodo = async (user) => {
    const colRef = collection(db, "yapilacaklar");
    const q = query(colRef, where("uid", "==", user.uid));
    const querysnapShot = await getDocs(q);

    let dizi = [];

    querysnapShot.forEach((doc) => {
      dizi.push({ ...doc.data(), id: doc.id });
    });

    return dizi;
  };
  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "yapilacaklar", id));
      setTodos(todos.filter((todo) => todo.id !== id));
      message.success("Veri başarıyla silindi")
    } catch (error) {
      console.error("Silme işlemi sırasında bir hata oluştu:", error);
      message.error("Veri Silinemedi sayfayı yenileyip tekrar deneyiniz.")
    }
  };
  
  return (
    <>
      <div className="single">
        <Sidebar setuser={setuser} user={user} handlesignout={handlesignout} />
        <div className="singleContainer">
          <Navbar setuser={setuser} user={user} handlesignout={handlesignout} />
          <div className="top">
            <div className="left">
              <div className="editButton">Düzenle</div>
              <h1 className="title">Bilgiler</h1>
              <div className="item">
                <img src={user?.photoURL} alt="" className="itemImg" />
                <form className="details" onSubmit={createTodo}>
                  <h1 className="itemTitle">{user?.displayName}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Konu:</span>
                    <input
                      value={konu}
                      onChange={(e) => setkonu(e.target.value)}
                      className="itemValue"
                      type="text"
                    />
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Durum:</span>
                    <input
                      value={durum}
                      onChange={(e) => setdurum(e.target.value)}
                      className="itemValue"
                      placeholder="Normal veya Acil"
                    />
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Randevu bilgisi</span>
                    <input
                      value={randevubilgi}
                      onChange={(e) => setrandevubilgi(e.target.value)}
                      className="itemValue"
                    />
                  </div>
                  <div className="date">
                    <label>Başlangıç Tarihi:</label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      calendarAriaLabel="Takvim"
                      calendarClassName="custom-calendar"
                      locale={tr}
                      dateFormat="dd/MM/yyyy"
                    />
                    <label>Bitiş Tarihi:</label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                      calendarAriaLabel="Takvim"
                      calendarClassName="custom-calendar"
                      locale={tr}
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                  <div>
                    <button type="submit">Ekle</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className="sidebar-flex" style={{ flex: "1" }}></div>
        <div className="randevu-section">
          <h1
            style={{ textAlign: "center", borderBottom: "1px solid darkgray" }}
          >
            Randevular
          </h1>
          <div className="randevukapsam">
            {todos?.map((x) => (
              <div key={x.id} className="randevu">
                <div className="section-two">
                  <div className="bilgi">
                    <span>{x?.konu}</span>
                    <span
                      className={`${
                        x?.durum.toLowerCase() === "normal" ? "normal" : "acil"
                      }`}
                    >
                      {x?.durum}
                    </span>
                    <div className="silButton" onClick={()=>(deleteTodo(x.id))}>
                      Sil
                    </div>
                  </div>
                  <span>
                    Başlama Tarihi:
                    {moment(x?.startDate.toDate()).format("DD/MM/YYYY")}
                  </span>
                  <span>
                    Bitiş Tarihi:
                    {moment(x?.endDate.toDate()).format("DD/MM/YYYY")}
                  </span>
                  <div>
                    <span>{x?.randevubilgi}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hatirlatma;
