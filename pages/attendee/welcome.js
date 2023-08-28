import { useAuth } from "./util/authcontext";
import Navbar from "./layout/navbar";

export default function Welcome()
{
    const{user}=useAuth()
    console.log(user)
    return(
        <>
        
        <div>

            
        
        </div>
        </>
    )
}