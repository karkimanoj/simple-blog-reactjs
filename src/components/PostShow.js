import React, {Component} from 'react';
import { fetchPost, deletePost } from '../actions';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

class PostShow extends Component {
	
	componentDidMount () {
		/*if this post is already in posts state, then no need to fetch and add the post 
			like when navigating to show post from PostsIndex*/
		if(!this.props.post) {
			const {id} = this.props.match.params; 
			this.props.fetchPost(id);
		}		
	}

	onDelete () {
		const {id} = this.props.match.params; 

		this.props.deletePost(id, () => {
			this.props.history.push('/');
		});
	}

	render () {

		if(!this.props.post) return <div className='loadingSpinner'> </div>

		const {title, categories, content} = this.props.post;
		return (
			<div className='row'>
				<div className='col-md-8 offset-md-2'>
					<div className='text-right mt-4'> 
						<Link className=' btn btn-link mr-3' to='/'> Go to all Posts </Link>
						<button className="btn btn-danger" onClick={ this.onDelete.bind(this) }>
							Delete Post </button>
					</div>
					<div className="card mt-4" >
					  	<div className="card-body">
						    <h3 className="card-title">{title}</h3>
						    <h4 className="card-subtitle mb-2 text-muted">{categories}</h4>
						    <p className="card-text">{content}</p>
					  	</div>
					</div>
				</div>
			</div>
		);
	}
}
//export default PostShow;

const mapStateToProps = ({posts}, ownProps) => {
	return {post : posts[ownProps.match.params.id] }
};

export default connect(mapStateToProps, {fetchPost, deletePost}) (PostShow); 