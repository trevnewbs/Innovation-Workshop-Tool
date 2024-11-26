import { ReactNode } from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { HomeOutlined, BulbOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { MenuProps } from 'antd/lib/menu';

const { Header, Sider, Content } = AntLayout;

interface LayoutProps {
  children: ReactNode;
}

const menuItems: MenuProps['items'] = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: <Link to="/">Dashboard</Link>,
  },
  {
    key: '/workshops',
    icon: <BulbOutlined />,
    label: <Link to="/workshops">Workshops</Link>,
  },
  {
    key: '/participants',
    icon: <TeamOutlined />,
    label: <Link to="/participants">Participants</Link>,
  },
  {
    key: '/settings',
    icon: <SettingOutlined />,
    label: <Link to="/settings">Settings</Link>,
  },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <AntLayout className="min-h-screen">
      <Header className="bg-white border-b flex items-center justify-between px-6">
        <div className="text-xl font-bold">Innovation Workshop Tool</div>
      </Header>
      <AntLayout>
        <Sider width={250} className="bg-white">
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            className="h-full border-r"
            items={menuItems}
          />
        </Sider>
        <Content className="p-6 bg-gray-50">
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  );
}