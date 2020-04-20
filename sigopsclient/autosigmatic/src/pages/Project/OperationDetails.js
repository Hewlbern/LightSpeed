import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import DocumentsTable from "../../components/Workflow/DocumentsTable";
import TableContentLoading from "../../components/helper/TableContentLoading";

import axios from "axios";

//Redux
import { connect } from "react-redux";
import {
  getOperations,
  postOperation,
  getOperationFiles
} from "../../redux/actions/dataActions";

import { mergeClasses } from "@material-ui/styles";

const styles = theme => ({
  ...theme.spreadThis
});

export class OperationDetails extends Component {
  state = {
    uploadingFile: false
  };

  componentDidMount() {
    this.props.getOperationFiles(this.props.match.params.OperationId);
  }

  // TODO move out to redux
  onFileUploaded = ({ target }) => {
    const formData = new FormData();
    const file = target.files[0];
    formData.append(file.name, file);
    this.setState({
      uploadingFile: true
    });
    axios
      .post(`/Operation/Upload/${this.props.match.params.OperationId}`, formData)
      .then(() => {
        this.setState({ uploadingFile: false });
        this.props.getOperationFiles(this.props.match.params.OperationId);
      });
  };

  render() {
    const { match } = this.props;
    const { OperationFiles, Operations, loading } = this.props.data;
	  const Operation = Operations.find(it => it.OperationId === match.params.OperationId);
	
    const files = OperationFiles[match.params.OperationId] || [];

    const render = !loading ? (
      files.map(document => (
        <DocumentsTable key={document.name} {...document} />
      ))
    ) : (
      <TableContentLoading />
    );

    return (
      <Box px={3}>
        <Grid>
          <Paper className={mergeClasses.root}>
            <Table className={mergeClasses.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Document Name</TableCell>
                  <TableCell align="right">Date Uploaded</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{render}</TableBody>
            </Table>
          </Paper>

          <Box mt={5} align="center" className={mergeClasses.root}>
            <div
              style={{
                maxWidth: "50%",
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <input
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={this.onFileUploaded}
              />
              <label htmlFor="raised-button-file">
                <Button
                  disabled={this.state.uploadingFile}
                  variant="contained"
                  color="primary"
                  component="span"
                >
                  Add Document
                </Button>
              </label>

              {/* TODO change it from static */}
              <Button
                variant="contained"
                color="primary"
                href={`/Workflow/${Operation.WorkflowId}`}
              >
                View Operation
              </Button>
            </div>
          </Box>
        </Grid>
      </Box>
    );
  }
}

OperationDetails.propTypes = {
  getOperations: PropTypes.func.isRequired,
  getOperationFiles: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, {
  getOperations,
  getOperationFiles,
  postOperation
})(withRouter(withStyles(styles)(OperationDetails)));

/*


    
  constructor() {
    super();
    this.state = {
      Project:"Hospital",
      body: "",
      Progress: "New",
      errors: {}
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const newOperation = {
      Project: this.state.Project,
      body: this.state.body,
      Progress: this.state.Progress
    };
    this.props.postOperation(newOperation);
  };
  */
