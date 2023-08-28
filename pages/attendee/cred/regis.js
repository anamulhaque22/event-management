import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import AlertBad from "../layout/alertbad";

export default function Regis()
{const[error,Sererror]=useState()
  const [form, Setform] = useState({
    Name: "",
    Username: "",
    Password: "",
    Email: "",
    Dob: "",
    Phonenumber: "",
    image: null, 
  });

  function change(e) {
    const { id, value } = e.target;
    Setform((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  }

  function changefile(e) {
    Setform((prev) => {
      return {
        ...prev,
        image: e.target.files[0], 
      };
    });
  }

  async function submit(e) {
    e.preventDefault();
    if(form.Name==""||form.Username==""||form.Password==""||form.Email==""||form.image==""||form.Phonenumber==""||form.Dob=="")
    {
      alert("Fill up propely")
      return
    }
    const phoneNumberRegex = /^01\d{9}$/;
    if(!phoneNumberRegex.test(form.Phonenumber))
    {
      alert("Phonenumber should saart with 01 and have 11 numbers")
      return
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])/;
    if(!passwordRegex.test(form.Password))
    {
      alert("Passworf should have atleast one uppercase and one lower case")
      return
    }






    try {
      const formData = new FormData();
      formData.append("image", form.image);
      formData.append("Name", form.Name);
      formData.append("Username", form.Username);
      formData.append("Password", form.Password);
      formData.append("Email", form.Email);
      formData.append("Dob", form.Dob);
      formData.append("Phonenumber", form.Phonenumber);
     
      const response = await axios.post('http://localhost:3000/attendee/addattendee', formData);
      Setform({Name: "",
      Username: "",
      Password: "",
      Email: "",
      Dob: "",
      Phonenumber: "",
      image: null,})
      console.log(response);
      alert("Done")
    } catch (e) {
      Sererror(e.response.data.message)

    }
  }
  return(
    <>
    
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">Registration</h1>
        <form className="mt-6" method="Post" onSubmit={submit}>
          <div className="mb-4">
            <label
              htmlFor="Name"
              className="block text-sm font-semibold text-gray-800"
            >
              Name
            </label>
            <input
              type="text" value={form.Name} id="Name" onChange={change}
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
              type="Username" value={form.Username} id="Username" onChange={change}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="Username"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="Password" value={form.Password} id="Password" onChange={change}
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
              type="Email" value={form.Email} id="Email" onChange={change}
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
              type="text" value={form.Phonenumber} id="Phonenumber" onChange={change}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <input
  type="date" value={form.Dob} id="Dob" onChange={change}
  className="border rounded px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
          
<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
<input  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="image" type="file" onChange={changefile}></input>

          
          <div className="mt-2">
            <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Register
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-700">
          Already have an account?{" "}
          <Link
            href="attendee/cred/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
        {error && (
        <div className="container mx-auto mt-5">
          <AlertBad Is={error} />
        </div>)}
      </div>
    </div>
    </>
  )
    
}