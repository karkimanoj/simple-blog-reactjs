import axios from 'axios';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=TIRTHA10';

export const Fetch_Posts = 'Fetch_Posts';

export function fetchPosts () {
	
	/* data structure received from axios.get
	const request = {data : [
		{ id : "5", title : "first-post", content : "ffffff", categories : "ggggggg"},
		{ id : "7", title : "second-post", content : "hhhhhhh", categories : "iiiiiiiii"}
	]};  */
	return (dispatch, getState) => {
		axios.get(`${ROOT_URL}/posts${API_KEY}`)
			.then( response => {
				dispatch( {
					type : Fetch_Posts,
					payload : response
				});
				
			});
	}
}

export function fetchPost (id){
 
	return dispatch => {
		axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`)
			.then( response => {
				dispatch({
					type : 'Fetch_Post',
					payload : response
				});
			});
	};
}

export function createPost (values, successCallback, failureCallback) {
	
	return dispatch => {
		axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
			.then( response => {
				dispatch({
					type : 'Create_Post',
					payload : response
				});
			})
			.then( () => { successCallback(); } )
			.catch( (errors) => {
				//failure callback is for alerting errors 
				failureCallback(errors);
			});
	} 



}

export function deletePost (id, callback) {


	return dispatch => {
		axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
			.then( () => {
				dispatch({
				type : 'Delete_Post',
				payload : id
				});
			}).then( () => callback());
	}; 
}

/*whole above code without redux-thunk

import axios from 'axios';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=TIRTHA10';

export const Fetch_Posts = 'Fetch_Posts';

export function fetchPosts () {
	
	const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
	
	
	return {
		type : Fetch_Posts,
		payload : request
	};
}

export function fetchPost (id){
	const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

	return {
		type : 'Fetch_Post',
		payload : request
	};
}

export function createPost (values, callback) {
	const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
		.then( () =>  callback()  );

	return {
		type : 'Create_Post',
		payload : request
	};

}

export function deletePost (id, callback) {
	axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`).then( () => callback() );

	return {
		type : 'Delete_Post',
		payload : id
	};
}
*/