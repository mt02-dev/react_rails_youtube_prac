import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPost, updatePost } from "../../services/postService";

function EditPostForm(){
  const [post, setPost] = useState(null);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  const {id} = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    
    const fetchCurrentPost = async () => {
      try {
        const json = await fetchPost(id);
        setPost(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCurrentPost();
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
      title: post.title,
      body: post.body
    }
    try {
      const response = await updatePost(id, updateData); 
      navigate(`/posts/${response.id}`);
    } catch (error) {
      setError(error)
    }
  }
  if (!post) return <h2>Loading...</h2>;
  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titleInput">Title</label>
          <input
            type="text"
            id="titleInput"
            value={post.title}
            onChange={(e) => setPost({...post, title: e.target.value})}
          />
        </div>
        <div>
          <label htmlFor="bodyInput">Body:</label>
          <textarea
            id="bodyInput"
            value={post.body}
            onChange={(e) => setPost({...post, body: e.target.value})}
          />
        </div>
        <div>
          <button type="submit" >Save</button>
        </div>
      </form>
    </div>
  )
}

export default EditPostForm;