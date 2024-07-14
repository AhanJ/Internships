import React from "react";

function DeleteForm() {
  return (
    <div className="w-full max-w-lg">
      <div className="flex flex-wrap justify-center">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            forhtml="grid-id"
          >
            ID
          </label>
          <input
            className="appearance-none block w-full bg-gray-100 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-id"
            type="number"
          />
        </div>
      </div>
    </div>
  );
}

export default DeleteForm;
