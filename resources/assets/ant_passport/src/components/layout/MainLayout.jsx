import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Menu, Breadcrumb, Dropdown, Icon } from 'antd';
import styles from './MainLayout.less';

const SubMenu = Menu.SubMenu;

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="http://www.alipay.com/"><Icon type="edit" /> 个人信息</a>
    </Menu.Item>
    <Menu.Item key="3"><Icon type="logout" /> 安全退出</Menu.Item>
  </Menu>
);

function MainLayout({ children, location }) {
  return (
    <div className="ant-layout-aside">
      <header className="main-header">
        <Link to="/" className="logo">
          <span className="logo-lg">量子密盾</span>
        </Link>
        <nav className="navbar navbar-static-top">

          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li className="dropdown">
                <Dropdown overlay={menu} trigger={['click']}>
                  <a className="ant-dropdown-link">
                    <Icon type="user" /> admin@admin.com <Icon type="down" />
                  </a>
                </Dropdown>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <aside className="ant-layout-sider">
        <Menu mode="inline" theme="dark" defaultSelectedKeys={['']} defaultOpenKeys={['sub1', 'sub2', 'sub3']}>
          <Menu.Item key="1">
            <span><Icon type="appstore" />应用中心</span>
          </Menu.Item>
          <SubMenu key="sub2" title={<span><Icon type="user" />用户中心</span>}>
            <Menu.Item key="5"><Link to="/users">用户管理</Link></Menu.Item>
            <Menu.Item key="6">个人信息</Menu.Item>
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
              { children }
            </div>
          </div>
        </div>
        <div className="ant-layout-footer">
        量子视觉自动化系统 © 2016 深圳市量子视觉科技有限公司
        </div>
      </div>
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default connect()(MainLayout);
