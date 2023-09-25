import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, loginWithEmailAndPassword } from "../auth/firebase";

import "./LoginRegister.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/countries");
  }, [user, loading]);

  return (
    <div className="App">
      <div className="panel">
        <h1>Log in to use the site!</h1>
        <form>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </form>
        <Button onClick={() => loginWithEmailAndPassword(email, password)}>
          Log in
        </Button>
        <div>
          Don't have an account?
          <Link to={"/register"}>Register</Link>
        </div>
        <div>
          For testing, please use "test4@gmail.com" & "123456"
        </div>
      </div>
    </div>
  );
};

export default Login;
