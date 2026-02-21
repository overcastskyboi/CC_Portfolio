import { memo } from 'react';
import { Minus, X } from 'lucide-react';
import { useOS } from '../context/OSContext';
import { useDraggable } from '../hooks/useOSHooks';

const WindowFrame = memo(({ window: win }) => {
  const { closeWindow, focusWindow, minimizeWindow, isMobile, activeWindowId } = useOS();
  const { position, handleMouseDown } = useDraggable(win.position);
  if (win.minimized) return null;

  return (
    <div
      className={`absolute shadow-2xl overflow-hidden flex flex-col bg-[#0f0f0f] border ${activeWindowId === win.id ? 'border-yellow-500/60' : 'border-gray-700/50'} backdrop-blur-md pointer-events-auto ${isMobile ? 'inset-0 !top-0 !left-0 !w-full !h-full rounded-none' : 'w-[550px] h-[450px] rounded-xl'}`}
      style={!isMobile ? { left: position.x, top: position.y, zIndex: win.zIndex } : { zIndex: win.zIndex + 999 }}
      onMouseDown={() => focusWindow(win.id)}
    >
      <div
        className="h-9 bg-[#1a1a1a]/90 border-b border-gray-800 flex items-center justify-between px-3 window-header cursor-grab active:cursor-grabbing select-none"
        onMouseDown={!isMobile ? handleMouseDown : undefined}
      >
        <div className="flex items-center space-x-2 pointer-events-none">
          <win.icon size={14} className="text-yellow-500" />
          <span className="text-xs font-bold text-gray-300 tracking-wide uppercase">{win.title}</span>
        </div>
        <div className="flex items-center space-x-2" onMouseDown={(e) => e.stopPropagation()}>
          <button onClick={() => minimizeWindow(win.id)} className="hover:bg-gray-700 p-1 rounded transition-colors">
            <Minus size={14} className="text-gray-400" />
          </button>
          <button onClick={() => closeWindow(win.id)} className="hover:bg-red-900/50 hover:text-red-400 p-1 rounded transition-colors">
            <X size={14} className="text-gray-400" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden relative">
        <win.component {...win.props} />
      </div>
    </div>
  );
});

WindowFrame.displayName = 'WindowFrame';
export default WindowFrame;
