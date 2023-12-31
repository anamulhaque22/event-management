import { useAdminAuth } from "@/utils/authContext";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
// import { themeChange } from "theme-change";

function Header() {
  const {logout, checkUser} = useAdminAuth()
  const router = useRouter();
  function logoutUser() {
    logout()
    localStorage.clear();
    // window.location.href = "/";
  }
  useEffect(() => {
   if(!checkUser()) {
    router.push('/login')
   }
  }, [])

  return (
    <>
      <div className="navbar  flex justify-between bg-base-100  z-10 shadow-md ">
        {/* Menu toogle for mobile view or small screen */}
        <div className="">
          <label
            htmlFor="left-sidebar-drawer"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <Bars3Icon className="h-5 inline-block w-5" />
          </label>
          <h1 className="text-2xl font-semibold ml-2">{"pageTitle"}</h1>
        </div>

        <div className="order-last">
          {/* Multiple theme selection, uncomment this if you want to enable multiple themes selection, 
                also includes corporate and retro themes in tailwind.config file */}

          {/* <select className="select select-sm mr-4" data-choose-theme>
                    <option disabled selected>Theme</option>
                    <option value="light">Default</option>
                    <option value="dark">Dark</option>
                    <option value="corporate">Corporate</option>
                    <option value="retro">Retro</option>
                </select> */}

          {/* Light and dark theme selection toogle **/}

          {/* Profile icon, opening menu on click */}
          <div className="dropdown dropdown-end ml-4">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" alt="profile" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="justify-between">
                <Link href={"/app/settings-profile"}>
                  Profile Settings
                  <span className="badge">New</span>
                </Link>
              </li>
              <li className="">
                <Link href={"/app/settings-billing"}>Bill History</Link>
              </li>
              <div className="divider mt-0 mb-0"></div>
              <li>
                <a onClick={logoutUser}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
