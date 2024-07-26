import React from "react";
import { SignUpComponent } from "../components/SignUp/SignUp";
import SignUpAnimation from "../components/SignUp/SignUpAnimation";

function SignUp() {
  return (
    <div className="grid grid-cols-2 h-screen pt-5">
      {/* animation */}
      <div className="layout_animation flex justi items-center bg-slate-500">
        <SignUpAnimation />
      </div>
      {/* sign up form */}
      <div className="layout_signupForm">
        <SignUpComponent />
      </div>
    </div>
  );
}

export default SignUp;
