import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { createPost } from '../actions';

const PostForm = (props) => {
	
	return (
		<Formik 	
			initialValues = {{
				title : '',
				categories : '',
				content : ''
			}}
			
			onSubmit ={ (values, actions) => {
				//we dont need this redux actions for submitng post and reddirecting to post index page
				//instead we can perform same operation below in axios.post() 
				props.createPost(values, () => {
					actions.setSubmitting(false);
					props.history.push('/');
				}, /*failure callback*/ (errors) => {
					actions.setSubmitting(false);
					alert(errors); 
				});
				/*
				axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
					.then( response => {
						actions.setSubmitting(false);
						console.log(response);
						props.history.push('/');
					});
				*/
			}}

			validationSchema = { 
				Yup.object().shape({
					title : Yup.string().required('Title is required').min(3).max(254),
					categories : Yup.string().required('categories is required').min(3).max(254),
					content :Yup.string().required('content is required').min(3).max(500)
					})
			}

			render = {
				({values,errors,status,touched,handleBlur,handleChange,handleSubmit,isSubmitting}) => (
					<div className='row mt-3'>
						<form className='col-md-8 offset-md-2' onSubmit={handleSubmit}>
							<div className="form-group row" >
							    <label htmlFor="title" className="col-sm-2 col-form-label">title</label>
							    <div className="col-sm-10">
							    	<input type="text" name='title' className={`form-control ${errors.title && touched.title  && 'is-invalid'}` } id="title" 
							    	value={values.title} onChange={handleChange} onBlur={handleBlur} />
							    	{errors.title && touched.title && <span  className="form-text text-danger">
							    	{errors.title}  </span>}
							    </div>
						
							</div>
							<div className="form-group row">
							    <label htmlFor="categories" className="col-sm-2 col-form-label">categories</label>
							    <div className="col-sm-10">
							     	<input type="text" name='categories' className={`form-control ${errors.categories && touched.categories && 'is-invalid'}` } id="categories" 
							     	value={values.categories} onChange={handleChange} onBlur={handleBlur} />
							     	{errors.categories && touched.categories && <span  className="form-text text-danger">
							    	{errors.categories}  </span>}
							    </div>
							 </div>
							 <div className="form-group row">
							    <label htmlFor="content" className="col-sm-2 col-form-label">content</label>
							    <div className="col-sm-10">
							     	<textarea  name='content' rows='10' className={`form-control ${errors.content && touched.content && 'is-invalid'}` } id="content" 
							     	value={values.content} onChange={handleChange} onBlur={handleBlur} />
							     	{errors.content && touched.content && <span  className="form-text text-danger">
							    	{errors.content}  </span>}
							    </div>
							</div>
							<div className="form-group text-center">
								<button type='submit' className='btn btn-success' disabled={isSubmitting}>
									{isSubmitting ? 'Wait Plz' : 'submit'}
								 </button>
								 <Link className='btn btn-danger ml-3' to='/'> cancel </Link>
							</div>
						</form>
					</div>
				)
			}				
		/>	
	);
}

export default connect(null, {createPost})(PostForm);
/*
withFormik({
	mapPropsToValues : (props) => ({
		
	}),
	validationSchema : Yup.object().shape({
		title : Yup.string().required('Title is required').min(3).max(254),
		category : Yup.string().required('category is required').min(3).max(254),
		content :Yup.string().required('content is required').min(3).max(500)
	}),

	
}
*/