import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Abt from './pages/Abt';
import './index.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<Abt />} />
    </Routes>
  );
};

export default App;



