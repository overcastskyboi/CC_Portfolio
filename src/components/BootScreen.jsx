import { useState, useEffect } from 'react';
import { useOS } from '../context/OSContext';

const BootScreen = () => {
  const { setBootState } = useOS();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log('BootScreen mounted');
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(100, p + Math.floor(Math.random() * 10));
      });
    }, 100);
    return () => {
      console.log('BootScreen unmounted');
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      console.log('Boot complete, setting state to locked');
      setBootState('locked');
    }
  }, [progress, setBootState]);

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center font-mono">
      <div className="w-64 space-y-2">
        <div className="flex justify-between text-xs text-green-500">
          <span>BOOT_LOADER</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-1 bg-gray-900 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 transition-all duration-75" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
};

export default BootScreen;
