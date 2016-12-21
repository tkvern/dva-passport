import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Menu, Dropdown, Icon } from 'antd';
import './MainLayout.less';
import { logOut } from '../../utils/auth';

const SubMenu = Menu.SubMenu;


function MainLayout({ children, dispatch, auth }) {
  const {
    user,
    currentMenu,
  } = auth;

  function handleClick(e) {
    if (e.key === '3') {
      logOut();
    }
  }

  function onClickMenu(e) {
    dispatch({
      type: 'auth/activeMenu',
      payload: {
        currentMenu: [e.key],
      },
    });
  }

  const menuPanel = (
    <Menu onClick={handleClick}>
      <Menu.Item key="0">
        <Link
          to="/user"
          onClick={() => {
            dispatch({
              type: 'auth/activeMenu',
              payload: {
                currentMenu: ['8'],
              },
            });
          }}
        >
          <Icon type="edit" /> 修改资料
        </Link>
      </Menu.Item>
      <Menu.Item key="3"><Icon type="logout" /> 安全退出</Menu.Item>
    </Menu>
  );

  const menuChildren = [
    <Menu.Item key="1">
      <Link to="/"><Icon type="appstore" />应用中心</Link>
    </Menu.Item>,
    <SubMenu key="sub3" title={<span><Icon type="user" />个人中心</span>}>
      <Menu.Item key="8"><Link to="/user">修改资料</Link></Menu.Item>
      <Menu.Item key="9"><Link to="/password">修改密码</Link></Menu.Item>
    </SubMenu>,
  ];

  if (user.isadmin === 1) {
    menuChildren.push(
      <SubMenu key="sub2" title={<span><Icon type="solution" />用户模块</span>}>
        <Menu.Item key="5"><Link to="/users">用户管理</Link></Menu.Item>
        <Menu.Item key="6"><Link to="/roles">角色管理</Link></Menu.Item>
        <Menu.Item key="7"><Link to="/permissions">权限管理</Link></Menu.Item>
      </SubMenu>
    );
  }

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
                <Dropdown overlay={menuPanel} trigger={['click']}>
                  <a className="ant-dropdown-link">
                    <Icon type="user" /> { user.nickname } <Icon type="down" />
                  </a>
                </Dropdown>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <aside className="ant-layout-sider">
        <Menu mode="inline" theme="dark" defaultSelectedKeys={currentMenu} defaultOpenKeys={['sub2', 'sub3']} onClick={onClickMenu}>
          {menuChildren}
        </Menu>
      </aside>
      <div className="ant-layout-main">
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
  user: PropTypes.object,
  currentMenu: PropTypes.array,
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(MainLayout);
