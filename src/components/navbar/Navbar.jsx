import "./navbar.scss";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
const Navbar = ({ user, setuser, handlesignout }) => {
  const [hamburger, sethamburger] = useState(false);
  const handleclick = () => {
    sethamburger(!hamburger);
  };
  return (
    <div className="navbar">
      <div className="wrapper">
        <div onClick={handleclick} className="burger-menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`items ${hamburger ? "active" : ""}`}>
          {hamburger && <div className="background-items"></div>}
          <div className={`center ${hamburger ? "active" : ""}`}>
            <ul>
              <Link to={"/"}>
                <li>
                  <DashboardIcon className="icon" />
                  <span>Ana Sayfa</span>
                </li>
              </Link>
              <Link to="/users" style={{ textDecoration: "none" }}>
                <li>
                  <PersonOutlineIcon className="icon" />
                  <span>Fatura Ekle</span>
                </li>
              </Link>
              <Link to="/hatirlatma" style={{ textDecoration: "none" }}>
                <li>
                  <StoreIcon className="icon" />
                  <span>Hatırlatmalar</span>
                </li>
              </Link>
              <Link to={"/gelir"}>
                <li>
                  <CreditCardIcon className="icon" />
                  <span>Gelir Düzenle</span>
                </li>
              </Link>
              <Link to={"/gider"}>
                <li>
                  <LocalShippingIcon className="icon" />
                  <span>Gider Düzenle</span>
                </li>
              </Link>
              <li>
                <ExitToAppIcon className="icon" />
                <span style={{ cursor: "pointer" }} onClick={handlesignout}>
                  Çıkış Yap
                </span>
              </li>
              <div className="item">
                <img src={user?.photoURL} alt="" className="avatar" />
                <div>
                  <span>Merhaba, {user?.displayName}</span>
                </div>
              </div>
            </ul>
          </div>
        </div>
        <div className="admin">
          <img src={user?.photoURL} alt="" className="avatar" />
          <div>
            <span>Merhaba, {user?.displayName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
