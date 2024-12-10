"use client"
import React from 'react';
import Lottie from 'lottie-react';
import LoadingAnimation from '../../public/assets/lotties/loading.json';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation,
  };

  return (
    <div className="flex items-center justify-center">
      <Lottie {...defaultOptions} />
    </div>
  );
};

const ErrorPage: React.FC = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/dashboard/measure'); 
  };

  return (
    <div className="lg:ml-64 flex flex-col items-center justify-center h-full">
      <Loading />

      <h1 className="text-3xl mb-10 mt-7 font-bold text-black">
        Welcome to your Carbon Capture Dashboard
      </h1>
      <h2 className="text-xl mb-10 font-bold text-black">
        Start recording your measurements to see a summary here
      </h2>

      <Button
        type="button"
        onClick={handleGoHome}
        className={"shad-primary-btn w-[200px] py-6 hover:scale-95 transition duration-300"}
      >
        Go to Measures
      </Button>
    </div>
  );
};

export default ErrorPage;
