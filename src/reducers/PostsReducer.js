import _ from 'lodash';
import { Fetch_Posts } from '../actions';

export default function (state ={}, action) {

	switch (action.type) {
		case Fetch_Posts :
			//console.log(action.payload);
			return _.mapKeys(action.payload.data, 'id');
		/* no case 'Create_Post' bcoz we just want to post the data and do nothing with
			the response data from request.
		*/	
		case 'Fetch_Post' :
			//adding single fetched post with key as id to posts state
			return { ...state, [action.payload.data.id] : action.payload.data };
		case 'Delete_Post' :
		/* if net is slow the  post index data through redirecting in callback
		takes time updating posts in reduce so in mean time delete the post from local memory also.
		so basiclly no need to do this, but good practice	*/
			return _.omit(state, action.payload);	
		default:
			return state;
	}
}