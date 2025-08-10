import React, { useState } from 'react';
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
      return updated.slice(0, 5); // Keep only latest 5
    });
  };

  const startNewChat = () => {
    setActiveView('converter');
    setSidebarOpen(false);
  };

  return (
    <div className="h-screen bg-gray-50 relative flex">
      <Sidebar 
        activeView={activeView}
        onViewChange={setActiveView}
        onNewChat={startNewChat}
        historyCount={history.length}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <main className={`overflow-hidden transition-all duration-300 ease-in-out ${
        sidebarOpen 
          ? 'ml-64 w-[calc(100%-16rem)]' 
          : 'ml-0 w-full'
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