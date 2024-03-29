import React, { lazy, Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import ThemedSuspense from "../components/ThemedSuspense";
import Main from "../pages/Main";

const Organize = lazy(() => import("../pages/Organize"));
const Item = lazy(() => import("../pages/Item"));
const Page404 = lazy(() => import("../pages/404"));

function Layout() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-black text-black dark:text-white">
      <div className="flex flex-col flex-1 w-full">
        <main className="container mx-auto h-full overflow-y-auto">
          <Suspense fallback={<ThemedSuspense />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>

    // <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
    //   <div className="flex flex-col flex-1 w-full">
    //     <Header />
    //     <Main>
    //       <Suspense fallback={<ThemedSuspense />}>
    //         <Routes>
    //           <Route path={"/"} element={<Organize />} />
    //           <Route path="item/:itemId" element={<Item />} />
    //           <Route element={<Page404 />} />
    //         </Routes>
    //       </Suspense>
    //     </Main>
    //   </div>
    // </div>
  );
}

export default Layout;
