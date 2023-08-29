import { useAuth } from "@/utils/authContext";
import axiosInstance from "@/utils/axiosInstance";
import {
  errorToast,
  isValidEmail,
  isValidPassword,
} from "@/utils/formValidation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InputText from "../Input/InputText";
import ErrorText from "../Typography/ErrorText";

function Login() {
  const INITIAL_LOGIN_OBJ = {
    email: "",
    password: "",
  };

  const { login, checkUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

  useEffect(() => {
    if(checkUser()){
      router.push('/')
    }
  }, [])

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!isValidEmail(loginObj.email))
      return errorToast("Email is invalid! (use valid email");
    if (!isValidPassword(loginObj.password))
      return errorToast(
        "Password is required! use six length password include( number, uppercase, lowercase, special character))"
      );
    else {
      setLoading(true);
      const response = await doSignIn(loginObj.email, loginObj.password);
      console.log(response, "response form submitForm");
      setLoading(false);
    }
  };

  async function doSignIn(email, password) {
    try {
      const response = await axiosInstance.post(
        "/admin/signin/",
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        }
      );
      console.log(response, "response from doSignIn");
      if (response.data?.isUserExist && response.data?.isValidPass) {
        console.log("cookie: " + document.cookie);
        login(email, document.cookie);
        router.push("/");
      } else {
        errorToast("Invalid user");
      }
      console.log("response: " + response);

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto  max-w-5xl  shadow-xl">
        <div className="bg-base-100 rounded-xl">
          <div className="py-16 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
            <form onSubmit={(e) => submitForm(e)}>
              <div className="mb-4">
                <InputText
                  type="email"
                  defaultValue={loginObj.email}
                  updateType="email"
                  containerStyle="mt-4"
                  labelTitle="Email"
                  updateFormValue={updateFormValue}
                />

                <InputText
                  defaultValue={loginObj.password}
                  type="password"
                  updateType="password"
                  containerStyle="mt-4"
                  labelTitle="Password"
                  updateFormValue={updateFormValue}
                />
              </div>

              <div className="text-right text-primary">
                <Link href="/forgotPassword">
                  <span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Forgot Password?
                  </span>
                </Link>
              </div>

              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button
                type="submit"
                className={
                  "btn mt-2 w-full btn-primary" + (loading ? " loading" : "")
                }
              >
                Login
              </button>

              <div className="text-center mt-4">
                {"Don't have an account yet?"}{" "}
                <Link href="/register">
                  <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Register
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

export default Login;
