import React, { useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Auth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;
      setUser(loggedInUser);

      const sixMonthsFromNow = new Date();
      sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

      Cookies.set(
        "user",
        JSON.stringify({
          uid: loggedInUser.uid,
          displayName: loggedInUser.displayName,
          email: loggedInUser.email,
          photoUrl: loggedInUser.photoURL,
        }),
        { expires: sixMonthsFromNow }
      );

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h1 className="auth-title">Login</h1>
        <p className="auth-subtitle">Please sign in to continue</p>
      </div>
      <div className="auth-content">
        {user ? (
          <div className="welcome-message">
            <p>
              Welcome, <strong>{user.displayName}</strong>
            </p>
          </div>
        ) : (
          <button className="auth-button" onClick={handleLogin}>
            Login with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default Auth;
