import React from 'react';
import { Layout, SiderProps } from 'antd';
import ComponentList from '@/pages/CMS/Decorate/components/ComponentList';
import PageConfig from '@/pages/CMS/Decorate/components/PageConfig';
import Preview from '@/pages/CMS/Decorate/components/Preview';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const { Header, Content, Sider } = Layout;

const leftSiderProps: SiderProps = {
  collapsible: false,
  width: 300,
  theme: 'light',
  style: {
    boxShadow: '1px 0 2px -2px rgba(0, 0, 0, 0.16)',
  },
};

const rightSiderProps: SiderProps = {
  collapsible: false,
  width: 400,
  theme: 'light',
  reverseArrow: true,
  style: {},
};

const Decorate: React.FC = () => {
  return (
    <>
      <Layout>
        <Header>
          <div style={{ color: 'white' }}>CMS页面装修</div>
        </Header>
        <Layout>
          <DndProvider backend={HTML5Backend}>
            <Sider {...leftSiderProps}>
              <ComponentList />
            </Sider>
            <Content>
              <Preview />
            </Content>
            <Sider {...rightSiderProps}>
              <PageConfig />
            </Sider>
          </DndProvider>
        </Layout>
      </Layout>
    </>
  );
};

export default Decorate;
