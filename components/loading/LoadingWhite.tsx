import LoadingAnimation from '../../public/assets/lotties/loading-white.json';
import Lottie from 'lottie-react';

const Loading = () => {
  const defaultOptions = {
      loop: true, 
      autoplay: true,
      animationData: LoadingAnimation
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Lottie {...defaultOptions} />
    </div>
  )
}

export default Loading;