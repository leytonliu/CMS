import React from 'react';
import { Layout, SiderProps } from 'antd';
import ComponentList from '@/pages/CMS/Decorate/components/ComponentList';
import PageConfig from '@/pages/CMS/Decorate/components/PageConfig';
import Preview from '@/pages/CMS/Decorate/components/Preview';

const { Header, Content, Sider } = Layout;

const leftSiderProps: SiderProps = {
  collapsible: true,
  width: 300,
  theme: 'light',
  style: {
    boxShadow: '1px 0 2px -2px rgba(0, 0, 0, 0.16)',
  },
};

const rightSiderProps: SiderProps = {
  collapsible: true,
  width: 400,
  theme: 'light',
  reverseArrow: true,
  style: {},
};

const Decorate: React.FC = () => {
  return (
    <>
      <Layout>
        <Header>CMS页面装修</Header>
        <Layout>
          <Sider {...leftSiderProps}>
            <ComponentList />
          </Sider>
          <Content>
            <Preview />
          </Content>
          <Sider {...rightSiderProps}>
            <PageConfig />
          </Sider>
        </Layout>
      </Layout>
    </>
  );
};

export default Decorate;
