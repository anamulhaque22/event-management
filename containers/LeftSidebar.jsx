import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import Image from "next/image";
import Link from "next/link";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

function LeftSidebar() {
  const close = (e) => {
    document.getElementById("left-sidebar-drawer").click();
  };

  return (
    <div className="drawer-side">
      <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
      <ul className="menu  pt-2 w-80 h-full bg-base-100 text-base-content text-base">
        <button
          className="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden"
          onClick={() => close()}
        >
          <XMarkIcon className="h-5 inline-block w-5" />
        </button>

        <li className="mb-2 font-semibold text-xl">
          <Link href={"/app/welcome"}>
            <Image
              width={100}
              height={100}
              className="mask mask-squircle w-10"
              src="/logo192.png"
              alt="Admin Logo"
            />
            Admin Dashboard
          </Link>{" "}
        </li>
        <li>
          <Link href={""}>
            <Squares2X2Icon className={iconClasses} /> Dashboard
          </Link>
        </li>
        <li>
          <details>
            <summary>Event Organizer</summary>
            <ul className="p-2 bg-base-100 text-sm">
              <li>
                <Link href={"/eventOrganizerPage"}>Event Organizer List</Link>
              </li>
              <li>
                <Link href={"/addEventOrganizer"}>Add Event Organizer</Link>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary>Attendee</summary>
            <ul className="p-2 bg-base-100 text-sm">
              <li>
                <Link href={"/attendeePage"}>Attendee List</Link>
              </li>
              <li>
                <Link href={"/addAttendee"}>Add Attendee</Link>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary>Event</summary>
            <ul className="p-2 bg-base-100 text-sm">
              <li>
                <Link href={"/eventPage"}>Event List</Link>
              </li>
              <li>
                <Link href={"/addEvent"}>Add Event</Link>
              </li>
            </ul>
          </details>
        </li>
        {/* <li>
          <details>
            <summary>Settings</summary>
            <ul className="p-2 bg-base-100 text-sm">
              <li>
                <Link href={"/profileSettings"}>Update Profile</Link>
              </li>
            </ul>
          </details>
        </li> */}
      </ul>
    </div>
  );
}

export default LeftSidebar;
