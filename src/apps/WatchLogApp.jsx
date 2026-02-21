import { useState, useEffect, useCallback } from 'react';
import { Clapperboard, ArrowLeft, RefreshCcw, Star, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DataGrid from '../components/DataGrid';
import { ANIME_DATA } from '../data/constants';

const WatchLogApp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(ANIME_DATA.catalogue); // Default to local data

  const fetchData = useCallback(async () => {
    const PROXY_URL = import.meta.env.VITE_PROXY_URL;
    if (!PROXY_URL) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${PROXY_URL}/anilist`, {
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) throw new Error("Connection failed");
      const json = await response.json();
      // If we have live data, use it, otherwise keep fallback
      if (json.data && Array.isArray(json.data)) {
        setData(json.data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      // Keep using fallback data on error but show a toast or status
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const columns = [
    { 
      key: 'title', 
      label: 'Title',
      render: (val) => <span className="font-bold text-white tracking-tight">{val}</span>
    },
    { 
      key: 'type', 
      label: 'Format',
      render: (val) => (
        <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 text-[10px] font-bold uppercase tracking-wider border border-yellow-500/20">
          {val}
        </span>
      )
    },
    { key: 'progress', label: 'Progress' },
    { 
      key: 'score', 
      label: 'Rating',
      render: (val) => (
        <div className="flex items-center gap-1.5">
          <Star size={12} className="fill-yellow-500 text-yellow-500" />
          <span className="font-mono text-gray-300">{val}</span>
        </div>
      )
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (val) => (
        <span className={`text-[11px] font-medium ${
          val === 'Completed' ? 'text-green-400' : 'text-blue-400'
        }`}>
          {val}
        </span>
      )
    }
  ];

  return (
    <div className="bg-[#0a0a0a] text-gray-100 min-h-screen flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900/80 backdrop-blur-xl sticky top-0 z-30 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-800 rounded-full text-yellow-500 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight text-white leading-none">Watch List</h1>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Live Media Tracker</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 mr-4 px-3 py-1 bg-black/40 rounded-full border border-gray-800">
            <div className={`w-1.5 h-1.5 rounded-full ${import.meta.env.VITE_PROXY_URL ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`} />
            <span className="text-[10px] text-gray-400 font-mono uppercase">
              {import.meta.env.VITE_PROXY_URL ? 'Secure Proxy' : 'Local Cache'}
            </span>
          </div>
          <button 
            onClick={fetchData} 
            disabled={loading} 
            className="p-2 hover:bg-gray-800 rounded-xl transition-all disabled:opacity-30"
          >
            <RefreshCcw size={18} className={loading ? 'animate-spin' : 'text-yellow-500'} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden p-4 md:p-8 max-w-6xl w-full mx-auto flex flex-col">
        <div className="mb-8 flex items-start gap-4">
          <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center border border-yellow-500/20 shrink-0">
            <Clapperboard className="text-yellow-500" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">Activity Log</h2>
            <p className="text-sm text-gray-500 max-w-xl">
              Synchronized media consumption across AniList and local databases. 
              Real-time updates provided via encrypted serverless relay.
            </p>
          </div>
        </div>

        <div className="flex-1 min-h-0 bg-gray-900/10 rounded-3xl p-1">
          <DataGrid 
            data={data} 
            columns={columns} 
            pageSize={10} 
            emptyMessage="No media found in this collection."
          />
        </div>
      </main>

      {/* Footer Info */}
      {!import.meta.env.VITE_PROXY_URL && (
        <div className="bg-yellow-500/5 border-t border-yellow-500/10 px-4 py-2 flex items-center gap-2">
          <AlertCircle size={14} className="text-yellow-500" />
          <p className="text-[10px] text-yellow-500/80 uppercase font-bold tracking-tight">
            Proxy Unavailable: Displaying snapshot data from last successful sync.
          </p>
        </div>
      )}
    </div>
  );
};

export default WatchLogApp;
