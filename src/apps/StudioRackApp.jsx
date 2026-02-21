import { VST_LIST } from '../data/constants';

const StudioRackApp = () => (
  <div className="bg-[#1a1a1a] h-full flex flex-col text-gray-300 font-sans" onClick={(e) => e.stopPropagation()}>
    <div className="h-10 bg-black flex items-center px-4 justify-between border-b border-gray-800">
      <span className="text-xs text-gray-500 font-bold tracking-widest">FL STUDIO 21 // COLIN CHERRY</span>
      <div className="flex space-x-1">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      </div>
    </div>
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {Object.entries(VST_LIST).map(([category, plugins]) => (
        <div key={category}>
          <h4 className="text-[10px] font-bold text-yellow-600 mb-2 uppercase tracking-widest">{category}</h4>
          <div className="grid grid-cols-2 gap-2">
            {plugins.map((plugin) => (
              <div key={plugin} className="bg-black/40 border border-gray-800 p-2 rounded text-xs hover:border-yellow-600/50 hover:text-yellow-100 transition-colors cursor-default">
                {plugin}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default StudioRackApp;
