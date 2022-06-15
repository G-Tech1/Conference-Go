import Nav from "./Nav";
import React from 'react'
import AttendeeList from "./AttendeesList";
import LocationForm from "./LocationForm";
import ConferenceForm from "./ConferenceForm";
import AttendConferenceForm from "./AttendConferenceForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PresentationForm from "./PresentationForm";
import MainPage from "./MainPage";

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
    return (
      <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route>
            <Route index element={<MainPage />} />
          </Route>
          <Route path="locations">
            <Route path="new" element={<LocationForm />} />
          </Route>
          <Route path="conferences">
            <Route path="new" element={<ConferenceForm />} />
          </Route>
          <Route path="attendees">
            <Route path="new" element={<AttendConferenceForm />} />
          </Route>
          <Route path="attendees">
            <Route path="" element={<AttendeeList attendees={props.attendees} />} />
          </Route>
          <Route path="presentations">
            <Route path="new" element={<PresentationForm />} />
          </Route>
        </Routes>
      </div>
      </BrowserRouter>
    );
};

export default App;
