// import moment from "moment"
// import { RECENT_TRANSACTIONS } from "../../utils/dummyData";
import axiosInstance from "@/utils/axiosInstance";
import { errorToast, successToast } from "@/utils/formValidation";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import TitleCard from "../shared/TitleCard";

function AttendeeList() {
  const [attendeeList, setAttendeeList] = useState([]);

  const deleteCurrentAttendee = (index) => {
    axiosInstance
      .get(`/admin/deleteAttendee/${index}`)
      .then((res) => {
        if (res.status === 200) {
          successToast("Attendee Deleted Successfully");
          setAttendeeList(attendeeList.filter((item) => item.Id !== index));
        } else {
          errorToast("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axiosInstance
      .get("/admin/getAttendeeList")
      .then((res) => {
        console.log(res.data);
        setAttendeeList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <TitleCard title="Event Organizer List" topMargin="mt-2">
        {/* Team Member list in table format loaded constant */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Phone</th>
                <th>DOB</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {attendeeList?.map((e, index) => {
                const {
                  Id,
                  Name,
                  Email,
                  Phonenumber,
                  Dob,
                  PhotoName,
                  Username,
                } = e;
                return (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-circle w-12 h-12">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/getimage/${PhotoName}`}
                              alt="Avatar"
                              height={100}
                              width={100}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{Name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{Email}</td>
                    <td>{Username}</td>
                    <td>{Phonenumber}</td>
                    <td>{Dob}</td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentAttendee(Id)}
                      >
                        <TrashIcon className="w-5" />
                      </button>
                      <Link
                        href={`/editAttendee/${Id}`}
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

export default AttendeeList;
