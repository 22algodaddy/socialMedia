import './closefriend.css'
const PF =process.env.REACT_APP_PUBLIC_FOLDER
export default function CloseFriend({user}){
  console.log(PF)
  return(
  <li className="sidebarFriend">

    <img className="sidebarfriendprofilePhoto" src={PF+user.profilePicture} alt=" "/>
    <span className="sidebarfriendName">{user.username}</span>
  </li>
)}
