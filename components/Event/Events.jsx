// import moment from "moment"
// import { RECENT_TRANSACTIONS } from "../../utils/dummyData";
import axiosInstance from "@/utils/axiosInstance";
import { successToast } from "@/utils/formValidation";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import Link from "next/link";
import { useEffect, useState } from "react";
import TitleCard from "../shared/TitleCard";

function Events() {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/admin/getEvent")
      .then((res) => {
        setEventList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const deleteCurrentLead = (index) => {
    axiosInstance
      .delete(`/admin/deleteEvent/${index}`)
      .then((res) => {
        if (res.status === 200) {
          setEventList(eventList.filter((e) => e.Id !== index));
          successToast("Event Deleted Successfully!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <TitleCard title="Recent Transactions" topMargin="mt-2">
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Location</th>
                <th>Time</th>
                <th>Ticket Price</th>
                <th>Availability</th>
                <th>Address</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {eventList?.map((e, index) => {
                const {
                  Id,
                  Name,
                  Location,
                  Time,
                  TicketPrice,
                  Availability,
                  Address,
                  Type,
                } = e;
                return (
                  <tr key={Id}>
                    <td>{Id}</td>
                    <td>{Name}</td>
                    <td>{Location}</td>
                    <td>{Time}</td>
                    <td>${TicketPrice}</td>
                    <td>{Availability}</td>
                    <td>{Address}</td>
                    <td>{Type}</td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentLead(Id)}
                      >
                        <TrashIcon className="w-5" />
                      </button>
                      <Link
                        href={`/editEvent/${Id}`}
                        className="btn btn-square btn-ghost"
                      >
                        <PencilSquareIcon className="w-5" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Events;
