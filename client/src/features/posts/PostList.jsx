import React, { useState, useEffect }from "react"
import { Link } from "react-router-dom";
import { deletePost as deletePostService, fetchAllPost } from "../../services/postService";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  useEffect(()=>{
    async function loadPosts() {
      try {
        const data = await fetchAllPost();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      await deletePostService(id);
      setPosts(posts.filter((post) => post.id !== id));
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

