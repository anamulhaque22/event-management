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
import { useEffect, useState } from "react";

function EditEventOrganizer({ eventOrganizerId }) {
  const [loading, setLoading] = useState(false);
  const [organizerObj, setOrganizerObj] = useState({});
  const router = useRouter();
  useEffect(() => {
    axiosInstance
      .get(`/admin/getEventOrganizer/${eventOrganizerId}`)
      .then((res) => {
        console.log(res.data.result);
        const { Id, Name, Email, eventsecret, DOB, Address, Phonenumber } =
          res.data.result;
        const { Username, Password } = eventsecret;
        setOrganizerObj({
          Id,
          Name,
          Email,
          Username,
          Password,
          DOB,
          Address,
          Phonenumber,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [eventOrganizerId]);
  console.log(organizerObj);

  const submitForm = (e) => {
    e.preventDefault();

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
    else {
      setLoading(true);

      console.log(organizerObj);
      // const formData = new FormData();
      // for (const key in organizerObj) {
      //   if (organizerObj.hasOwnProperty(key)) {
      //     formData.append(key, organizerObj[key]);
      //   }
      // }

      axiosInstance
        .patch("/admin/updateEventOrganizer", organizerObj)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            successToast("Event Organizer Updated Successfully!");
            router.push("/eventOrganizerPage");
          } else {
            errorToast("Something went wrong! Try Again.....");
          }
        })
        .catch((err) => {
          errorToast("Something went wrong! Try Again.");
        });
      setLoading(false);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
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
              disable={true}
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
          </div>

          <div className="mt-16">
            <button type="submit" className="btn btn-primary float-right">
              Update Event Organizer
            </button>
          </div>
        </form>
      </TitleCard>
    </>
  );
}

export default EditEventOrganizer;
