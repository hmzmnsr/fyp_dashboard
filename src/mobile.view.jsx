import React from "react";
import logo from "../src/assets/logo.png";


const MobileView = () => {
    return(
        <div className="bg-primary-color min-h-screen flex items-center justify-center">
          <div className="grid grid-cols-12">
            <div className="col-span-2"></div>
            <div className="col-span-8 flex flex-col">
                <div className="mb-8"><img src={logo} alt="logo"/></div>
                <div className="text-white text-xl text-center">This application is not available on mobile devices</div>
            </div>
            <div className="col-span-2"></div>
          </div>
        </div>
    )
}

export default MobileView;