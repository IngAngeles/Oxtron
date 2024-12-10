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
    <div className="flex items-center justify-center ml-80 min-h-screen">
      <Lottie {...defaultOptions} />
    </div>
  );
};

const NoDataPage: React.FC = () => {
  const router = useRouter();

  const handleStartNow = () => {
    router.push('/measure');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Loading />

      <h2 className="mt-6 text-2xl font-bold text-gray-700">
        There is no information available at the moment
      </h2>

      <Button
        variant="contained"
        color="primary"
        onClick={handleStartNow}
        className="mt-4"
      >
        Start Now
      </Button>
    </div>
  );
};

export default NoDataPage;
