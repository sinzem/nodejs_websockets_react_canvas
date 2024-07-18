import React from "react";
import {BrowserRouter, Routes, Route, Redirect, Navigate} from "react-router-dom";
import './styles/app.scss';
import Toolbar from './components/Toolbar';
import SettingBar from './components/SettingBar';
import Canvas from './components/Canvas';

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Routes>
          <Route path='/:id' element={<>
            <Toolbar />
            <SettingBar />
            <Canvas />
          </>}/> {/* (при загрузке будет редиректиться на адрес ниже - с добавлением id из даты) */}
          <Route path="*" element={<Navigate replace to={`f${(+new Date).toString(16)}`} />} />
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
