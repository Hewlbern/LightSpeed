import {
	SET_PROJECTS,
	LOADING_DATA,
	DELETE_PROJECT,
	POST_PROJECT,
	SET_PROJECT,
	SET_CLAIMS,
	SET_CLAIM,
	DELETE_CLAIM,
	POST_CLAIM,
	SUBMIT_COMMENT,
	SET_WORKFLOWS,
	SET_WORKFLOW,
	GET_CLAIM_FILES
} from '../types';

const initialStateProject = {
	Projects: [],
	Project: {},
	Claims: [],
	Claim: {},
	ClaimFiles: {},
	Workflows: {},
	Workflow: {},
	loading: false
};

export default function(state = initialStateProject, action) {
	switch (action.type) {
		case LOADING_DATA:
			return {
				...state,
				loading: true
			};
		case SET_PROJECTS:
			return {
				...state,
				Projects: action.payload,
				loading: false
			};
		case SET_PROJECT:
			return {
				...state,
				Project: action.payload
			};
		case POST_PROJECT:
			return {
				...state,
				Projects: [ action.payload, ...state.Projects ]
			};
		case SET_CLAIMS:
			return {
				...state,
				Claims: action.payload,
				loading: false
			};
		case SET_CLAIM:
			return {
				...state,
				Claim: action.payload
			};
		case POST_CLAIM:
			return {
				...state,
				Claims: [ action.payload, ...state.Claims ]
			};
		case SET_WORKFLOWS:
			return {
				...state,
				Workflows: action.payload,
				loading: false
			};
		case SET_WORKFLOW:
			return {
				...state,
				Workflow: action.payload
			};
		case GET_CLAIM_FILES:
			return {
				...state,
				loading: false,
				ClaimFiles: {
					...state.ClaimFiles,
					[action.payload.claimId]: action.payload.files.data
				}
			};
		default:
			return state;
	}
}
