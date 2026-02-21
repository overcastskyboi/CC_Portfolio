import { Activity, LayoutGrid, Power } from 'lucide-react';
import { useOS } from '../context/OSContext';

const MobileNav = () => {
  const { setBootState } = useOS();
  return (
    <div className="h-20 bg-black/90 backdrop-blur-xl border-t border-gray-800 flex items-center justify-around px-4 fixed bottom-0 w-full z-[9999] md:hidden pb-4 pointer-events-auto">
      <button onClick={() => setBootState('locked')} className="flex flex-col items-center space-y-1 text-gray-500 hover:text-white">
        <Power size={20} />
        <span className="text-[10px]">Lock</span>
      </button>
      <div className="flex flex-col items-center text-yellow-500">
        <div className="w-12 h-12 bg-yellow-600/20 rounded-full flex items-center justify-center border border-yellow-600">
          <LayoutGrid size={24} />
        </div>
      </div>
      <button onClick={() => window.location.reload()} className="flex flex-col items-center space-y-1 text-gray-500 hover:text-white">
        <Activity size={20} />
        <span className="text-[10px]">Reset</span>
      </button>
    </div>
  );
};

export default MobileNav;
