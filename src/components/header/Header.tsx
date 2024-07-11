import React from 'react';
import { Input, Avatar, Layout } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Header.scss';

const { Header } = Layout;
const { Search } = Input;

const AppHeader: React.FC = () => {
  const handleSearch = (value: string) => {
    console.log('Search value:', value);
    // Implement search functionality here
  };

  return (
    <Header className="app-header">
      <div className="app-header-content">
        <Search
          placeholder="Search books"
          onSearch={handleSearch}
          style={{ width: 200 }}
        />
        <Avatar icon={<UserOutlined />} className="profile-icon" />
      </div>
    </Header>
  );
};

export default AppHeader;
