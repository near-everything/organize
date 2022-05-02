import React, { useEffect, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "./features/auth/authSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebase } from "./app/firebase";
import { initNear } from "./app/near";

const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  const dispatch = useDispatch();
  const auth = getAuth(firebase);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser(user.uid))
    } else {
      dispatch(setUser(null))
    }
  })
  
  useEffect(() => {
    initNear()
  }, [])
  

  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Private route */}
          <Route element={<PrivateRoute />}>
            <Route path="/*" element={<Layout />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

function PrivateRoute() {
  const user = useSelector(selectUser);
  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default App;
