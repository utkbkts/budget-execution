import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  BarChart,
  Bar,
} from "recharts";
import { db } from "../../firebase/config";

const Chart = ({ aspect, title }) => {
  const [gider, setGider] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "Gider"),
      (snapshot) => {
        const giderData = snapshot.docs.map((doc, index) => ({
          name: `Entry ${index + 1}`,
          kiragider: doc.data().kiragider,
          netgider: doc.data().netgider,
          mutfakgider: doc.data().mutfakgider,
          faturagider: doc.data().faturagider,
        }));
        giderData.sort((a, b) => b.kiragider - a.kiragider);

        setGider(giderData);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="chart">
    <div className="title">Son Kaydedilen Giderler</div>
    <ResponsiveContainer width={500} height={400}>
      <BarChart data={gider}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="kiragider" fill="#8884d8" />
        <Bar dataKey="netgider" fill="#8884d8" />
        <Bar dataKey="mutfakgider" fill="#8884d8" />
        <Bar dataKey="faturagider" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  </div>
  );
};

export default Chart;
