import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import moment from "moment";

const List = ({user}) => {
  const [blogs, setblogs] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "alısveris"), where("userId", "==", user.uid)),
      (snapshot) => {
        let list = [];

        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setblogs(list);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Ürün</TableCell>
            <TableCell className="tableCell">Resim</TableCell>
            <TableCell className="tableCell">Tarih</TableCell>
            <TableCell className="tableCell">Adet</TableCell>
            <TableCell className="tableCell">ödeme şekli</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs?.map((item,index) => (
            <TableRow key={item.id}>
              <TableCell className="tableCell">{index + 1}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <span>{item.isim}</span>
                </div>
              </TableCell>
              <TableCell className="tableCell"><img width={"40px"} src={item.resim} alt="" /></TableCell>
              <TableCell className="tableCell">{moment(item.tarih?.toDate()).format("L")}</TableCell>
              <TableCell className="tableCell">{item.adet}</TableCell>
              <TableCell className="tableCell">{item.odemesekli}</TableCell>
              <TableCell className="tableCell">
                <span className={`status `}></span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
