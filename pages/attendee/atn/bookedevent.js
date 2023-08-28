import { useEffect, useState } from "react";

import axios from "axios";
import { useRouter } from "next/router";
import Loading from "../layout/loading";
import Navbar from "../layout/navbar";
import { useAuth } from "../util/authcontext";

export default function BookedEvent() {
    const [bookedEvents, setBookedEvents] = useState([]);
    const{user,checkUser}=useAuth()
    const router=useRouter()
const Id=user.Id
    useEffect(() => {
        async function getBookedEvents() {
            if(!checkUser)
            {
                router.push("attendee/login")
            }
            try {
                const response = await axios.get('http://localhost:3000/attendee/getbookeventfromaid/'+Id,{
                    withCredentials: true
                  });
                setBookedEvents(response.data);
            } catch (err) {
                console.log(err.response.data);
            }
        }
        getBookedEvents();
    }, []);
    if(bookedEvents==[])
    {
        return(
            <><Loading/></>
        )
    }

    const deleteEvent = async (eventId) => {
        try {
            await axios.delete("http://localhost:3000/attendee/deletebookedevent/"+Id+"/"+eventId,{
                withCredentials: true
              });
            setBookedEvents(prevEvents => prevEvents.filter(event => event.Id !== eventId));
            alert("Event deleted")
        } catch (err) {
            alert(err.response.data.message);
        }
    };
    

    return (
        <>
            <Navbar/>
            <div className="flex flex-wrap justify-center space-x-4">
                {bookedEvents.map(event => (
                    <div className="bg-white p-4 rounded-lg shadow-md mb-4 w-96" key={event.Id}>
                        <p>Id: {event.Id}</p>
                        <h2 className="text-xl font-semibold">{event.Name}</h2>
                        <p>Location: {event.Location}</p>
                        <p>Event Time: {event.Time}</p>
                        <p>Ticket Price: {event.TicketPrice}</p>
                        <p>Address: {event.Address}</p>
                        <p>Type: {event.Type}</p>
                        <p>Description: {event.Description}</p>
                        <p>Discount: {event.Discount}</p>
                        <p>Ticket Number: {event.TicketNumber}</p>
                        <button
                            className="btn bg-red-500 text-white hover:bg-black  mt-2"
                            onClick={() => deleteEvent(event.Id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
            
        </>
    );
}
