import FullPageLayout from "@/containers/FullPageLayout";
import Layout from "@/containers/Layout";
import "@/styles/globals.css";
import { AuthProvider } from "@/utils/authContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps, router }) {
  // Check if the current route is the login page
  const isLoginPage =
    router.pathname === "/login" ||
    router.pathname === "/register" ||
    router.pathname === "/forgotPassword";

  const RenderLayout = isLoginPage ? FullPageLayout : Layout;

  return (
    <RenderLayout>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <ToastContainer />
    </RenderLayout>
  );
}
