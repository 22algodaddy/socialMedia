const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START" :
      return{
        user: null,
        isFetching : true,
        error: false,
      };
    case "LOGIN_SUCCESS" :
      return{
        user : action.payload,
        isFetching : false,
        error: false,
      };
    case "LOGIN_FAILURE" :
      return{
        user : null,
        isFetching : false,
        error: action.payload,
      };
    case "FOLLOW" :
      return{
        ...state,
        user : {
          ...state.user,
          following : [...state.user.following,action.payload],
        }
     // using (...state is same as writting all this
     //  user : null,
     //  isFetching : false,
     //  error: action.payload, )
     //... operator spreads all this for us
     //...state.user copies user data from authContext
      };
    case "UNFOLLOW" :
      return{
        ...state,
        user : {
          ...state.user,
          following: state.user.following.filter(
            (eachfollowing) =>
              eachfollowing !== action.payload
          )
        },
      };
    default: return state;
  }
};

export default AuthReducer;
