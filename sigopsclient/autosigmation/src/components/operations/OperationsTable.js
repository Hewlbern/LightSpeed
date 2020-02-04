import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
// MUI Stuff
import EditIcon from '@material-ui/icons/Edit';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { toReadableDate } from '../../util/date';

const styles = (theme) => ({
	...theme.spreadThis,
	hover: {
		cursor: 'pointer'
	}
});

class OperationsTable extends Component {
	onClick = () => {
		const { Operation: { OperationId }, history } = this.props;
		history.push(`/Operations/${OperationId}`);
	};

	render() {
		const { Operation: { createdAt, Progress }, classes } = this.props;
		// TODO: this is a really dirty solution to add names to the Operations.
		// What is actually needed is some way to add names for the Operations on the API side.

		return (
			<TableRow key={createdAt} classes={{ hover: classes.hover }} hover selected onClick={this.onClick}>
				<TableCell component="th" scope="row">
					Operation {this.props.index + 1}
				</TableCell>
				<TableCell align="right">{toReadableDate(createdAt)}</TableCell>
				<TableCell align="right">{Progress}</TableCell>
			</TableRow>
		);
	}
}

export default withRouter(withStyles(styles)(OperationsTable));
