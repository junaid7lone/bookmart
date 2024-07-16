import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

import Home from '@pages/Home';
import Sidebar from '@components/sidebar/Sidebar';
import CreateBook from '@pages/CreateBook';
import AppHeader from '@components/header/Header';

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
              <Route path="/create" element={<CreateBook />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
