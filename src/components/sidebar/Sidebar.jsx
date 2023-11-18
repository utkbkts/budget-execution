import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = ({handlesignout}) => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Yönetim Paneli</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Düzenlemeler</p>
         <Link to={"/"}>
         <li>
            <DashboardIcon className="icon" />
            <span>Ana Sayfa</span>
          </li>
         </Link>
          <p className="title">Liste</p>
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
          <p className="title">Kullanıcı</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profil(yapım aşamasında)</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={handlesignout}>Çıkış Yap</span>
          </li>
        </ul>
      </div>
     
    </div>
  );
};

export default Sidebar;
