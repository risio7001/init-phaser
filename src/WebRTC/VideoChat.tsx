import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8082");

const VideoChat = () => {
  const myVideo = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        myVideo.current!.srcObject = stream;
      })
      .catch((err) => console.log(err));

    socket.on("init", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <>
      <div className="h-[240px] w-full bg-white hidden">
        <div className="">
          <video ref={myVideo} src=""></video>
        </div>
      </div>
    </>
  );
};

export default VideoChat;
