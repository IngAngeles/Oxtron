"use client";
import React from 'react';
import Lottie from 'lottie-react';
import LoadingAnimation from '../../public/assets/lotties/loading-white.json';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation,
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Lottie {...defaultOptions} />
    </div>
  );
};

const ErrorPage: React.FC = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/dashboard'); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="flex flex-col items-center justify-center mb-6">
        <Loading />
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-white">
          There was an error in the page you are looking for
        </h2>
        <div className="mt-7">
          <Button
            type="button"
            className="shad-primary-btn py-3 px-6 hover:scale-95 transition duration-300"
            onClick={handleGoHome}
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
