export default function(state = null, action){

	console.log(action);

	switch(action.type){
		case "ALL_ROOMS":
		return action.payload.chats	;
	}

	return state
};


