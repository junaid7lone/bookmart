import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { Layout } from 'antd';
import Sidebar from './components/sidebar/Sidebar';
import { Content } from 'antd/es/layout/layout';
import CreateBook from './pages/CreateBook';
import AppHeader from './components/header/Header';
// import './App.scss';

const App: React.FC = () => {
  return (
    <>
      <Layout>
        <Sidebar />
        <Layout style={{ background: '#F6F9FE' }}>
          <AppHeader />
          <Content>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/create" element={<CreateBook />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
