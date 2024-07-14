import React from "react";

function Header(props) {
  return (
    <div className="flex h-20 bg-yellow-200 font-mono font justify-center items-center text-4xl">
      {props.title}
    </div>
  );
}
export default Header;
