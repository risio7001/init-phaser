import React, { useState, useEffect, CSSProperties } from "react";

interface NotionsProps {
  data?: {};
}

const defaultStyle: CSSProperties = {};

const Notions: React.FC<NotionsProps> = ({ data }) => {
  return (
    <>
      <div className="h-[80vh] w-[80vw] bg-red-100">
        <iframe
          width={"100%"}
          height={"100%"}
          //   src="http://192.168.0.63:5500/index.html"
        ></iframe>
      </div>
    </>
  );
};

export default Notions;
