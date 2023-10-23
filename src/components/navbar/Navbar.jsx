import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
const Navbar = ({ user, setuser, handlesignout }) => {
  const { dispatch,darkMode } = useContext(DarkModeContext);
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
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className={`items ${hamburger ? "active" : ""}`}>
          <div className={`center ${hamburger ? "active" : ""}`}>
            <ul>
              <div className="item">
                <DarkModeOutlinedIcon
                  className="icon"
                  onClick={() => dispatch({ type: "TOGGLE" })}
                />
              </div>
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
