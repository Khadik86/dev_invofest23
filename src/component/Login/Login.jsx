import React, { useEffect, useState } from "react";
import maskot from "../../assets/img/invofest.png";
import "../../assets/css/login.css";
import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { signInWithEmailAndPassword, signInWithPopup, getAuth } from "firebase/auth";
import { Auth, loginWithEmailAndPassword, provider } from "../../config/firebase/firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(Auth, email, password);
      const user = userCredential.user;
      const userdata = {
        email: user.email,
        uid: user.uid,
        refreshToken: user.refreshToken,
        emailVerified: user.emailVerified,
      }
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem('userdata',JSON.stringify(userdata))
      console.log(userdata);
      history("/profile");
    } catch (error) {
      setError("Invalid email or password");
      console.error("Sign-In Error:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("loggedIn", "true");
      // localStorage.setItem("email", user.email);
      history("/profile");
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  return (
    <div className="belakang">
      <div className="card-login">
        <div className="wrapper">
          <div className="logo">
            <img src={maskot} alt="" />
          </div>
          <div className="text-center mt-2 name">LOGIN </div>
          <form onSubmit={handleEmailLogin} className="p-3 mt-5">
            <div className="mt-5">
              <p>{msg}</p>
              <div className="form-field d-flex align-items-center mt-5">
                <input
                  type="email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Username"
                />
              </div>
              <div className="form-field d-flex align-items-center">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <button className="button btn mt-3" type="submit">
                LOGIN
              </button>
              <button
                onClick={handleGoogleLogin}
                className="button btn mt-3"
              >
                Login with Google
              </button>
            </div>
          </form>
          <div className="text-center fs-6">
            <a href="">Forget password?</a> or{" "}
            <a href="/register">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;