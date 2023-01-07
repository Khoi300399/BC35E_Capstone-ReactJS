import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import Input from "../../components/input/Input.jsx";
import * as Yup from "yup";
import { facebookLogin, loginApi } from "../../redux/reducers/userReducer.jsx";
import SocialButton from "../../components/SocialButton/SocialButton.jsx";

const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();
  const responseFacebook = async (response) => {
    console.log(response);
    const actionsAsync = facebookLogin(response.data.accessToken);
    await dispatch(actionsAsync);

    navigate("/profile");
  };
  useEffect(() => {}, []);
  return (
    <section className="login">
      <div className="color"></div>
      <div className="color"></div>
      <div className="color"></div>
      <div className="container">
        <div className="quare"></div>
        <div className="quare"></div>
        <div className="quare"></div>
        <div className="quare"></div>
        <div className="quare"></div>
        <div className="quare"></div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .required("email cannot be blank !")
              .email("email is invalid !"),
            password: Yup.string().required("password cannot be blank !"),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(false);
            resetForm({
              email: "",
              password: "",
            });
            // call api
            const actionsAsync = loginApi(values);
            await dispatch(actionsAsync);

            navigate("/");
          }}
        >
          {({ isSubmitting }) => (
            <Form className="form-group">
              <h2 className="title">Login</h2>
              <div className="mt-5">
                <Input
                  className="form-control"
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                ></Input>
              </div>

              <div className="form-password mt-5">
                <Input
                  className="form-control"
                  id="password"
                  name="password"
                  type={showPassword ? "password" : "text"}
                  label="Password"
                  placeholder="Enter your password"
                ></Input>
                <i
                  className={
                    showPassword
                      ? "form-eye fa-solid fa-eye-slash"
                      : "form-eye fa-solid fa-eye"
                  }
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                ></i>
              </div>
              <div className="form-bottom">
                <NavLink className="form-text" to="/register">
                  Register now ?
                </NavLink>
                <button
                  className="form-login"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Login
                </button>
              </div>
              {/* 
              <FacebookLogin
                appId="626800815872134"
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
              /> */}
              <SocialButton
                provider="facebook"
                appId="1307151083455331"
                onResolve={responseFacebook}
                onReject={(err) => console.log(err)}
              >
                Login with facebook
              </SocialButton>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Login;
