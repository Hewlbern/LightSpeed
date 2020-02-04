import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import EditDetails from "./EditDetails";
import MyButton from "../../util/MyButton";
import ProfileSkeleton from "../../util/ProfileSkeleton";
// MUI stuff
import Button from "@material-ui/core/Button";
import Typography from "../operations/Sequence/node_modules/@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
// Icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
//Redux
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../../redux/actions/userActions";

const styles = theme => ({
  ...theme.spreadThis,
  handle: {
    height: 20,
    backgroundColor: theme.palette.primary.main,
    width: 60,
    margin: "0 auto 7px auto"
  },
  fullLine: {
    height: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
    marginBottom: 10
  },
  halfLine: {
    height: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "50%",
    marginBottom: 10
  }
});

class Profile extends Component {
  handleImageChange = event => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  handleLogout = () => {
    this.props.logoutUser();
  };
  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, location },
        loading,
        authenticated
      }
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imageUrl} alt="profile" className="profile-image" />
            
            <hr/>
              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={this.handleImageChange}
              />
              <MyButton
                tip="Edit profile picture"
                onClick={this.handleEditPicture}
                btnClassName="button"
              >
                <EditIcon color="secondary" />
              </MyButton>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/users/${handle}`}
                color="secondary"
                variant="h5"
              >
                {handle}
              </MuiLink>
              <hr/>
              {location && (
                <Fragment>
                  <LocationOn color="secondary" /> <span>{location}</span>
                  <hr />
                </Fragment>
              )}
              
            </div>
            <MyButton tip="Logout" onClick={this.handleLogout}>
              <ExitToAppIcon color="secondary" />
            </MyButton>
            <EditDetails />
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No profile found, please login again
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <ProfileSkeleton />
    );

    return profileMarkup;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
