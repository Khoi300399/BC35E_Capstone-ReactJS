import { useField } from "formik";
import React from "react";

const Radio = ({ label, ...props }) => {
  const [field] = useField(props);

  return (
    <>
      <label className="form-radio text-center">
        <input {...props} {...field} />
        <p>{label}</p>
        <span></span>
      </label>
    </>
  );
};

export default Radio;
