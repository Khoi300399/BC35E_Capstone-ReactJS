import axios from "axios";
export const USER_LOGIN = "userLogin";
export const TOKEN = "accessToken";
export const TOKEN_CYBER =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNUUiLCJIZXRIYW5TdHJpbmciOiIzMS8wNS8yMDIzIiwiSGV0SGFuVGltZSI6IjE2ODU0OTEyMDAwMDAiLCJuYmYiOjE2NTczODYwMDAsImV4cCI6MTY4NTYzODgwMH0.LWlPoCoXPHgp2U6FijTqXvKFt7ENvY9Tyn9ux-bVlXo";

//các hàm sử dụng để lưu
export const {
  luuStore,
  luuStoreJson,
  layStore,
  layStoreJson,
  huyStore,
  setCookie,
  getCookie,
  eraseCookie,
} = {
  luuStore: (name, data) => {
    localStorage.setItem(name, data);
  },
  luuStoreJson: (name, jsonData) => {
    const data = JSON.stringify(jsonData);
    localStorage.setItem(name, data);
  },
  layStore: (name) => {
    if (localStorage.getItem(name)) {
      return localStorage.getItem(name);
    }
    return null;
  },
  layStoreJson: (name) => {
    if (localStorage.getItem(name)) {
      return JSON.parse(localStorage.getItem(name));
    }
  },
  huyStore: (name) => {
    localStorage.removeItem(name);
  },
  setCookie: (name, value, days) => {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },
  getCookie: (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  eraseCookie: (name) => {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  },
};
//Cấu hình interceptor (Cấu hình cho tất request(gửi đi), Response(Dữ liệu nhận về))

export const http = axios.create({
  baseURL: "https://shop.cyberlearn.vn",
  timeout: 30000,
});

//Cấu hình cho resquest đều có token
http.interceptors.request.use(
  (config) => {
    const token = JSON.parse(layStore(TOKEN));
    console.log(token);
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
      TokenCybersoft: TOKEN_CYBER,
    };
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

//Cấu hình cho tất cả các response api
http.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    //Bắt lỗi 400 hoặc 404
    if (err.response?.status === 400 || err.response?.status === 404) {
      //Lỗi do tham số => backend trả về 400 hoặc 404 mình sẽ xử lý
      alert("tham số không hợp lệ !");
    }
    // if (err.response?.status === 401 || err.response.status === 403) {
    //   const isMyTokenExpired = isExpired(layStore(TOKEN));
    //   //token hết hạn
    //   if (isMyTokenExpired) {
    //     alert("Hết phiên đăng nhập yêu cầu đăng nhập lại !");
    //     huyStore(TOKEN);
    //     huyStore(USER_LOGIN);
    //     //Chuyển hướng trang dạng f5
    //     window.location.href = "/login";
    //   }
    //   history.push("/login");
    // }
    return Promise.reject(err);
  }
);
/* Các status code thường gặp
    200: Request gửi đi và nhận về kết quả thành công
    201: request gửi đi thành công và đã được khởi tạo 
    400: bad request => request gửi đi thành công tuy nhiên không tìm thấy dữ liệu từ tham số gửi đi
    404: Not found (Không tìm thấy api đó), hoặc tương tự 400
    401: Unauthorize token không hợp lệ không có quyền truy cập vào api đó
    403: Forbinden token hợp lệ tuy nhiên chưa đủ quyền để truy cập vào api đó
    500: Error server (Lỗi xảy ra trên server có khả năng là frontend gửi dữ liệu chưa hợp lệ dẫn đến backend xử lý bị lỗi). Backend code lỗi trên server ! => Test bằng post man hoặc swagger nếu api không lỗi => front code sai, ngược lại tail fail trên post man và swagger thì báo backend fix.

*/
