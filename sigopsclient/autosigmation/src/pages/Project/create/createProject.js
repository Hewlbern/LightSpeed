import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import withStyles from "@material-ui/core/styles/withStyles";

import Grid from "../../../components/operations/Sequence/node_modules/@material-ui/core/Grid";
import PropTypes from "prop-types";
import MyButton from "../../../util/MyButton";
import Fragment from "react";
// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "../../../components/operations/Sequence/node_modules/@material-ui/core/TextField";

//redux
import { connect } from "react-redux";
import { postProject } from "../../../redux/actions/dataActions";

const styles = theme => ({
  ...theme.spreadThis
});

export class createProject extends Component {
  constructor() {
    super();
    this.state = {
      Project: "",
      Contract: "",
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
    const newProject = {
      Project: this.state.Project,
      Contract: this.state.Contract
    };
    this.props.postProject(newProject);
    this.props.history.push('/');

  };

  render() {
    return (
      <div>
        <form noValidate onSubmit={this.handleSubmit}>
          <TextField
            id="Project"
            value={this.state.Project}
            onChange={this.handleChange}
            fullWidth
            helperText="Input Project Name"
          />
          <TextField
            id="Contract"
            value={this.state.Contract}
            onChange={this.handleChange}
            fullWidth
            helperText="Input Contract Type"
          />

          <Button type="submit" variant="outlined" color="secondary">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

createProject.propTypes = {
  postProject: PropTypes.func.isRequired,
  createProject: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  createProject: state.createProject
});

export default connect(mapStateToProps, { postProject })(
  withStyles(styles)(createProject)
);
