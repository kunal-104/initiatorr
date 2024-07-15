'use client';

import { useState, useRef, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import pic from "../assets/pic.png";
import { IoOpenOutline } from "react-icons/io5";
// import notificationPic from "../assets/notification-pic.jpg"; // Update this with the correct path to the notification picture

const NotificationContainer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <Button
          isIconOnly
          css={{ width: "50px" }}
          onClick={() => setIsVisible(!isVisible)}
          className="bg-white h-12 w-12  rounded-lg flex items-center justify-center "
        >
          <FaBell className="text-grey-600 w-6 h-8 " />
        </Button>
      </div>
      <div
        ref={containerRef}
        className={`container w-64 sm:w-80 ${isVisible ? "visible" : "hidden"}`}
      >
        <div className="notification-header">
          <h3 className="font-bold">Notifications</h3>
          <button className="see-all-button">
            {" "}
            <span className=""> See All </span>
          
            <IoOpenOutline className="w-5 h-5 ml-3"/>
          </button>
        </div>
        <div className="notification-tabs flex-1">
          <Button isIconOnly className="tab-button bg-maincolor font-normal text-sm text-white rounded-md mr-3">All</Button>
          <Button  className="tab-button bg-bodybg text-maincolor rounded-md text-sm">Unread</Button>
        </div>
        <div className="notification-item">
          {/* <Image src={User} width={50} height={50} alt="User" /> */}
          <div className="notification-content">
            <strong>Smriti Sharma</strong> as Doctor
            <p>is Now Registered on Phoenix and Approved by Jay Rawat</p>
          </div>
        </div>
        <div className="notification-item">
          <Image src={User} width={50} height={50} alt="User" />
          <div className="notification-content">
            <strong>Smriti Sharma</strong> as Doctor
            <p>is Now Registered on Phoenix and Approved by Jay Rawat</p>
          </div>
        </div>

        {/* Repeat the notification-item div as necessary */}
      </div>

      <style jsx>{`
        .container {
          position: absolute;
          z-index: 111;
          top: 70px;
          right: 0;
          height: 456px;
          display: inline-block;
          background-color: white;
          border-radius: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 1.5rem 1rem ;
          overflow: auto;
          opacity: 0;
          transform: scale(0.95);
          transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        }
        .container.visible {
          opacity: 1;
          transform: scale(1);
        }
        .container.hidden {
          opacity: 0;
          display: none;
          transform: scale(0.95);
        }
        .container::before {
          content: "";
          position: absolute;
          top: 0;
          right: 23px; /* Adjust the position of the arrow */
          transform: translateY(-100%);
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 10px solid white;
        }
        .notification-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .see-all-button {
          display: flex;
          align-items: center;
          
          width: 96px;
          height: 30px;
          color: orange;
          background: none;
          cursor: pointer;
          border: 1px dashed #eeeeee;
          border-radius: 7px;
        }
        .notification-tabs {
        width: 101px;
        height: 28px;
          display: flex;
          justify-content: flex-start;
          margin-bottom: 1rem;
        }
        .tab-button {
          border: none;
          cursor: pointer;
          font-weight: bold;
          padding: 0.5rem 1rem;
        }
        .notification-item {
          display: flex;
          align-items: center;
          padding: 0.5rem 0;
          border-bottom: 1px solid #f0f0f0;
        }
        .notification-content {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );
};

export default NotificationContainer;
