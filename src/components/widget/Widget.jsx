import "./widget.scss";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
const Widget = ({user, author, gelir, timestamps }) => {
  const [gider, setgider] = useState([]);
  const baseSalary = 37974.1;
  let increaseOrDecrease;
  if (gelir > baseSalary) {
    // Maaş belirlenen alt sınırın altında
    const percentage = ((baseSalary - gelir) / baseSalary) * 100;
    increaseOrDecrease = Math.round(percentage);
  } else {
    // Maaş belirlenen alt sınırın üstünde
    const percentage = ((gelir - baseSalary) / baseSalary) * 100;
    increaseOrDecrease = Math.round(percentage);
  }
  const totalGider = gider.reduce((total, item) => total + item.netgider, 0);
  const remainingAmount = gelir - totalGider;
  let balanceLevel;
  if (remainingAmount > 0) {
    balanceLevel = "Positif Denge";
  } else if (remainingAmount < 0) {
    balanceLevel = "Negatif Denge";
  } else {
    balanceLevel = "Belirsiz";
  }

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "Gider"), where("userId", "==", user.uid)),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setgider(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  console.log(gider);
  return (
    <div className="widget">
      <div className="widget-item">
        <div className="left">
          <h4>{author} Aylık Gelirin</h4>
          <span>{gelir}₺</span>
        </div>
        <div className="right">
          <span
            style={{
              fontSize: "12px",
              color: increaseOrDecrease > 0 ? "green" : "red",
            }}
          >
            ({increaseOrDecrease > 0 ? "+" : "-"}
            {Math.abs(increaseOrDecrease)}%)
            {increaseOrDecrease > 0
              ? "Yoksulluk sınırının üstünde maaş alıyorsun"
              : "Yoksulluk sınırın altında maaş alıyorsun"}
          </span>
          {timestamps && (
            <span style={{ fontSize: "14px" }}>
              {" "}
              {moment(timestamps.toDate()).format("L")} itibari ile
            </span>
          )}
        </div>
      </div>
      <div className="widget-item">
        <div className="left">
          <h4>{author} Aylık Giderin</h4>
          {gider?.map((x) => x.netgider)}₺
        </div>
        <div className="right">
          {gider?.map((item) => (
            <span key={item.id} style={{ fontSize: "14px" }}>
              {item.timestamps && (
                <> {moment(item.timestamps.toDate()).format("L")} itibari ile</>
              )}
            </span>
          ))}
        </div>
      </div>
      <div className="widget-item">
        <div className="left">
          <h4>Kalan Tutar</h4>
        </div>
        <div className="right">{remainingAmount}₺</div>
      </div>
      <div className="widget-item">
        <div className="left">
          <h4>Denge Seviyesi</h4>
        </div>
        <div className="right">
          <span>{balanceLevel}</span>
        </div>
      </div>
    </div>
  );
};

export default Widget;
