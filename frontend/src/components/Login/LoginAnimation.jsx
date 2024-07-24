import React from "react";
import Lottie from "lottie-react";

// Import the animation JSON directly
import loginAnimation from "../../assets/Animation/loginAnimation.json";

const LoginAnimation = () => {
  return (
    <Lottie
      loop={true}
      autoplay={true}
      animationData={loginAnimation}
      height={400}
      width={400}
      // Props `isStopped` and `isPaused` could be controlled via state if needed
    />
  );
};

export default LoginAnimation;
