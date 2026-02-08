import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Valentine from './pages/Valentine';
import Accepted from './pages/Accepted';
import MusicPlayer from './components/MusicPlayer';

const App = () => {
  useEffect(() => {
    document.body.classList.add('custom-cursor');
    return () => document.body.classList.remove('custom-cursor');
  }, []);

  return (
    <Router>
      <MusicPlayer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/valentine" element={<Valentine />} />
        <Route path="/accepted" element={<Accepted />} />
      </Routes>
    </Router>
  );
}

export default App;
