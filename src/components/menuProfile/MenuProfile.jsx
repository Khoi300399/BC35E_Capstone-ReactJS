import { Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useRef, useState } from "react";
import Input from "../../components/input/Input.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getProfileApi } from "../../redux/reducers/userReducer.jsx";
import Radio from "../input/Radio.jsx";
import { http } from "../../util/config.jsx";
import { toast } from "react-toastify";
import { getFavoriteApi } from "../../redux/reducers/productReducer.jsx";

const MenuProfile = () => {
  const [on, setOn] = useState(true);
  const { profile } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  
  const formRef = useRef();

  useEffect(() => {
    dispatch(getProfileApi());
    dispatch(getFavoriteApi());
  }, []);
  return (
    <div className="menu-profile">
      <h2 className="title">Profile</h2>
      <Formik
        innerRef={formRef}
        enableReinitialize={true}
        initialValues={{
          email: profile && profile.email,
          name: profile && profile.name,
          gender: profile && profile.gender.toString(),
          phone: profile && profile.phone,
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("name cannot be blank !"),
          phone: Yup.string().required("phone cannot be blank !"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            values.gender = values.gender === "true";
            await http.post("/api/Users/updateProfile", values);

            dispatch(getProfileApi());
            toast.success("Update thanh cong");
          } catch (e) {
            console.log(e);
          }
          setSubmitting(false);
        }}
      >
        <div className="menu-profile-box">
          <div className="row">
            <div className="col-6 menu-profile-left">
              <div className="menu-profile-item">
                <Input
                  className="form-control"
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  disabled={true}
                ></Input>
              </div>
              <div className="menu-profile-item">
                <Input
                  className="form-control"
                  id="phone"
                  name="phone"
                  label="Phone"
                  disabled={on}
                  placeholder="Enter your phone"
                ></Input>
              </div>
            </div>
            <div className="col-6 menu-profile-right">
              <div className="menu-profile-item">
                <Input
                  className="form-control"
                  id="name"
                  name="name"
                  label="Name"
                  placeholder="Enter your name"
                ></Input>
              </div>
              <div className="menu-profile-item">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value="123456789"
                  disabled={true}
                />
              </div>
              <div className="menu-profile-radio">
                <ul className="d-flex justify-content-start pt-3 px-0">
                  <li>
                    <span>Gender</span>
                  </li>
                  <li className="mx-5">
                    <label className="form-radio text-center">
                      <Radio
                        label="Male"
                        name="gender"
                        disabled={on}
                        type="radio"
                        value="true"
                      />
                    </label>
                  </li>
                  <li>
                    <label className="form-radio text-center">
                      <Radio
                        name="gender"
                        label="Female"
                        disabled={on}
                        type="radio"
                        value="false"
                      />
                    </label>
                  </li>
                </ul>
              </div>
              <div>
                {on ? (
                  <button
                    className="btn-edit"
                    onClick={() => {
                      setOn(!on);
                    }}
                  >
                    edit
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (formRef.current) {
                        formRef.current.handleSubmit();
                      }
                    }}
                    type="submit"
                    className="btn-update"
                  >
                    update
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Formik>
    </div>
  );
};

export default MenuProfile;
