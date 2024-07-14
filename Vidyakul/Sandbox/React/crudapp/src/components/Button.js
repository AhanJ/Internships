import React from "react";

function Button(props) {
  return (
    <button
      className="bg-teal-500 hover:bg-blue-700 text-white font-mono font-bold py-2 px-4 rounded-md"
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
}

export default Button;
