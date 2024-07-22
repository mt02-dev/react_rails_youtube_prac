import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../constants";

function EditPostForm(){
  const [post, setPost] = useState(null);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  const {id} = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    
    const fetchCurrentPost = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if(response.ok) {
          const json = await response.json();
          setPost(json);
        } else {
          console.log('hoge');
          throw response
        }
      } catch (error) {
        console.log("an error occured:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCurrentPost();
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: post.title,
          body: post.body
        })
      })
      if(response.ok){
        const json = await response.json();
        console.log("Success:", json);
        navigate(`/posts/${id}`);
      } else {
        throw response;
      }
    } catch (error) {
      console.log("An error occured") 
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
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  )
}

export default EditPostForm;