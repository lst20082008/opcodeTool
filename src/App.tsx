import React from 'react';
import { useState } from 'react';
import './App.css';
import { CalChain, CalNode } from './CalChain';
import CalChainDisplay from './CalChainDisplay';

function App() {
  const [calChains, setCalChains] = useState(new Array<CalChain>());
  const finalCalChains: CalChain = new CalChain();
  for (let i = 0; i < calChains.length; i++) {
    finalCalChains.pushNode(new CalNode(calChains[i].calc()));
    if (i !== calChains.length - 1) {
      finalCalChains.pushNode(new CalNode('|'));
    }
  }
  return (
    <div className="App">
      <header className="App-header">
      <CalChainDisplay calChains={calChains} setCalChains={setCalChains} />
      final result: 0x{finalCalChains.calc().toString(16)}
      </header>
    </div>
  );
}

export default App;