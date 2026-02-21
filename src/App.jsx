import { OSProvider, useOS } from './context/OSContext';
import BootScreen from './components/BootScreen';
import LockScreen from './components/LockScreen';
import Desktop from './components/Desktop';

const MainContent = () => {
  const { bootState } = useOS();
  if (bootState === 'off') return <BootScreen />;
  if (bootState === 'locked') return <LockScreen />;
  if (bootState === 'desktop') return <Desktop />;
  return <BootScreen />;
};

export default function App() {
  return (
    <OSProvider>
      <MainContent />
    </OSProvider>
  );
}
