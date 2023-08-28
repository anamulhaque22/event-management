import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "../../layout/navbar";
import { useAuth } from "../../util/authcontext";

export default function Answer() {
  const router = useRouter();
  const [qus, setQus] = useState([]);
  const [formData, setFormData] = useState({
    Answer: "",
    Question: "",
  });
const{user,checkUser}=useAuth()
const Id=user.Id
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get('http://localhost:3000/attendee/serveyqus',{
          withCredentials: true
        });
        setQus(response.data);
      } catch (error) {
        console.error("Error fetching survey questions:", error);
      }
    }
    fetchQuestions();
  }, []);

  useEffect(() => {
    if(!checkUser)
    {
      router.push("/login")
    }
    const { id } = router.query;
    if (id) {
      const matchedQuestion = qus.find(question => question.Id === parseInt(id));
      if (matchedQuestion) {
        setFormData(prevData => ({
          ...prevData,
          Question: matchedQuestion.Question
        }));
      }
    }
  }, [router.query, qus]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/attendee/addsurvey/'+Id, formData,{
        withCredentials: true
      });
      console.log("Answer submitted:", response.data);
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  return (
    <div>
        <Navbar/>
      <form onSubmit={handleSubmit} className="p-4 border border-gray-300 rounded shadow">
        <div className="mb-4">
          <label htmlFor="answer" className="block mb-1 font-medium">
            Answer:
          </label>
          <textarea
            id="answer"
            name="Answer"
            rows="4"
            value={formData.Answer}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="question" className="block mb-1 font-medium">
            Question:
          </label>
          <input
            type="text"
            id="question"
            name="Question"
            value={formData.Question}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            readOnly
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
