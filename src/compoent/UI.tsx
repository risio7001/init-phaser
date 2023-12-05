import React from "react";

const UI = () => {
  return (
    <>
      <div
        id="first-ui"
        className="flex flex-col justify-center items-center h-full w-full "
      >
        <div className="border rounded-xl flex flex-col justify-around p-8 h-[50%]">
          <div className="inputBox">
            <input
              className="text-center rounded-xl py-1"
              placeholder="NAME"
              id="name"
              type="text"
            />
          </div>
          <div
            id={"startBtn"}
            className="rounded-full bg-[#06d6a0] text-white py-1 cursor-pointer"
          >
            START
          </div>
        </div>
      </div>
    </>
  );
};
export default UI;
