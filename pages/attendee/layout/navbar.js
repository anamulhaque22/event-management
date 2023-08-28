import Link from "next/link"; // Import the Link component
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../util/authcontext";

export default function Navbar() {
  const { user, logout, checkUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    checkSession();
  }, []);

  function checkSession() {
    const cookie = localStorage.getItem("cookie");
    const Id = localStorage.getItem("Id");
    if (!checkUser()) {
      router.push('/cred/login');
    } else {
      // Handle other cases if needed
    }
  }

  const handleLogout = () => {
    logout();
    router.push('/cred/login');
  };

  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        <div className="flex space-x-4">
          <Link href="attendee/atn/event">
            <button className="text-white hover:underline">Event</button>
          </Link>
          <Link href="attendee/atn/bookedevent">
            <button className="text-white hover:underline">BookedEvent</button>
          </Link>
          <Link href="attendee/atn/profile">
            <button className="text-white hover:underline">Profile</button>
          </Link>
          <Link href="attendee/atn/survey">
            <button className="text-white hover:underline">Survey</button>
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
