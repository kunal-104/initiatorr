"use client";

import Image from "next/image";
import PT from "../assets/kt7.png"; // Make sure to import your logo image correctly
import "./sidebar.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import MenuButton from "./MenuButton";

const Sidebar = ({ Links = [] }) => {
  const router = useRouter();

  const handleNavigation = (props) => {
    router.replace(`http://localhost:3000/${props}`);
  };

  return (
    <div className="fixed z-50 abcd">
    <div className="fixed bottom-8 left-4 flex z-1111 sm:hidden">
      <MenuButton Links={Links} />
    </div>
    <div className="look ">
      <div
        style={{ height: "auto", overflow: "hidden" }}
        className="peer efgh fixed z-10  bg-sidebarbg ml-5 mt-5 mr-5 rounded-3xl w-20 hover:w-64 space-y-6 py-5 px-2 hover:px-5 inset-y-0 left-0 transition-all transform -translate-x-96 sm:relative sm:translate-x-0 duration-300 ease-in-out group"
      >
        <div className="xyz flex items-center justify-center space-x-2 px-4">
          <Image
            src={PT}
            width={74}
            height={74}
            alt="Logo"
            className="w-14 h-10 group-hover:w-28 group-hover:h-28 transition-all duration-100 ease-in-out"
          />
        </div>
        <nav
          className="space-y-2 ijkl h-[400px] w-full 
        flex flex-col justify-evenly"
        >
          {Links.map((link, index) => (
            <div key={index} className="">
              <Link
                key={index}
                href={link.href}
                className="ab flex items-center justify-between px-4 py-2 rounded-xl group transition duration-200 ease-in-out hover:bg-hoverEff"
              >
                <link.icon className="a text-icon w-8 h-8" />
                <span className="ml-3 b text-xl text-icon hidden group-hover:inline-block">
                  <p
                   className=" peer-hover:opacity-100 transition-opacity duration-900 "
                   >{link.name}</p>
                </span>
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </div>
  </div>
    // <div className="fixed z-50 abcd ">
    //   <div className="fixed bottom-8 left-4 flex z-1111 sm:hidden">
    //     <MenuButton Links={Links} />
    //   </div>
    //   <div className="look ">
    //     <div
    //       style={{ height: "auto", overflow: "hidden" }}
    //       className="peer efgh fixed z-10 bg-white ml-5 mt-5 mr-5 rounded-3xl w-20 hover:w-64 space-y-6 py-5 px-2 hover:px-5 inset-y-0 left-0 transition-all transform -translate-x-96 sm:relative sm:translate-x-0 duration-300 ease-in-out group"
    //     >
    //       <div className="xyz flex items-center justify-center space-x-2 px-4">
    //         <Image
    //           src={PT}
    //           width={74}
    //           height={74}
    //           alt="Logo"
    //           className="w-10 h-10 group-hover:w-20 group-hover:h-20 transition-all duration-200 ease-in-out"
    //         />
    //       </div>
    //       <nav
    //         className="space-y-2 ijkl h-[400px] w-full 
    //       flex flex-col justify-evenly"
    //       >
    //         {Links.map((link, index) => (
    //           <div className="">
    //             <Link
    //               key={index}
    //               href={link.href}
    //               className="ab flex items-center justify-between px-4 py-2 rounded-xl group transition duration-200 ease-in-out hover:bg-maincolor"
    //             >
    //               <link.icon className="a text-maincolor w-8 h-8" />
    //               <span className="ml-3 b text-xl text-gray-700 hidden group-hover:inline-block">
    //                 <p
    //                 //  className="opacity-50 peer-hover:opacity-100 transition-opacity duration-300 "
    //                  >{link.name}</p>
    //               </span>
    //             </Link>
    //           </div>
    //         ))}
    //       </nav>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Sidebar;

// "use client";

// import Image from "next/image";
// import PT from "../assets/PT.svg"; // Make sure to import your logo image correctly
// import "./sidebar.css";
// import { useRouter } from "next/navigation";
// import { Button } from "@nextui-org/react";
// import MenuButton from "./MenuButton";
// const Sidebar = ({ Links = [] }) => {
//   const router = useRouter();

//   const handleNavigation = (props) => {
//     router.replace(`http://localhost:3000/${props}`);
//   };
//   return (
//     <div className="fixed z-50 abcd ">
//       <div className="fixed bottom-8 left-4 flex z-1111 sm:hidden">
//           <MenuButton Links={Links}/>
//         </div>
//       <div className="look">

//         <div
//           style={{ height: "auto", overflow: "hidden" }}
//           className="efgh fixed z-10 bg-white ml-5 mt-5 mr-5 rounded-3xl w-20 hover:w-64 space-y-6 py-5 px-2 hover:px-5 inset-y-0 left-0 transition-all transform -translate-x-96 sm:relative sm:translate-x-0 duration-300 ease-in-out group"
//         >
//           <div className="xyz flex items-center justify-center space-x-2 px-4">
//             <Image
//               src={PT}
//               width={74}
//               height={74}
//               alt="Logo"
//               className="w-10 h-10 group-hover:w-20 group-hover:h-20 transition-all duration-200 ease-in-out"
//             />
//           </div>
//           <nav
//             className="space-y-2 ijkl h-[400px] w-full
//           flex flex-col justify-evenly
//           "
//           >
//             {Links.map((link, index) => (
//               <a key={index} href={link.href} className="ab flex items-center justify-between px-4 py-2 rounded-xl group transition duration-200 ease-in-out hover:bg-maincolor">
//                 <link.icon className='a text-maincolor w-8 h-8' />
//                 <span className='ml-3 b text-xl text-gray-700 hidden group-hover:inline-block'>{link.name}</span>
//               </a>
//               // <div
//               // className="ab flex items-center justify-between px-4 py-2 rounded-xl group transition duration-200 ease-in-out hover:bg-maincolor"
//               //   onClick={() => handleNavigation(link.href)}
//               // >
//               //   <link.icon className="a text-maincolor w-8 h-8" />
//               //   <span className="ml-3 b text-xl text-gray-700 hidden group-hover:inline-block">
//               //     {link.name}
//               //   </span>
//               // </div>
//             ))}
//           </nav>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// 'use client';

// import { MdVideoChat } from "react-icons/md";
// import { IoIosStats } from "react-icons/io";
// import { FaSuitcaseMedical } from "react-icons/fa6";
// import { FaUserDoctor } from "react-icons/fa6";
// import { MdSpaceDashboard } from "react-icons/md";
// import { HiUserGroup } from "react-icons/hi";
// import './sidebar.css';
// import { FiHome, FiUser, FiSettings, FiBookOpen, FiMonitor, FiTrendingUp, FiLogOut } from 'react-icons/fi';
// import PT from '../assets/PT.svg'; // Make sure to import your logo image correctly
// import Image from 'next/image';

// const Sidebar = () => {
//   return (
//     <div className="fixed z-50 abcd ">

//       <div className="look">
//     <div style={{ height: '520px' }} className="  efgh fixed z-10 bg-white ml-5 mt-5 mr-5 rounded-3xl w-20 hover:w-64 space-y-6 py-5 px-2 hover:px-5 md:absolute inset-y-0 left-0 transition-all  transform -translate-x-96 lg:relative lg:translate-x-0 transition duration-300 ease-in-out group ">
//       <div className="xyz flex items-center justify-center space-x-2 px-4">
//         <Image src={PT} width={74} height={74} alt="Logo" className="w-10 h-10 group-hover:w-20 group-hover:h-20 transition-all duration-200 ease-in-out" />
//       </div>

//       <nav  className="space-y-2 ijkl h-[400px] w-full ">
//         {/* Example: */}
//         <a href="/creator/dashboard" className=" ab flex items-center justify-between px-4 py-2 rounded-xl group transition duration-200 ease-in-out hover:bg-maincolor ">
//           <MdSpaceDashboard className="a text-maincolor w-8 h-8  " />
//           <span className="ml-3 b text-xl text-gray-700  hidden group-hover:inline-block">Dashboard</span>
//         </a>
//         <a href="/creator/blogs" className="ab flex items-center justify-between px-4 py-2 rounded-xl group transition duration-200 ease-in-out hover:bg-maincolor">
//           <HiUserGroup className="a text-maincolor w-8 h-8  " />
//           <span className="ml-3 b text-xl text-gray-700  hidden group-hover:inline-block">Blogs</span>
//         </a>
//         <a href="/creator/categories" className="ab flex items-center justify-between px-4 py-2 rounded-xl group transition duration-200 ease-in-out hover:bg-maincolor">
//           <FaUserDoctor className="a text-maincolor w-8 h-8  " />
//           <span className="ml-3 b text-xl text-gray-700 hidden group-hover:inline-block">Categories</span>
//         </a>
//         <a href="/creator/articles" className="ab flex items-center justify-between px-4 py-2 rounded-xl group transition duration-200 ease-in-out hover:bg-maincolor">
//           <FaSuitcaseMedical className="a text-maincolor w-8 h-8  " />
//           <span className="ml-3 b text-xl text-gray-700  hidden group-hover:inline-block">Articles</span>
//         </a>
//         <a href="/creator/videos" className="ab flex items-center justify-between px-4 py-2 rounded-xl group transition duration-200 ease-in-out hover:bg-maincolor">
//           <MdVideoChat className="a text-maincolor w-8 h-8  " />
//           <span className="ml-3 b text-xl text-gray-700  hidden group-hover:inline-block">Videos</span>
//         </a>
//         <a href="/creator/stats" className="ab flex items-center justify-between px-4 py-2 rounded-xl group transition duration-200 ease-in-out hover:bg-maincolor">
//           <IoIosStats className="a text-maincolor w-8 h-8  " />
//           <span className="ml-3 b text-xl text-gray-700  hidden group-hover:inline-block">Stats</span>
//         </a>
//         {/* Repeat for other menu items */}
//       </nav>
//     </div>
//     </div>
//     </div>
//   );
// };

// export default Sidebar;
