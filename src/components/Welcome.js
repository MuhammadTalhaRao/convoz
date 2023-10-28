import React from "react";
import GoogleSignin from "../img/btn_google_signin_dark_focus_web.png";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const Welcome = () => {
  return (
    <main>
      <h2>Welcome to React Chat.</h2>
      <img src="/welcome.png" alt="Welcome" className="welcome" />
      <p>Sign in with Google to chat with with your fellow React Developers.</p>      
    </main>
  );
};

export default Welcome;