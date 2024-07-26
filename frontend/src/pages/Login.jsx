import React from "react";
import { LoginComponent } from "../components/Login/Login";
import LoginAnimation from "../components/Login/LoginAnimation";

function Login() {
  return (
    <div className="grid grid-cols-2 h-screen">
      {/* animation */}
      <div className="layout_animation flex justi items-center bg-slate-500">
        <LoginAnimation />
      </div>
      {/* login form */}
      <div className="layout_loginForm bg-slate-800">
        <LoginComponent />
      </div>
    </div>
  );
}

export default Login;
