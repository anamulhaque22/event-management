import React, { useEffect, useState } from "react";

import axios from "axios";
import Navbar from "../layout/navbar";
import { useRouter } from "next/router";
import { useAuth } from "../util/authcontext";
import Loading from "../layout/loading";

export default function Events() {
    const [eventdata, setEventdata] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const{user}=useAuth()
    const router=useRouter()
    const Id=user.Id
    useEffect(() => {
        async function getattendee() {
            if(Id=='')
            {
                router.push("/login")
            }
            try {
                const response = await axios.get('http://localhost:3000/attendee/events',{
                    withCredentials: true
                  });
                console.log(response.data[0].Id);
                setEventdata(response.data);
            } catch (err) {
                console.log(err.response.data);
            }
        }
        getattendee();
    }, []);

    const openDetails = (event) => {
        setSelectedEvent(event);
    };

    const closeDetails = () => {
        setSelectedEvent(null);
    };

   async function bookEvent(e)
   {
console.log(e)
try{
    const response= await axios.post('http://localhost:3000/attendee/bookevent/'+e.Id+"/"+Id+"/"+0,{
        withCredentials: true
      })
    alert("Event booked")
}
catch(err){
    alert(err.response.data.message)
}
   }
    if (eventdata == null) {
        return (
            <><Loading/></>
        );
    }

    const eventCards = eventdata.map(event => (
        <div className="card w-96 bg-blue-500 text-white p-4 mb-4" key={event.Id}>
            <div className="card-body">
                <h2 className="card-title text-xl font-semibold">{event.Name}</h2>
              
                <p>{event.Location}</p>
                <p>{event.TicketPrice}</p>
                <div className="card-actions justify-between">
                    <button
                        className="btn bg-white text-blue-500 hover:bg-blue-700 hover:text-white"
                        onClick={() => openDetails(event)}
                    >
                        Details
                    </button>
                    <button
                        className="btn bg-green-500 text-white hover:bg-green hover:text-white"
                        onClick={() => bookEvent(event)}
                    >
                        Book Event
                    </button>
                </div>
            </div>
        </div>
    ));

    return (
        <>
           <Navbar/>
            <div className="flex flex-wrap justify-center space-x-4">
                {eventCards}
            </div>
       

            {selectedEvent && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="bg-white p-4 w-96 rounded-lg shadow-md">
                    <p>Id: {selectedEvent.Id}</p>
                        <h2>{selectedEvent.Name}</h2>
                        <p>Location: {selectedEvent.Location}</p>
                        <p>Time: {selectedEvent.Time}</p>
                        <p>Ticket Price: {selectedEvent.TicketPrice}</p>
                        <p>Description: {selectedEvent.Description}</p>
                        <button className="btn bg-blue-500 text-white hover:bg-blue-700  mt-2" onClick={closeDetails}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
}
