import { Battery, LayoutGrid, Wifi } from 'lucide-react';
import { useOS } from '../context/OSContext';
import { useTime } from '../hooks/useOSHooks';

const Taskbar = () => {
  const { windows, focusWindow, minimizeWindow, activeWindowId, setBootState } = useOS();
  const time = useTime();

  const handleTaskbarClick = (id) => {
    if (activeWindowId === id) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  return (
    <div className="h-14 bg-[#0a0a0a]/90 backdrop-blur-md border-t border-gray-800 flex items-center justify-between px-4 fixed bottom-0 w-full z-[9999] pointer-events-auto">
      <div className="flex items-center space-x-4">
        <button onClick={() => setBootState('locked')} className="bg-yellow-600 hover:bg-yellow-500 text-black p-2 rounded-lg transition-colors">
          <LayoutGrid size={20} />
        </button>
        <div className="flex space-x-2">
          {windows.map((win) => (
            <button key={win.id} onClick={() => handleTaskbarClick(win.id)} className={`p-2 rounded-lg transition-all flex items-center space-x-2 ${win.minimized || activeWindowId !== win.id ? 'bg-transparent text-gray-500 hover:bg-white/5' : 'bg-gray-800 text-yellow-500'}`}>
              <win.icon size={18} />
              <span className="text-xs font-bold hidden lg:block">{win.title}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <div className="hidden md:flex items-center space-x-4 text-gray-500">
          <Wifi size={16} />
          <Battery size={16} />
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-gray-200">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          <div className="text-[10px] text-gray-500 font-mono tracking-widest">{time.toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
