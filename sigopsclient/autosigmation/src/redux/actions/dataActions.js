import {
	SET_PROJECTS,
	LOADING_DATA,
	SET_CLAIMS,
	SET_CLAIM,
	DELETE_CLAIM,
	POST_CLAIM,
	POST_PROJECT,
	SET_ERRORS,
	CLEAR_ERRORS,
	LOADING_UI,
	STOP_LOADING_UI,
	SUBMIT_COMMENT,
	SET_WORKFLOW,
	SET_WORKFLOWS,
	GET_CLAIM_FILES
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

// Get all CLAIMS
export const getClaims = () => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	axios
		.get('/Claims')
		.then((res) => {
			dispatch({
				type: SET_CLAIMS,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: SET_CLAIMS,
				payload: []
			});
		});
};

export const getClaimFiles = (claimId) => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	axios
		.get(`/Claim/GetDocuments/${claimId}`)
		.then((res) =>
			dispatch({
				type: GET_CLAIM_FILES,
				payload: {
          claimId,
          files: res.data
        }
			})
		)
		.catch((err) => ({
			type: GET_CLAIM_FILES,
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

// Post a Claim

export const postClaim = (newClaim) => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	axios
		.post('/Claim', newClaim)
		.then((res) => {
			dispatch({
				type: POST_CLAIM,
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

export const uploadClaimDoc = (claimId, formData) => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	axios.post(`/Claim/Upload/${claimId}`, formData).catch((err) => console.log(err));
};

export const clearErrors = () => (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
