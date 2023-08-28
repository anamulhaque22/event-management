import InputFile from "@/components/Input/InputFile";

import InputText from "@/components/Input/InputText";
import TitleCard from "@/components/shared/TitleCard";
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
import { useRouter } from "next/router";
import { useState } from "react";

function AddAttendee() {
  const INITIAL_EVENT_ORGA_OBJ = {
    Name: "",
    Email: "",
    Username: "",
    Password: "",
    Dob: "",
    Phonenumber: "",
    PhotoName: null,
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [attendeeObj, setAttendeeObj] = useState(INITIAL_EVENT_ORGA_OBJ);
  const router = useRouter();

  const submitForm = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (isEmpty(attendeeObj.Name))
      return errorToast("Name is required! (use any value)");
    if (!isValidEmail(attendeeObj.Email))
      return errorToast("Email is required! (use valid email)");
    if (isEmpty(attendeeObj.Username))
      return errorToast("Username is required! (use any value)");
    if (!isValidPassword(attendeeObj.Password))
      return errorToast(
        "Password is required! use six length password include( number, uppercase, lowercase, special character))"
      );

    if (isEmpty(attendeeObj.Address))
      return errorToast("Address is required! (use any value)");

    if (!isValidPhone(attendeeObj.Phonenumber))
      return errorToast("Phone Number is required! (use valid phone number)");
    if (!isValidDate(attendeeObj.Dob))
      return errorToast("Date of Birth is required!");

    if (attendeeObj.Photo === null) return errorToast("Photo is required!");
    else {
      setLoading(true);
      // Call API to check user credentials and save token in localstorage
      console.log(attendeeObj);
      const formData = new FormData();
      for (const key in attendeeObj) {
        if (attendeeObj.hasOwnProperty(key)) {
          formData.append(key, attendeeObj[key]);
        }
      }
      axiosInstance
        .post("/admin/addAttendee", formData)
        .then((res) => {
          if (res.status === 201) {
            successToast("Attendee Added Successfully!");
            router.push("/attendeePage");
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
    setAttendeeObj({ ...attendeeObj, [updateType]: value });
  };

  return (
    <>
      <TitleCard title="Add Attendee" topMargin="mt-2">
        <form onSubmit={(e) => submitForm(e)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputText
              labelTitle="Name"
              defaultValue={attendeeObj.Name}
              updateType="Name"
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="Email"
              defaultValue={attendeeObj.Email}
              updateType="Email"
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="Username"
              defaultValue={attendeeObj.Username}
              updateType="Username"
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="Password"
              defaultValue={attendeeObj.Password}
              updateType="Password"
              updateFormValue={updateFormValue}
              type={"password"}
            />
            <InputText
              labelTitle="Phone"
              defaultValue={attendeeObj.Phonenumber}
              updateType="Phonenumber"
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="Date Of Birth"
              defaultValue={attendeeObj.Dob}
              updateType="Dob"
              placeholder="YYYY-MM-DD"
              type="date"
              updateFormValue={updateFormValue}
            />
            <InputFile
              labelTitle="Profile Picture"
              updateFormValue={updateFormValue}
              defaultValue={attendeeObj.PhotoName}
              updateType="PhotoName"
            />
          </div>

          <div className="mt-16">
            <button type="submit" className="btn btn-primary float-right">
              Add Attendee
            </button>
          </div>
        </form>
      </TitleCard>
    </>
  );
}

export default AddAttendee;
