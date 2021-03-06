import { InitializeState } from "storeInd";

export function isInitialized(state) {
	return state.initializeState === InitializeState.Done;
}

export function initializeError(state) {
	return state.initializeState === InitializeState.Error;
}
