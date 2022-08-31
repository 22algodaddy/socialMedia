import {createContext, useReducer, useState} from "react"
import AuthReducer from "./AuthReducer.js"
const INITIAL_STATE ={
  user:{
    _id: "62d80cbb3f1a5b0cb352a274",
  username:"John1",
  email: "john1@gmail.com",
  profilePicture: "",
  coverPicture:"",
  followers:[],
  following:[],
  isAdmin: false
  },
  isFetching:false,
  error:false
}

export const AuthContext = createContext(INITIAL_STATE)
export const AuthContextProvider = ({children}) => {
  const [state,dispatch] = useReducer(AuthReducer,INITIAL_STATE)
  return(
    <AuthContext.Provider value={{
      user:state.user,
      isFetching:state.isFetching,
      error:state.error,
      dispatch}}
      >
      {children}
    </AuthContext.Provider>
  );
};
