// components/LottieAnimation.tsx
import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../public/assets/lotties/loading.json'; 

const LottieAnimation: React.FC = () => {
  return <Lottie animationData={animationData} loop={true} />;
};

export default LottieAnimation;
