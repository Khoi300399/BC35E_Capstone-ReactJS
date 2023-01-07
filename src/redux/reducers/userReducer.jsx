import { createSlice } from "@reduxjs/toolkit";
import {
  luuStoreJson,
  setCookie,
  USER_LOGIN,
  TOKEN,
  layStoreJson,
  http,
} from "../../util/config.jsx";
const initialState = {
  userLogin: layStoreJson(USER_LOGIN) ? layStoreJson(USER_LOGIN) : null,
  profile: null,
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.userLogin = action.payload;
    },
    getProfileAction: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { loginAction, getProfileAction } = userReducer.actions;

export default userReducer.reducer;

// ========= async actios ===========
export const loginApi = (userLogin) => {
  return async (dispatch) => {
    let result = await http.post(`/api/Users/signin`, userLogin);
    // Sau khi đăng nhập thành công
    let action = loginAction(result.data.content);
    dispatch(action);

    /**
     * Lưu đăng nhập thành công vào localstorage
     */
    luuStoreJson(USER_LOGIN, result.data.content);

    luuStoreJson(TOKEN, result.data.content.accessToken);
    /**
     * Lưu đăng nhập thành công vào cookie
     */
    setCookie(TOKEN, result.data.content.accessToken);
  };
};

export const facebookLogin = (token) => {
  return async (dispatch) => {
    let result = await http.post(`/api/Users/facebooklogin`, {
      facebookToken: token,
    });
    // Sau khi đăng nhập thành công
    let action = loginAction(result.data.content);
    dispatch(action);

    // /**
    //  * Lưu đăng nhập thành công vào localstorage
    //  */
    luuStoreJson(USER_LOGIN, result.data.content);
    // /**
    //  * Lưu đăng nhập thành công vào cookie
    //  */
    setCookie(TOKEN, result.data.content.accessToken);
  };
};

export const getProfileApi = () => {
  return async (dispatch) => {
    const result = await http.post(`/api/Users/getProfile`);
    // sau khi call api thì dưa profile lên reducer
    const action = getProfileAction(result.data.content);
    dispatch(action);
  };
};
