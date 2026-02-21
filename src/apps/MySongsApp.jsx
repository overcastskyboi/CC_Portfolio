import { useState, useEffect, useRef } from 'react';
import { Disc, Pause, Play, SkipForward, ArrowLeft, Music, ListMusic, Grid, LayoutGrid, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MySongsApp = () => {
  const navigate = useNavigate();
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Navigation State
  const [view, setView] = useState('library'); // library, album, player
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  
  // Player State
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioRef = useRef(new Audio());
  const manifestUrl = "https://objectstorage.us-ashburn-1.oraclecloud.com/n/idg3nfddgypd/b/cherryos-deploy-prod/o/music_manifest.json";

  useEffect(() => {
    fetch(manifestUrl)
      .then(res => res.json())
      .then(data => {
        setLibrary(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load music:", err);
        setLoading(false);
      });

    const audio = audioRef.current;
    const handleEnded = () => skipTrack(1);
    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (queue.length > 0) {
      const track = queue[currentIndex];
      audioRef.current.src = track.url;
      if (isPlaying) audioRef.current.play().catch(e => console.warn(e));
    }
  }, [currentIndex, queue]);

  const playCollection = (album, startIndex = 0) => {
    // Map tracks to include album art for the player
    const playerQueue = album.tracks.map(t => ({
      ...t,
      albumName: album.album_name,
      artist: album.artist,
      cover_url: album.cover_url
    }));
    setQueue(playerQueue);
    setCurrentIndex(startIndex);
    setIsPlaying(true);
    setView('player');
  };

  const togglePlay = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const skipTrack = (dir) => {
    let next = currentIndex + dir;
    if (next >= queue.length) next = 0;
    if (next < 0) next = queue.length - 1;
    setCurrentIndex(next);
    setIsPlaying(true);
  };

  if (loading) return (
    <div className="bg-[#0a0a0a] h-full flex flex-col items-center justify-center text-yellow-500 font-mono text-sm">
      <Disc className="animate-spin mb-4" size={32} />
      <span>SYNCING_AUDIO_REPOSITORY...</span>
    </div>
  );

  // --- RENDERING COMPONENTS ---

  const LibraryView = () => (
    <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-10">
        {library.map((album, i) => (
          <button 
            key={i}
            onClick={() => {
              if (album.type === 'Single') playCollection(album);
              else { setSelectedAlbum(album); setView('album'); }
            }}
            className="group text-left space-y-3 focus:outline-none"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-gray-900 group-hover:border-yellow-500/30 transition-all group-hover:-translate-y-1">
              <img 
                src={album.cover_url} 
                alt={album.album_name} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${album.type === 'Album' ? 'bg-blue-600 text-white' : 'bg-yellow-600 text-black'}`}>
                  {album.type}
                </span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                <Play fill="currentColor" className="text-white" size={40} />
              </div>
            </div>
            <div className="px-1">
              <h3 className="text-sm font-bold text-gray-100 truncate group-hover:text-yellow-500 transition-colors">{album.album_name}</h3>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{album.artist}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const AlbumDetailView = () => (
    <div className="flex-1 overflow-y-auto animate-in slide-in-from-right-4 duration-300">
      <div className="p-6 md:p-10 max-w-5xl mx-auto">
        <button onClick={() => setView('library')} className="flex items-center gap-2 text-yellow-500 text-xs font-bold uppercase mb-8 hover:text-yellow-400">
          <ArrowLeft size={16} /> Back to Library
        </button>
        
        <div className="flex flex-col md:flex-row gap-8 md:items-end mb-12">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex-shrink-0">
            <img src={selectedAlbum.cover_url} className="w-full h-full object-cover" alt="" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-black text-blue-500 uppercase tracking-[0.3em]">Official Album</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">{selectedAlbum.album_name}</h2>
            <p className="text-gray-400 font-bold text-lg">{selectedAlbum.artist} • {selectedAlbum.tracks.length} Songs</p>
          </div>
        </div>

        <div className="bg-gray-900/30 rounded-3xl border border-white/5 overflow-hidden">
          {selectedAlbum.tracks.map((track, i) => (
            <button 
              key={i}
              onClick={() => playCollection(selectedAlbum, i)}
              className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors text-left border-b border-white/5 last:border-0 group"
            >
              <span className="w-6 text-xs font-mono text-gray-600 text-center group-hover:text-yellow-500">
                {(i + 1).toString().padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-gray-200 truncate group-hover:text-white">{track.title}</h4>
              </div>
              <Play size={14} className="text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const PlayerView = () => {
    const current = queue[currentIndex];
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8 animate-in zoom-in-95 duration-500 relative">
        <button onClick={() => setView('library')} className="absolute top-10 left-10 text-gray-500 hover:text-white transition-colors">
          <LayoutGrid size={24} />
        </button>

        <div className="relative w-64 h-64 md:w-96 md:h-96 group">
          <div className={`absolute inset-0 bg-yellow-500/20 rounded-3xl blur-2xl transition-opacity duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-0'}`} />
          <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-gray-900">
            <img src={current.cover_url} className={`w-full h-full object-cover transition-transform duration-[10s] linear ${isPlaying ? 'scale-110 rotate-2' : 'scale-100'}`} alt="" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase">{current.title}</h2>
          <p className="text-yellow-500 text-sm md:text-lg font-bold tracking-[0.2em] uppercase">{current.artist}</p>
          <p className="text-gray-600 text-xs font-mono uppercase italic">{current.albumName}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#0a0a0a] text-white h-full flex flex-col relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-yellow-900/10 pointer-events-none" />
      
      {/* Dynamic Viewport */}
      {view === 'library' && <LibraryView />}
      {view === 'album' && <AlbumDetailView />}
      {view === 'player' && <PlayerView />}

      {/* Global Controls (Visible when something is loaded) */}
      {queue.length > 0 && (
        <div className="h-24 bg-black/80 backdrop-blur-2xl border-t border-white/5 z-40 flex items-center justify-between px-6 md:px-12">
          <div className="hidden md:flex items-center gap-4 w-1/3">
            <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10">
              <img src={queue[currentIndex].cover_url} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-black truncate text-white">{queue[currentIndex].title}</div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest truncate">{queue[currentIndex].artist}</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 flex-1">
            <button onClick={() => skipTrack(-1)} className="text-gray-500 hover:text-white transition-colors"><SkipForward size={24} className="rotate-180" /></button>
            <button onClick={togglePlay} className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform">
              {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
            </button>
            <button onClick={() => skipTrack(1)} className="text-gray-500 hover:text-white transition-colors"><SkipForward size={24} /></button>
          </div>

          <div className="hidden md:flex justify-end items-center gap-4 w-1/3">
             <button onClick={() => setView('player')} className={`text-xs font-black uppercase tracking-widest ${view === 'player' ? 'text-yellow-500' : 'text-gray-500 hover:text-white'}`}>Now Playing</button>
             <button onClick={() => setShowList(!showList)} className="text-gray-500 hover:text-white"><ListMusic size={20} /></button>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default MySongsApp;
