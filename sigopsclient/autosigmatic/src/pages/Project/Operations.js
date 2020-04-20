import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';

import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Box from '@material-ui/core/Box';

import OperationsTable from '../../components/Workflow/OperationsTable';
import TableContentLoading from '../../components/helper/TableContentLoading';

import axios from 'axios';
import Button from '@material-ui/core/Button';

//Redux
import { connect } from 'react-redux';
import { getOperations } from '../../redux/actions/dataActions';

import { mergeClasses } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

class Operations extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Path: null
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {
		this.props.getOperations();
		this.setState({
			Path: this.props.match.params.ProjectId
		});
	}
	handleSubmit = (event) => {
		event.preventDefault();
		axios
			.post(`/Project/${this.state.Path}/Operation`)
			.then(() => {
				this.props.getOperations();
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
		const { Operations: operations, Projects: projects, loading } = this.props.data;
		const parentProject = projects.find((it) => it.ProjectId === this.props.match.params.ProjectId);
		console.log(operations);
		console.log(operations.filter((operation) => operation.ProjectId === this.state.Path));

		let recentOperationsMarkup = !loading ? (
			operations
				.filter((operation) => operation.ProjectId === this.state.Path)
				.map((operation, index) => <OperationsTable key={operation.OperationId} index={index} Operation={operation} />)
		) : (
			<TableContentLoading />
		);
		return (
			<Box px={3}>
				<Grid>
					<Box mb={2}>
						<Typography variant="h5" gutterBottom>
							{(parentProject && parentProject.Project) || 'Project Operations'}
						</Typography>
					</Box>

					<Box px={3}>
						<Paper className={mergeClasses.root}>
							<Table className={mergeClasses.table} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Operation ID</TableCell>
										<TableCell align="right">Date received</TableCell>
										<TableCell align="right">Date Completed</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>{recentOperationsMarkup}</TableBody>
							</Table>
						</Paper>
					</Box>

					<Box mt={5} align="center" className={mergeClasses.root}>
						<form noValidate onSubmit={this.handleSubmit}>
							<Button type="submit" variant="contained" color="secondary">
								New Operation
							</Button>
						</form>
					</Box>
				</Grid>
			</Box>
		);
	}
}

Operations.propTypes = {
	getOperations: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	data: state.data
});

export default connect(mapStateToProps, { getOperations })(Operations);
