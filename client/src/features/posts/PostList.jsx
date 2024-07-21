import React, { useState, useEffect }from "react"
import { API_URL } from "../../constants"

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

  return (
    <>
      <div className="post-container">
        {posts.map((post) => {
          return (
            <div key={post.id} className="post-wrap">
              <h2 className="title">{post.title}</h2>
              <p className="body">{post.body}</p>
            </div>
          )
        })}
      </div>
    </>
  )

}

export default PostList

