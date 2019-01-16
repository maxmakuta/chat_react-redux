import React from "react";
import Rooms from "./rooms";
import Messages from "./messages";
import PostMessage from "./postmsg";

import "./style.css";


export default class Chats extends React.Component {
	constructor(){
		super();
		this.state = {

		}
		

	}

	render(){
		return (
				<div className="container">
					<div className="col-xs-12 col-md-4 col-md-offset-4">
						<Rooms />
						<Messages />
						<PostMessage />
					</div>				
				</div>

		)
	}
};



