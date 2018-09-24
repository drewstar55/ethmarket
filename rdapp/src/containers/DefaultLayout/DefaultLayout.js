import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { withRouter } from 'react-router';
import {
  AppBreadcrumb,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarNav,
} from '@coreui/react';
import navigation from '../../_nav';
import routes from '../../routes';
import { connect } from 'react-redux';
import DefaultHeader from './DefaultHeader';
import { getAccountBalance } from '../../actions/login';
import Notifications from 'react-notification-system-redux';

class DefaultLayout extends Component {
  componentDidMount() {
    this.props.getAccountBalance();
  }
  render() {
    var userNav = { items: [] };
    this.props.userRoute.map(item => userNav.items.push(navigation.items[item]));
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className="app-body">
          {/* <MsgPopUp /> */}
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={userNav} {...this.props} />
            <AppSidebarFooter />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} />
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                    <route.component {...props} />
                  )} />)
                    : (null);
                }
                )}
              </Switch>
              <Notifications
                notifications={this.props.notifications}
              />
            </Container>
          </main>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userRoute: state.login.loginDetails.userRoute,
    notifications: state.notifications
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAccountBalance: () => { dispatch(getAccountBalance()) }
  }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DefaultLayout));
