import { Suspense, useRef } from "react";
import Header from "./Header";
import SuspenseContent from "./SuspenseContent";

function PageContent({ children }) {
  const mainContentRef = useRef(null);
  // console.log("PageContent: ", children);

  return (
    <div className="drawer-content flex flex-col ">
      <Header />
      <main
        className="flex-1 overflow-y-auto pt-8 px-6  bg-base-200"
        ref={mainContentRef}
      >
        <Suspense fallback={<SuspenseContent />}>{children}</Suspense>
        <div className="h-16"></div>
      </main>
    </div>
  );
}

export default PageContent;
