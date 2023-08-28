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

function AddEventOrganizer() {
  const INITIAL_EVENT_ORGA_OBJ = {
    Name: "",
    Email: "",
    Username: "",
    Password: "",
    DOB: "",
    Address: "",
    Phonenumber: "",
    Photo: null,
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [organizerObj, setOrganizerObj] = useState(INITIAL_EVENT_ORGA_OBJ);
  const router = useRouter();

  const submitForm = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (isEmpty(organizerObj.Name))
      return errorToast("Name is required! (use any value)");
    if (!isValidEmail(organizerObj.Email))
      return errorToast("Email is required! (use valid email)");
    if (isEmpty(organizerObj.Username))
      return errorToast("Username is required! (use any value)");
    if (!isValidPassword(organizerObj.Password))
      return errorToast(
        "Password is required! use six length password include( number, uppercase, lowercase, special character))"
      );

    if (isEmpty(organizerObj.Address))
      return errorToast("Address is required! (use any value)");

    if (!isValidPhone(organizerObj.Phonenumber))
      return errorToast("Phone Number is required! (use valid phone number)");
    if (!isValidDate(organizerObj.DOB))
      return errorToast("Date of Birth is required!");

    if (organizerObj.Photo === null) return errorToast("Photo is required!");
    else {
      setLoading(true);
      // Call API to check user credentials and save token in localstorage
      console.log(organizerObj);
      const formData = new FormData();
      for (const key in organizerObj) {
        if (organizerObj.hasOwnProperty(key)) {
          formData.append(key, organizerObj[key]);
        }
      }
      axiosInstance
        .post("/admin/addEventOrganizer", formData)
        .then((res) => {
          if (res.status === 201) {
            successToast("Event Organizer Added Successfully!");
            router.push("/eventOrganizerPage");
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
    setOrganizerObj({ ...organizerObj, [updateType]: value });
  };

  return (
    <>
      <TitleCard title="Add Event Organizer" topMargin="mt-2">
        <form onSubmit={(e) => submitForm(e)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputText
              labelTitle="Name"
              defaultValue={organizerObj.Name}
              updateType="Name"
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="Email"
              defaultValue={organizerObj.Email}
              updateType="Email"
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="Username"
              defaultValue={organizerObj.Username}
              updateType="Username"
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="Password"
              defaultValue={organizerObj.Password}
              updateType="Password"
              updateFormValue={updateFormValue}
              type={"password"}
            />
            <InputText
              labelTitle="Address"
              defaultValue={organizerObj.Address}
              updateType="Address"
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="Phone"
              defaultValue={organizerObj.Phonenumber}
              updateType="Phonenumber"
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="Date Of Birth"
              defaultValue={organizerObj.DOB}
              updateType="DOB"
              placeholder="YYYY-MM-DD"
              type="date"
              updateFormValue={updateFormValue}
            />
            <InputFile
              labelTitle="Profile Picture"
              updateFormValue={updateFormValue}
              defaultValue={organizerObj.Photo}
              updateType="Photo"
            />
          </div>

          <div className="mt-16">
            <button type="submit" className="btn btn-primary float-right">
              Add Event
            </button>
          </div>
        </form>
      </TitleCard>
    </>
  );
}

export default AddEventOrganizer;
