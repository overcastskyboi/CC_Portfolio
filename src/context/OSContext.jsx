import { createContext, useContext, useState, useEffect } from 'react';

const OSContext = createContext(null);

export const OSProvider = ({ children }) => {
  const [bootState, setBootState] = useState('off');
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openWindow = (appId, component, title, icon, initialProps = {}) => {
    if (windows.find((w) => w.id === appId)) {
      focusWindow(appId);
      return;
    }
    const newWindow = {
      id: appId,
      component,
      title,
      icon,
      props: initialProps,
      minimized: false,
      zIndex: windows.length + 1,
      position: { x: isMobile ? 0 : 50 + windows.length * 30, y: isMobile ? 0 : 50 + windows.length * 30 },
    };
    setWindows((prev) => [...prev, newWindow]);
    setActiveWindowId(appId);
  };

  const closeWindow = (id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  };
  
  const minimizeWindow = (id) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const focusWindow = (id) => {
    setActiveWindowId(id);
    setWindows((prev) => {
      const maxZ = Math.max(...prev.map((w) => w.zIndex), 0);
      return prev.map((w) => (w.id === id ? { ...w, zIndex: maxZ + 1, minimized: false } : w));
    });
  };

  return (
    <OSContext.Provider
      value={{ bootState, setBootState, windows, openWindow, closeWindow, minimizeWindow, focusWindow, activeWindowId, isMobile }}
    >
      {children}
    </OSContext.Provider>
  );
};

export const useOS = () => useContext(OSContext);
