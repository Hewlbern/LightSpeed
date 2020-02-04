import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import Table from "../../components/operations/Sequence/node_modules/@material-ui/core/Table";
import TableBody from "../../components/operations/Sequence/node_modules/@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "../../components/operations/Sequence/node_modules/@material-ui/core/Grid";
import Box from "../../components/operations/Sequence/node_modules/@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import DocumentsTable from "../../components/Workflow/DocumentsTable";
import TableContentLoading from "../../components/helper/TableContentLoading";

import axios from "axios";

//Redux
import { connect } from "react-redux";
import {
  getClaims,
  postClaim,
  getClaimFiles
} from "../../redux/actions/dataActions";

import { mergeClasses } from "@material-ui/styles";

const styles = theme => ({
  ...theme.spreadThis
});

export class ClaimDetails extends Component {
  state = {
    uploadingFile: false
  };

  componentDidMount() {
    this.props.getClaimFiles(this.props.match.params.ClaimId);
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
      .post(`/Claim/Upload/${this.props.match.params.ClaimId}`, formData)
      .then(() => {
        this.setState({ uploadingFile: false });
        this.props.getClaimFiles(this.props.match.params.ClaimId);
      });
  };

  render() {
    const { match } = this.props;
    const { ClaimFiles, Claims, loading } = this.props.data;
	  const claim = Claims.find(it => it.ClaimId === match.params.ClaimId);
	
    const files = ClaimFiles[match.params.ClaimId] || [];

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
                href={`/Workflow/${claim.WorkflowId}`}
              >
                View Claim
              </Button>
            </div>
          </Box>
        </Grid>
      </Box>
    );
  }
}

ClaimDetails.propTypes = {
  getClaims: PropTypes.func.isRequired,
  getClaimFiles: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, {
  getClaims,
  getClaimFiles,
  postClaim
})(withRouter(withStyles(styles)(ClaimDetails)));

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
    const newClaim = {
      Project: this.state.Project,
      body: this.state.body,
      Progress: this.state.Progress
    };
    this.props.postClaim(newClaim);
  };
  */
