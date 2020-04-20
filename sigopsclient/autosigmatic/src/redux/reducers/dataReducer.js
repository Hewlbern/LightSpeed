import {
	SET_PROJECTS,
	LOADING_DATA,
	DELETE_PROJECT,
	POST_PROJECT,
	SET_PROJECT,
	SET_OPERATIONS,
	SET_OPERATION,
	DELETE_OPERATION,
	POST_OPERATION,
	SUBMIT_COMMENT,
	SET_WORKFLOWS,
	SET_WORKFLOW,
	GET_OPERATION_FILES
} from '../types';

const initialStateProject = {
	Projects: [],
	Project: {},
	Operations: [],
	Operation: {},
	OperationFiles: {},
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
		case SET_OPERATIONS:
			return {
				...state,
				Operations: action.payload,
				loading: false
			};
		case SET_OPERATION:
			return {
				...state,
				Operation: action.payload
			};
		case POST_OPERATION:
			return {
				...state,
				Operations: [ action.payload, ...state.Operations ]
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
		case GET_OPERATION_FILES:
			return {
				...state,
				loading: false,
				OperationFiles: {
					...state.OperationFiles,
					[action.payload.OperationId]: action.payload.files.data
				}
			};
		default:
			return state;
	}
}
