"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input, Textarea } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Chip,
  
} from "@nextui-org/react";
import VideoEditor from "@/app/components/Editor/VideoEditor";
import { useContent } from "../../contexts/ContentContext";


const AddVideo = () => {
  const { addVideo, user } = useContent();
  const videoEditorInstanceRef = useRef(null);


  const [categories, setCategories] = React.useState(new Set(["Education"]));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");  
  const [isSaving, setIsSaving] = useState(false);
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descError, setDescError] = useState("");

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
  const handleDescChange = (event) => {
    setDesc(event.target.value);
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
  const isYouTubeVideoLink = (url) => {
    const videoRegex = /^https:\/\/(youtu\.be\/|www\.youtube\.com\/watch\?v=)[a-zA-Z0-9_-]+(&.*)?$/;
    return videoRegex.test(url);
  };
  
  const isInvalidYouTubePlaylistLink = (url) => {
    const invalidPlaylistRegex = /^https:\/\/youtu\.be\/[a-zA-Z0-9_-]+\?list=[a-zA-Z0-9_-]+$/;
    return invalidPlaylistRegex.test(url);
  };
  
  
  // const handleSaveVideo = async () => {
  //   setError("");
  //   setTitleError("");
  //   setDescError("");
  //   if (!title.trim()) {
  //     setTitleError("Title is required");
  //     return;
  //   }
  //   if (!desc.trim()) {
  //     setDescError("Description is required");
  //     return;
  //   }
  //   if (!videoEditorInstanceRef.current) {
  //     alert("Click on upload video button");
  //     return;
  //   }
  //   if (videoEditorInstanceRef.current) {
  //     try {
  //       const outputData = await videoEditorInstanceRef.current.save();
  //       if (outputData.blocks.length === 0) {
  //         setError("Video cannot be empty");
  //         return;
  //       }
  //       console.log('outputData.blocks.length',outputData.blocks.length);
  //       setDescription(outputData.blocks);
  //       setIsSaving(true);
  //     } catch (error) {
  //       console.error("Saving failed: ", error);
  //       alert("video link is not provided correctly")
  //     }
  //   }

  // };

const handleSaveVideo = async () => {
  setError("");
  setTitleError("");
  setDescError("");
  if (!title.trim()) {
    setTitleError("Title is required");
    return;
  }
  if (!desc.trim()) {
    setDescError("Description is required");
    return;
  }
  if (!videoEditorInstanceRef.current) {
    alert("Click on upload video button");
    return;
  }
  if (videoEditorInstanceRef.current) {
    try {
      const outputData = await videoEditorInstanceRef.current.save();
      if (outputData.blocks.length === 0) {
        setError("Video cannot be empty");
        return;
      }
      const videoBlock = outputData.blocks.find(block => block.type === 'embed');
      const videoUrl = videoBlock?.data?.url;

      if (!videoUrl || !isYouTubeVideoLink(videoUrl) || isInvalidYouTubePlaylistLink(videoUrl)) {
        setError("Invalid YouTube video link");
        alert("Invalid YouTube video link, can't accept playlist video link");
        return;
      }

      setDescription(outputData.blocks);
      setIsSaving(true);
    } catch (error) {
      console.error("Saving failed: ", error);
      alert("Video link is not provided correctly");
    }
  }
};


  useEffect(() => {
    if (isSaving && description.length > 0) {
      const newVideo = {
        id: Date.now().toString(),
        title,
        description,
        desc,
        tags,
        categories: Array.from(categories),
        author: user.id,
        authorName: user.given_name
      };
      console.log('New Video:', newVideo);
      addVideo(newVideo);
      router.push('/videos/');
      setIsSaving(false); // Reset the saving state
    }
  }, [description, isSaving]);


  return (
    <div className="flex flex-col md:flex-row h-screen bg-bodybg">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8  ">
          <Card
            shadow="none"
            className="h-full w-full bg-sidebarbg"

          >
            <CardHeader className="flex flex-col w-full items-start ">
            <div className="w-full text-icon">
              <Input
              key="default"
              className="text-icon"
                onChange={handleTitleChange}
                // variant="underlined"
                label="Video Title "
              /></div>
              {titleError && <div className="text-red-500">{titleError}</div>}
            </CardHeader>
            <CardBody>
              <div className="border p-2 ">
                <Textarea
                isRequired
                onChange={handleDescChange}
                  label="Video"
                  // variant="bordered"
                  placeholder="Video description"
                  // disableAnimation
                  // disableAutosize
                  minRows={4}
                  classNames={{
                    base: "max-w-full",
                    input: "resize-y min-h-[40px]",
                  }}
                />
              </div>
              {descError && <p className="text-red-500">{descError}</p>}
              <div className="mt-4">
                <VideoEditor videoEditorInstanceRef={videoEditorInstanceRef}/>
                {/* <Input
                  type="text"
                  className=" p-2 mb-2"
                  placeholder="Paste your video embed link here"
                  label="Video embed link"
                /> */}
              </div>
              {error && <p className="text-red-500">{error}</p>}

              <div className="flex justify-between mt-4 flex-col md:flex-row">
                <div className="mr-2 md:w-[900px] mb-10 md:mb-4 ">
                  <h2 className="text-xl font-bold mb-2 text-icon"> Create Tags</h2>
                  <div className="w-[270px]">
                    <Input
                      type="text"
                      className=" p-2 mb-2"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Enter a tag and press enter"
                      onKeyDown={(e) => e.key === "Enter" && addTag()}
                    />
                  </div>
                  <div className="flex flex-wrap ">
                    {tags.map((tag, index) => (
                      <Chip key={index} onClose={() => removeTag(tag)} variant="flat" className="bg-icon">
                      {tag}
                    </Chip>
                      // <span
                      //   key={tag}
                      //   className="bg-gray-200 text-gray-700 p-2 m-1 rounded"
                      // >
                      //   {tag}
                      //   <button
                      //     onClick={() => removeTag(tag)}
                      //     className="ml-2 text-red-500"
                      //   >
                      //     x
                      //   </button>
                      // </span>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <h2 className="text-xl font-bold mb-2 text-icon"> Select Category</h2>
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
                    router.push('/videos/');
                  }}
                  color="danger"
                  className=" text-white mr-2 "
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveVideo}
                  color="success"
                  className=" text-white"
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

export default AddVideo;
