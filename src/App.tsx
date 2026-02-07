import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import Levels from './pages/Levels';
import Structure from './pages/Structure';
import SimoGuide from './pages/SimoGuide';
import Simulations from './pages/Simulations';
import Documents from './pages/Documents';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="levels" element={<Levels />} />
          <Route path="structure" element={<Structure />} />
          <Route path="simo" element={<SimoGuide />} />
          <Route path="simulations" element={<Simulations />} />
          <Route path="documents" element={<Documents />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
