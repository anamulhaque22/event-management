import axios from "axios";
import { useState } from "react";

export default function Forgetpass()
{
    const[username,setusername]=useState({
        Username:""
    })
    const[cchangepass,SetChangepass]=useState({
      Username:"",
      Password:"",
      Otp:""
    })
   async function getotp(e)
    { e.preventDefault();
        if(username.Username=="")
        {
            alert("Give username")
            return
        }
        try{
        const response=await axios.get("http://localhost:3000/attendee/forgetpass/"+username.Username)
        alert("Otp sent")
        setusername({Username:""})
        }
        catch(err){
            alert(err.response.data.message)
        }
    }
    function changeusername(e)
    {
        const { id, value } = e.target;
    setusername((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
    
    }
    function changepass(e)
    {
        const { id, value } = e.target;
    SetChangepass((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
    
    }
 async   function changepassaction(e)
    {
      e.preventDefault();
      if(cchangepass.Username==""||cchangepass.Password==""||cchangepass.Otp=="")
      {
        alert("Fill up properly")
        return
      }
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])/;
    if(!passwordRegex.test(cchangepass.Password))
    {
      alert("Passworf should have atleast one uppercase and one lower case")
      return
    }
    try{
     const response=await axios.post("http://localhost:3000/attendee/chnagepassword",cchangepass)
     alert("Password changed")
    }
    catch (e) {
      alert(e.response.data.message);

    }

    }
    return(
        <>
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">Get Otp</h1>
        <form className="mt-6" onSubmit={getotp}>
          <div className="mb-4">
            <label
              htmlFor="Username"
              className="block text-sm font-semibold text-gray-800"
            >
              Username
            </label>
            <input
              type="text" id="Username" onChange={changeusername} value={username.Username}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          
         
          <div className="mt-2">
            <button type="submit"className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Getotp
            </button>
          </div>
        </form>
        <br/>
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">Change Password</h1>
        <form className="mt-6" method="Post" onSubmit={changepassaction}>
          <div className="mb-4">
            <label
              htmlFor="Username"
              className="block text-sm font-semibold text-gray-800"
            >
              Username
            </label>
            <input
              type="text" id="Username" value={cchangepass.Username} onChange={changepass}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="Password" id="Password" value={cchangepass.Password} onChange={changepass}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Otp"
              className="block text-sm font-semibold text-gray-800"
            >
              Otp
            </label>
            <input
              type="text" id="Otp" value={cchangepass.Otp} onChange={changepass}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
         
          <div className="mt-2">
            <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Change password
            </button>
          </div>
        </form>

       
        
      </div>
    </div>
       
       
      </div>
    </div>
        
        
        </>
    )
}