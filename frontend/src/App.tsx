import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TextToJsonConverter from './components/TextToJsonConverter';
import HistoryView from './components/HistoryView';

export interface HistoryItem {
  id: string;
  timestamp: Date;
  inputText: string;
  outputJson: string;
}

function App() {
  const [activeView, setActiveView] = useState<'converter' | 'history'>('converter');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const addToHistory = (inputText: string, outputJson: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      timestamp: new Date(),
      inputText,
      outputJson
    };

    setHistory(prev => {
      const updated = [newItem, ...prev];
      return updated.slice(0, 10); // Keep only latest 10
    });
  };

  const startNewChat = () => {
    setActiveView('converter');
    setSidebarOpen(false);
  };

  return (
    <div className="h-screen bg-black text-white flex overflow-hidden">
      <Sidebar 
        activeView={activeView}
        onViewChange={setActiveView}
        onNewChat={startNewChat}
        historyCount={history.length}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <main className={`flex-1 overflow-hidden transition-all duration-300 ease-in-out ${
        sidebarOpen 
          ? 'lg:ml-64' 
          : 'ml-0'
      }`}>
        {activeView === 'converter' ? (
          <TextToJsonConverter onAddToHistory={addToHistory} />
        ) : (
          <HistoryView history={history} />
        )}
      </main>
    </div>
  );
}

export default App;