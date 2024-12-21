import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getProfile } from "../src/redux/actions/user.action";
import PrivateRoutes from "../src/routes/private.route";
import PublicRoutes from "../src/routes/public.route";
import MobileView from "./mobile.view";

const App = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check screen size on load
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkScreenSize();

        // Add event listener for window resize
        window.addEventListener("resize", checkScreenSize);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    if (isMobile) {
        return <div><MobileView/></div>;
    }

    if (profile.loading) {
        return <div>Loading...</div>;
    }

    return (
        <BrowserRouter>
            <Routes>
                {profile.isAuthenticated ? (
                    <Route path="/*" element={<PrivateRoutes />} />
                ) : (
                    <Route path="/*" element={<PublicRoutes />} />
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default App;
