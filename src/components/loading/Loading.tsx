// src/components/LottieAnimation.tsx
import Lottie from 'lottie-react';
import animationData from '@/assets/lottie/loading2.json';

const Loading = () => {
  return (
    <div style={{ width: 100, height: 40 }}>
      <Lottie
        animationData={animationData}
        loop
        autoplay
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default Loading;
