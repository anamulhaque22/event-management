import axiosInstance from "@/utils/axiosInstance";
import {
  errorToast,
  isEmpty,
  isValidDate,
  isValidEmail,
  isValidPassword,
  isValidPhone,
  successToast,
} from "@/utils/formValidation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import InputFile from "../Input/InputFile";
import InputText from "../Input/InputText";

function Register() {
  const INITIAL_REGISTER_OBJ = {
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    dob: "",
    avatar: null,
  };
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ);

  const submitForm = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (isEmpty(registerObj.name))
      return errorToast("Name is required! (use any value)");
    if (!isValidEmail(registerObj.email))
      return errorToast("Email is required! (use valid email)");
    if (!isValidPassword(registerObj.password))
      return errorToast(
        "Password is required! use six length password include( number, uppercase, lowercase, special character))"
      );
    if (isEmpty(registerObj.address))
      return errorToast("Address is required! (use any value)");

    if (!isValidPhone(registerObj.phone))
      return errorToast("Phone Number is required! (use valid phone number)");
    if (!isValidDate(registerObj.dob))
      return errorToast("Date of Birth is required!");

    if (registerObj.avatar === null) return errorToast("Photo is required!");
    else {
      setLoading(true);
      // Call API to check user credentials and save token in localstorage
      console.log(registerObj);
      const formData = new FormData();
      for (const key in registerObj) {
        if (registerObj.hasOwnProperty(key)) {
          formData.append(key, registerObj[key]);
        }
      }
      axiosInstance
        .post("/admin/register", formData)
        .then((res) => {
          if (res.status === 201) {
            successToast("Sign Up Success!");
            router.push("/login");
          } else {
            errorToast("Something went wrong! Try Again.");
          }
        })
        .catch((err) => {
          console.log(err);
          errorToast("Something went wrong! Try Again.");
        });
      setLoading(false);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setRegisterObj({ ...registerObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto  max-w-5xl  shadow-xl">
        <div className="bg-base-100 rounded-xl">
          <div className="py-16 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Register
            </h2>
            <form onSubmit={(e) => submitForm(e)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputText
                  labelTitle="Name"
                  defaultValue={registerObj.name}
                  updateType="name"
                  updateFormValue={updateFormValue}
                />
                <InputText
                  labelTitle="Email"
                  defaultValue={registerObj.email}
                  updateType="email"
                  updateFormValue={updateFormValue}
                />
                <InputText
                  labelTitle="Password"
                  defaultValue={registerObj.password}
                  updateType="password"
                  updateFormValue={updateFormValue}
                  type={"password"}
                />
                <InputText
                  labelTitle="Address"
                  defaultValue={registerObj.address}
                  updateType="address"
                  updateFormValue={updateFormValue}
                />
                <InputText
                  labelTitle="Phone"
                  defaultValue={registerObj.phone}
                  updateType="phone"
                  updateFormValue={updateFormValue}
                />
                <InputText
                  labelTitle="Date Of Birth"
                  defaultValue={registerObj.dob}
                  updateType="dob"
                  placeholder="YYYY-MM-DD"
                  type="date"
                  updateFormValue={updateFormValue}
                />
                <InputFile
                  labelTitle="Profile Picture"
                  updateFormValue={updateFormValue}
                  defaultValue={registerObj.avatar}
                  updateType="avatar"
                />
              </div>

              <div className="mt-16">
                <button type="submit" className="btn btn-primary float-right">
                  Sign Up
                </button>
              </div>

              <div className="text-center mt-4">
                Already have an account?{" "}
                <Link href="/login">
                  <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Login
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
