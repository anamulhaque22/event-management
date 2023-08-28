import LeftSidebar from "./LeftSidebar";
import PageContent from "./PageContent";

function Layout({ children }) {
  return (
    <>
      {/* Left drawer - containing page content and side bar (always open) */}
      <div className="drawer lg:drawer-open">
        <input
          id="left-sidebar-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <PageContent>{children}</PageContent>
        <LeftSidebar />
      </div>
    </>
  );
}

export default Layout;
