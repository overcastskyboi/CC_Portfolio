import { useState } from 'react';
import { Gamepad2, ArrowLeft, Trophy, Steam, Monitor, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DataGrid from '../components/DataGrid';
import { GAMING_DATA } from '../data/constants';

const GameCenterApp = () => {
  const navigate = useNavigate();
  const [data] = useState(GAMING_DATA.collection);

  const stats = [
    { label: 'Steam Level', value: GAMING_DATA.steam.level, icon: <Gamepad2 size={16} /> },
    { label: 'HC Points', value: GAMING_DATA.retro.hardcorePoints, icon: <Trophy size={16} /> },
    { label: 'Library Size', value: GAMING_DATA.steam.gamesCount, icon: <Monitor size={16} /> },
  ];

  const renderGameCard = (game) => (
    <div className="group relative bg-gray-900/40 border border-gray-800 rounded-2xl p-5 hover:border-green-500/30 hover:bg-gray-800/40 transition-all">
      <div className="flex justify-between items-start mb-4">
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter border ${
          game.platform === 'Steam' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
        }`}>
          {game.platform}
        </span>
        <div className="flex items-center gap-1 text-yellow-500">
          <Star size={10} className="fill-current" />
          <span className="text-[10px] font-mono">{game.rating}</span>
        </div>
      </div>
      
      <h3 className="text-white font-bold mb-1 truncate">{game.title}</h3>
      <div className="flex items-center justify-between mt-4">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Playtime</span>
          <span className="text-sm font-mono text-gray-300">{game.playtime}</span>
        </div>
        <div className="text-right">
          <span className={`text-xs font-medium ${game.status === 'Playing' ? 'text-green-400 animate-pulse' : 'text-gray-400'}`}>
            {game.status}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#0a0a0a] text-gray-100 min-h-screen flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-800 rounded-full text-green-500 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight text-white leading-none uppercase italic">Game Center</h1>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Cross-Platform Library</span>
          </div>
        </div>
        <div className="flex gap-4">
          {stats.map(stat => (
            <div key={stat.label} className="hidden md:flex flex-col items-end">
              <span className="text-[9px] text-gray-500 uppercase font-bold tracking-tighter">{stat.label}</span>
              <div className="flex items-center gap-1.5 text-green-500">
                {stat.icon}
                <span className="font-mono text-xs font-bold">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-hidden p-4 md:p-8 max-w-7xl w-full mx-auto flex flex-col">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2">My Collection</h2>
          <p className="text-sm text-gray-500 max-w-xl">
            Unified catalog of Steam achievements and RetroAchievements mastery. 
            Live sync enabled for <span className="text-green-500 font-bold">{GAMING_DATA.retro.user}</span>.
          </p>
        </div>

        <div className="flex-1 min-h-0">
          <DataGrid 
            data={data} 
            viewMode="grid"
            renderCard={renderGameCard}
            pageSize={8}
            emptyMessage="No games found in the database."
          />
        </div>
      </main>
    </div>
  );
};

export default GameCenterApp;
