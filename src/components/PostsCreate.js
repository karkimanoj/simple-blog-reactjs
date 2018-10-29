import React, {Component, Fragment} from 'react';

import PostForm from './PostForm';



class PostsCreate extends Component {
	render () {

		return (
			<Fragment>
				<h1 className='mt-3'> <center>Post form</center></h1>
				<PostForm history={this.props.history}/>				
			</Fragment>
		);
	}
}

export default PostsCreate;