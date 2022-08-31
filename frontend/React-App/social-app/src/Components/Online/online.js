import "./online.css"
const PF =process.env.REACT_APP_PUBLIC_FOLDER
export default function Online({user}){
  return(
    <li>
      <div className="rightBarFriend">
        <dciv className="rightBarProfileImgContainer">
        <img className="rightBarProfileImg" src={PF+user.profilePicture} alt=" " />
         <span className="rightBarOnline"></span>
      </dciv>
        </div>
      <span className="rightBarUserName">{user.username}</span>
    </li>
  )
}
