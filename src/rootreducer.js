import { combineReducers } from "redux";
import roomsReducer from "./reducers/roomsreducer";
import msgReducer from "./reducers/msgreducer";
import idReducer from "./reducers/idreducer";

let rootReducer = combineReducers({
	rooms: roomsReducer,
	messages: msgReducer,
	currentRoomId: idReducer,
});

export default rootReducer;