import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
// MUI Stuff
import EditIcon from '@material-ui/icons/Edit';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { toReadableDate } from '../../util/date';

const styles = (theme) => ({
	...theme.spreadThis
});

class DocumentsTable extends Component {
	render() {
		const { name, url, uploadedAt } = this.props;

		return (
			<TableRow key={uploadedAt}>
				<TableCell component="th" scope="row">
					<a style={{ textDecoration: 'none', color: '#000' }} href={url}>
						{name}
					</a>
				</TableCell>
				<TableCell align="right">{toReadableDate(uploadedAt)}</TableCell>
			</TableRow>
		);
	}
}

export default withStyles(styles)(DocumentsTable);
