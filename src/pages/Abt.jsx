import React from "react";
import Navbar from "../components/Navbar";

const Abt = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 p-8">
        <div className="bg-white shadow-lg rounded-2xl p-6 max-w-xl text-center">
          <h2 className="text-2xl font-bold mb-4">About Math AI</h2>
          <p className="text-gray-700 mb-2">
            Math AI is a project by Deeksha & Aarav 💙.  
            It’s designed to answer only math questions, making learning and problem-solving easier.
          </p>
          <p className="text-gray-700">
            Our goal is to build a modern, simple, and effective AI that focuses solely on mathematics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Abt;



