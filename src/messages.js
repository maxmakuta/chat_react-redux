import React from "react";
import { connect } from "react-redux";

class Messages extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			
		}
	}


	render() {

		let messages = (<li className="list-group-item">Nothing selected!</li>);

		if(this.props.messages){
			messages = this.props.messages.map( (msg, index) => {
				return (
					<li key={index} className="list-group-item">
						<p className="list-group-item-text">{msg.text}</p>
					</li>
				)})
		}


		return (
				<ul className="list-group">
					<li className="list-group-item">
						<h3 className="list-group-item-heading">Messages:</h3>
					</li>
					{messages}
				</ul>
			)
	}
};

function mapStateToProps(state){
	return {messages: state.messages}
}

export default connect(mapStateToProps)(Messages)

