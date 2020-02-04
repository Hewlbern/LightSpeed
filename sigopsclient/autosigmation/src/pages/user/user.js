import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import StaticProfile from '../../components/profile/StaticProfile';
import Grid from '../../components/operations/Sequence/node_modules/@material-ui/core/Grid';

import ProfileSkeleton from '../../util/ProfileSkeleton';

import Profile from "../../components/profile/Profile";
import { connect } from 'react-redux';
import { getUserData } from '../../redux/actions/dataActions';


const styles = theme => ({
    ...theme.spreadThis
  });
  
export class user extends Component {
    render() {
        return (
            <div>
                <Profile />
            </div>
        )
    }
}



const mapStateToProps = state => ({
    authenticated: state.user.authenticated
  });


export default connect(mapStateToProps)(user);


