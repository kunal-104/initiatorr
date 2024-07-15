'use client';

// SidebarLinksData.js

import { MdVideoChat } from "react-icons/md";
// import { IoIosStats } from "react-icons/io";
// import { FaSuitcaseMedical, FaUserDoctor } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { FaHouse } from "react-icons/fa6";
import { MdArticle } from "react-icons/md";
import { RiYoutubeFill } from "react-icons/ri";
const Links = [

  { name: 'Home', href: '/', icon: FaHouse },
  { name: 'Blogs', href: '/blogs', icon: HiUserGroup },
  // { name: 'Categories', href: '/categories', icon: FaUserDoctor },
  { name: 'Articles', href: '/articles', icon: MdArticle },
  { name: 'Videos', href: '/videos', icon: RiYoutubeFill },
  { name: 'Dashboard', href: '/dashboard', icon: MdSpaceDashboard },

  // Add more Links as needed
];

export default Links;
