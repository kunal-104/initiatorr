
"use client";
import {Button} from "@nextui-org/react";
// components/ChatLikeContainer.js
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaCog } from "react-icons/fa";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import pic from "../assets/pic.png";
import { MdAccountCircle } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import { IoLogIn } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa6";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useContent } from "../contexts/ContentContext";

const ChatLikeContainer = () => {
  const { user } = useContent();

  // const session = useSession();
  // console.log("session", session);
  // if(session.data === null){
  //   return <Button onClick={signIn}> Login</Button>
  // }
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
      {user ? (
        <div className="flex items-center">
          <Button
            className="flex items-center bg-bodybg h-12"
            onClick={() => setIsVisible(!isVisible)}
          >
            <div className="rounded-2xl">
              <img
                src={user.picture || pic}
                className="rounded-2xl bg-bodybg"
                width={48}
                height={50}
                alt="Logo"
              />
            </div>
            <span className="text-base text-icon font-normal hidden md:flex items-center justify-center ">
              {user.given_name || "KUNAL"}
              {isVisible ? (
                <IoIosArrowUp className="w-4 h-4" />
              ) : (
                <IoIosArrowDown className="w-4 h-4" />
              )}
            </span>
          </Button>
        </div>
      ) : (
        <div className="flex items-center space-x-2 mr-4">
          <Button
            isIconOnly
            css={{ width: "50px" }}
            onClick={() => setIsVisible(!isVisible)}
            className="bg-white h-12 w-12  rounded-lg flex items-center justify-center "
          >
            <FaUser className="text-grey-600 w-6 h-8 " />
          </Button>
        </div>
      )}

      <div
        ref={containerRef}
        className={`bg-sidebarbg container ${isVisible ? "visible" : "hidden"}`}
      >
        {user ? (
          <><div className="flex flex-col gap-2">
            <Link href="/MyProfile">
              <div onClick={() => setIsVisible(false)} className="menu-item">
                <MdAccountCircle className="icon text-icon w-[30px] h-[30px]" />
                <span className="iconName text-icon">My Profile</span>
              </div>
            </Link>
            {/* <div className="menu-item">
          <FaCog className="icon text-secandary w-[30px] h-[30px]" />
          <span>Settings</span>
        </div> */}
            <LogoutLink><div
              onClick={() => {
                setIsVisible(false);
              }}
              className="menu-item"
            >
              <IoLogOut className="icon text-icon w-[30px] h-[30px] " />
              <span className="text-icon">
                Logout
              </span>
            </div></LogoutLink>{" "}</div>
          </>
        ) : (
          <><div className="flex flex-col gap-2">
              <RegisterLink>
            <div
              onClick={() => {
                setIsVisible(false);
              }}
              className="menu-item cursor-pointer"
            >
                <FaUserPlus className="icon text-icon w-[32px] h-[32px] " />
                <span className="text-icon">Sign up</span>
            </div>
              </RegisterLink>

           <LoginLink> <div
             onClick={() => {
              setIsVisible(false);
            }}
              className="menu-item cursor-pointer"
            >
              <IoLogIn className="icon text-icon w-[32px] h-[32px]" />
              <span className="text-icon">
                Sign in
              </span>
           </div> </LoginLink></div>
          </>
        )}
      </div>

      <style jsx>{`
        .container {
          position: absolute;
          z-index: 111;
          top: 60px;
          right: 0;
          width: 200px;
          display: inline-block;
          border-radius: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding-left: 10px;
          padding-right: 10px;
          padding-top: 1.5rem;
          padding-bottom: 1rem;

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
          left: 140px; /* Adjust the position of the arrow */
          transform: translateY(-100%);
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 10px solid white;
          font-color: #808080;
          
        }
        .menu-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 50px;
          width: 180px;
          padding: 1rem 1rem;
          border-radius: 10px;
          transition: background-color 0.2s;
          border-width: 1px;
          border-color: #999999;
        }
        .menu-item:hover {
          background-color: #999999;
          border-width: 1px;
          border-color: #cccccc;
        }
        .menu-item span {
          margin: 1rem;
        }
        .icon {
          font-size: 1.5rem;
        }
        iconName {
          font-size: 16px;
          font-weight: 400;
        }
      `}</style>
    </div>
  );
};

export default ChatLikeContainer;

// "use client";
// import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn} from "@nextui-org/react";
// // components/ChatLikeContainer.js
// import Link from "next/link";
// import { useState, useRef, useEffect } from "react";
// import { FaCog } from "react-icons/fa";
// import Image from "next/image";
// import { IoIosArrowDown } from "react-icons/io";
// import { IoIosArrowUp } from "react-icons/io";
// import pic from "../assets/pic.png";
// import { MdAccountCircle } from "react-icons/md";
// import { IoLogOut } from "react-icons/io5";
// import { FaUser } from "react-icons/fa6";
// import { IoLogIn } from "react-icons/io5";
// import { FaUserPlus } from "react-icons/fa6";
// import {
//   RegisterLink,
//   LoginLink,
//   LogoutLink,
// } from "@kinde-oss/kinde-auth-nextjs/components";
// import { useContent } from "../contexts/ContentContext";

// const ChatLikeContainer = () => {
//   const { user } = useContent();



// ;



//   return (<>
//       <Dropdown className="bg-sidebarbg w-7">
//       <DropdownTrigger>
  
//           <Button
//             isIconOnly
//             css={{ width: "50px" }}
//             // onClick={() => setIsVisible(!isVisible)}
//             className="bg-white h-12 w-12  rounded-lg flex items-center justify-center "
//           >
//             <FaUser className="text-grey-600 w-6 h-8 " />
//           </Button>
//       </DropdownTrigger>
//       <DropdownMenu variant="faded" aria-label="Dropdown menu with icons" className="bg-sidebarbg text-icon text-3xl">

//         <DropdownItem className="flex flex-row justify-between border">
//         <FaUserPlus/>
//           Signup

//         </DropdownItem>
//         <DropdownItem
//           startContent={<IoLogIn />}
//         >

//           Signin

//         </DropdownItem>
//       </DropdownMenu>
//     </Dropdown>
//     <div className="relative">


//       {/* <div
//         ref={containerRef}
//         className={`bg-sidebarbg container ${isVisible ? "visible" : "hidden"}`}
//       >
//         {user ? (
//           <>
//             <Link href="/MyProfile">
//               <div onClick={() => setIsVisible(false)} className="menu-item">
//                 <MdAccountCircle className="icon text-secandary w-[30px] h-[30px]" />
//                 <span className="iconName text-icon">My Profile</span>
//               </div>
//             </Link>
            
//             <LogoutLink><div
//               onClick={() => {
//                 setIsVisible(false);
//               }}
//               className="menu-item"
//             >
//               <IoLogOut className="icon text-secandary w-[30px] h-[30px] " />
//               <span className="text-icon">
//                 Logout
//               </span>
//             </div></LogoutLink>{" "}
//           </>
//         ) : (
//           <>
//               <RegisterLink>
//             <div
//               onClick={() => {
//                 setIsVisible(false);
//               }}
//               className="menu-item cursor-pointer"
//             >
//                 <FaUserPlus className="icon  w-[32px] h-[32px] " />
//                 <span className="text-icon">Sign up</span>
//             </div>
//               </RegisterLink>

//            <LoginLink> <div
//              onClick={() => {
//               setIsVisible(false);
//             }}
//               className="menu-item cursor-pointer"
//             >
//               <IoLogIn className="icon  w-[32px] h-[32px]" />
//               <span className="text-icon">
//                 Sign in
//               </span>
//            </div> </LoginLink>
//           </>
//         )}
//       </div> */}
//     </div></>
//   );
// };

// export default ChatLikeContainer;



