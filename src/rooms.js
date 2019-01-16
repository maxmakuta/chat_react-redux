import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllRooms, getMessages, setRoomId } from "./actions";


class Rooms extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		}

	}

	componentDidMount(){
		this.props.getAllRooms();
	}

	render() {
		let roomsList;
		if(this.props.allRooms){ 
			roomsList = this.props.allRooms.map( room => {
				return (<li 
							key={room.id} 
							className="list-group-item"
							onClick={() => {
								console.log(room.id);
								this.props.getMessages(room.id);
								this.props.setRoomId(room.id);
							}}
							>
							<p className="list-group-item-text">
								{room.name}
							</p>
						</li>);
			} )
		}

		return (
				<ul className="list-group">
					<li className="list-group-item">
						<h3 className="list-group-item-heading">Chat Rooms</h3>
					</li>
					{roomsList}
				</ul>
			)
	}
};

function mapStateToProps(state){
	return {allRooms: state.rooms}
};

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getAllRooms: getAllRooms, 
		getMessages: getMessages,
		setRoomId: setRoomId,
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
