import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

import Home from '@/pages/Home/Home';
import Sidebar from '@/components/common/Sidebar/Sidebar';
import CreateBook from '@/pages/CreateBook/CreateBook';
import AppHeader from '@/components/common/Header/Header';

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
