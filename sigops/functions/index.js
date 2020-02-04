const functions = require('firebase-functions');

const app = require("express")();
const FBAuth = require("./util/fbAuth");

const cors = require("cors");

app.use(cors());

const { db } = require("./util/admin");

const {
  getAllSequences,
  postOneSequence,
  getSequence,
  updateSequence
} = require("./handlers/Sequence");

const {
  getAllProjects,
  postOneProject,
  getProject
} = require("./handlers/projects");

const {
  getAllOperations,
  OperationOnProject,
  deleteOperation,
  getOperation,
  OperationOnOperation,
  uploadDocument,
  getDocuments
} = require("./handlers/operation");

const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
  getUserDetails
} = require("./handlers/users");

// Project Routes

app.get("/Projects", FBAuth, getAllProjects);
app.get("/Project/:ProjectId", getProject);
app.post("/Project", FBAuth, postOneProject);

app.post("/Project/:ProjectId/Operation", OperationOnProject);

// Sequence Routes

app.get("/Sequences", getAllSequences);
app.post("/Sequence", postOneSequence);

app.post("/updateSequence/:SequenceId", updateSequence);
app.get("/Sequence/:SequenceId", getSequence);

// Operations Routes

app.get("/Operations", getAllOperations);
app.post("/Operation/Upload/:OperationId", uploadDocument);
app.get("/Operation/GetDocuments/:OperationId", getDocuments);

app.get("/Operation/:OperationId", getOperation);
app.post("/Operation/:OperationId/Sequence", SequenceOnOperation);

app.delete("/Operation/:OperationId", FBAuth, deleteOperation); //security settings are messing this up and I will update it later.

// user route
app.post("/user", FBAuth, addUserDetails);
app.post("/user/image", FBAuth, uploadImage);
app.post("/signup", signup);
app.post("/login", login);
app.get("/user",FBAuth, getAuthenticatedUser);
app.get("/user/:handle", getUserDetails);

// cloud functions are better than firebase library because of load time.

exports.api = functions.https.onRequest(app);