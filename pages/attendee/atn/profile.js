import axios from "axios";

import { useEffect, useState } from "react"
import { useIdContext } from "../context";
import { useAuth } from "../util/authcontext";
import Navbar from "../layout/navbar";
import { useRouter } from "next/router";
import Loading from "../layout/loading";

export default function Profile()
{
  const{user,checkUser}=useAuth()
  const Id=user.Id
    const[attendeedata,setAttendeedata]=useState()
    const[res,setres]=useState("")
    const router=useRouter()
    
   

    console.log(user)
    useEffect(()=>{
        async function getdata(){
          
    if(!checkUser())
    {
      router.push('/login')
    }
            
            try{
               const response=await axios.get('http://localhost:3000/attendee/getattendee/'+Id,{
                withCredentials: true
              })
               setAttendeedata(response.data)
            }
            catch(err)
            {
                console.log(err.response.data)
            }
        }
        getdata()
    },[])
    if(attendeedata==null||Id==null)
    {
        return(
            <>
              <div><Loading/></div>
            </>
        )
    }
    console.log(attendeedata)
    function change(e)
    {
        const{id,value}=e.target
        setAttendeedata(prev=>{return({
            ...prev,
            [id]:value
        })})
    }
    async function submit(e)
    {
        e.preventDefault();
         if(attendeedata.Name==""||attendeedata.Username==""||attendeedata.Email==""||attendeedata.Phonenumber=="")
    {
      alert("Fill up propely")
      return
    }
    const phoneNumberRegex = /^01\d{9}$/;
    if(!phoneNumberRegex.test(attendeedata.Phonenumber))
    {
      alert("Phonenumber should saart with 01 and have 11 numbers")
      return
    }
    
        try{
            const response =await axios.put('http://localhost:3000/attendee/updateattendee/'+Id,attendeedata,{
                withCredentials: true
              })
           
            alert("Updated")
        }
        catch(err)
        {
           
         alert(err.response.data.message)
        }
    }
    async function deleteid()
    {
        try{
            const delresponse= await axios.delete('http://localhost:3000/attendee/deleteattendee/'+Id)
            console.log(delresponse.data)
            setres("Deleted")
            localStorage.setItem('cookie', "")
            localStorage.setItem('Id', "")
            router.push('./login')

        }
        catch(err)
        {
            console.log(err.response)
            setres(err.response)
        }
    }
    return(
        <>
        <Navbar/>

        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
      <div className="relative">
  <div className="absolute top-0 right-0 w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
    <img
      src={'http://localhost:3000/attendee/getimage/'+ Id}
      alt="User Profile"
      className="w-full h-full object-cover"
    />
  </div>
</div>
        <h1 className="text-3xl font-bold text-center text-gray-700">Logo</h1>
        
        <form className="mt-6" method="Post" onSubmit={submit}>
          <div className="mb-4">
            <label
              htmlFor="Name"
              className="block text-sm font-semibold text-gray-800"
            >
              Name
            </label>
            <input
              type="text" value={attendeedata.Name} id="Name" onChange={change}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="Username"
              className="block text-sm font-semibold text-gray-800"
            >
              Username
            </label>
            <input
              type="Username" value={attendeedata.Username} id="Username" onChange={change}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          
          <div className="mb-2">
            <label
              htmlFor="Email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="Email" value={attendeedata.Email} id="Email" onChange={change}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="Phonenumber"
              className="block text-sm font-semibold text-gray-800"
            >
              Phonenumber
            </label>
            <input
              type="text" value={attendeedata.Phonenumber} id="Phonenumber" onChange={change}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <input
  type="date" value={attendeedata.Dob} id="Dob" onChange={change}
  className="border rounded px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
          


          
          <div className="mt-2">
            <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Register
            </button>
          </div>
        </form>

        
      </div>
    </div>
        </>
    )
    
}