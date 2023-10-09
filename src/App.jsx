import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./style/dark.scss";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Gelir from "./components/Gelir/Gelir";
import Gider from "./components/Gider/Gider";
import { auth } from "./firebase/config";
import { signOut } from "firebase/auth";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [user, setuser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        setuser(authuser);
      } else {
        setuser(null);
        navigate("/login");  // Kullanıcı yoksa login sayfasına yönlendir
      }
    });
  }, [navigate]);

  const handlesignout = (e) => {
    e.preventDefault();
    signOut(auth);
    setuser(null);
    navigate("/login");
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routes>
        <Route path="/" element={user ? <Home handlesignout={handlesignout} user={user} setuser={setuser} /> : null} />

        <Route path="gelir" element={user ? <Gelir handlesignout={handlesignout} user={user} setuser={setuser} /> : null} />
        
        <Route path="gider" element={user ? <Gider handlesignout={handlesignout} user={user} setuser={setuser} /> : null} />

        <Route path="users">
          <Route
            index
            element={
              user ? (
                <List user={user} setuser={setuser} handlesignout={handlesignout} />
              ) : null
            }
          />
          <Route path=":userId" element={<Single />} />
          <Route
            path="new"
            element={
              user ? (
                <New
                  title="Fatura Geçmişi"
                  handlesignout={handlesignout}
                  user={user}
                  setuser={setuser}
                />
              ) : null
            }
          />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
