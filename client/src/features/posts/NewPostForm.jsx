import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/postService";

function NewPostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {title, body};
    try {
      // response: json
      const response = await createPost(postData);
      console.log(response);
      navigate(`/posts/${response.id}`);
    } catch (error) {
      console.log("Failed to create post:", error);
      
    }
  };
  
  return (
    <div>
      <h2>Create new post</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="titleInput">Title</label>
            <input 
              id="titleInput"
              type="text" 
              value={title}
              onChange={(e)=> setTitle(e.target.value) }
              required
            />
          </div>
          <div>
            <label htmlFor="bodyInput">Body:</label>
            <textarea 
              id="bodyInput"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit">Create Post</button>
          </div>
        </form>
    </div>
  )
}

export default NewPostForm;