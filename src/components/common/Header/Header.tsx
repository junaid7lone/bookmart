import React from 'react';
import { Input, Avatar, Layout, Space, Tooltip } from 'antd';
import { GithubFilled, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import LogoSmall from '@assets/bookmark-icon.png';
import './Header.scss';
import config from '@/config';

const { Header } = Layout;
const { Search } = Input;

const AppHeader: React.FC = () => {
  const handleSearch = (value: string) => {
    console.log('Search value:', value);
  };

  return (
    <Header className="app-header">
      <div className="app-header-content">
        <div className="nav-left-side">
          <span className="logo-small">
            <Link to="/">
              <img src={LogoSmall} alt="BookMart" />
            </Link>
          </span>
          <Search
            placeholder="Search books"
            onSearch={handleSearch}
            style={{ width: 200 }}
          />
        </div>
        <div>
          <Space>
            <Tooltip title="Vist Repository">
              <a
                key="github-link"
                href={config.gitRepoUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Avatar icon={<GithubFilled />} className="profile-icon" />
              </a>
            </Tooltip>
            <Avatar icon={<UserOutlined />} className="profile-icon" />
          </Space>
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;
