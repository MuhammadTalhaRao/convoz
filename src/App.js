import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import NavBar from "./components/NavBar";
import ChatBox from "./components/ChatBox";
import Welcome from "./components/Welcome";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";

function App() {
  const [user] = useAuthState(auth);
  const [isAllowed, setIsAllowed] = useState(false)

  useEffect(() => {
    let res = sessionStorage.getItem("isPassValid")

    if (res === "true") {
      setIsAllowed(true)
    }
  }, [])

  return (
    <div className="App">
      {/* <img src="/gajra.jpeg" alt="gajra" className="site-bg overlay" /> */}
      {
        !isAllowed ?
          <>
            <div className="site-bg overlay" />
            <Home setIsAllowed={setIsAllowed} />
          </>
          :
          (
            <>
              <NavBar />
              {!user ? <Welcome /> : <ChatBox />}
            </>
          )
      }
    </div>
  );
}

export default App;
