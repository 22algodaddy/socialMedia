import Home from './Pages/Home/home.js';
import Login from './Pages/Login/login.js'
import Register from './Pages/Register/register.js'
import Profile from './Pages/profile/profile.js'
import {AuthContext} from "./contextApi/AuthContext.js"
import {useContext} from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
export default function App() {
   const {user} = useContext(AuthContext);
 //let  user =null;
  return (
    <Router >
      <Routes>
        <Route exact path="/" element={user ?<Home/> : <Register></Register>}></Route>
        <Route path="/login" element={user ? <Navigate to="/"/>: <Login/>}></Route>
        <Route path="/register" element={user ? <Navigate to="/"/>:<Register/>}></Route>
        <Route path="/profile/:username" element={<Profile/>}></Route>
      </Routes>
    </Router>
  );
}


