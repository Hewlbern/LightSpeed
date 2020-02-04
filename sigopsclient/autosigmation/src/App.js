import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/AuthRoute';
import GuardedRoute from './util/GuardedRoute';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
// Pages
import Projects from './pages/Project/Projects';

import Claims from './pages/Project/Claims';
import createProject from './pages/Project/create/createProject.js';
import ClaimDetails from './pages/Project/ClaimDetails.js';

import login from './pages/user/login';
import signup from './pages/user/signup';
import user from './pages/user/user';

import EoT from './pages/workflows/EoT';

// Components
import Navbar from './components/Layout/Navbar';
import axios from 'axios';

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = 'https://xxx.cloudfunctions.net/api'

const token = localStorage.FBIdToken;
if (token) {
	const decodedToken = jwtDecode(token);
	if (decodedToken.exp * 1000 < Date.now()) {
		store.dispatch(logoutUser());
		window.location.href = '/login';
	} else {
		store.dispatch({ type: SET_AUTHENTICATED });
		axios.defaults.headers.common['Authorization'] = token;
		store.dispatch(getUserData());
	}
}

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<Provider store={store}>
				<div className="App">
					<Router>
						<Navbar />
						<div className="container">
							<Switch>
								<GuardedRoute exact path="/" component={Projects} />
								<GuardedRoute exact path="/user" component={user} />
								<AuthRoute exact path="/login" component={login} />
								<AuthRoute exact path="/signup" component={signup} />
								<GuardedRoute exact path="/createproject" component={createProject} />
								<GuardedRoute exact path="/Projects/:ProjectId" component={Claims} />
								<GuardedRoute exact path="/Claims/:ClaimId" component={ClaimDetails} />
								<GuardedRoute exact path="/Workflow/:WorkflowId" component={EoT} />
							</Switch>
						</div>
					</Router>
				</div>
			</Provider>
		</MuiThemeProvider>
	);
}

export default App;
