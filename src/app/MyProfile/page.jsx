

"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar"; // Import your Sidebar component
// import Header from "../components/header"; // Import your Header component
// import Image from "next/image";
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
  
  Skeleton,
  useDisclosure,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
 
} from "@nextui-org/react"; // Adjust according to your UI library
import Links from "../SidebarLinksData";
import { FaUser } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";

import Link from "next/link";
import { useContent } from "../contexts/ContentContext";

const ProfilePage = () => {
  const router = useRouter();
  const { user, RenderDescription } = useContent();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedContent, setSelectedContent] = useState({});
  const [selectedDesc, setSelectedDesc] = useState([]);
  const [selected, setSelected] = useState("blog");
  const [loading, setLoading] = useState(false);
  const [userContent, setUserContent] = useState({ articles: [], videos: [], blogs: [] });
  const homeLink = Links.find((link) => link.name === "Home");

  useEffect(()=>{
    if(!user){
      alert("you are not logged in")
      router.push("/")
    }
  },[])

  const fetchUserContent = async () => {
    console.log("user.userId", user.id);
    try {
      const response = await fetch(`/api/getUserContent?userId=${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.success) {
        console.log("User Content:", result.data);
        // Handle the articles, videos, and blogs here
        return result.data;
      } else {
        console.error("Failed to fetch user content:", result.error);
      }
    } catch (error) {
      console.error("Error fetching user content:", error);
    }
  };
  const handleSeeMore = (blog) => {
    setSelectedDesc(RenderDescription(blog.description, '320'));
    setSelectedContent(blog);
    onOpen();
  };
  // const userId = user.userId;
  useEffect(() => {
    setLoading(true);
    fetchUserContent()
      .then((data) => {
        if (data) {
          // Process the data (articles, videos, blogs)
          setUserContent(data);
          console.log("Articles:", data.articles);
          console.log("Videos:", data.videos);
          console.log("Blogs:", data.blogs);
        }
      })
      .then(() => {
        // console.log('data:', userContent);
        if (userContent) {
          setLoading(false);
        }
      });
  }, [
    // user.userId

  ]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-bodybg">
      <Sidebar Links={Links} className="flex-none w-full md:w-auto" />
      <div className="flex-1 flex flex-col overflow-hidden sm:ml-8">
        {/* <Header /> */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:ml-20">
          <div className="flex flex-col flex-wrap gap-4 my-2">
            <Breadcrumbs key="solid" variant="solid">
              {" "}
              <BreadcrumbItem
                startContent={
                  homeLink && <homeLink.icon className="home-icon" />
                }
              >
                <Link href={homeLink.href}>Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem
                startContent={<FaUser className="myprofile-icon" />}
              >
                My Profile
              </BreadcrumbItem>
            </Breadcrumbs>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-8 rounded-lg text-white mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold">Hello {user && (user.given_name ? user.given_name: "User") }</h1>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg">
                Edit profile
              </Button>
            </div>
            <p className="mt-4">
              This is your profile page. You can see the progress you have made
              with your work and manage your content
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            <div className="lg:col-span-2">
              <Card className="p-4">
                <CardHeader>
                  <h2 className="text-2xl font-bold">My account</h2>
                </CardHeader>
                <CardBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* <div className="flex flex-col">
                      <label className="text-gray-600">Username</label>
                      <input
                        type="text"
                        value="lucky.jesse"
                        className="p-2 border border-gray-300 rounded"
                        readOnly
                      />
                    </div> */}
                    <div className="flex flex-col">
                      <label className="text-gray-600">Name</label>
                      <input
                        type="text"
                        value={user && (user.given_name ? user.given_name: "User") }
                        className="p-2 border border-gray-300 rounded"
                        readOnly
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-gray-600">Email address</label>
                      <input
                        type="email"
                        value={user?.email || "Email"}
                        className="p-2 border border-gray-300 rounded"
                        readOnly
                      />
                    </div>
                    {/* <div className="flex flex-col">
                      <label className="text-gray-600">Last name</label>
                      <input
                        type="text"
                        value="Lucky"
                        className="p-2 border border-gray-300 rounded"
                        readOnly
                      />
                    </div> */}
                  </div>
                  <Button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg">
                    Settings
                  </Button>
                </CardBody>
              </Card>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <img
                  src={user?.picture || ""} // Replace with the path to your local image
                  alt="User Profile Picture"
                  width={150}
                  height={150}
                  className="rounded-full"
                />
                {/* <Button className="absolute bottom-0 right-0 bg-green-500 hover:bg-green-600 text-white p-2 rounded-full">
                  Connect
                </Button> */}
              </div>
              <div className="mt-4 flex space-x-4 text-icon">
                <div className="text-center">
                  <p className="text-lg font-bold">{userContent.blogs.length}</p>
                  <p className="text-gray-200">Blogs</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">{userContent.articles.length}</p>
                  <p className="text-gray-200">Articles</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">{userContent.videos.length}</p>
                  <p className="text-gray-200">Videos</p>
                </div>
              </div>
              {/* <Button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg">
                Message
              </Button> */}
            </div>
          </div>

          <Tabs
            selectedKey={selected}
            onSelectionChange={setSelected}
            aria-label="Options"
            className=" w-full flex justify-center"
          >
            <Tab key="blog" title="Blogs">
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
                          <CardBody className="flex-1 overflow-y-auto">
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
                    {(userContent.blogs).map((blog, index) => (
                      <div key={index} className="col-span-1">
                        <Card
                          shadow="none"
                          className="relative w-full h-72 flex flex-col  bg-card text-cardText"
                        >
                          <CardHeader>
                            Title: <b>{blog.title}</b>
                          </CardHeader>
                          <CardBody className="flex-1 overflow-y-auto text-bodybg">
                            <div className="p-4 mb-6 bg-neutral-200 rounded-lg">
                              <i>
                                <b>Blog Description: </b>
                              </i>{" "}
                              {RenderDescription(blog.description)}
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
            </Tab>
            <Tab key="article" title="Articles">
              <div>
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="col-span-1">
                        <Card
                          shadow="none"
                          className="relative w-full h-72 flex flex-col bg-card "
                        >
                          <CardHeader>
                            <Skeleton className="w-4/5 rounded-lg">
                              <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                            </Skeleton>
                          </CardHeader>
                          <CardBody className="flex-1 overflow-y-auto">
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
                    {userContent.articles.map((article, index) => (
                      <div key={index} className="col-span-1">
                        <Card
                          shadow="none"
                          className="relative w-full h-72 flex flex-col bg-card text-cardText"
                        >
                          <CardHeader>
                            Title: <b>{article.title}</b>
                          </CardHeader>
                          <CardBody className="flex-1 overflow-y-auto text-bodybg">
                            <div className="p-4 mb-6 bg-neutral-200 rounded-lg">
                              <i>
                                <b>Article Description: </b>
                              </i>{" "}
                              {RenderDescription(article.description)}
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
            </Tab>
            <Tab key="video" title="Videos">
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
                    {userContent.videos.map((video, index) => (
                      <div key={index} className="col-span-1  flex flex-col">
                        <Card shadow="none" className="relative w-full h-auto bg-card text-cardText">
                          <CardHeader className=" flex-1">
                            <p>{video.title}</p>
                          </CardHeader>
                          <CardBody className="">
                            <div className="p-2">
                              <div className="video-wrapper">
                                {RenderDescription(video.description)}
                              </div>
                            </div>
                          </CardBody>
                          <CardFooter className="flex justify-between items-center p-4">
                            <div className="flex items-center">
                              <IoPersonSharp className="w-7 h-7 mr-3" />
                              <h2 className="text-lg">
                              <i>{video.authorName ? video.authorName : "User"}</i>
                              </h2>
                            </div>
                            <div>
                              <Button
                                className="text-white cursor-pointer bg-open"
                                color="success"
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
            </Tab>
          </Tabs>
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
    </div>
  );
};

export default ProfilePage;

// "use client";
// import React, { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
// import { useRouter } from "next/navigation";
// import Sidebar from "../components/sidebar"; // Ensure it's a valid path
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Button,
//   Breadcrumbs,
//   BreadcrumbItem,
//   Tabs,
//   Tab,
//   Skeleton,
//   useDisclosure,
//   Modal,
//   ModalBody,
//   ModalHeader,
//   ModalFooter,
//   ModalContent,
// } from "@nextui-org/react";
// import Links from "../SidebarLinksData";
// import { FaUser } from "react-icons/fa6";
// import { IoPersonSharp } from "react-icons/io5";
// import Link from "next/link";
// import { useContent } from "../contexts/ContentContext";

// const ProfilePage = () => {
//   const router = useRouter();
//   const { user, RenderDescription } = useContent();
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();
//   const [selectedContent, setSelectedContent] = useState({});
//   const [selectedDesc, setSelectedDesc] = useState([]);
//   const [selected, setSelected] = useState("blog");
//   const [loading, setLoading] = useState(false);
//   const [userContent, setUserContent] = useState({ articles: [], videos: [], blogs: [] });
//   const homeLink = Links.find((link) => link.name === "Home");

//   useEffect(() => {
//     if (!user) {
//       alert("You are not logged in");
//       router.push("/");
//     }
//   }, [user, router]);

//   const fetchUserContent = async () => {
//     if (!user) return;
//     try {
//       const response = await fetch(`/api/getUserContent?userId=${user.id}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.statusText}`);
//       }

//       const result = await response.json();
//       if (result.success) {
//         setUserContent(result.data);
//       } else {
//         console.error("Failed to fetch user content:", result.error);
//       }
//     } catch (error) {
//       console.error("Error fetching user content:", error);
//     }
//   };

//   const handleSeeMore = (blog) => {
//     setSelectedDesc(RenderDescription(blog.description, "320"));
//     setSelectedContent(blog);
//     onOpen();
//   };

//   useEffect(() => {
//     setLoading(true);
//     fetchUserContent().then((data) => {
//       if (data) {
//         setUserContent(data);
//       }
//       setLoading(false);
//     });
//   }, [user]);

//   return (
//     <div className="flex flex-col md:flex-row h-screen bg-bodybg">
//       <Sidebar Links={Links} className="flex-none w-full md:w-auto" />
//       <div className="flex-1 flex flex-col overflow-hidden sm:ml-8">
//         <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:ml-20">
//           <div className="flex flex-col flex-wrap gap-4 my-2">
//             <Breadcrumbs key="solid" variant="solid">
//               <BreadcrumbItem
//                 startContent={homeLink && <homeLink.icon className="home-icon" />}
//               >
//                 <Link href={homeLink.href}>Home</Link>
//               </BreadcrumbItem>
//               <BreadcrumbItem
//                 startContent={<FaUser className="myprofile-icon" />}
//               >
//                 My Profile
//               </BreadcrumbItem>
//             </Breadcrumbs>
//           </div>
//           <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-8 rounded-lg text-white mb-8">
//             <div className="flex items-center justify-between">
//               <h1 className="text-4xl font-bold">Hello {user?.given_name || "User"}</h1>
//               <Button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg">
//                 Edit profile
//               </Button>
//             </div>
//             <p className="mt-4">
//               This is your profile page. You can see the progress you have made
//               with your work and manage your content
//             </p>
//           </div>
//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
//             <div className="lg:col-span-2">
//               <Card className="p-4">
//                 <CardHeader>
//                   <h2 className="text-2xl font-bold">My account</h2>
//                 </CardHeader>
//                 <CardBody>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {/* <div className="flex flex-col">
//                       <label className="text-gray-600">Username</label>
//                       <input
//                         type="text"
//                         value="lucky.jesse"
//                         className="p-2 border border-gray-300 rounded"
//                         readOnly
//                       />
//                     </div> */}
//                     <div className="flex flex-col">
//                       <label className="text-gray-600">Name</label>
//                       <input
//                         type="text"
//                         value={user.given_name || "User"}
//                         className="p-2 border border-gray-300 rounded"
//                         readOnly
//                       />
//                     </div>
//                     <div className="flex flex-col">
//                       <label className="text-gray-600">Email address</label>
//                       <input
//                         type="email"
//                         value={user.email || "Email"}
//                         className="p-2 border border-gray-300 rounded"
//                         readOnly
//                       />
//                     </div>
//                     {/* <div className="flex flex-col">
//                       <label className="text-gray-600">Last name</label>
//                       <input
//                         type="text"
//                         value="Lucky"
//                         className="p-2 border border-gray-300 rounded"
//                         readOnly
//                       />
//                     </div> */}
//                   </div>
//                   <Button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg">
//                     Settings
//                   </Button>
//                 </CardBody>
//               </Card>
//             </div>
//             <div className="flex flex-col items-center justify-center">
//               <div className="relative">
//                 <img
//                   src={user.picture || ""} // Replace with the path to your local image
//                   alt="User Profile Picture"
//                   width={150}
//                   height={150}
//                   className="rounded-full"
//                 />
//                 {/* <Button className="absolute bottom-0 right-0 bg-green-500 hover:bg-green-600 text-white p-2 rounded-full">
//                   Connect
//                 </Button> */}
//               </div>
//               <div className="mt-4 flex space-x-4 text-icon">
//                 <div className="text-center">
//                   <p className="text-lg font-bold">{userContent.blogs.length}</p>
//                   <p className="text-gray-200">Blogs</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-lg font-bold">{userContent.articles.length}</p>
//                   <p className="text-gray-200">Articles</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-lg font-bold">{userContent.videos.length}</p>
//                   <p className="text-gray-200">Videos</p>
//                 </div>
//               </div>
//               {/* <Button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg">
//                 Message
//               </Button> */}
//             </div>
//           </div>

//           <Tabs
//             selectedKey={selected}
//             onSelectionChange={setSelected}
//             aria-label="Options"
//             className=" w-full flex justify-center"
//           >
//             <Tab key="blog" title="Blogs">
//               <div>
//                 {loading ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//                     {Array.from({ length: 6 }).map((_, index) => (
//                       <div key={index} className="col-span-1">
//                         <Card
//                           shadow="none"
//                           className="relative w-full h-72 flex flex-col bg-card"
//                         >
//                           <CardHeader>
//                             <Skeleton className="w-4/5 rounded-lg">
//                               <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
//                             </Skeleton>
//                           </CardHeader>
//                           <CardBody className="flex-1 overflow-y-auto">
//                             <Skeleton className="rounded-lg">
//                               <div className="h-48 rounded-lg bg-default-300"></div>
//                             </Skeleton>
//                           </CardBody>
//                           <CardFooter className="flex justify-between items-center p-4">
//                             <Skeleton className="w-3/5 rounded-lg">
//                               <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
//                             </Skeleton>
//                           </CardFooter>
//                         </Card>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//                     {(userContent.blogs).map((blog, index) => (
//                       <div key={index} className="col-span-1">
//                         <Card
//                           shadow="none"
//                           className="relative w-full h-72 flex flex-col  bg-card text-cardText"
//                         >
//                           <CardHeader>
//                             Title: <b>{blog.title}</b>
//                           </CardHeader>
//                           <CardBody className="flex-1 overflow-y-auto text-bodybg">
//                             <div className="p-4 mb-6 bg-neutral-200 rounded-lg">
//                               <i>
//                                 <b>Blog Description: </b>
//                               </i>{" "}
//                               {RenderDescription(blog.description)}
//                             </div>
//                           </CardBody>
//                           <CardFooter className="flex justify-between items-center p-4">
//                             <div className="flex items-center">
//                               <IoPersonSharp className="w-7 h-7 mr-3" />
//                               <h2 className="text-lg">
//                               <i>{blog.authorName ? blog.authorName : "User"}</i>
//                               </h2>
//                             </div>
//                             <div>
//                               <Button
//                                 className="text-white cursor-pointer bg-open"
//                                 color="success"
//                                 onClick={() => handleSeeMore(blog)}
//                               >
//                                 Open
//                               </Button>
//                             </div>
//                           </CardFooter>
//                         </Card>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </Tab>
//             <Tab key="article" title="Articles">
//               <div>
//                 {loading ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//                     {Array.from({ length: 6 }).map((_, index) => (
//                       <div key={index} className="col-span-1">
//                         <Card
//                           shadow="none"
//                           className="relative w-full h-72 flex flex-col bg-card "
//                         >
//                           <CardHeader>
//                             <Skeleton className="w-4/5 rounded-lg">
//                               <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
//                             </Skeleton>
//                           </CardHeader>
//                           <CardBody className="flex-1 overflow-y-auto">
//                             <Skeleton className="rounded-lg">
//                               <div className="h-48 rounded-lg bg-default-300"></div>
//                             </Skeleton>
//                           </CardBody>
//                           <CardFooter className="flex justify-between items-center p-4">
//                             <Skeleton className="w-3/5 rounded-lg">
//                               <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
//                             </Skeleton>
//                           </CardFooter>
//                         </Card>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//                     {userContent.articles.map((article, index) => (
//                       <div key={index} className="col-span-1">
//                         <Card
//                           shadow="none"
//                           className="relative w-full h-72 flex flex-col bg-card text-cardText"
//                         >
//                           <CardHeader>
//                             Title: <b>{article.title}</b>
//                           </CardHeader>
//                           <CardBody className="flex-1 overflow-y-auto text-bodybg">
//                             <div className="p-4 mb-6 bg-neutral-200 rounded-lg">
//                               <i>
//                                 <b>Article Description: </b>
//                               </i>{" "}
//                               {RenderDescription(article.description)}
//                             </div>
//                           </CardBody>
//                           <CardFooter className="flex justify-between items-center p-4">
//                             <div className="flex items-center">
//                               <IoPersonSharp className="w-7 h-7 mr-3" />
//                               <h2 className="text-lg">
//                               <i>{article.authorName ? article.authorName : "User"}</i>
//                               </h2>
//                             </div>
//                             <div>
//                               <Button
//                                 className="text-white cursor-pointer bg-open"
//                                 color="success"
//                                 onClick={() => handleSeeMore(article)}
//                               >
//                                 Open
//                               </Button>
//                             </div>
//                           </CardFooter>
//                         </Card>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </Tab>
//             <Tab key="video" title="Videos">
//               <div>
//                 {loading ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//                     {Array.from({ length: 6 }).map((_, index) => (
//                       <div key={index} className="col-span-1">
//                         <Card
//                           shadow="none"
//                           className="relative w-full h-72 flex flex-col bg-card"
//                         >
//                           <CardHeader>
//                             <Skeleton className="w-4/5 rounded-lg">
//                               <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
//                             </Skeleton>
//                           </CardHeader>
//                           <CardBody className="flex-1  overflow-y-auto">
//                             <Skeleton className="rounded-lg">
//                               <div className="h-48 rounded-lg bg-default-300"></div>
//                             </Skeleton>
//                           </CardBody>
//                           <CardFooter className="flex justify-between items-center p-4">
//                             <Skeleton className="w-3/5 rounded-lg">
//                               <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
//                             </Skeleton>
//                           </CardFooter>
//                         </Card>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//                     {userContent.videos.map((video, index) => (
//                       <div key={index} className="col-span-1  flex flex-col">
//                         <Card shadow="none" className="relative w-full h-auto bg-card text-cardText">
//                           <CardHeader className=" flex-1">
//                             <p>{video.title}</p>
//                           </CardHeader>
//                           <CardBody className="">
//                             <div className="p-2">
//                               <div className="video-wrapper">
//                                 {RenderDescription(video.description)}
//                               </div>
//                             </div>
//                           </CardBody>
//                           <CardFooter className="flex justify-between items-center p-4">
//                             <div className="flex items-center">
//                               <IoPersonSharp className="w-7 h-7 mr-3" />
//                               <h2 className="text-lg">
//                               <i>{video.authorName ? video.authorName : "User"}</i>
//                               </h2>
//                             </div>
//                             <div>
//                               <Button
//                                 className="text-white cursor-pointer bg-open"
//                                 color="success"
//                                 onClick={() => handleSeeMore(video)}
//                               >
//                                 Open
//                               </Button>
//                             </div>
//                           </CardFooter>
//                         </Card>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </Tab>
//           </Tabs>

//         </div>
//         <Modal
//           size="5xl"
//           isOpen={isOpen}
//           scrollBehavior="inside"
//           onOpenChange={onOpenChange}
//           placement="center"
//           backdrop="blur"
//           className="bg-sidebarbg"
//         >
//           <ModalContent>
//             {(onClose) => (
//               <>
//                 <ModalHeader className="flex flex-col gap-1 text-icon">
//                   <h1 className="text-wrap break-words">
//                     <b>{selectedContent.title}</b>
//                   </h1>
//                 </ModalHeader>
//                 <ModalBody className="flex-1 overflow-y-auto">
//                   <div className="flex flex-col whitespace-normal break-words p-4 text-icon bg-open rounded-lg">
//                     {selectedDesc}
//                     {selected === "video" ? (
//                       <div>{selectedContent.desc}</div>
//                     ) : null}
//                   </div>
//                 </ModalBody>
//                 <ModalFooter className="flex justify-end p-4">
//                 </ModalFooter>
//               </>
//             )}
//           </ModalContent>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

