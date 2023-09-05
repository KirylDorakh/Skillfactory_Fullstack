
import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/'

class PostService{

    getPosts(){
        const url = `${API_URL}api/v1/posts/`
        return axios.get(url).then(response => response.data)
    }
    setLikePost(id){
        const url = `${API_URL}api/v1/like_post/` + id
        return axios.get(url).then(response => response.data)
    }

    createPost(text) {
        const url = `${API_URL}api/v1/posts/`;
        return axios.post(url, text);
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default PostService;