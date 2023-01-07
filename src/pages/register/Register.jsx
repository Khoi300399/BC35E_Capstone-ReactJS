import React, { useState } from "react";
import { Formik, Form} from "formik";
import * as Yup from "yup";
import Input from "../../components/input/Input.jsx";
import Radio from "../../components/input/Radio.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const [showPassword, setShowPassword] = useState(true);
  console.log("test");
  return (
    <section className="register">
      <div className="color"></div>
      <div className="color"></div>
      <div className="color"></div>

      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          name: "",
          phone: "",
          gender: "male",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .required("email cannot be blank !")
            .email("email is invalid !"),
          password: Yup.string().required("password cannot be blank !"),
          confirmPassword: Yup.string()
            .required("password confirm cannot be blank !")
            .oneOf(
              [Yup.ref("password"), null],
              "Both password need to be the same"
            ),
          name: Yup.string().required("name cannot be blank !"),
          phone: Yup.string().required("phone cannot be blank !"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const newUser = {
              ...values,
              gender: values.gender === "male",
            };
            const data = await axios.post(
              "https://shop.cyberlearn.vn/api/Users/signup",
              newUser
            );

            if (data && data.data.statusCode === 200) {
              toast.success("Register success");
            }
          } catch (e) {
            console.log(e);
            if (e && e.response) {
              toast.error(e.response.data.message);
            }
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values }) => {
          return (
            <Form className="form-group">
              <h2 className="title my-5">Register</h2>
              <div className=" box">
                <div className="box-item box-item-left">
                  <div className="mt-5">
                    <Input
                      className="form-control"
                      id="email"
                      name="email"
                      type="email"
                      label="Email"
                      placeholder="Enter your password"
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
                  <div className="mt-5">
                    <Input
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "password" : "text"}
                      label="Password confirm"
                      placeholder="Enter your password confirm"
                    ></Input>
                  </div>
                </div>

                <div className="box-item box-item-right">
                  <div className="mt-5">
                    <Input
                      className="form-control"
                      id="name"
                      name="name"
                      label="Name"
                      placeholder="Enter your name"
                    ></Input>
                  </div>
                  <div className="mt-5">
                    <Input
                      className="form-control"
                      id="phone"
                      name="phone"
                      label="Phone"
                      placeholder="Enter your Phone"
                    ></Input>
                  </div>
                  <ul className="d-flex justify-content-start pt-3 px-0">
                    <li>
                      <span>Gender</span>
                    </li>
                    <li className="mx-5">
                      <Radio
                        name="gender"
                        value="male"
                        label="Male"
                        type="radio"
                      ></Radio>
                    </li>
                    <li>
                      <Radio
                        name="gender"
                        value="femail"
                        label="Femail"
                        type="radio"
                      ></Radio>
                    </li>
                  </ul>
                  <button className="btn-submit ms-auto" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

export default Register;
