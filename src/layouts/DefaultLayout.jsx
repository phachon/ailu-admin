import React from 'react';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import AdminSider from './AdminSider';
import AdminBreadcrumb from './AdminBreadcrumb';
import { Layout } from 'antd';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import UserForm from '../pages/User/UserForm'
import UserList from '../pages/User/UserList'

const { Content } = Layout;

class DefaultLayout extends React.Component {
  state = {
    collapsed: false,
  };

  render () {
    return (
      <Layout className="admin-layout">
        <AdminSider />
        <Layout>
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

export default DefaultLayout;