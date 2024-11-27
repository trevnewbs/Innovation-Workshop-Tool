import React from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  TeamOutlined,
  ProjectOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

export const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to determine which menu item should be selected based on the current path
  const getSelectedKey = (pathname: string) => {
    if (pathname.startsWith('/projects')) return '/projects';
    if (pathname.startsWith('/workshops')) return '/workshops';
    return '/';
  };

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/workshops',
      icon: <TeamOutlined />,
      label: 'Workshops',
    },
    {
      key: '/projects',
      icon: <ProjectOutlined />,
      label: 'Projects',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="flex items-center px-6">
        <h1 className="text-white text-xl m-0">HVL Corporate Innovation Tool</h1>
      </Header>
      
      <Layout>
        <Sider width={200} theme="light">
          <Menu
            mode="inline"
            selectedKeys={[getSelectedKey(location.pathname)]}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
            onClick={({ key }) => navigate(key)}
          />
        </Sider>
        
        <Layout style={{ padding: '24px' }}>
          <Content className="bg-white p-6 rounded-lg">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
