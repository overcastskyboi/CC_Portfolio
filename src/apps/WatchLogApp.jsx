import { useState } from 'react';
import { BookOpen, Clapperboard, Search, Star } from 'lucide-react';
import { ANIME_DATA } from '../data/constants';

const WatchLogApp = () => {
  const { user, catalogue } = ANIME_DATA;
  const [filter, setFilter] = useState('Anime');
  const filteredList = catalogue.filter((item) => item.type === filter).sort((a, b) => b.score - a.score);

  return (
    <div className="bg-[#121212] h-full flex flex-col font-sans" onClick={(e) => e.stopPropagation()}>
      <div className="bg-gray-900 p-4 border-b border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${user.avatar} rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg`}>A</div>
            <div>
              <h2 className="text-white font-bold leading-none">{user.name}</h2>
              <span className="text-[10px] text-gray-400 font-mono">MyAniList.co</span>
            </div>
          </div>
          <div className="flex space-x-4 text-center">
            <div>
              <div className="text-yellow-500 font-bold text-sm">{filter === 'Anime' ? user.stats.animeCount : user.stats.mangaCount}</div>
              <div className="text-[9px] text-gray-500 uppercase tracking-wide">Entries</div>
            </div>
            <div>
              <div className="text-green-400 font-bold text-sm">{user.stats.meanScore}</div>
              <div className="text-[9px] text-gray-500 uppercase tracking-wide">Mean</div>
            </div>
          </div>
        </div>

        <div className="flex p-1 bg-black/40 rounded-lg">
          <button
            onClick={() => setFilter('Anime')}
            className={`flex-1 flex items-center justify-center space-x-2 py-1.5 rounded text-xs font-bold transition-all ${filter === 'Anime' ? 'bg-gray-700 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <Clapperboard size={14} />
            <span>Anime</span>
          </button>
          <button
            onClick={() => setFilter('Manga')}
            className={`flex-1 flex items-center justify-center space-x-2 py-1.5 rounded text-xs font-bold transition-all ${filter === 'Manga' ? 'bg-gray-700 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <BookOpen size={14} />
            <span>Manga</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {filteredList.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-600 space-y-2">
            <Search size={32} />
            <span className="text-xs">No entries found for {filter}</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredList.map((show, i) => (
              <div key={i} className="bg-gray-800/40 border border-gray-700/50 rounded-lg overflow-hidden group hover:border-yellow-500/50 transition-all flex flex-col">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <div className={`absolute inset-0 ${show.cover} group-hover:scale-105 transition-transform duration-500`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                  <div className="absolute top-2 right-2 flex items-center space-x-1 bg-yellow-500 text-black px-2 py-1 rounded font-bold text-xs shadow-lg">
                    <Star size={10} fill="black" />
                    <span>{show.score}</span>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] font-mono text-gray-300 border border-white/10">{show.progress}</div>
                </div>
                <div className="p-3 flex-1 flex flex-col justify-center">
                  <h3 className="text-xs font-bold text-white leading-tight mb-1 truncate">{show.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${show.status === 'Completed' ? 'bg-blue-500' : 'bg-green-500'}`} />
                    <span className="text-[10px] text-gray-500 uppercase">{show.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchLogApp;
