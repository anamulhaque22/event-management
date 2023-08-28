import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../layout/loading";
import Navbar from "../layout/navbar";

export default function Servery() {
  const [qusserv, SetqusSer] = useState(null);

  useEffect(() => {
    async function getqus() {
      try {
        const response = await axios.get('http://localhost:3000/attendee/serveyqus',{
          withCredentials: true
        });
        SetqusSer(response.data);
      } catch (error) {
        console.error("Error fetching survey questions:", error);
      }
    }
    getqus();
  }, []);

  if (qusserv === null) {
    return (
      <><Loading/></>
    );
  }

  return (<><Navbar/>
    <div className="grid grid-cols-1 gap-4">
      {qusserv.map((question) => (
        <div key={question.Id} className="p-4 border border-gray-300 rounded shadow">
          <p className="mb-2">{question.Question}</p>
          
          <Link href={`attendee/atn/answer/${question.Id}`}>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
          </Link>
        </div>
      ))}
    </div></>
  );
}
