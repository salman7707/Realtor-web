import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth()
  const [pageState, setPageState]=useState("Sign In")

  function pathChecking(path) {
    if (path === location.pathname) {
      return true;
    }
  }
  
  useEffect( ()=>{
    onAuthStateChanged(auth, (User)=>{
      if(User){
        setPageState("Profile")
      } else{
        setPageState("SignIn")
      }
    })
  }, [auth])
  return (
    <div className="border-b shadow-sm sticky top-0 z-40 bg-white">
      <header className="flex justify-between  items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="Logo"
            className="h-5 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="flex space-x-3 md:space-x-10">
            <li
              style={
                pathChecking("/")
                  ? { borderBottom: "3px solid red", color: "black" }
                  : {}
              }
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent `}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              style={
                pathChecking("/Offers")
                  ? { borderBottom: "3px solid red", color: "black", }
                  : {}
              }
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent `}
              onClick={() => navigate("/Offers")}
            >
              Offers
            </li>
            <li
              style={
                (pathChecking("/SignIn") || pathChecking("/Profile"))
                  ? { borderBottom: "3px solid red", color: "black" }
                  : {}
              }
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent`}
              onClick={() => navigate(pageState)}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
