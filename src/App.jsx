import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getProfile } from "../src/redux/actions/user.action";
import PrivateRoutes from "../src/routes/private.route";
import PublicRoutes from "../src/routes/public.route";

const App = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

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
