import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { CgMenuLeft } from "react-icons/cg";
import Link from "next/link";
export default function MenuButton({Links}) {
  return (
    <Dropdown  backdrop="blur">
      <DropdownTrigger>
        <Button 
        isIconOnly
          variant="bordered" 
          className="bg-bodybg text-icon"
        >
          <CgMenuLeft className="w-8 h-8 "/>
        </Button>
      </DropdownTrigger>
      <DropdownMenu className="bg-sidebarbg rounded-xl" variant="faded" aria-label="Static Actions">
        
        {Links.map((link, index) => (
             <DropdownItem key={index} >
             <Link href={link.href} passHref className="hover:text-hoverEff group">
               <div className="py-2 cursor-pointer flex justify-between ">
                <div>
                <link.icon className="a text-icon w-8 h-8 group-hover:text-sidebarbg " />
                </div>
                 <div className="ml-3 b text-xl text-icon group-hover:inline-block group-hover:text-sidebarbg ">
                   {link.name}
                 </div>
               </div>
             </Link>
           </DropdownItem>
             
            ))}
      </DropdownMenu>
    </Dropdown>
  );
}






// import { useState, useEffect, useRef } from 'react';
// import { Button } from '@nextui-org/react';

// const MenuButton = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const menuRef = useRef(null);
//   const buttonRef = useRef(null);
//   const [position, setPosition] = useState({ top: 50, left: 50 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [offset, setOffset] = useState({ x: 0, y: 0 });

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleClickOutside = (event) => {
//     if (menuRef.current && !menuRef.current.contains(event.target)) {
//       setIsOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     const handleMouseMove = (event) => {
//       if (!isDragging) return;

//       const newX = Math.max(0, Math.min(window.innerWidth - buttonRef.current.offsetWidth, event.clientX - offset.x));
//       const newY = Math.max(0, Math.min(window.innerHeight - buttonRef.current.offsetHeight, event.clientY - offset.y));

//       setPosition({ top: newY, left: newX });
//     };

//     const handleMouseUp = () => {
//       setIsDragging(false);
//     };

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [isDragging, offset]);

//   const handleMouseDown = (event) => {
//     setIsDragging(true);
//     const rect = buttonRef.current.getBoundingClientRect();
//     setOffset({
//       x: event.clientX - rect.left,
//       y: event.clientY - rect.top,
//     });
//   };

//   return (
//     <div
//       className="relative"
//       style={{ top: `${position.top}px`, left: `${position.left}px`, position: 'absolute' }}
//       ref={buttonRef}
//       onMouseDown={handleMouseDown}
//     >
//       <Button onClick={toggleMenu} auto flat color="primary">
//         Menu
//       </Button>
//       <div
//         className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition transform ${
//           isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
//         }`}
//         style={{ transition: 'transform 0.2s ease-out, opacity 0.2s ease-out' }}
//         ref={menuRef}
//       >
//         <div className="py-1">
//           <a href="#page1" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//             Page 1
//           </a>
//           <a href="#page2" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//             Page 2
//           </a>
//           <a href="#page3" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//             Page 3
//           </a>
//           <a href="#page4" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//             Page 4
//           </a>
//           <a href="#page5" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//             Page 5
//           </a>
//           <a href="#page6" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//             Page 6
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MenuButton;

















