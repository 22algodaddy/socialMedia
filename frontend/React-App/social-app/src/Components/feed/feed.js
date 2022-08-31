import './feed.css'
import {useState,useEffect,useContext} from "react"
import Post from "../post/post.js"
import Share from "../share/share.js"
import axios from "axios"
import {AuthContext} from "../../contextApi/AuthContext";
export default function Feed({username}){
  const [posts,setPosts]=useState([])
  const {user} =useContext(AuthContext)

  useEffect(()=>{
    const fetchPosts= async()=>{
      const res= username
        ? await axios.get("/post/profile/"+username)
        : await axios.get("post/timeline/"+user._id);
      setPosts(
        res.data.sort((post1,post2)=>{
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
      );
    };
    fetchPosts();
  },[username,user._id])
  return(
    <div className="feed">
     <div className="feedWrapper">

       { (!username || username === user.username) && <Share /> }
       {posts.map((post)=>(
         <Post key={post._id} post={post}></Post>
       ))}
     </div>
    </div>


    )
}
