import React from "react";
import Navbar from "../components/Navbar";

const Abt = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">About Math AI</h2>
          <p className="text-gray-700 mb-3 leading-relaxed">
            Math AI is a passion project by <span className="font-semibold">Smarty</span> and{" "}
            <span className="font-semibold">Shasha</span> ❤️. It’s built to help users solve math
            problems with ease and clarity.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to create a focused, elegant, and intelligent assistant that understands
            math deeply and responds with precision.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Abt;




