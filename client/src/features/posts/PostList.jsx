import React, { useState, useEffect }from "react"
import { API_URL } from "../../constants"
import { Link } from "react-router-dom";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  useEffect(()=>{
    async function loadPosts() {
      try {
        const response = await fetch(API_URL); 
        if(response.ok) {
          const json = await response.json();
          setPosts(json);
        }
        else {
          throw response;
        }
      } catch (error) {
        setError("An error occured. Awkward...");
        console.log("An error occured: ", error);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, [])

  const deletePost = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if(response.ok) {
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        throw response
      }
    } catch (error) {
      console.log("an error occured:", error);
    }
  }

  return (
    <>
      <div className="post-container">
        {posts.map((post) => {
          return (
            <div key={post.id} className="post-wrap">
              <h2>
                <Link to={`/posts/${post.id}`}  className="title">
                  {post.title}
                </Link>
              </h2>
              <div className="post-links">
                <Link to={`/posts/${post.id}/edit`} >Edit</Link>
                {" | "}
                <button onClick={() => deletePost(post.id)}>Delete</button>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )

}

export default PostList

