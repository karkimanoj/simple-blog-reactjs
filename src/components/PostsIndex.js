import React, {Component} from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import { Link } from 'react-router-dom';


class PostsIndex extends Component {
	
	componentDidMount () {
		this.props.fetchPosts();
	}
	
	renderList() {
		return _.map(this.props.posts, post => {
			return (
				<div key={post.id} className="card mt-3">
				  	<div className="card-body">
				    	<h5 className="card-title">
				    		<Link to={`/posts/${post.id}`} >{post.title} </Link> 
				    	</h5>
				    	<p className="card-text">{post.content}</p>
					</div>
				</div>
			);
		});
	}

	render () {
		return ( 
			<React.Fragment>
			
				<div className='row mt-3'>
					<div className='col-md-8 offset-md-2'>
						<div className='text-right'>
							<Link className='btn btn-primary' to='/posts/create'>
								create new post
							</Link>
						</div>	
						{ this.renderList() }
					</div>
				</div>
			</React.Fragment>
			
		);
	}
}

const mapStateToProps = state => ({posts : state.posts}) ;

export default connect (mapStateToProps, {fetchPosts : fetchPosts}) (PostsIndex);
//here {fetchPosts : fetchPosts} is equal to making function mapDispatchToProps