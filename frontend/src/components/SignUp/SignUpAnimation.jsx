import Lottie from "lottie-react";

// import animation vào component
import signupAnimation from "../../assets/Animation/signupAnimation.json";

const SignUpAnimation = () => {
  return (
    <Lottie
      loop={true}
      autoplay={true}
      animationData={signupAnimation}
      height={400}
      width={400}
      // isStopped={this.state.isStopped}
      // isPaused={this.state.isPaused}
    />
  );
};

export default SignUpAnimation;
