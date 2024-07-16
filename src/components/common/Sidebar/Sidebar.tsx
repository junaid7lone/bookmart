import React, { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Logo from '@assets/logo-full.png';

import './Sidebar.scss';

const { Sider } = Layout;

const menuItems = [
  {
    key: '1',
    icon: <HomeOutlined />,
    label: <Link to="/">Home</Link>,
    name: '/',
  },
  {
    key: '2',
    icon: <PlusOutlined />,
    label: <Link to="/create">Add New Book</Link>,
    name: '/create',
  },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  const getSelectedKey = useCallback(() => {
    const currentPath = location.pathname;
    const selectedItem = menuItems.find((item) => item.name === currentPath);
    return selectedItem ? selectedItem.key : '1';
  }, [location.pathname]);

  return (
    <Sider
      theme="light"
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo-vertical">
        <Link to="/">
          <img width={150} src={Logo} alt="BookMart" />
        </Link>
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={[getSelectedKey()]}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;
