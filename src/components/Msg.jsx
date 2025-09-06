import React from "react";

const Msg = ({sender, text}) => {
  return(
    <div
    className={`max-w-xs px-4 py-2 rounded-xl shadow ${sender == "user" 
      ? "self-end bg-blue-500 text-white" 
      : "self-start bg-gray-200 text-black"
    }`}
    >
    {text}
    </div>
  )
}

export default Msg;