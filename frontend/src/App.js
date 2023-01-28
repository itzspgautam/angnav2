import React from "react";

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header/Header";
import Events from "./Pages/Events";
import Contests from "./Pages/Contests";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getuser } from "./Redux/Actions/UserActions";
import ContestDetails from "./Pages/ContestDetails";
import Profile from "./Pages/Profile";
import Protected from "./ProtectedRoute/Protected";
import ContestParticipate from "./Components/Contest/ContestParticipate";
import { ParticipationDetails } from "./Components/Contest/ParticipationDetails";
import EventDetails from "./Pages/EventDetails";
import Updates from "./Pages/Updates";
import UpdateDetails from "./Pages/UpdateDetails";
import Contact from "./Pages/Contact";
import Footer from "./Components/Footer/Footer";
import About from "./Pages/About";
import Layout from "./Layout/Layout";
import { AdminRoot } from "./Admin/AdminRoot";
import { ModsRoots } from "./Mods/ModsRoot";

function App() {
  const { isAuthenticated } = useSelector((state) => state.User);
  const Dispatch = useDispatch();

  useEffect(() => {
    Dispatch(getuser());
  }, [isAuthenticated, Dispatch]);

  return (
    <>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <Layout>
              <Protected>
                <AdminRoot />
              </Protected>
            </Layout>
          }
        />
        <Route
          path="/mods/*"
          element={
            <Layout>
              <Protected>
                <ModsRoots />
              </Protected>
            </Layout>
          }
        />
        <Route
          path="/*"
          element={
            <Layout>
              <Header />
              <div className="App">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/events/:id" element={<EventDetails />} />
                  <Route path="/events/category/:id" element={<Events />} />

                  <Route path="/updates" element={<Updates />} />
                  <Route path="/updates/:id" element={<UpdateDetails />} />
                  <Route path="/updates/category/:id" element={<Updates />} />

                  <Route path="/contests" element={<Contests />} />
                  <Route path="/contests/:id" element={<ContestDetails />} />
                  <Route
                    path="/contests/:id/participate"
                    element={
                      <Protected>
                        <ContestParticipate />
                      </Protected>
                    }
                  />

                  <Route
                    path="/contests/participation/details/:id"
                    element={<ParticipationDetails />}
                  />

                  <Route
                    path="/profile"
                    element={
                      <Protected>
                        <Profile />
                      </Protected>
                    }
                  />
                  <Route
                    path="/profile/:tab"
                    element={
                      <Protected>
                        <Profile />
                      </Protected>
                    }
                  />

                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </div>
              <Footer />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
