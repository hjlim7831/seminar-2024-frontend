import './App.css';

import { type Map2048, moveMapIn2048Rule } from './utils/moveMapIn2048Rule';

function App() {
  const map: Map2048 = [
    [0, 0, 0],
    [0, 0, 0],
  ];

  const res = moveMapIn2048Rule(map, 'up');

  return <>{res}</>;
}

export default App;
