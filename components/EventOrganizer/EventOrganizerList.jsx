// import moment from "moment"
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
// import { RECENT_TRANSACTIONS } from "../../utils/dummyData";
import axiosInstance from "@/utils/axiosInstance";
import { successToast } from "@/utils/formValidation";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SearchBar from "../Input/SearchBar";
import TitleCard from "../shared/TitleCard";

const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {
  //   const [filterParam, setFilterParam] = useState("");
  //   const [searchText, setSearchText] = useState("");
  //   const locationFilters = ["Paris", "London", "Canada", "Peru", "Tokyo"];

  //   const showFiltersAndApply = (params) => {
  //     applyFilter(params);
  //     setFilterParam(params);
  //   };

  //   const removeAppliedFilter = () => {
  //     removeFilter();
  //     setFilterParam("");
  //     setSearchText("");
  //   };

  //   useEffect(() => {
  //     if (searchText == "") {
  //       removeAppliedFilter();
  //     } else {
  //       applySearch(searchText);
  //     }
  //   }, [searchText]);

  return (
    <div className="inline-block float-right">
      <SearchBar
        // searchText={searchText}
        styleClass="mr-4"
        // setSearchText={setSearchText}
      />
      {/* {filterParam != "" && (
        <button
          onClick={() => removeAppliedFilter()}
          className="btn btn-xs mr-2 btn-active btn-ghost normal-case"
        >
          {filterParam}
          <XMarkIcon className="w-4 ml-2" />
        </button>
      )} */}
      <div className="dropdown dropdown-bottom dropdown-end">
        <label tabIndex={0} className="btn btn-sm btn-outline">
          <FunnelIcon className="w-5 mr-2" />
          Filter
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52"
        >
          {/* {locationFilters.map((l, k) => {
            return (
              <li key={k}>
                <a onClick={() => showFiltersAndApply(l)}>{l}</a>
              </li>
            );
          })} */}
          <div className="divider mt-0 mb-0"></div>
          <li>
            <a onClick={() => removeAppliedFilter()}>Remove Filter</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

function EventOrganizerList() {
  const [eventOrganizerList, setEventOrganizerList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalConformation, setModalConformation] = useState(false);

  const close = (e) => {
    setIsOpen(false);
  };

  //   const removeFilter = () => {
  //     setTrans(RECENT_TRANSACTIONS);
  //   };

  //   const applyFilter = (params) => {
  //     let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => {
  //       return t.location == params;
  //     });
  //     setTrans(filteredTransactions);
  //   };

  //   // Search according to name
  //   const applySearch = (value) => {
  //     let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => {
  //       return (
  //         t.email.toLowerCase().includes(value.toLowerCase()) ||
  //         t.email.toLowerCase().includes(value.toLowerCase())
  //       );
  //     });
  //     setTrans(filteredTransactions);
  //   };

  const deleteCurrentOrganizer = (index) => {
    axiosInstance
      .get(`/admin/deleteEventOrganizer/${index}`)
      .then((res) => {
        if (res.status === 200) {
          successToast("Event Organizer Deleted Successfully");
          setEventOrganizerList(
            eventOrganizerList.filter((item) => item.Id !== index)
          );
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
      .get("/admin/getEventOrganizerList")
      .then((res) => {
        console.log(res.data);
        setEventOrganizerList(res.data);
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
                <th>Location</th>
                <th>DOB</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {eventOrganizerList?.map((e, index) => {
                const {
                  Id,
                  Name,
                  Email,
                  eventsecret,
                  Phonenumber,
                  Address,
                  DOB,
                  Photo,
                } = e;
                return (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-circle w-12 h-12">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/getimage/${Photo}`}
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
                    <td>{eventsecret.Username}</td>
                    <td>{Phonenumber}</td>
                    <td>{Address}</td>
                    <td>{DOB}</td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentOrganizer(Id)}
                      >
                        <TrashIcon className="w-5" />
                      </button>
                      <Link
                        href={`/editEventOrganizer/${Id}`}
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

export default EventOrganizerList;
