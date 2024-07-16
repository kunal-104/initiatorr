"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Chip,
} from "@nextui-org/react";
import { useContent } from "../../contexts/ContentContext";

// Dynamic import of the Editor component with SSR disabled
const Editor = dynamic(() => import("../../components/Editor/Editor"), { ssr: false });

const AddBlog = () => {
  const { AddBlog, user } = useContent();
  const editorInstanceRef = useRef(null);

  const [categories, setCategories] = React.useState(new Set(["Education"]));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [User, setUser] = useState({});
  const router = useRouter();

  const selectedValue = React.useMemo(
    () => Array.from(categories).join(", ").replaceAll("_", " "),
    [categories]
  );

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSaveBlog = async () => {
    setError("");
    setTitleError("");
    if (!title.trim()) {
      setTitleError("Title is required");
      return;
    }
    if (editorInstanceRef.current) {
      try {
        const outputData = await editorInstanceRef.current.save();
        if (outputData.blocks.length === 0) {
          setError("Content cannot be empty");
          return;
        }
        setDescription(outputData.blocks);
        setIsSaving(true);
      } catch (error) {
        console.error("Saving failed: ", error);
      }
    }
  };

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setUser(user);
    }
  }, [user]);

  useEffect(() => {
    if (isSaving && description.length > 0) {
      const newBlog = {
        id: Date.now().toString(),
        title,
        description,
        tags,
        categories: Array.from(categories),
        author: User.id,
        authorName: User.given_name,
      };
      console.log('New blog:', newBlog);
      AddBlog(newBlog);
      router.push("/blogs");
      setIsSaving(false); // Reset the saving state
    }
  }, [description, isSaving, User.id, User.given_name, AddBlog, categories, tags, title, router]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-bodybg">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
          <Card className="h-full w-full bg-sidebarbg">
            <CardHeader className="flex flex-col w-full items-start">
              <div className="w-full text-icon">
                <Input
                  key="default"
                  className="text-icon"
                  onChange={handleTitleChange}
                  label="Blog Title "
                />
              </div>
              {titleError && <div className="text-red-500">{titleError}</div>}
            </CardHeader>
            <CardBody>
              <div className="border p-2">
                <Editor editorInstanceRef={editorInstanceRef} />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex justify-between mt-4 flex-col md:flex-row">
                <div className="mr-2 md:w-[900px] mb-10 md:mb-4">
                  <h2 className="text-xl font-bold mb-2 text-icon">Create Tags</h2>
                  <div className="w-[270px]">
                    <Input
                      type="text"
                      className="p-2 mb-2"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Enter a tag and press enter"
                      onKeyDown={(e) => e.key === "Enter" && addTag()}
                    />
                  </div>
                  <div className="flex flex-wrap">
                    {tags.map((tag, index) => (
                      <Chip key={index} onClose={() => removeTag(tag)} variant="flat" className="bg-icon">
                        {tag}
                      </Chip>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <h2 className="text-xl font-bold mb-2 text-icon">Select Category</h2>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="bordered" className="capitalize bg-white">
                        {selectedValue}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Multiple selection example"
                      variant="flat"
                      closeOnSelect={false}
                      disallowEmptySelection
                      selectionMode="multiple"
                      selectedKeys={categories}
                      onSelectionChange={setCategories}
                    >
                      <DropdownItem key="Technology">Technology</DropdownItem>
                      <DropdownItem key="Health">Health</DropdownItem>
                      <DropdownItem key="Science">Science</DropdownItem>
                      <DropdownItem key="Education">Education</DropdownItem>
                      <DropdownItem key="Business">Business</DropdownItem>
                      <DropdownItem key="Art & Culture">Art & Culture</DropdownItem>
                      <DropdownItem key="Travel & Tourism">Travel & Tourism</DropdownItem>
                      <DropdownItem key="Environment">Environment</DropdownItem>
                      <DropdownItem key="Politics & Society">Politics & Society</DropdownItem>
                      <DropdownItem key="Sports">Sports</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </CardBody>
            <CardFooter className="flex justify-end">
              <div className="flex justify-between mb-4">
                <Button
                  onClick={() => router.push("/blogs")}
                  color="danger"
                  className="text-white mr-2 relative z-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveBlog}
                  color="success"
                  className="text-white relative z-50"
                >
                  Post
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;




// "use client";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
// } from "@nextui-org/react";
// import React, { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { Input } from "@nextui-org/react";
// import {
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
//   Button,
//   Chip,
// } from "@nextui-org/react";
// import Editor from "../../components/Editor/Editor";
// import { useContent } from "../../contexts/ContentContext";


// const AddBlog = () => {
//   const { AddBlog, user } = useContent();
//   const editorInstanceRef = useRef(null);

//   const [categories, setCategories] = React.useState(new Set(["Education"]));
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState([]);
//   const [tags, setTags] = useState([]);
//   const [tagInput, setTagInput] = useState("");
//   const [isSaving, setIsSaving] = useState(false);
//   const [error, setError] = useState("");
//   const [titleError, setTitleError] = useState("");
//   const [User, setUser] = useState({});
//   const router = useRouter();

//   const selectedValue = React.useMemo(
//     () => Array.from(categories).join(", ").replaceAll("_", " "),
//     [categories]
//   );

//   const handleTitleChange = (event) => {
//     // if(user && (Object.keys(user).length !== 0) ){
//       setTitle(event.target.value);
//     // }else {
//       // alert("you are not loggedIn");
//       // router.push("/");
//     // }
//   };

//   const addTag = () => {
//     if (tagInput.trim() && !tags.includes(tagInput.trim())) {
//       setTags([...tags, tagInput.trim()]);
//       setTagInput("");
//     }
//   };

//   const removeTag = (tagToRemove) => {
//     setTags(tags.filter((tag) => tag !== tagToRemove));
//   };

//   const handleSaveBlog = async () => {
//     setError("");
//     setTitleError("");
//     if (!title.trim()) {
//       setTitleError("Title is required");
//       return;
//     }
//     if (editorInstanceRef.current) {
//       try {
//         const outputData = await editorInstanceRef.current.save();
//         if (outputData.blocks.length === 0) {
//           setError("Content cannot be empty");
//           return;
//         }
//         setDescription(outputData.blocks);
//         setIsSaving(true);
//       } catch (error) {
//         console.error("Saving failed: ", error);
//       }
//     }
//   };
//   useEffect(()=>{
//     if(Object.keys(user).length !== 0){
//       setUser(user);
//     }
//   },[]);
//   useEffect(() => {
//     if (isSaving && description.length > 0) {
//       const newBlog = {
//         id: Date.now().toString(),
//         title,
//         description,
//         tags,
//         categories: Array.from(categories),
//         author: User.id,
//         authorName: User.given_name
//       };
//       console.log('New blog:', newBlog);
//       AddBlog(newBlog);
//       router.push("/blogs")
//       setIsSaving(false); // Reset the saving state
//     }
//   }, [description, isSaving]);

//   return (
//     <div className="flex flex-col md:flex-row h-screen bg-bodybg">
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
//           <Card className="h-full w-full  bg-sidebarbg">
//             <CardHeader className="flex flex-col w-full items-start">
//             <div className="w-full text-icon">
//               <Input
//               key="default"
//               className="text-icon"
//                 onChange={handleTitleChange}
//                 // variant="underlined"
//                 label="Blog Title "
//               /></div>
//               {titleError && <div className="text-red-500">{titleError}</div>}
//             </CardHeader>
//             <CardBody>
//               <div className="border p-2">
//                 <Editor editorInstanceRef={editorInstanceRef} />
//               </div>
//               {error && <p className="text-red-500">{error}</p>}
//               <div className="flex justify-between mt-4 flex-col md:flex-row">
//                 <div className="mr-2 md:w-[900px] mb-10 md:mb-4">
//                   <h2 className="text-xl font-bold mb-2 text-icon">Create Tags</h2>
//                   <div className="w-[270px]">
//                     <Input
//                       type="text"
//                       className="p-2 mb-2"
//                       value={tagInput}
//                       onChange={(e) => setTagInput(e.target.value)}
//                       placeholder="Enter a tag and press enter"
//                       onKeyDown={(e) => e.key === "Enter" && addTag()}
//                     />
//                   </div>
//                   <div className="flex flex-wrap">
//                     {tags.map((tag, index) => (
//                       <Chip key={index} onClose={() => removeTag(tag)} variant="flat" className="bg-icon">
//                         {tag}
//                       </Chip>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="mb-4">
//                   <h2 className="text-xl font-bold mb-2 text-icon">Select Category</h2>
//                   <Dropdown>
//                     <DropdownTrigger>
//                       <Button variant="bordered" className="capitalize bg-white">
//                         {selectedValue}
//                       </Button>
//                     </DropdownTrigger>
//                     <DropdownMenu
//                       aria-label="Multiple selection example"
//                       variant="flat"
//                       closeOnSelect={false}
//                       disallowEmptySelection
//                       selectionMode="multiple"
//                       selectedKeys={categories}
//                       onSelectionChange={setCategories}
//                     >
//                       <DropdownItem key="Technology">Technology</DropdownItem>
//                       <DropdownItem key="Health">Health</DropdownItem>
//                       <DropdownItem key="Science">Science</DropdownItem>
//                       <DropdownItem key="Education">Education</DropdownItem>
//                       <DropdownItem key="Business">Business</DropdownItem>
//                       <DropdownItem key="Art & Culture">
//                         Art & Culture
//                       </DropdownItem>
//                       <DropdownItem key="Travel & Tourism">
//                         Travel & Tourism
//                       </DropdownItem>
//                       <DropdownItem key="Environment">Environment</DropdownItem>
//                       <DropdownItem key="Politics & Society">
//                         Politics & Society
//                       </DropdownItem>
//                       <DropdownItem key="Sports">Sports</DropdownItem>
//                     </DropdownMenu>
//                   </Dropdown>
//                 </div>
//               </div>
//             </CardBody>
//             <CardFooter className="flex justify-end">
//               <div className="flex justify-between mb-4">
//                 <Button
//                   onClick={() => router.push("/blogs")}
//                   color="danger"
//                   className="text-white mr-2 relative z-50"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   onClick={handleSaveBlog}
//                   color="success"
//                   className="text-white relative z-50"
//                 >
//                   Post
//                 </Button>
//               </div>
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddBlog;

