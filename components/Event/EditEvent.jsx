import axiosInstance from "@/utils/axiosInstance";
import {
  errorToast,
  isEmpty,
  isValidDate,
  successToast,
} from "@/utils/formValidation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InputText from "../Input/InputText";
import Select from "../Input/Select";
import TextAreaInput from "../Input/TextAreaInput";
import TitleCard from "../shared/TitleCard";

function EditEvent({ eventId }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [eventObj, setEventObj] = useState({});
  const router = useRouter();

  useEffect(() => {
    axiosInstance.get(`/admin/getEventById/${eventId}`).then((res) => {
      console.log(res.data);
      const {
        Id,
        Name,
        Location,
        Time,
        TicketPrice,
        Availability,
        Address,
        Type,
        Description,
      } = res.data;
      setEventObj({
        Id,
        Name,
        Location,
        Time,
        TicketPrice,
        Availability,
        Address,
        Type,
        Description,
      });
    });
  }, [eventId]);

  const submitForm = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (isEmpty(eventObj.Name)) return errorToast("Event Name is required!");
    if (isEmpty(eventObj.Location))
      return errorToast("Event Location required!");
    if (!isValidDate(eventObj.Time)) return errorToast("Date is required!");
    // if (isEmpty(eventObj.TicketPrice))
    //   return errorToast("Ticket Price required!");
    if (isEmpty(eventObj.Address)) return errorToast("Address is required!");
    if (isEmpty(eventObj.Type)) return errorToast("Type is required!");
    if (isEmpty(eventObj.Availability))
      return errorToast("Availability is required!");
    if (isEmpty(eventObj.Description))
      return errorToast("Description is required!");
    else {
      setLoading(true);

      axiosInstance
        .patch("/admin/updateEvent", eventObj)
        .then((res) => {
          console.log(res);
          if (res.status === 200 && res.data.isEventUpdated) {
            successToast("Event Updated Successfully!");
            router.push("/eventPage");
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
    setEventObj({ ...eventObj, [updateType]: value });
  };

  console.log(eventObj);

  return (
    <>
      <TitleCard title="Update Event" topMargin="mt-2">
        <form onSubmit={(e) => submitForm(e)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputText
              labelTitle="Name"
              defaultValue={eventObj.Name}
              updateType="Name"
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="Location"
              defaultValue={eventObj.Location}
              updateType={"Location"}
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="Time"
              defaultValue={eventObj.Time}
              updateType={"Time"}
              placeholder="YYYY-MM-DD"
              type="date"
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="Ticket Price"
              defaultValue={eventObj.TicketPrice}
              updateType={"TicketPrice"}
              updateFormValue={updateFormValue}
            />
            <InputText
              labelTitle="Address"
              defaultValue={eventObj.Address}
              updateType={"Address"}
              updateFormValue={updateFormValue}
            />
            <Select
              labelTitle={"Type"}
              defaultValue={"Conferences"}
              updateFormValue={updateFormValue}
              options={["Conferences", "Trade shows", "Seminear", "Workshop"]}
              updateType={"Type"}
            />
            <Select
              labelTitle={"Availability"}
              defaultValue={"Available"}
              updateFormValue={updateFormValue}
              options={["Available", "Not Available"]}
              updateType={"Availability"}
            />
            <TextAreaInput
              labelTitle={"Description"}
              placeholder={"Write aobut event"}
              defaultValue={eventObj.Description}
              updateType={"Description"}
              updateFormValue={updateFormValue}
            />
          </div>
          <div className="mt-16">
            <button type="submit" className="btn btn-primary float-right">
              Update Event
            </button>
          </div>
        </form>
      </TitleCard>
    </>
  );
}

export default EditEvent;
