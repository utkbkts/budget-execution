import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Navbar = ({user,setuser,handlesignout}) => {
  const { dispatch } = useContext(DarkModeContext);
  const userID = user?.uid;
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <img
              src={user?.photoURL}
              alt=""
              className="avatar"
            />
            <div>
              <span>Merhaba, {user?.displayName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
