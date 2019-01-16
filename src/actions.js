import webService from "./webservice";

export function getAllRooms(){ 

	let promiseOnHold = webService.getData("http://localhost:6060/api")
	

	return {
		type: "ALL_ROOMS",
		payload: promiseOnHold,
	}
};

export function getMessages(roomId){ 

	return function(dispatch){
		webService.getData(`http://localhost:6060/api/${roomId}/messages`)
		.then( msgs => {
			dispatch({
				type: "MSGS",
				payload: msgs,
			});
		} )
	}
};

export function setRoomId(roomId){
	return {
		type: "SET_ID",
		payload: roomId,
	}
};

export function postMessage(text, userId, roomId){

	return function(dispatch){

		let postObj = {
			text: text,
			userId: userId,
			roomId: roomId,
		};

		webService.postData("http://localhost:6060/api/addmessage", JSON.stringify(postObj))
		.then( () => {
				webService.getData(`http://localhost:6060/api/${roomId}/messages`)
				.then( messages => {
					dispatch({
						type: "MSGS",
						payload: messages,
					});
				})
				
			}, err => console.log(err) );
	}

}


