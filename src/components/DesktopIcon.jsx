import { memo } from 'react';

const DesktopIcon = memo(({ icon: Icon, label, onClick }) => (
  <div className="flex flex-col items-center justify-center w-32 gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all group active:scale-95 pointer-events-auto" onClick={(e) => { e.stopPropagation(); onClick(); }}>
    <div className="w-20 h-20 bg-gradient-to-b from-gray-800 to-black rounded-2xl shadow-xl flex items-center justify-center border border-gray-700 group-hover:border-yellow-500/50 transition-colors relative">
      <Icon size={40} className="text-yellow-500" />
    </div>
    <span className="text-sm text-gray-200 text-center font-semibold tracking-wide bg-black/40 px-3 py-1 rounded-full">{label}</span>
  </div>
));

DesktopIcon.displayName = 'DesktopIcon';
export default DesktopIcon;
