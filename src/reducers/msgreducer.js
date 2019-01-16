export default function(state = null, action){
	switch (action.type){
		case "MSGS":
		return action.payload;
	}
	return state
};