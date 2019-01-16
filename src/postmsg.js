import React from "react";
import { postMessage, getMessages } from "./actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class PostMsg extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			text: "",
		}
		this.setText = this.setText.bind(this);
		this.sendData = this.sendData.bind(this);
	}

	setText({target:{value:text}}){
		this.setState({text});
	}

	sendData(){
		this.props.postMessage(this.state.text, 12345, this.props.roomId);
		this.setState({text: ""});
	}

	render() {


		return (
				<ul className="list-group">
					<li className="list-group-item">
						<div className="input-group">
							<input value={this.state.text} onChange={this.setText} className="form-control" type="text" />
							<span className="input-group-btn">
								<button
									className="btn btn-default"
									onClick={this.sendData}
									>
									Send Message
								</button>
							</span>
						</div>
					</li>
				</ul>
			)
	}
};

function mapStateToProps(state){
	return {roomId: state.currentRoomId}
};

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		postMessage: postMessage,
		getMessages: getMessages,
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostMsg);


