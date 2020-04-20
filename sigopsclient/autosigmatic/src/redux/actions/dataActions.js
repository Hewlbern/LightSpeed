import {
	SET_PROJECTS,
	LOADING_DATA,
	SET_OPERATIONS,
	SET_OPERATION,
	DELETE_OPERATION,
	POST_OPERATION,
	POST_PROJECT,
	SET_ERRORS,
	CLEAR_ERRORS,
	LOADING_UI,
	STOP_LOADING_UI,
	SUBMIT_COMMENT,
	SET_WORKFLOW,
	SET_WORKFLOWS,
	GET_OPERATION_FILES
} from '../types';
import axios from 'axios';

// Get all Projects
export const getProjects = () => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	axios
		.get('/Projects')
		.then((res) => {
			dispatch({
				type: SET_PROJECTS,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: SET_PROJECTS,
				payload: []
			});
		});
};

// Post a Project

export const postProject = (newProject) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	axios
		.post('/Project', newProject)
		.then((res) => {
			dispatch({
				type: POST_PROJECT,
				payload: res.data
			});
			dispatch(clearErrors());
		})
		.catch((err) => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			});
		});
};

// Get all OPERATIONS
export const getOperations = () => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	axios
		.get('/Operations')
		.then((res) => {
			dispatch({
				type: SET_OPERATIONS,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: SET_OPERATIONS,
				payload: []
			});
		});
};

export const getOperationFiles = (OperationId) => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	axios
		.get(`/Operation/GetDocuments/${OperationId}`)
		.then((res) =>
			dispatch({
				type: GET_OPERATION_FILES,
				payload: {
          OperationId,
          files: res.data
        }
			})
		)
		.catch((err) => ({
			type: GET_OPERATION_FILES,
			payload: []
		}));
};

export const editWorkflow = (workflowDetails) => (dispatch) => {
	dispatch({ type: SET_WORKFLOW });
	axios.post('/updateWorkflow', workflowDetails).catch((err) => console.log(err));
};

// Get Workflow
export const getWorkflow = (WorkflowId) => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	axios
		.get(`/Workflow/${WorkflowId}`)
		.then((res) => {
			dispatch({
				type: SET_WORKFLOW,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: SET_WORKFLOW,
				payload: []
			});
		});
};

// Get all WORKFLOWS
export const getWorkflows = () => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	axios
		.get('/Workflows')
		.then((res) => {
			dispatch({
				type: SET_WORKFLOWS,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: SET_WORKFLOWS,
				payload: []
			});
		});
};

// Post a Operation

export const postOperation = (newOperation) => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	axios
		.post('/Operation', newOperation)
		.then((res) => {
			dispatch({
				type: POST_OPERATION,
				payload: res.data
			});
			dispatch(clearErrors());
		})
		.catch((err) => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			});
		});
};

export const uploadOperationDoc = (claimId, formData) => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	axios.post(`/Operation/Upload/${claimId}`, formData).catch((err) => console.log(err));
};

export const clearErrors = () => (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
