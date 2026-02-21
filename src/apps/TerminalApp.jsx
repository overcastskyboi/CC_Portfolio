import { useState, useEffect, useRef } from 'react';

const TerminalApp = () => {
  const [history, setHistory] = useState(['Colin Cherry Interactive Shell v2.4', 'Connected to Oracle Cloud Instance (Ubuntu)', "Type 'help' for commands."]);
  const [input, setInput] = useState('');
  const [telemetry, setTelemetry] = useState(null);
  const endRef = useRef(null);

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const response = await fetch('https://129.80.222.26:3000/metrics/');
        if (!response.ok) throw new Error('Bad response');
        const data = await response.json();
        setTelemetry(data);
      } catch {
        setTelemetry({ error: true });
      }
    };
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      let output = `guest@cherry-os:~$ ${input}`;
      switch (cmd) {
        case 'help':
          output += '\nCommands: whoami, ls, clear, reboot, telemetry';
          break;
        case 'whoami':
          output += '\nColin Cherry | IT Pro | Producer | Gamer';
          break;
        case 'ls':
          output += '\nresume.pdf  beats/  projects/  anime_list.json';
          break;
        case 'telemetry':
          if (telemetry && !telemetry.error) {
            output += `\nCPU: ${telemetry.cpu}% | MEM: ${telemetry.mem}% | Uptime: ${Math.floor(telemetry.uptime / 3600)}h ${Math.floor((telemetry.uptime % 3600) / 60)}m`;
          } else {
            output += '\nTelemetry data unavailable. Host unreachable or connection refused.';
          }
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'reboot':
          window.location.reload();
          return;
        default:
          if (cmd) output += `\nError: Command '${cmd}' not recognized.`;
      }
      setHistory((prev) => [...prev, output]);
      setInput('');
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="bg-[#0c0c0c] text-green-500 font-mono text-sm h-full p-4 flex flex-col cursor-text" onClick={(e) => e.stopPropagation()}>
      <div className="flex-1 overflow-y-auto space-y-1 scrollbar-hide">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="flex items-center mt-2 border-t border-gray-800 pt-2">
        <span className="mr-2 text-yellow-500">guest@cherry-os:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="bg-transparent border-none outline-none flex-1 text-green-400 focus:ring-0"
          autoFocus
        />
      </div>
    </div>
  );
};

export default TerminalApp;
