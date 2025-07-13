import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../src/assets/logo.png";

function Navbar() {
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
 <>
    <div className="flex items-center justify-between bg-[#312C9A] w-screen h-[10vh] px-6 shadow-md">
      {/* Logo */}
      <div
        className="z-40 m-2 bg-cover bg-center w-[112px] h-[55px] cursor-pointer"
        style={{ backgroundImage: `url(${logo})` }}
        onClick={() => navigate("/home")}
      ></div>

      {/* Nav Links */}
      <div className="flex gap-9">
        <div className="text-white text-center font-semibold hover:text-gray-300 cursor-pointer"
         onClick={() => navigate("/events")}>
          Events
        </div>
        <div className="text-white text-center font-semibold hover:text-gray-300 cursor-pointer"
         onClick={() => navigate("/projects")}>
          Projects
        </div>
        <div className="text-white text-center font-semibold hover:text-gray-300 cursor-pointer"
         onClick={() => navigate("/team")}>
          Team Members
        </div>
        <div className="text-white text-center font-semibold hover:text-gray-300 cursor-pointer"
        onClick={()=>{
            navigate("/gallery")  
        }}>
          Gallery
        </div>
      </div>

      {/* Signout Button */}
      <button
        onClick={handleSignout}
        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg"
      >
        Sign Out
      </button>
      
    </div>
    <div className=" w-screen h-0.5 bg-black "></div>
    </>
  );
}

export default Navbar;
