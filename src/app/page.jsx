"use client";
import { useRouter } from "next/navigation";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Breadcrumbs,
  BreadcrumbItem,
  Tabs,
  Tab,
  Progress,
  Skeleton,
  useDisclosure,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  Avatar,
} from "@nextui-org/react";
import React from "react";
import { FaUser } from "react-icons/fa6";

import { HiUserGroup } from "react-icons/hi";
import { FaHouse } from "react-icons/fa6";
import { MdArticle } from "react-icons/md";
import { RiYoutubeFill } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import { useState, useEffect, useRef } from "react";
import Links from "./SidebarLinksData";
import { useContent } from "./contexts/ContentContext";
const Home = () => {
  const {
    content,
    selected,
    setSelected,
    renderDescription,
    searchTerm,
    results,
    loading,
    setLoading,
  } = useContent();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedContent, setSelectedContent] = useState({});
  const [selectedDesc, setSelectedDesc] = useState([]);
  const [tabSize, setTabSize] = useState('md'); // Default size


  const homeLink = Links.find((link) => link.name === "Home");
  // const [selected, setSelected] = useState("user");
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (results.length !== 0) {
      setLoading(false);
      console.log("Search results", results);
    } else if (searchTerm && results.length === 0) {
      setLoading(false);
      alert("No results found");
    }
  }, [results]);
  const handleSeeMore = (blog) => {
    setSelectedDesc(renderDescription(blog.description, '320'));
    setSelectedContent(blog);
    onOpen();
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setTabSize('sm');
      } else if (window.innerWidth >= 1024) {
        setTabSize('lg');
      } else {
        setTabSize('md');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-bodybg">
      <Sidebar Links={Links} className="flex-none w-full md:w-auto" />

      <div className="flex-1 flex flex-col overflow-hidden sm:ml-8">
        {searchTerm ? (
          <div>
            {loading ? (
              <Progress
              color="default"
                size="sm"
                isIndeterminate
                aria-label="Loading..."
                // className=""
              />
            ) : null}
          </div>
        ) : null}

        <Header />
        <div className=" flex-1 overflow-x-hidden overflow-y-auto p-4  sm:ml-20">
          {/* Breadcrumbs */}
          <div className="flex flex-col flex-wrap gap-4 my-2">
            <Breadcrumbs key="solid" variant="solid">
              <BreadcrumbItem
                href={homeLink.href}
                startContent={
                  homeLink && <homeLink.icon className="home-icon" />
                }
              >
                Home
              </BreadcrumbItem>
            </Breadcrumbs>
          </div>

          <Tabs
            selectedKey={selected}
            onSelectionChange={setSelected}
            aria-label="Options"
            color="default"
            size={tabSize}
            className=" w-full flex justify-center text-sidebarbg"
          >
            <Tab key="blog" className="" title={
              <div className="flex items-center space-x-1 ">
              <HiUserGroup/>
              <span>Blogs</span>
            </div>}>
              {searchTerm ? (
                <div>
                  {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="col-span-1">
                          <Card
                            shadow="none"
                            className="relative w-full h-72 flex flex-col bg-card"
                          >
                            <CardHeader>
                              <Skeleton className="w-4/5 rounded-lg">
                                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                              </Skeleton>
                            </CardHeader>
                            <CardBody className="flex-1  overflow-y-auto">
                              <Skeleton className="rounded-lg">
                                <div className="h-48 rounded-lg bg-default-300"></div>
                              </Skeleton>
                            </CardBody>
                            <CardFooter className="flex justify-between items-center p-4">
                              <Skeleton className="w-3/5 rounded-lg">
                                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                              </Skeleton>
                            </CardFooter>
                          </Card>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                      {results.map((blog, index) => (
                        <div key={index} className="col-span-1">
                          <Card
                            shadow="none"
                            className="relative w-full h-72 flex flex-col bg-card text-cardText"
                          >
                            <CardHeader>
                              Title: <b>{blog.title}</b>
                            </CardHeader>
                            <CardBody className="flex-1  overflow-y-auto">
                              <div className="p-4 mb-6 bg-neutral-200 rounded-lg text-bodybg">
                                <i>
                                  <b>Blog Description: </b>
                                </i>{" "}
                                {renderDescription(blog.description)}
                              </div>
                            </CardBody>
                            <CardFooter className="flex justify-between items-center p-4">
                              <div className="flex items-center">
                                <IoPersonSharp className="w-7 h-7 mr-3" />
                                <h2 className="text-lg">
                                <i>{blog.authorName ? blog.authorName : "User"}</i>
                                </h2>
                              </div>
                              <div>
                                <Button
                                  className="text-white cursor-pointer bg-open"
                                  color="success"
                                  onClick={() => handleSeeMore(blog)}
                                >
                                  Open
                                </Button>
                              </div>
                            </CardFooter>
                          </Card>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-icon">Search any blog in the search bar</div>
              )}
            </Tab>
            <Tab key="article" title={
              <div className="flex items-center space-x-1">
              <MdArticle/>
              <span>Articles</span>
            </div>}>
              {searchTerm ? (
                <div>
                  {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="col-span-1">
                          <Card
                            shadow="none"
                            className="relative w-full h-72 flex flex-col bg-card"
                          >
                            <CardHeader>
                              <Skeleton className="w-4/5 rounded-lg">
                                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                              </Skeleton>
                            </CardHeader>
                            <CardBody className="flex-1  overflow-y-auto">
                              <Skeleton className="rounded-lg">
                                <div className="h-48 rounded-lg bg-default-300"></div>
                              </Skeleton>
                            </CardBody>
                            <CardFooter className="flex justify-between items-center p-4">
                              <Skeleton className="w-3/5 rounded-lg">
                                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                              </Skeleton>
                            </CardFooter>
                          </Card>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                      {results.map((article, index) => (
                        <div key={index} className="col-span-1">
                          <Card
                            shadow="none"
                            className="relative w-full h-72 flex flex-col bg-card text-cardText"
                          >
                            <CardHeader>
                              Title: <b>{article.title}</b>
                            </CardHeader>
                            <CardBody className="flex-1  overflow-y-auto">
                              <div className="p-4 mb-6 bg-neutral-200 rounded-lg text-bodybg">
                                <i>
                                  <b>Article Description: </b>
                                </i>{" "}
                                {renderDescription(article.description)}
                              </div>
                            </CardBody>
                            <CardFooter className="flex justify-between items-center p-4">
                              <div className="flex items-center">
                                <IoPersonSharp className="w-7 h-7 mr-3" />
                                <h2 className="text-lg">
                                <i>{article.authorName ? article.authorName : "User"}</i>
                                </h2>
                              </div>
                              <div>
                                <Button
                                  className="text-white cursor-pointer bg-open"
                                  color="success"
                                  onClick={() => handleSeeMore(article)}
                                >
                                  Open
                                </Button>
                              </div>
                            </CardFooter>
                          </Card>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-icon">Search any article in the search bar</div>
              )}
            </Tab>
            <Tab key="video" title={
              <div className="flex items-center space-x-1">
              <RiYoutubeFill/>
              <span>Videos</span>
            </div>}>
              {searchTerm ? (
                <div>
                  {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                      {Array.from({ length: 24 }).map((_, index) => (
                        <div key={index} className="col-span-1">
                          <Card
                            shadow="none"
                            className="relative w-full h-72 flex flex-col bg-card"
                          >
                            <CardHeader>
                              <Skeleton className="w-4/5 rounded-lg">
                                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                              </Skeleton>
                            </CardHeader>
                            <CardBody className="flex-1  overflow-y-auto">
                              <Skeleton className="rounded-lg">
                                <div className="h-48 rounded-lg bg-default-300"></div>
                              </Skeleton>
                            </CardBody>
                            <CardFooter className="flex justify-between items-center p-4">
                              <Skeleton className="w-3/5 rounded-lg">
                                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                              </Skeleton>
                            </CardFooter>
                          </Card>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                      {results.map((video, index) => (
                        <div key={index} className="col-span-1 flex flex-col">
                           <Card
                        shadow="none"
                        className="relative w-full h-64   bg-card text-cardText"
                      >
                        <CardHeader className=" flex-1 overflow-hidden pt-5">
                          <p>{video.title}</p>
                        </CardHeader>
                        <CardBody className="overflow-hidden">
                          <div className="p-2">
                            <div className="video-wrapper">
                              {renderDescription(video.description)}
                            </div>
                          </div>
                        </CardBody>
                        <CardFooter className="flex justify-between items-center p-4">
                          <div className="flex items-center">
                            <IoPersonSharp className="w-7 h-7 mr-3" />
                            <h2 className="text-lg">
                              <i>
                                {video.authorName ? video.authorName : "User"}
                              </i>
                            </h2>
                          </div>
                          <div>
                            <Button
                              className="text-white bg-open cursor-pointer"
                              // color="default"
                              onClick={() => handleSeeMore(video)}
                            >
                              Open
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-icon">Search any video in the search bar</div>
              )}
            </Tab>
            <Tab key="user" title={
              <div className="flex items-center space-x-1">
              <FaUser/>
              <span>Users</span>
            </div>}>
              {searchTerm ? (
                <div>
                  {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="col-span-1">
                          <Card 
                          shadow="none"
                          className="relative w-full h-auto bg-card">

                          <div className="max-w-[300px] w-full flex items-center gap-3">
                            <CardHeader>
                            <div>
                              <Skeleton className="flex rounded-full w-12 h-12 bg-open" />
                            </div></CardHeader>
                            <div className="w-full flex flex-col gap-2">
                              <CardBody>
                              <Skeleton className="h-3 w-3/5 rounded-lg bg-default-900" />
                              <Skeleton className="h-3 w-4/5 rounded-lg bg-default-900" />
                              </CardBody>
                            </div>
                          </div>
                          </Card>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                      {results.map((person, index) => (
                        <div key={index} className="col-span-1">
                          <Card className="max-w-[340px] bg-open">
                            <CardHeader className="justify-between">
                              <div className="flex gap-5">
                                <Avatar
                                  isBordered
                                  showFallback 
                                  radius="full"
                                  size="md"
                                  // src='https://images.unsplash.com/broken'
                                  src={person.picture}
                                />
                                <div className="flex flex-col gap-1 items-start justify-center">
                                  <h4 className="text-small font-semibold leading-none text-icon">
                                    {person.name}
                                  </h4>
                                  <h5 className="text-small tracking-tight text-icon">
                                    {person.email}
                                  </h5>
                                </div>
                              </div>
                              {/* <Button
                                className={
                                  isFollowed
                                    ? "bg-transparent text-foreground border-default-200"
                                    : ""
                                }
                                color="primary"
                                radius="full"
                                size="sm"
                                variant={isFollowed ? "bordered" : "solid"}
                                onPress={() => setIsFollowed(!isFollowed)}
                              >
                                {isFollowed ? "Unfollow" : "Follow"}
                              </Button> */}
                            </CardHeader>
                            {/* <CardBody className="px-3 py-0 text-small text-default-400">
                              <p>
                                Frontend developer and UI/UX enthusiast. Join me
                                on this coding adventure!
                              </p>
                              <span className="pt-2">
                                #FrontendWithZoey
                                <span
                                  className="py-2"
                                  aria-label="computer"
                                  role="img"
                                >
                                  💻
                                </span>
                              </span>
                            </CardBody> */}
                            <CardFooter className="gap-3">
                              <div className="flex gap-1">
                                <p className=" text-icon text-small">
                                  Blogs:
                                </p>
                                <p className="font-semibold text-icon text-small">
                                  {person.blogCount}
                                </p>
                              </div>
                              <div className="flex gap-1">
                                <p className="text-icon text-small">
                                  Articles:
                                </p>
                                <p className="font-semibold text-icon text-small">
                                {person.articleCount}
                                </p>
                              </div>
                              <div className="flex gap-1">
                                <p className="text-icon text-small">
                                  Videos:
                                </p>
                                <p className="font-semibold text-icon text-small">
                                  {person.videoCount}
                                </p>
                              </div>
                            </CardFooter>
                          </Card>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-icon">Search any user in the search bar</div>
              )}
            </Tab>
          </Tabs>

          {/* <Card className="relative w-full h-auto">
                <Button
                  className="absolute cursor-pointer top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
                  //   onClick={handleDelete}
                >
                  Delete
                </Button>
                <CardHeader>
                  <p>Title1</p>
                </CardHeader>
                <CardBody>
                  <div className="p-2 mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Pariatur sint voluptatum non sit voluptates consectetur
                    laudantium ipsum. Quod, vitae consectetur illo facere nihil,
                    eum quibusdam cumque distinctio voluptatibus magnam fugit?
                  </div>
                </CardBody>
               
              </Card> */}

          <div>
            {/* <Button onClick={()=>{router.push('/creator/blogs/addBlog')}} className="fixed bg-primary text-white bottom-4 right-8 z-11  ">
              Add Blog!
            </Button> */}
          </div>
        </div>
      </div>
      <Modal
        size="5xl"
        isOpen={isOpen}
        scrollBehavior="inside"
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
        className="bg-sidebarbg"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-icon">
              <h1 className="text-wrap break-words">
                  <b>{selectedContent.title}</b>
                </h1>
              </ModalHeader>
              <ModalBody className="flex-1 overflow-y-auto">
                <div className="flex flex-col whitespace-normal break-words p-4 text-icon bg-open rounded-lg">
                  {selectedDesc}
                  {selected === "video" ? (
                    <div>{selectedContent.desc}</div>
                  ) : null}
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-end p-4">
                {/* <Button
                  className="text-white"
                  color="success"
                  onPress={onClose}
                >
                  Send
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Home;
