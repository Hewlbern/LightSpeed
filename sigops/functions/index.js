const functions = require('firebase-functions');

const app = require("express")();
const FBAuth = require("./util/fbAuth");

const cors = require("cors");

app.use(cors());

const { db } = require("./util/admin");

const {
  getAllWorkflows,
  postOneWorkflow,
  getWorkflow,
  updateWorkflow
} = require("./handlers/workflow");

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
  WorkflowOnOperation,
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

// Project Routes - works

app.get("/Projects", FBAuth, getAllProjects);

app.get("/Project/:ProjectId", getProject);

app.post("/Project", FBAuth, postOneProject);
//operations on project works
app.post("/Project/:ProjectId/Operation", OperationOnProject);

// Workflow Routes

app.get("/Workflows", getAllWorkflows);
app.post("/Workflow", postOneWorkflow);

app.post("/updateWorkflow/:WorkflowId", updateWorkflow);
app.get("/Workflow/:WorkflowId", getWorkflow);

// Operations Routes

app.get("/Operations", getAllOperations);
app.post("/Operation/Upload/:OperationId", uploadDocument);
app.get("/Operation/GetDocuments/:OperationId", getDocuments);

app.get("/Operation/:OperationId", getOperation);
//post works
app.post("/Operation/:OperationId/Workflow", WorkflowOnOperation);

app.delete("/Operation/:OperationId", FBAuth, deleteOperation); //security settings are messing this up and I will update it later.

// user route - works
app.post("/user", FBAuth, addUserDetails);
app.post("/user/image", FBAuth, uploadImage);
app.post("/signup", signup);
app.post("/login", login);
app.get("/user",FBAuth, getAuthenticatedUser);
app.get("/user/:handle", getUserDetails);

// cloud functions are better than firebase library because of load time.

exports.api = functions.https.onRequest(app);