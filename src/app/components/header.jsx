import { IoIosArrowDown } from "react-icons/io";
import { FiSearch, FiBell, FiUser } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import { Input } from "@nextui-org/react";
import pic from "../assets/pic.png";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import ChatLikeContainer from "./ChatLikeContainer ";
import NotificationContainer from "./NotificationContainer";
import { useState, useEffect} from "react"; 
import { useContent } from "../contexts/ContentContext";

const Header = () => {
  const { selected,searchTerm, setSearchTerm, results, setResults,loading, setLoading } = useContent();
  
  // const [prevTerm, setPrevTerm] = useState("");
  // const [searchType, setSearchType] = useState("blog"); // default search type
  // const [results, setResults] = useState([]);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        // console.log('searchTerm.length', searchTerm);
        // console.log('prevTerm.length', prevTerm);
        
        fetchSearchResults(searchTerm, selected);
        // setPrevTerm(searchTerm);
        // console.log('prevTerm.length after', prevTerm);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selected]);

  const fetchSearchResults = async (term, type) => {
    try {
      setLoading(true);
      console.log("start searching result::for term and type,",term,",",type);
      const response = await fetch(`/api/search?type=${type}&query=${term}`);
      if (!response.ok) {
        throw new Error(`Error fetching search results: ${response.statusText}`);
      }
      const data = await response.json();
      setResults(data.data);
      console.log("for term and type",term,type," : ",results);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <header className=" flex justify-between items-center mt-5 mx-3 sm:ml-16">
      <div className="  flex items-center justify-between w-full flex-wrap md:flex-nowrap gap-1 md:ml-5 sm:ml-5">
        <div className="flex sm:min-w-80 flex-wrap md:flex-nowrap bg-white border-2  rounded-2xl  m-1 md:mb-0 gap-4  ">
          <Input
            className="h-10 w-48 sm:w-full"
            css={{ $$inputColor: "white" }}
            // color="default"
            size="lg"
            variant="underlined"
            placeholder="Search anything..."
            labelPlacement="outside"
            value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
            // inputWrapper="bgwhite"
            type="search"
            startContent={<FiSearch className=" h-full text-2xl cursor-pointer flex-shrink-0 text-slate-400 hover:text-slate-500" />}
            // endContent={<FiSearch className="absolute h-full  right-3 text-2xl cursor-pointer flex-shrink-0 text-slate-400 hover:text-slate-500" />}
          />
        </div>
        <div className=" flex items-center justify-between  ">
          {/* <NotificationContainer /> */}
          <div className="flex items-center justify-center">
            <ChatLikeContainer />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
