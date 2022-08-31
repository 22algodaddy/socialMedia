import  "./profile.css"
import Topbar from "../../Components/topbar/topbar";
import Sidebar from "../../Components/sidebar/sidebar";
import Feed from "../../Components/feed/feed";
import Rightbar from "../../Components/rightbar/rightbar";
import {useEffect, useState} from "react";
import {useParams} from "react-router"
import axios from "axios";
export default function Profile(){
  const PF =process.env.REACT_APP_PUBLIC_FOLDER;
  const [user,setUser]=useState({})
  const username=useParams().username;
  useEffect(()=>{
    const fetchUser= async()=>
    {
      const res= await axios.get(`/user?username=${username}`)
      setUser(res.data)
    }
    fetchUser();
  },[username]);

  return(<>
      <Topbar />
  <div className='profile'>
    <Sidebar/>
    <div className="profileRight">
      <div className="profileRightTop">
        <div className="profileCover">
          <img src={user.coverPicture || "Assets/Post/noCover.jpg"} alt=" "  className="profileCoverImg"/>
          <img src={user.profilePicture || "Assets/Photo/person5.jpg"} alt=" " className="profileUserImg"/>
        </div>
        <div className="profileInfo">
          <h4 className="profileInfoName">{user.username}</h4>
          <span className="profileInfoDesc">{user.desc}</span>
        </div>
      </div>
      <div className="profileRightBottom">
         <Feed username={username}/>
         <Rightbar user={user}/> {/*use to check whether Rightbar is on the Profile Page or Home Page we are not sending profile prop if rightbar is on Home Page*/}
      </div>
    </div>
  </div>
   </>
  )
};
