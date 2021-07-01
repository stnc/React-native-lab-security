
/*
redux-multi
Dispatch multiple actions in one action creator.

store.dispatch([
  { type: 'INCREMENT', payload: 2 },
  { type: 'INCREMENT', payload: 3 }
])
*/

import AsyncStorage from '@react-native-community/async-storage';


// TODO: dummy deki örnekler gibi daha gelişmiş yapılabilir 
const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
const SET_LOGOUT = 'SET_LOGOUT';
const SET_EMAIL = 'SET_EMAIL';
const SET_NICENAME = 'SET_NICENAME'; // alias for nickname 
const SET_DISPLAYNAME = 'SET_DISPLAYNAME';// name lastname info ---  token url to return 
const SET_FIRST_TOKEN = 'SET_FIRST_TOKEN';

const SET_USER_ID = 'SET_USER_ID';
const SET_USER_TOKEN = 'SET_USER_TOKEN';
const SET_USER_NAME_LASTNAME = 'SET_USER_NAME_LASTNAME';//--
const SET_USER_WEB_SITE = 'SET_USER_WEB_SITE';
const SET_USER_NICKNAME = 'SET_USER_NICKNAME';//--
const SET_USER_REGISTERED_DATE = 'SET_USER_REGISTERED_DATE';
const SET_USER_DESCRIPTION = 'SET_USER_DESCRIPTION';
const SET_POST_COUNTER = 'SET_POST_COUNTER';
const SET_ERROR = 'SET_ERROR';


const SET_USER_AVATAR = 'SET_USER_AVATAR';


export function setPostCounter(isPostCounter) {
  return dispatch => {
    dispatch({
      type: SET_POST_COUNTER,
      isPostCounter
    });
  }
}


export const getLoginSuccess = () => dispatch => {

  AsyncStorage.getItem('setLoginSuccess')
    .then((data) => {
      dispatch(setLoginError(false));
      dispatch(setLoginSuccess(JSON.parse(data)));
    })
    .catch((err) => {
      dispatch(setLoginError(true));
      dispatch(error(err.message || 'ERROR'));
    })

}



export const getAsyncUserInfo = () => dispatch => {

  AsyncStorage.getItem('userID')
    .then((data) => {
      // dispatch(loading(false));
      dispatch(setUserID(JSON.parse(data)));
    })
    .catch((err) => {
      // dispatch(loading(false));
      dispatch(setError(err.message || 'ERROR'));
    });


  AsyncStorage.getItem('userEmail')
    .then((data) => {
      dispatch(setEmail(JSON.parse(data)));
    })
    .catch((err) => {
      dispatch(setError(err.message || 'ERROR'));
    });

  AsyncStorage.getItem('userDescription')
    .then((data) => {
      dispatch(setUserDescription(JSON.parse(data)));
    })
    .catch((err) => {
      dispatch(setError(err.message || 'ERROR'));
    });

  AsyncStorage.getItem('userRegisteredDate')
    .then((data) => {
      dispatch(setUserRegisteredDate(JSON.parse(data)));
    })
    .catch((err) => {
      dispatch(setError(err.message || 'ERROR'));
    });


  AsyncStorage.getItem('userNickname')
    .then((data) => {
      dispatch(setUserNickname(JSON.parse(data)));
    })
    .catch((err) => {
      dispatch(setError(err.message || 'ERROR'));
    });


  AsyncStorage.getItem('userWebSite')
    .then((data) => {
      dispatch(setUserWebSite(JSON.parse(data)));
    })
    .catch((err) => {
      dispatch(setError(err.message || 'ERROR'));
    });


  AsyncStorage.getItem('userNameLastname')
    .then((data) => {
      dispatch(setUserNameLastname(JSON.parse(data)));
    })
    .catch((err) => {
      dispatch(setError(err.message || 'ERROR'));
    });



  AsyncStorage.getItem('userAvatar')
    .then((data) => {
      dispatch(setUserAvatar(JSON.parse(data)));
    })
    .catch((err) => {
      dispatch(setError(err.message || 'ERROR'));
    });



}




function asyncSet(key, value) {
  value = JSON.stringify(value)
  if (value) return AsyncStorage.setItem(key, value)
  else console.log('not set, stringify failed:', key, value)
}



export function userProfilInformation(userID, userEmail, userDescription, userRegisteredDate, userNickname, userWebSite, userNameLastname, userAvatar) {
  return dispatch => {
   


 
    dispatch(setEmail(userEmail));
    dispatch(setUserDescription(userDescription));
    dispatch(setUserRegisteredDate(userRegisteredDate));
    dispatch(setUserNickname(userNickname));
    dispatch(setUserWebSite(userWebSite));
    dispatch(setUserNameLastname(userNameLastname));          
    dispatch(setUserAvatar(userAvatar));


    asyncSet('userID', userID);
    asyncSet('setLoginSuccess', 1);
    asyncSet('userEmail', userEmail);
    asyncSet('userDescription', userDescription);
    asyncSet('userRegisteredDate', userRegisteredDate);
    asyncSet('userNickname', userNickname);
    asyncSet('userWebSite', userWebSite);
    asyncSet('userNameLastname', userNameLastname);
    asyncSet('userAvatar', userAvatar);



    dispatch(setUserID(userID));
    dispatch(setLoginSuccess("1"));
    dispatch(setLoginError(false));



  }
}



// sdsd@hotmail.com

export  function logoutCtrl()  {
  return dispatch =>  {


/*
 await AsyncStorage.removeItem('userEmail');
 await AsyncStorage.removeItem('userEmail');
 await AsyncStorage.removeItem('userDescription');
 await AsyncStorage.removeItem('userRegisteredDate');
 await AsyncStorage.removeItem('userNickname');
 await AsyncStorage.removeItem('userWebSite');
 await AsyncStorage.removeItem('userNameLastname');
 await AsyncStorage.removeItem('userAvatar');
 await AsyncStorage.removeItem('isLoginSuccess');
 await AsyncStorage.removeItem('userID');
*/

 AsyncStorage.removeItem('userEmail');
 AsyncStorage.removeItem('userEmail');
 AsyncStorage.removeItem('userDescription');
 AsyncStorage.removeItem('userRegisteredDate');
 AsyncStorage.removeItem('userNickname');
 AsyncStorage.removeItem('userWebSite');
 AsyncStorage.removeItem('userNameLastname');
 AsyncStorage.removeItem('userAvatar');
 AsyncStorage.removeItem('isLoginSuccess');
 AsyncStorage.removeItem('userID');
 
    dispatch(setEmail(""));
    dispatch(setUserDescription(""));
    dispatch(setUserRegisteredDate(""));
    dispatch(setUserNickname(""));
    dispatch(setUserWebSite(""));
    dispatch(setUserNameLastname(""));          
    dispatch(setUserAvatar(""));

    dispatch(setLogout(true));
    dispatch(setLoginSuccess("0"));
    dispatch(setUserID(""));


  }
}



function setLogout(isLogout) {
  return {
    type: SET_LOGOUT,
    isLogout
  };
}

function setUserAvatar(userAvatar) {
  return {
    type: SET_USER_AVATAR,
    userAvatar
  };
}


function setEmail(userEmail) {
  return {
    type: SET_EMAIL,
    userEmail
  };
}


function setNicename(isNicename) {
  return {
    type: SET_NICENAME,
    isNicename
  };
}

function setDisplayname(isDisplayname) {
  return {
    type: SET_DISPLAYNAME,
    isDisplayname
  };
}

export function firstToken(token) {
  return dispatch => {
    // dispatch(setFirstToken(token));
    AsyncStorage.setItem('setFirstToken', token)
      .then((data) => {
        dispatch(setFirstToken(token));
      })
      .catch((err) => {
        dispatch(setFirstToken(data));
        dispatch(setError(err.message || 'ERROR'));
      });
  }
}

function setFirstToken(isFirstToken) {
  return {
    type: SET_FIRST_TOKEN,
    isFirstToken
  };
}

export function userToken(userToken) {
  return dispatch => {
    dispatch(setFirstToken(userToken));
  }
}

function setUserToken(userToken) {
  return {
    type: SET_USER_TOKEN,
    userToken
  };
}

// FIXME: not used
function setLoginPending(isLoginPending) {
  return {
    type: SET_LOGIN_PENDING,
    isLoginPending
  };
}

function setLoginSuccess(isLoginSuccess) {
  return {
    type: SET_LOGIN_SUCCESS,
    isLoginSuccess
  };

}



function setLoginError(loginError) {
  return {
    type: SET_LOGIN_ERROR,
    loginError
  }
}

//TODO -- coming to delete
function callLoginApi(email, password, callback) {
  // setTimeout(() => {
  if (email === '1' && password === '1') {
    return callback(null);
    //   return alert('ok man');
  } else {
    // alert("error");
    return callback(new Error('Invalid email and password'));
    // return callback(alert('Invalid email and password'));
  }
  // }, 1000);
}

function setUserDescription(userDescription) {
  return {
    type: SET_USER_DESCRIPTION,
    userDescription
  };
}
function setUserRegisteredDate(userRegisteredDate) {
  return {
    type: SET_USER_REGISTERED_DATE,
    userRegisteredDate
  };
}
function setUserNickname(userNickname) {
  return {
    type: SET_USER_NICKNAME,
    userNickname
  };
}

function setUserWebSite(userWebSite) {
  return {
    type: SET_USER_WEB_SITE,
    userWebSite
  };
}
function setUserID(userID) {
  return {
    type: SET_USER_ID,
    userID
  };
}

function setUserNameLastname(userNameLastname) {
  return {
    type: SET_USER_NAME_LASTNAME,
    userNameLastname
  };
}
function setError(isError) {
  return {
    type: SET_ERROR,
    isError
  };
}

export default function reducer(
  state = {
    isLoginSuccess: false,
    isLoginPending: false,
    userEmail: "",
    isDisplayname: "",
    isFirstToken: "",
    isNicename: "",
    isLogout: false,
    loginError: null,
    // ------ user info 
    userID: null,
    userToken: null,
    userDescription: null,
    userRegisteredDate: null,
    userNickname: null,
    userWebSite: null,
    userNameLastname: null,
    userAvatar: null,
    isError: null
  }, action) {
  switch (action.type) {

    case SET_LOGIN_PENDING:
      return Object.assign({}, state, {
        isLoginPending: action.isLoginPending
      });
    case SET_USER_ID:
      return Object.assign({}, state, {
        userID: action.userID
      });
    case SET_USER_TOKEN:
      return Object.assign({}, state, {
        userToken: action.userToken
      });

    case SET_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoginSuccess: action.isLoginSuccess
      });

    case SET_LOGIN_ERROR:
      return Object.assign({}, state, {
        loginError: action.loginError
      });


    case SET_EMAIL:
      return Object.assign({}, state, {
        userEmail: action.userEmail
      });

    case SET_NICENAME:
      return Object.assign({}, state, {
        loginError: action.isNicename
      });

    case SET_DISPLAYNAME:
      return Object.assign({}, state, {
        isDisplayname: action.isDisplayname
      });

    case SET_FIRST_TOKEN:
      return Object.assign({}, state, {
        isFirstToken: action.isFirstToken
      });
    case SET_USER_DESCRIPTION:
      return Object.assign({}, state, {
        userDescription: action.userDescription
      });

    case SET_USER_REGISTERED_DATE:
      return Object.assign({}, state, {
        userRegisteredDate: action.userRegisteredDate
      });

    case SET_USER_NICKNAME:
      return Object.assign({}, state, {
        userNickname: action.userNickname
      });

    case SET_USER_WEB_SITE:
      return Object.assign({}, state, {
        userWebSite: action.userWebSite
      });


    case SET_USER_NAME_LASTNAME:
      return Object.assign({}, state, {
        userNameLastname: action.userNameLastname
      });

    case SET_USER_AVATAR:
      return Object.assign({}, state, {
        userAvatar: action.userAvatar
      });

    case SET_POST_COUNTER:
      return Object.assign({}, state, {
        isPostCounter: action.isPostCounter
      });

    case SET_ERROR:
      return Object.assign({}, state, {
        isError: action.isError
      });

    case SET_LOGOUT:
      return Object.assign({}, state, {
        isLogout: action.isLogout
      });

    default:
      return state;
  }
}
