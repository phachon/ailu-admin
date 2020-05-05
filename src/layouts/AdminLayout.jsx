import React from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';

import AdminHeader from '../components/AdminHeader/AdminHeader';
import AdminFooter from '../components/AdminFooter/AdminFooter';
import AdminSider from '../components/AdminSider/AdminSider';
import AdminBreadcrumb from '../components/AdminBreadcrumb/AdminBreadcrumb';
import UserForm from '../pages/User/UserForm'
import UserList from '../pages/User/UserList'

const { Content } = Layout;

class AdminLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    }
    this.siderChange = this.siderChange.bind(this);
  }

  siderChange (collapsed) {
    this.setState({
      collapsed: collapsed,
    })
    console.log(collapsed);
  }

  render () {
    const siderCollapsed = this.state.collapsed;
    const rightStyle = {
      marginLeft: siderCollapsed ? "80px" : "220px"
    };
    return (
      <Layout className="admin-layout" >
        <AdminSider siderChange={this.siderChange} />
        <Layout className="admin-right" style={rightStyle}>
          <AdminHeader />
          <AdminBreadcrumb />
          <Content className="admin-content">
            <Switch>
              <Route path="/user/add" render={() => { return <UserForm /> }} />
              <Route path="/user/list" render={() => { return <UserList /> }} />
            </Switch>
          </Content>
          <AdminFooter />
        </Layout>
      </Layout>
    );
  }
}

export default AdminLayout;