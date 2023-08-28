import InputText from "@/components/Input/InputText";
import TitleCard from "@/components/shared/TitleCard";
import axiosInstance from "@/utils/axiosInstance";
import {
  errorToast,
  isEmpty,
  isValidDate,
  isValidEmail,
  isValidPhone,
  successToast,
} from "@/utils/formValidation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
function EditAttendee({ attendeeId }) {
  const [loading, setLoading] = useState(false);
  const [attendeeObj, setAttendeeObj] = useState({});
  const router = useRouter();

  console.log(attendeeId);
  useEffect(() => {
    axiosInstance
      .get(`/admin/getAttendee/${attendeeId}`)
      .then((res) => {
        const { Id, Name, Email, Dob, Phonenumber, Username, Password } =
          res.data.result;
        console.log(Dob);
        setAttendeeObj({
          Id,
          Name,
          Email,
          Username,
          Dob,
          Phonenumber,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [attendeeId]);

  const submitForm = (e) => {
    e.preventDefault();

    if (isEmpty(attendeeObj.Name))
      return errorToast("Name is required! (use any value)");
    if (!isValidEmail(attendeeObj.Email))
      return errorToast("Email is required! (use valid email)");
    if (isEmpty(attendeeObj.Username))
      return errorToast("Username is required! (use any value)");

    if (!isValidPhone(attendeeObj.Phonenumber))
      return errorToast("Phone Number is required! (use valid phone number)");
    if (!isValidDate(attendeeObj.Dob))
      return errorToast("Date of Birth is required!");
    else {
      setLoading(true);

      axiosInstance
        .patch("/admin/updateAttendee", attendeeObj)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            successToast("Attendee Updated Successfully!");
            router.push("/attendeePage");
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
    setAttendeeObj({ ...attendeeObj, [updateType]: value });
  };
  console.log("attendeeObj", attendeeObj);

  return (
    <>
      <TitleCard title="Add Event Organizer" topMargin="mt-2">
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
              disable={true}
            />
            <InputText
              labelTitle="Username"
              defaultValue={attendeeObj.Username}
              updateType="Username"
              updateFormValue={updateFormValue}
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

export default EditAttendee;
