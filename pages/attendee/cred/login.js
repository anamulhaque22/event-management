import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import AlertBad from "../layout/alertbad";
import Footer from "../layout/footer";
import { useAuth } from "../util/authcontext";

export default function Login()
{
  const { login } = useAuth();
    const router=useRouter()
    const[error,Sererror]=useState()
    const [formdata,setFormdata]=useState({
        Username:"",
        Password:""
     })
     function keychange(e)
     {
        const{name,value}=e.target
        setFormdata(prev=>{return({
            ...prev,
            [name]:value
        })})
     }
    async function submit(e){
        e.preventDefault();
        if(formdata.Username==""||formdata.Password=="")
        {
            alert("fill Up properly")
            return
        }
        try{
        const response=await axios.post('http://localhost:3000/attendee/login',formdata,
        {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            withCredentials: true
            }
        )
        
      
        
       login(response.data.Data.Id,document.cookie)
        setFormdata({Username:"",Password:""})
        router.push("/atn/event")
        }
        catch(err){
            //alert(err.response.data.message)
            Sererror(err.response.data.message)
        }
        
     }
     return(
        <>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={submit} method="Post">
          <div className="mb-4">
            <label htmlFor="Username" className="block text-sm font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              name="Username"
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
              value={formdata.Username}
              onChange={keychange}
             
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="Password"
              name="Password"
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
              value={formdata.Password}
              onChange={keychange}
             
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-700">
          Need an account?{" "}
          <Link
            href="attendee/cred/regis"
            className="font-medium text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
        <p className="mt-4 text-sm text-center text-gray-700">
        <Link
            href="attendee/cred/forgetpass"
            className="font-medium text-blue-600 hover:underline"
          >
          Forgot Password?
          </Link>
        </p>
        {error && (
        <div className="container mx-auto mt-5">
          <AlertBad Is={error} />
        </div>)}
      </div>
      
    </div>
    <Footer/>
        </>
     )
}