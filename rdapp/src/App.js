import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Redirect } from 'react-router';
import './App.css';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css';

// Containers
import { DefaultLayout } from './containers';
import Login from './views/Login';
import { connect } from 'react-redux';

const history = createBrowserHistory();
class App extends Component {
  render() {
    return (
      <Router history={history} >
        <Switch>
          <Route path="/login" name="Login Page" component={Login} />
          <Route path="/" name="Home" render={() => (this.props.loggedIn ? <DefaultLayout /> :
            <Redirect to="/login" />)} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.loginDetails.success
  }
};

export default connect(mapStateToProps)(App);
