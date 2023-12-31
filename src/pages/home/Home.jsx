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
import Spinner from "../../components/spinner/Spinner";
const Home = ({ user, setuser, handlesignout }) => {
  const [blogs, setblogs] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setloading(true);
    if (user && user.uid) {
      const unsub = onSnapshot(
        query(collection(db, "Gelir"), where("userId", "==", user.uid)),
        (snapshot) => {
          let list = [];
          snapshot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setblogs(list);
          setloading(false);
        },

        (error) => {
          console.log(error);
          setloading(false);
        }
      );

      return () => {
        unsub();
      };
    }
  }, [user, setuser]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="home">
      <Sidebar handlesignout={handlesignout} />
      <div className="homeContainer">
        <Navbar user={user} setuser={setuser} handlesignout={handlesignout} />
        {blogs.length > 0 ? (
          <div className="widgets">
            {blogs?.map((blog) => (
              <Widget user={user} {...blog} />
            ))}
          </div>
        ) : (
          <h1 style={{ textAlign: "center" }}>Henüz veri eklemedin</h1>
        )}
        <div className="charts">
          <Featured
            user={user}
            setuser={setuser}
            handlesignout={handlesignout}
          />
          {blogs?.map((blog) => (
            <Chart
              {...blog}
              title="Son 6 ayın geliri"
              aspect={2 / 1}
              user={user}
              setuser={setuser}
            />
          ))}
        </div>
        <div className="listContainer">
          <div className="listTitle">Son Aldıkların</div>
          <Table user={user}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
