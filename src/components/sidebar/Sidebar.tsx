import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, HeartOutlined, PlusOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Logo from '../../assets/logo-full.png';
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
    icon: <HeartOutlined />,
    label: <Link to="/favorites">Favorites</Link>,
    name: '/favorites',
  },
  {
    key: '3',
    icon: <PlusOutlined />,
    label: <Link to="/create">Add New Book</Link>,
    name: '/create',
  },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  const getSelectedKey = () => {
    const currentPath = location.pathname;
    const menuItem = menuItems.find((item) => item.name === currentPath);
    return menuItem ? menuItem.key : '1';
  };

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
        selectedKeys={[getSelectedKey()]}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;
