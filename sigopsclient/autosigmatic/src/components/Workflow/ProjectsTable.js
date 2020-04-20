import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
// MUI Stuff

import EditIcon from '@material-ui/icons/Edit';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';

import { toReadableDate } from '../../util/date';

const styles = (theme) => ({
	...theme.spreadThis
});

class ProjectsTable extends Component {
	onEditClick = () => {
		const { Project: { ProjectId }, history } = this.props;
		history.push(`/Projects/${ProjectId}`);
	};

	render() {
		const { Project: { Project, Contract, createdAt }, classes } = this.props;

		return (
			<TableRow key={Project}>
				<TableCell component="th" scope="row">
					{Project}
				</TableCell>
				<TableCell align="right">{Contract}</TableCell>
				<TableCell align="right">{toReadableDate(createdAt)}</TableCell>
				<TableCell onClick={this.onEditClick} component="th" scope="row">
					<IconButton><EditIcon/></IconButton>
				</TableCell>
			</TableRow>
		);
	}
}

export default withRouter(withStyles(styles)(ProjectsTable));

//{`/Projects/${Project}`}
