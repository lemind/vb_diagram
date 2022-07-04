import React from 'react';
import './App.css';
import DiagramCmp from './components/DiagramCmp'
import { getData } from './data/dataStore';

function App() {
  const data = getData()

  return (
    <div className="App">
      <DiagramCmp dataObj={data} />
    </div>
  );
}

export default App;
