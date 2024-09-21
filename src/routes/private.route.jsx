import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Container from "../components/containers/fluid.container";
import FlexContainer from "../components/containers/flex.container";
import SideActionBar from "../components/sidebars/side.action.bar";
import Downloads from "../pages/downloads/downloads";
import Events from "../pages/events/events";
import Faculty from "../pages/faculty/faculty";
import Gallery from "../pages/gallery/gallery";
import Programs from "../pages/programs/programs";
import Settings from "../pages/settings/settings";

const PrivateRoutes = () => {
  return (
    <Container className="grid grid-cols-12 h-screen">
    
      <FlexContainer className="col-span-2">
        <div className="fixed top-0 left-0 h-full w-2/12">
          <SideActionBar />
        </div>
      </FlexContainer>

      <FlexContainer className="col-span-10 overflow-y-auto h-full">
        <Routes>
          <Route path="/programs" element={<Programs />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/events" element={<Events />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/programs" />} />
        </Routes>
      </FlexContainer>
    </Container>
  );
};

export default PrivateRoutes;
