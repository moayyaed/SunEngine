export default function(state) {
	return function(name) {
		if (!name) return null;
		return state.sectionsTypes[name.toLowerCase()];
	};
}
