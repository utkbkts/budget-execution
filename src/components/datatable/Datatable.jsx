import { useEffect, useState } from "react";
import "./datatable.scss";
import { Link } from "react-router-dom";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import moment from "moment";

const Datatable = ({user,setuser, handlesignout}) => {
  const [blogs, setblogs] = useState([]);
  useEffect(()=>{
    if(user && user.uid){
      const unsub=onSnapshot(query(collection(db,"alısveris"),where("userId","==",user.uid)),(snapshot)=>{
        let list = []

        snapshot.docs.forEach((doc)=>{
          list.push({id:doc.id,...doc.data()})
        })
        setblogs(list)
      })
      return () => {
        unsub();
      };
    }
  },[user,setuser])
  console.log(blogs);
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
   {blogs?.map((x)=>(
     <tr key={x.id}> 
     <td>1</td>
     <td>
       <img style={{width:"50px", height:"50px"}} src={x.resim} alt="" />
     </td>
     <td>{x.isim}</td>
     <td>{x.odemesekli}</td>
     <td>{x.adet}</td>
     <td>{moment(x.timestamps?.toDate()).format("L")}</td>
     <td>
       <button>Sil</button>
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
