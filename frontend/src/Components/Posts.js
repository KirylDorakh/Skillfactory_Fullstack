import React, {Component} from "react";
import PostService from "./PostService";

const postService = new PostService();

export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            inputValue: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    getData(){
        postService.getPost().then(result => {
            this.setState({data: result.data})
        })
    }

    componentDidMount(){
        this.getData()
    }

    handleChange(e) {
        this.setState({inputValue: e.target.value})
    }

    handleSubmit(e){
        postService.createPost({'text': this.state.inputValue})
        this.getData()
        this.setState({inputValue: ''})
    }

    setLike(post){
        postService.setLikePost(post.id)
        post.likesCount += 1
        this.forceUpdate()
    }

    render(){
        return (
            <div id='posts'>
                {this.state.data.map(post =>
                    <div id={'post_' + post.id}>
                        <p>{post.text}</p>
                        <button onClick={() => this.setLike(post)}> {post.likesCount} </button>
                        <p>Date: {post.date}</p>
                    </div>
                )}
                <input type='text' onChange={this.handleChange} value={this.state.inputValue}></input>
                <button onClick={this.handleSubmit}>Send</button>
            </div>
        )
    }


}