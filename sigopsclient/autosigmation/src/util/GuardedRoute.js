import React from 'react'
import { Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const GuardedRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );

  const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
  })

  GuardedRoute.propTypes = {
    user:PropTypes.object.isRequired
  }

export default connect(mapStateToProps)(GuardedRoute);
