import FullPageLayout from "@/containers/FullPageLayout";
import Layout from "@/containers/Layout";
import "@/styles/globals.css";
import { AdminAuthProvider } from "@/utils/authContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./attendee/util/authcontext";

export default function App({ Component, pageProps, router }) {
  
  const isLoginPage =
    router.pathname === "/login" ||
    router.pathname === "/register" ||
    router.pathname === "/forgotPassword";

  const RenderLayout = isLoginPage ? FullPageLayout : Layout;

 
  // Check if the current route is the login page


  return (
    <AdminAuthProvider>
      <AuthProvider>
      <RenderLayout>
        <Component {...pageProps} />
    <ToastContainer />
    </RenderLayout>
      </AuthProvider>
       
      </AdminAuthProvider>
  );
}
