import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const rows = [
    {
      id: 1143155,
      ürün: "Acer Nitro 5",
      Resim: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      Tarih: "1 March",
      Fiyat: 785,
      Ödemeşekli: "Kredi kartı",
      status: "Acil",
    },
    {
      id: 1143155,
      ürün: "Acer Nitro 5",
      Resim: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      Tarih: "1 March",
      Fiyat: 785,
      Ödemeşekli: "Kredi kartı",
      status: "Acil",
    },
    {
      id: 1143155,
      ürün: "Acer Nitro 5",
      Resim: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      Tarih: "1 March",
      Fiyat: 785,
      Ödemeşekli: "Kredi kartı",
      status: "Acil",
    },
    {
      id: 1143155,
      ürün: "Acer Nitro 5",
      Resim: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      Tarih: "1 March",
      Fiyat: 785,
      Ödemeşekli: "Kredi kartı",
      status: "Normal",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Ürün</TableCell>
            <TableCell className="tableCell">Resim</TableCell>
            <TableCell className="tableCell">Tarih</TableCell>
            <TableCell className="tableCell">Fiyat</TableCell>
            <TableCell className="tableCell">ödeme şekli</TableCell>
            <TableCell className="tableCell">durum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
