export default function(state = null, action){

	switch(action.type){
		case "SET_ID":
		return action.payload;
	}

	return state
};