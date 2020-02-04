import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import Grid from '../../components/operations/Sequence/node_modules/@material-ui/core/Grid';

import Table from '../../components/operations/Sequence/node_modules/@material-ui/core/Table';
import TableBody from '../../components/operations/Sequence/node_modules/@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { spacing } from '@material-ui/system';

import Box from '../../components/operations/Sequence/node_modules/@material-ui/core/Box';
import ProjectsTable from '../../components/Workflow/ProjectsTable';
import TableContentLoading from '../../components/helper/TableContentLoading';


//Redux
import { connect } from 'react-redux';
import { getProjects } from '../../redux/actions/dataActions';

import { mergeClasses } from '@material-ui/styles';

import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
	...theme.spreadThis
});

class Projects extends Component {
	componentDidMount() {
		this.props.getProjects();
	}
	render() {
		const { Projects, loading } = this.props.data;
		let recentProjectsMarkup = !loading ? (
			Projects.map((Project) => <ProjectsTable key={Project.ProjectId} Project={Project} />)
		) : (
			<TableContentLoading />
		);
		return (
			<Grid>
				<Paper className={mergeClasses.root}>
					<Table className={mergeClasses.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>
									<strong>Project Title</strong>
								</TableCell>
								<TableCell align="right">
									<strong>Contract</strong>
								</TableCell>
								<TableCell align="right">
									<strong>Date</strong>
								</TableCell>
								<TableCell>
									<strong>Claims</strong>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>{recentProjectsMarkup}</TableBody>
					</Table>
				</Paper>

				<Box mt={5} align="center" className={mergeClasses.root}>
					<Button component={Link} to="/createproject" variant="contained" color="secondary">
						New Project
					</Button>
				</Box>
			</Grid>
		);
	}
}

Projects.propTypes = {
	getProjects: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	data: state.data
});

export default connect(mapStateToProps, { getProjects })(withStyles(styles)(Projects));
