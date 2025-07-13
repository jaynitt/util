import React from "react";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      {/* Page container */}
      <div className="flex flex-col min-h-screen">

        {/* Main content */}
        <div className="flex flex-col justify-center items-center p-2 bg-white gap-4 flex-1">
          <h1 className="text-6xl text-blue-900">Profnitt</h1>

          <p className="text-blue-900 font-wide tracking-wider text-2xl">
            About OUR MOTTO ―――――
            <br />
            What started out as a WhatsApp Group among students interested in finance, ProfNITT is now the finance and investments club of NIT Trichy, with more than 30 members. We aim to bring about financial literacy among students of NIT-Trichy, helping them make well-informed monetary decisions.
            <br />
            The club conducts several events throughout the year to engage with the student community such as decisions.
          </p>

          <p className="font-bold tracking-wider text-2xl text-blue-900">
            ...Knowledge Sharing Sessions
            <br />
            ...Guest Lectures and Webinars
            <br />
            ...Workshops
         
          </p>

          <p className="text-blue-900">
            The club also aims to empower its members by increasing their knowledge base in finance related domains, via various interactions, discussions and industry projects brought with the help of our strong alumni network.
          </p>
        </div>

        {/* Footer */}
        <div className="w-full text-blue-900 bg-[#312C9A] py-4">
          <p className="text-3xl text-blue-500 text-center">
            The Finance and Investments Club of NIT Trichy
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
