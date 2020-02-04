import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';

import PropTypes from 'prop-types';

import Table from '../../components/operations/Sequence/node_modules/@material-ui/core/Table';
import TableBody from '../../components/operations/Sequence/node_modules/@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '../../components/operations/Sequence/node_modules/@material-ui/core/Grid';

import Box from '../../components/operations/Sequence/node_modules/@material-ui/core/Box';

import ClaimsTable from '../../components/Workflow/ClaimsTable';
import TableContentLoading from '../../components/helper/TableContentLoading';

import axios from 'axios';
import Button from '@material-ui/core/Button';

//Redux
import { connect } from 'react-redux';
import { getClaims } from '../../redux/actions/dataActions';

import { mergeClasses } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

class Claims extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Path: null
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {
		this.props.getClaims();
		this.setState({
			Path: this.props.match.params.ProjectId
		});
	}
	handleSubmit = (event) => {
		event.preventDefault();
		axios
			.post(`/Project/${this.state.Path}/Claim`)
			.then(() => {
				this.props.getClaims();
			})
			.catch((err) => console.log(err));
	};
	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (this.props.userID !== prevProps.userID) {
			this.fetchData(this.props.userID);
		}
	}

	render() {
		const { Claims: claims, Projects: projects, loading } = this.props.data;
		const parentProject = projects.find((it) => it.ProjectId === this.props.match.params.ProjectId);
		console.log(claims);
		console.log(claims.filter((claim) => claim.ProjectId === this.state.Path));

		let recentClaimsMarkup = !loading ? (
			claims
				.filter((claim) => claim.ProjectId === this.state.Path)
				.map((claim, index) => <ClaimsTable key={claim.ClaimId} index={index} Claim={claim} />)
		) : (
			<TableContentLoading />
		);
		return (
			<Box px={3}>
				<Grid>
					<Box mb={2}>
						<Typography variant="h5" gutterBottom>
							{(parentProject && parentProject.Project) || 'Project Claims'}
						</Typography>
					</Box>

					<Box px={3}>
						<Paper className={mergeClasses.root}>
							<Table className={mergeClasses.table} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Claim ID</TableCell>
										<TableCell align="right">Date received</TableCell>
										<TableCell align="right">Date Completed</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>{recentClaimsMarkup}</TableBody>
							</Table>
						</Paper>
					</Box>

					<Box mt={5} align="center" className={mergeClasses.root}>
						<form noValidate onSubmit={this.handleSubmit}>
							<Button type="submit" variant="contained" color="secondary">
								New Claim
							</Button>
						</form>
					</Box>
				</Grid>
			</Box>
		);
	}
}

Claims.propTypes = {
	getClaims: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	data: state.data
});

export default connect(mapStateToProps, { getClaims })(Claims);
