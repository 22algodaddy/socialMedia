import './rightbar.css'
import {useContext, useEffect, useState} from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import Online from "../Online/online.js"
import {Users} from "../../dummyData.js"
import {AuthContext} from "../../contextApi/AuthContext";
import {AiOutlineUserAdd} from 'react-icons/ai'
import {RiUserUnfollowLine} from "react-icons/ri"
export default function Rightbar({user}){
  const PF =process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends,setFriends] = useState([]);
  const {user:currentUser,dispatch} = useContext(AuthContext);
  {/*user:currentUser means use or (import) user object in AuthContext as currentUser*/}
  const [followed,setFollowed] = useState(currentUser.following.includes(user?.id));
  console.log(followed);
  console.log(user,currentUser)
  useEffect(()=>{
    const getFriends = async () =>{
      try{
        const friendList = await axios.get("/user/friend/"+ user._id);
        setFriends(friendList.data);
      }
      catch(e){
        console.log(e)
      }
    };
    getFriends();
      },[user]);

  // useEffect(() =>{
  //   setFollowed(currentUser.following.includes(user?._id));
  // },[currentUser,user._id])

  const handleClick = async() => {

    try{
      if(followed){

        await axios.put(`/user/${user._id}/unfollow`,{
          userId : currentUser._id,
        });
        dispatch({type:"UNFOLLOW", payload:user._id})
      }
      else{
        await axios.put(`/user/${user._id}/follow`,{
          userId : currentUser._id,
        });
        dispatch({type:"FOLLOW", payload:user._id})
      }

    }
     catch(error){
      console.log(error);
     }
    setFollowed(!followed);
  }
  const HomeRightBar=()  => {
    return(
      <>
        <div className='birthdayContainer'>
          <img className="birthdayImg" src='Assets/gigt.jpg' alt=" "/>
          <span className="birthdayText">
                <b>John Doe</b> and <b>3 other friends</b> have their birthday
              </span>
        </div>
        <img className="randomImg" src='Assets/Ad.jpg' alt=" " />
        <h4 className="rightBarTitle">Online Friends</h4>
        <ul className="rightBarFriendList">
          {Users.map((eachUser)=>
            ( <Online key={eachUser.id} user={eachUser}></Online>)
          )}
        </ul>
      </>
    )
  };

  const ProfileRightBar= () => {

    return(
      <>
        {user.username !== currentUser.username && (
          <button className="rightBarFollowButton" onClick={handleClick}>
            {followed ? "unfollow" : "follow"}
            {followed ? <RiUserUnfollowLine/> : <AiOutlineUserAdd />}

          </button>
        )}
        <h4 className="rightBarProfileTitle">User Information</h4>
        <div className="rightBarInfo">
          <div className="rightBarInfoItem">
            <span className="rightBarInfoKey">College:</span>
            <span className="rightBarInfoValue">{user.college}</span>
          </div>
          <div className="rightBarInfoItem">
            <span className="rightBarInfoKey">Branch:</span>
            <span className="rightBarInfoValue">{user.branch}</span>
          </div>
          <div className="rightBarInfoItem">
            <span className="rightBarInfoKey">From:</span>
            <span className="rightBarInfoValue">{user.from}</span>
          </div>
        </div>
        <h4 className="rightBarProfileTitle">User Friends</h4>
        <div className="rightBarFollowings">
          {friends.map((friend) => (
            <Link to={"/profile/"+friend.username} style={{textDecoration:"none"}}>
          <div className="rightBarFollowing">
            <img
              className="rightBarFollowingImg"
              src={friend.profilePicture ? PF+ friend.profilePicture : PF+"noAvatar.png" }
              alt=" "  />
            <span className="rightBarFollowingName">{friend.username}</span>
          </div>
            </Link>
          ))}
        </div>
      </>
    )
  };
  return(<div className='rightBar'>
          <div className="rightBarWrapper">
            { user ? <ProfileRightBar /> : <HomeRightBar/> }
          </div>
         </div>
  )
}
