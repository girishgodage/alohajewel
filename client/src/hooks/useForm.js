import { useState } from "react";
import { omit } from "lodash";

const useForm = (callback) => {
  //Form values
  const [values, setValues] = useState({});
  //Errors
  const [errors, setErrors] = useState({});

  const validate = (event, name, value) => {
    //A function to validate each input values

    switch (name) {
      case "firstName":
        if (value.length <= 4) {
          setErrors({
            ...errors,
            firstName: "firstName atleast have 5 letters",
          });
        } else {
          let newObj = omit(errors, "firstName");
          setErrors(newObj);
        }
        break;
      case "lastName":
        if (value.length <= 0) {
          setErrors({
            ...errors,
            lastName: "lastName is required",
          });
        } else {
          let newObj = omit(errors, "lastName");
          setErrors(newObj);
        }
        break;
      case "email":
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            email: "Enter a valid email address",
          });
        } else {
          let newObj = omit(errors, "email");
          setErrors(newObj);
        }
        break;
      case "address":
        if (value.length <= 9) {
          // we will set the error state
          setErrors({
            ...errors,
            address: "address atleast have 10 letters",
          });
        } else {
          let newObj = omit(errors, "address");
          setErrors(newObj);
        }
        break;

      case "city":
        if (value.length <= 3) {
          setErrors({
            ...errors,
            city: "city atleast have 4 letters",
          });
        } else {
          let newObj = omit(errors, "city");
          setErrors(newObj);
        }
        break;

      case "postalCode":
        if (value.length <= 0) {
          setErrors({
            ...errors,
            postalCode: "postalCode is required",
            
          });
        } else {
          let newObj = omit(errors, "postalCode");
          setErrors(newObj);
        }
        break;

      case "contactNumber":
        if (value.length <= 0) {
          setErrors({
            ...errors,
            contactNumber: "contactNumber is required",
          });
        } else {
          let newObj = omit(errors, "contactNumber");
          setErrors(newObj);
        }
        break;

      default:
        break;
    }
  };

  //A method to handle form inputs
  const handleChange = (event) => {
    //To stop default events
    event.persist();

    let name = event.target.name;
    let val = event.target.value;

    validate(event, name, val);
    //Let's set these values in state

    setValues({
      ...values,
      [name]: val,
    });
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
      callback();
    } else {
      alert("There is an Error!");
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;