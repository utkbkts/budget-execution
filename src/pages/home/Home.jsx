import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

const Home = ({ user, setuser, handlesignout }) => {
  const [blogs, setblogs] = useState([]);
  useEffect(() => {
    if (user && user.uid) {
      const unsub = onSnapshot(
        query(collection(db, "Gelir"), where("userId", "==", user.uid)),
        (snapshot) => {
          let list = [];
          snapshot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setblogs(list);
        },
        (error) => {
          console.log(error);
        }
      );

      return () => {
        unsub();
      };
    }
  }, [user, setuser]);
  return (
    <div className="home">
      <Sidebar handlesignout={handlesignout}/>
      <div className="homeContainer">
        <Navbar user={user} setuser={setuser} handlesignout={handlesignout} />
        <div className="widgets">
         {blogs?.map((blog)=>(
          <Widget user={user} {...blog} />
         ))}
        </div>
        <div className="charts">
          <Featured user={user} setuser={setuser} handlesignout={handlesignout}/>
         {blogs?.map((blog)=>(
           <Chart {...blog} title="Son 6 ayın geliri" aspect={2 / 1} user={user} setuser={setuser} />
         ))}
        </div>
        <div className="listContainer">
          <div className="listTitle">Son 6 ay geçmiş</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
