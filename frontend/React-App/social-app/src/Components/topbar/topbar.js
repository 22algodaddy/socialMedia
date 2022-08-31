import './topbar.css'
import {VscSearch} from 'react-icons/vsc'
import {BsFillPersonFill, BsFillChatSquareDotsFill} from 'react-icons/bs'
import {MdOutlineNotificationAdd} from 'react-icons/md'
import {Link} from "react-router-dom"
import {useContext} from "react"
import {AuthContext} from "../../contextApi/AuthContext";
const PF =process.env.REACT_APP_PUBLIC_FOLDER
export default function Topbar(){

  const {user} =useContext(AuthContext)

  return(<div className="topbarContainer">
    <div className="topbarLeft">
      <Link to="/" style={{textDecoration:"none"}}>
      <span className="logo">TappApp</span>
      </Link>
    </div>
    <div className="topbarCentre">
      <div className="searchBar">
        <VscSearch className="searchIcon" />
        <input placeholder="Search your friends here" className="searchInput" />
      </div>
    </div>
    <div className="topbarRight">
      <div className="topbarLinks">
       <span className="topbarLink">Homepage</span>
        <span className="topbarLink">Timeline</span>
      </div>
      <div className="topbarIcons">
        <div className="topbarIconItem">
          <BsFillPersonFill />
          <span className="topbarIconBadge">1</span>
        </div>
        <div className="topbarIconItem">
          <BsFillChatSquareDotsFill />
          <span className="topbarIconBadge">2</span>
        </div>
        <div className="topbarIconItem">
          <MdOutlineNotificationAdd />
          <span className="topbarIconBadge">3</span>
        </div>
      </div>
      <Link to={`/profile/${user.username}`}>
      <img src={
                 user.profilePicture ?PF+user.profilePicture:PF+"Photo/profileNoAvatar.png"
              }
           alt= "" className="topbarImg" />
    </Link>
    </div>
  </div>)
 }
