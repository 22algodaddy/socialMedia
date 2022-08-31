import './post.css'
import {AuthContext} from "../../contextApi/AuthContext";
import {Link} from "react-router-dom"
import {useState} from 'react'
import {BiDotsVertical} from 'react-icons/bi'
import {useEffect,useContext} from "react";
import axios from "axios";
import {format} from "timeago.js"; {/*For updating time of post*/}
const PF = process.env.REACT_APP_PUBLIC_FOLDER
export default function Post({post})

{
  const [like,setLike]=useState(post.likes.length)
  const [isLiked,setIsLiked]=useState(false) //intially post is not liked
  const [User,setUser]=useState({})
  const {user:currentUser}=useContext(AuthContext)
  {/*currentUser is used as nickaname of "user" variable*/}
  useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id))
  },[currentUser._id,post.likes])
  useEffect(()=>{
    const fetchUser= async()=>
    {
      const res= await axios.get(`/user?userId=${post.userId}`)
      setUser(res.data)
    }
    fetchUser();
  },[post.userId]);{/*Passed post.userId as dependency because useEffect re-renders itself when post.userId changes*/}
  const likeHandler= () =>{
    try{
      axios.put("/post/"+post._id+"/like",{userId:currentUser._id})
    }
     catch(err){}
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }
  return(
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
        <div className="postTopLeft">
          <Link to={`/profile/${User.username}`}>
          <img src={User.profilePicture || "/profile/Assets/noAvatar.jpg"}  alt=" " className="postProfileImg" />
          </Link>
          <span className="postUserName">{User.username}</span>
          <span className="postDate">{format(post.createdAt)}</span>
        </div>
        <div className="postTopRight">
          <BiDotsVertical />
        </div>
        </div>
        <div className="postCentre">
          <span className="postText">{post.desc}</span>
          <img className="postImg" src={PF+post.img} alt=" "/>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="postIcon" src="/Assets/heart.png" alt=" " onClick={likeHandler} />
            <img className="postIcon" src="/Assets/like.png" alt=" "  onClick={likeHandler} />
            <span className="postLikeCounter">{like} People Liked it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} Comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}
