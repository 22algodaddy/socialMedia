import './share.css'
import {useContext,useRef,useState} from "react"
import {MdPermMedia} from 'react-icons/md'
import {AiFillTag} from 'react-icons/ai'
import {BiMap} from 'react-icons/bi'
import {GiCancel} from 'react-icons/gi'
import {BsFillEmojiLaughingFill} from 'react-icons/bs'
import {AuthContext} from "../../contextApi/AuthContext";
import axios from "axios"
const PF =process.env.REACT_APP_PUBLIC_FOLDER
 export default function Share(){
   const {user} = useContext(AuthContext)
   const desc = useRef();
   const [file,setFile]= useState(null);
   const submitHandler = async (e) => {
      e.preventDefault();
     const newPost= {
       userId: user._id,
       desc: desc.current.value
     };
     if(file){
       const data = new FormData();
        const fileName = Date.now() + file.name;
       data.append("name",fileName);
       data.append("file",file);
       newPost.img = fileName;
       console.log(data);
       {/*post model has img: prop that why we added newPost.img*/}
       try{

         await axios.post("/api/upload",data);
       }
        catch(err){
         console.log(err);
        }
     }
     try{
       console.log(newPost);
      await axios.post("/post",newPost);
      window.location.reload();
       {/*To refresh page after every sucessful Post*/}
     }
      catch(err){
            console.log(err);
      }
   }
  return(
    <div className="share">
      <div className="shareWrapper">
       <div className="shareTop">
         <img className="shareProfileImg" src={
           user.profilePicture ? user.profilePicture : PF+"Photo/profileNoAvatar.png"
         } alt="" />
         <input className="shareInput"
                placeholder={"Jot down here, what's in ur mind " + user.username + " ?"}
                ref={desc}
         />
       </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt=" "/>
            <GiCancel className="shareCancel" onClick={()=>setFile(null)}></GiCancel>
          </div>
        )}
       <from className="shareBottom" >
         <div className="shareOptions">
           <label htmlFor="file" className="shareOption">
             <MdPermMedia style={{color: 'lightcoral'}} className="shareIcon"/>
             <span className="shareOptionText">Photos or Videos</span>
             <input style = {{ display: "none"}} type="file" id="file" accept=".jpeg,.jpg,.png" onChange={(e) =>{
               setFile(e.target.files[0]);
             }}/>
           </label>
           <div className="shareOption">
             <AiFillTag style={{color: 'brown'}} className="shareIcon"/>
             <span className="shareOptionText">Tag</span>
           </div>
           <div className="shareOption">
             <BiMap style={{color: 'green'}} className="shareIcon"/>
             <span className="shareOptionText">Location</span>
           </div>
           <div className="shareOption">
             <BsFillEmojiLaughingFill style={{color: 'goldenrod'}} className="shareIcon"/>
             <span className="shareOptionText">Feeling Lucky</span>
           </div>
         </div>
         <button className="shareButton" onClick={submitHandler}>Share</button>
       </from>
      </div>
    </div>

  )
}
