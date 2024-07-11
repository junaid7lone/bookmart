import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { Layout, theme } from 'antd';
import Sidebar from './components/sidebar/Sidebar';
import { Content, Header } from 'antd/es/layout/layout';
import CreateBook from './pages/CreateBook';
// import './App.scss';

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Layout>
        <Sidebar />
        <Layout style={{ background: '#F6F9FE' }}>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: '24px 16px 0' }}>
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
