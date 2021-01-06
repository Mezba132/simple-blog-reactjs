import React, { Component } from 'react';
import axios from '../../axios';
import { Link } from 'react-router-dom';
import './posts.css'
import Post from '../../components/Post/Post';

class Posts extends Component {
    
    state = {
        posts : [],
        selectedPostId : null
    }

    componentDidMount() {
        axios.get('/posts')
        .then( response => {
         const posts = response.data.slice(0, 10);
         const updatePost = posts.map(post => {
             return {
                 ...post,
                 author : 'Leo'
            }
        })
        this.setState({ posts : updatePost })}
      )
      .catch( err => console.log(err))
    }

    openPostHandler = (id) => {
        this.setState({selectedPostId : id});
    }
    
    render() {
        const posts = this.state.posts.map( 
            post => { return (
            <Link to={ '/' + post.id} key={post.id}>
                <Post 
                    title={post.title} 
                    body={post.body} 
                    author={post.author} 
                    clicked={ () => this.openPostHandler(post.id)}
                />            
            </Link>) 
        })
        
        return(
            <section className="Posts">
            {posts}
           </section>
        )
    }
}

export default Posts;