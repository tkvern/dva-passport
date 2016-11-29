import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Menu, Breadcrumb, Dropdown, Icon } from 'antd';
// import BrowserDemo from 'site/theme/template/BrowserDemo';
const SubMenu = Menu.SubMenu;

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="http://www.alipay.com/">1st menu item</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="http://www.taobao.com/">2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">3d menu item</Menu.Item>
  </Menu>
);

import styles from './IndexPage.less';

function IndexPage() {
  return (
    <div className="ant-layout-aside">
      <header className="main-header">
        <a href="/" className="logo">
          <span className="logo-lg"><b>DK</b> VISION</span>
        </a>
        <nav className="navbar navbar-static-top">
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li className="dropdown">
                <Dropdown overlay={menu} trigger={['click']}>
                  <a className="ant-dropdown-link" href="#">
                    <Icon type="user" /> admin@admin.com <Icon type="down" />
                  </a>
                </Dropdown>
              </li>
              <li className="dropdown">
                <Dropdown overlay={menu} trigger={['click']}>
                  <a className="ant-dropdown-link" href="#">
                    <Icon type="user" /> testsss <Icon type="down" />
                  </a>
                </Dropdown>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <aside className="ant-layout-sider">
        <Menu mode="inline" theme="dark"
          defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
          <SubMenu key="sub1" title={<span><Icon type="user" />导航一</span>}>
            <Menu.Item key="1">选项1</Menu.Item>
            <Menu.Item key="2">选项2</Menu.Item>
            <Menu.Item key="3">选项3</Menu.Item>
            <Menu.Item key="4">选项4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="laptop" />导航二</span>}>
            <Menu.Item key="5">选项5</Menu.Item>
            <Menu.Item key="6">选项6</Menu.Item>
            <Menu.Item key="7">选项7</Menu.Item>
            <Menu.Item key="8">选项8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="notification" />导航三</span>}>
            <Menu.Item key="9">选项9</Menu.Item>
            <Menu.Item key="10">选项10</Menu.Item>
            <Menu.Item key="11">选项11</Menu.Item>
            <Menu.Item key="12">选项12</Menu.Item>
          </SubMenu>
        </Menu>
      </aside>
      <div className="ant-layout-main">
        <div className="ant-layout-breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>应用列表</Breadcrumb.Item>
            <Breadcrumb.Item>某应用</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ant-layout-container">
          <div className="ant-layout-content">
            <div style={{ minHeight: 590 }}>
              内容区域
            </div>
          </div>
        </div>
        <div className="ant-layout-footer">
        Ant Design 版权所有 © 2015 由蚂蚁金服体验技术部支持
        </div>
      </div>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);