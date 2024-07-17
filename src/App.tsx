import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

import Home from '@pages/Home/Home';
import Sidebar from '@components/common/Sidebar/Sidebar';
import CreateBook from '@pages/CreateBook/CreateBook';

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Layout>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout className={` ${collapsed ? 'collapsed' : ''} main-container`}>
          <Content>
            <Routes>
              <Route
                path="/"
                element={
                  <Home setCollapsed={setCollapsed} collapsed={collapsed} />
                }
              />
              <Route
                path="/create"
                element={
                  <CreateBook
                    setCollapsed={setCollapsed}
                    collapsed={collapsed}
                  />
                }
              />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
