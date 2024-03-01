import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AppProvider } from './component/mycontext';
import { Routes, Route } from 'react-router-dom'
import Layout from './component/layout';
import Login from './component/login';
import AlbumList from './component/albumList';
import AlbumDetail from './component/albumDetail';

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Routes>
          <Route path="/" element={<Layout/>} >
              <Route index element={<Login/>} ></Route>
              <Route path="/album/list" element={<AlbumList/>} ></Route>
              <Route path="/album/detail" element={<AlbumDetail/>} ></Route>
          </Route>
        </Routes>
      </AppProvider>
    </div>
  );
}

export default App;
