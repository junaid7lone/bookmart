import React from 'react';
import { Link } from 'react-router-dom';
import { HomeOutlined, HeartOutlined, PlusOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Logo from '../../assets/logo-full.png';
import './Sidebar.scss';

const { Sider } = Layout;

const items = [
  {
    key: '1',
    icon: <HomeOutlined />,
    label: <Link to="/">Home</Link>,
  },
  {
    key: '2',
    icon: <HeartOutlined />,
    label: <Link to="/favorites">Favorites</Link>,
  },
  {
    key: '3',
    icon: <PlusOutlined />,
    label: <Link to="/create">Add New Book</Link>,
  },
];

const Sidebar: React.FC = () => {
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
        defaultSelectedKeys={['1']}
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;
