import React from "react";
import { useField } from "formik";

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="label" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input
        {...props}
        {...field}
        style={meta.error && meta.touched ? { borderColor: "red" } : null}
      />
      {meta.error && meta.touched ? (
        <p className="form-error text-danger">
          <i className="fa-solid fa-circle-exclamation"></i> {meta.error}
        </p>
      ) : null}
    </>
  );
};
export default Input;
