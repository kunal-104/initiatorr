"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Chip,

} from "@nextui-org/react";
import Editor from "../../components/Editor/Editor";
import { useContent } from "../../contexts/ContentContext";

const AddArticle = () => {
  const { addArticle, user } = useContent();
  const editorInstanceRef = useRef(null);

  const [categories, setCategories] = React.useState(new Set(["Education"]));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [titleError, setTitleError] = useState("");

  const router = useRouter();

  const selectedValue = React.useMemo(
    () => Array.from(categories).join(", ").replaceAll("_", " "),
    [categories]
  );

  const handleTitleChange = (event) => {
    if(user){
      setTitle(event.target.value);
    }else if(!user){
      alert("you are not loggedIn");
      router.push("/");
    }
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

  const handleSaveArticle = async () => {
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
    if (isSaving && description.length > 0) {
      const newArticle = {
        id: Date.now().toString(),
        title,
        description,
        tags,
        categories: Array.from(categories),
        author: user.id,
        authorName: user.given_name,
      };
      console.log('New article:', newArticle);
      addArticle(newArticle);
      // router.back();
      router.push("/articles")
      setIsSaving(false); // Reset the saving state
    }
  }, [description, isSaving]);

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
                // variant="underlined"
                label="Article Title "
              /></div>
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
                      <DropdownItem key="Art & Culture">
                        Art & Culture
                      </DropdownItem>
                      <DropdownItem key="Travel & Tourism">
                        Travel & Tourism
                      </DropdownItem>
                      <DropdownItem key="Environment">Environment</DropdownItem>
                      <DropdownItem key="Politics & Society">
                        Politics & Society
                      </DropdownItem>
                      <DropdownItem key="Sports">Sports</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </CardBody>
            <CardFooter className="flex justify-end">
              <div className="flex justify-between mb-4">
                <Button
                  onClick={() => {
                    // router.back();
                    router.push("/articles")
                  }}
                  color="danger"
                  className="text-white mr-2 relative z-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveArticle}
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

export default AddArticle;



// "use client";

// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   // Progress,
// } from "@nextui-org/react";
// import React from "react";
// // import Sidebar from "../../../components/sidebar";
// // import Header from "../../../components/header";
// import { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { Input, Textarea } from "@nextui-org/react";
// import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";



// const addArticle = () => {


//   const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));
//   const [editorData, setEditorData] = useState(null);
//   const router = useRouter();

//   // const { addBlog } = useBlog();
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [tags, setTags] = useState([]);
//   const [categories, setCategories] = useState([]);


//   const selectedValue = React.useMemo(
//     () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
//     [selectedKeys]
//   );

//   const handleSubmit = (e) => {
//     // e.preventDefault();
//     // const newBlog = {
//     //   id: Date.now(), // Generate unique ID for the blog
//     //   title,
//     //   description,
//     //   tags,
//     //   categories,
//     //   // Add more fields as needed
//     // };
//     // // addBlog(newBlog);
//     // setTitle('');
//     // setDescription('');
//     // setTags([]);
//     // setCategories([]);
//   };

//   // const [tags, setTags] = useState([]);
//   const [tagInput, setTagInput] = useState("");
//   const [category, setCategory] = useState("");

//   // useEffect(() => {
//   // }, []);

//   const addTag = () => {
//     if (tagInput.trim() && !tags.includes(tagInput.trim())) {
//       setTags([...tags, tagInput.trim()]);
//       setTagInput("");
//     }
//   };

//   const removeTag = (tagToRemove) => {
//     setTags(tags.filter((tag) => tag !== tagToRemove));
//   };

//   const saveArticle = async () => {
//     // const title = await editorTitleInstance.current.save();
//     // const content = await editorContentInstance.current.save();
//     // const image = await editorImageInstance.current.save();

//     // Logic to save the blog post (title, content, image, tags, category)
//     // console.log({ title, content, image, tags, category });
//     router.back();
//   };
//   return (
//     <div className="flex flex-col md:flex-row h-screen bg-bodybg">
//       {/* <Sidebar className="flex-none w-full md:w-auto" /> */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* <Header /> */}
//         <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8  ">
//           <Card
//           shadow="none"
//             // css={{ width: "800px", height: "800px" }}
//             className="h-full w-full"
//           >
//             <CardHeader>
//               {/* <p>Create Title</p> */}
//               <Input variant="underlined" label="Article Title " />
//             </CardHeader>
//             <CardBody>
//               <div className="border p-2 ">
//               <Textarea
//       label="Article"
//       // variant="bordered"
//       placeholder="Article description"
//       // disableAnimation
//       // disableAutosize
//       minRows={6}
//       classNames={{
//         base: "max-w-full",
//         input: "resize-y min-h-[40px]",
//       }}
//     />
//               </div>
//               <div className="flex justify-between mt-4 flex-col md:flex-row">
//                 <div className="mr-2 md:w-[900px] mb-10 md:mb-4 ">
//                   <h2 className="text-xl font-bold mb-2"> Create Tags</h2>
//                   <div className="w-[270px]">
//                   <Input
//                     type="text"
//                     className=" p-2 mb-2"
//                     value={tagInput}
//                     onChange={(e) => setTagInput(e.target.value)}
//                     placeholder="Enter a tag and press enter"
//                     onKeyDown={(e) => e.key === "Enter" && addTag()}
//                   /></div>
//                   <div className="flex flex-wrap ">
//                     {tags.map((tag) => (
//                       <span
//                         key={tag}
//                         className="bg-gray-200 text-gray-700 p-2 m-1 rounded"
//                       >
//                         {tag}
//                         <button
//                           onClick={() => removeTag(tag)}
//                           className="ml-2 text-red-500"
//                         >
//                           x
//                         </button>
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="mb-4">
//                 <h2 className="text-xl font-bold mb-2"> Select Category</h2>
//                   <Dropdown>
//       <DropdownTrigger>
//         <Button 
//           variant="bordered" 
//           className="capitalize"
//         >
//           {selectedValue}
//         </Button>
//       </DropdownTrigger>
//       <DropdownMenu 
//         aria-label="Multiple selection example"
//         variant="flat"
//         closeOnSelect={false}
//         disallowEmptySelection
//         selectionMode="multiple"
//         selectedKeys={selectedKeys}
//         onSelectionChange={setSelectedKeys}
//       >
//         <DropdownItem key="text">Text</DropdownItem>
//         <DropdownItem key="number">Number</DropdownItem>
//         <DropdownItem key="date">Date</DropdownItem>
//         <DropdownItem key="single_date">Single Date</DropdownItem>
//         <DropdownItem key="iteration">Iteration</DropdownItem>
//       </DropdownMenu>
//     </Dropdown>
//                   {/* 
//                   <select
//                     className="border p-2 w-full"
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                   >
//                     <option value="">Select a category</option>
//                     <option value="Tech">Tech</option>
//                     <option value="Lifestyle">Lifestyle</option>
//                     <option value="Business">Business</option>
//                     <option value="Travel">Travel</option>
//                   </select> */}
//                 </div>
//               </div>
//             </CardBody>
//             <CardFooter className="flex justify-end">

//               <div className="flex justify-between mb-4">
//                 <Button
//                   onClick={() => {
//                     router.back();
//                   }}
//                   color="danger"
//                   className=" text-white mr-2 "
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   onClick={saveArticle}
//                   color="success"
//                   className=" text-white"
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

// export default addArticle;
