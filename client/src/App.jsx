import { useState } from 'react'
import PostList from "./features/posts/PostList.jsx" 
import './App.css'

function App() {

  return (
    <>
      <div className='app'>
        <h1>React on Rails Blog</h1>
        <p>Find this application layout in client/src/App.jsx</p>
        <PostList />
      </div>
    </>
  )
}

export default App