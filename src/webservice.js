export default {
	getData: function(url){
		return new Promise(function(resolve, reject){
			let req = new XMLHttpRequest();
			req.onload = () => {
				resolve(req.response);
			}
			req.onerror = () => {
				reject(req.status);
			}
			req.open("GET", url, true);
			req.responseType = "json";
			req.send();
		})
	},
	postData: function(url, data){
		return new Promise(function(resolve, reject){
			let req = new XMLHttpRequest();
			req.onload = () => {
				resolve(req.response);
			}
			req.onerror = () => {
				reject(req.status);
			}
			req.open("POST", url, true);
			req.responseType = "json";
			req.setRequestHeader("Content-Type","application/json");
			req.send(data);
		})
	}
}