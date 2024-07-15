'use client';
import { useRouter } from "next/navigation";
import {
  Card, CardHeader, CardBody, CardFooter, Button, Modal, ModalBody, ModalHeader,  ModalFooter, ModalContent, useDisclosure, Breadcrumbs, BreadcrumbItem, Progress, Skeleton
} from "@nextui-org/react";
import { IoPersonSharp } from "react-icons/io5";
import React, { useState, useRef, useEffect } from "react";
import Links from "../SidebarLinksData";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import { useContent } from "../contexts/ContentContext";
import {  LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

const Blogs = () => {
  const { content , setBlogs, user, setSelected, results, loading, setLoading, searchTerm, setSearchTerm } = useContent();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedContent, setSelectedContent] = useState({});
  const [selectedDesc, setSelectedDesc] = useState([]);
  const [blogLoading, setBlogLoading] = useState(false);
  useEffect(()=>{
  setSearchTerm("");
},[])
  useEffect(() => {
    setSelected("blog")
    const fetchBlogs = async () => {
      try {
        setBlogLoading(true);
        const response = await fetch('/api/blogs');
        const result = await response.json();

        if (result.success) {
          setBlogs(result.data);
        } else {
          console.error('Failed to fetch blogs:', result.error);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setBlogLoading(false);
      }
    };
if(content.blogs.length === 0){
  fetchBlogs();
}
  }, [setBlogs]);

  useEffect(() => {
    if (results.length !== 0) {
      setLoading(false);
      console.log("Search results for articles", results);
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

  const router = useRouter();
  const iframeRefs = useRef([]);
  const renderDescription = (blocks, height) => {
    return blocks.map((block, index) => {
      switch (block.type) {
        case "header":
          return <h2 className="whitespace-normal break-words" key={index}>{block.data.text}</h2>;
        case "paragraph":
          return <p className="whitespace-normal break-words" key={index}>{block.data.text}</p>;
        case "list":
          return (
            <ul className="whitespace-normal break-words" key={index}>
              {block.data.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          );
        case "image":
          if (block.data.url) {
            return (
              <div key={index}>
                <img src={block.data.url} alt={block.data.caption || "Image"} className="w-1/3 h-auto" />
                <p className="whitespace-normal break-words">{block.data.caption}</p>
              </div>
            );
          }
          return null;
        case "urlImage":
          if (block.data.url) {
            return (
              <div key={index}>
                <img src={block.data.url} alt={block.data.caption || "Image"} className="w-1/3 h-auto" />
                <p className="whitespace-normal break-words">{block.data.caption}</p>
              </div>
            );
          }
          return null;
        case "embed":
          return (
            <div className="video-wrapper">
              <iframe
                width="100%"
                height={height || "auto"} 
                src={`https://www.youtube.com/embed/${extractVideoId(block.data.url)}?enablejsapi=1`}
                title={`YouTube video player ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                ref={(el) => (iframeRefs.current[index] = el)}
              ></iframe>
            </div>
          );
        default:
          return null;
      }
    });
  };
  const homeLink = Links.find(link => link.name === 'Home');
const blogsLink = Links.find(link => link.name === 'Blogs');
  return (
    <div className="flex flex-col md:flex-row h-screen bg-bodybg">
      <div className="fixed z-20">
        <Sidebar Links={Links} className="flex-none w-full md:w-auto" />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden sm:ml-8">
       
      {(blogLoading || loading) ? 
        <Progress
        color="default"
        size="sm"
        isIndeterminate
        aria-label="Loading..."
        // className="w-screen"
      /> : null  }
        <Header />
        <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:ml-20">
        <div className="flex flex-col flex-wrap gap-4 my-2">
        <Breadcrumbs key='solid' variant='solid'>
          <BreadcrumbItem  href={homeLink.href} startContent={ homeLink && <homeLink.icon className="home-icon" />}>Home</BreadcrumbItem>
          <BreadcrumbItem href={blogsLink.href} startContent={blogsLink && <blogsLink.icon className="blogs-icon" />}>Blogs</BreadcrumbItem>
        </Breadcrumbs>
     
    </div>
    {searchTerm ? ( <div>
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
                            className="relative w-full h-72 flex flex-col bg-card text-icon"
                          >
                            <CardHeader>
                              Title: <b>{blog.title}</b>
                            </CardHeader>
                            <CardBody className="flex-1 overflow-y-auto">
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
    </div> ) :
      <div> {blogLoading ? 
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="col-span-1">
        <Card shadow="none" className="relative w-full h-72 flex flex-col bg-card">
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
     : 

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          
            {content.blogs.map((blog, index) => (
              
              <div key={index} className="col-span-1">
          
                <Card shadow="none" className="relative w-full h-72 flex flex-col bg-card text-cardText">
                  <CardHeader>
                    Title:  <b>{blog.title}</b>
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
                        className="text-white bg-open cursor-pointer"
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
}</div>
    }
 
          <div>
            {user ? 
            
            <Button
              onClick={() => router.push("/blogs/addBlog")}
              className="fixed text-white bg-bodybg border border-white bottom-8 right-8 z-50"
            >
              Add Blog!
            </Button> :
            <LoginLink postLoginRedirectURL="/blogs/addBlog">
              <Button
              // onClick={() => router.push("/blogs/addBlog")}
              className="fixed text-white bg-bodybg border border-white bottom-8 right-8 z-50"
            >
              Add Blog!
            </Button>
            </LoginLink>
          }
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
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-end p-4">
                {/* <Button className="text-white" color="default" onPress={onClose}>
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

const extractVideoId = (url) => {
  if (!url) {
    return null;
  }
  const videoIdMatch =
    url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*v=([^&]+)/) ||
    url.match(/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^&]+)/);
  return videoIdMatch ? videoIdMatch[1] : null;
};

export default Blogs;


// 'use client';
// import { useRouter } from "next/navigation";
// import {
//   Card, CardHeader, CardBody, CardFooter, Button, Modal, ModalBody, ModalHeader,  ModalFooter, ModalContent, useDisclosure, Breadcrumbs, BreadcrumbItem, Progress, Skeleton
// } from "@nextui-org/react";
// import { IoPersonSharp } from "react-icons/io5";
// import React, { useState, useRef, useEffect } from "react";
// import Links from "../SidebarLinksData";
// import Sidebar from "../components/sidebar";
// import Header from "../components/header";
// import { useContent } from "../contexts/ContentContext";
// import {  LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

// const blogs = () => {
//   const { content , setBlogs, user, setSelected } = useContent();
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();
//   const [selectedContent, setSelectedContent] = useState({});
//   const [selectedDesc, setSelectedDesc] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setSelected("blog")
//     const fetchBlogs = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('/api/blogs');
//         const result = await response.json();

//         if (result.success) {
//           setBlogs(result.data);
//         } else {
//           console.error('Failed to fetch blogs:', result.error);
//         }
//       } catch (error) {
//         console.error('Error fetching blogs:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
// if(content.blogs.length === 0){
//   fetchBlogs();
// }
//   }, [setBlogs]);



//   const handleSeeMore = (blog) => {
//     setSelectedDesc(renderDescription(blog.description));
//     setSelectedContent(blog);
//     onOpen();
//   };

//   const router = useRouter();
//   const iframeRefs = useRef([]);
//   const renderDescription = (blocks) => {
//     return blocks.map((block, index) => {
//       switch (block.type) {
//         case "header":
//           return <h2 className="whitespace-normal break-words" key={index}>{block.data.text}</h2>;
//         case "paragraph":
//           return <p className="whitespace-normal break-words" key={index}>{block.data.text}</p>;
//         case "list":
//           return (
//             <ul className="whitespace-normal break-words" key={index}>
//               {block.data.items.map((item, itemIndex) => (
//                 <li key={itemIndex}>{item}</li>
//               ))}
//             </ul>
//           );
//         case "image":
//           if (block.data.url) {
//             return (
//               <div key={index}>
//                 <img src={block.data.url} alt={block.data.caption || "Image"} className="w-1/3 h-auto" />
//                 <p className="whitespace-normal break-words">{block.data.caption}</p>
//               </div>
//             );
//           }
//           return null;
//         case "urlImage":
//           if (block.data.url) {
//             return (
//               <div key={index}>
//                 <img src={block.data.url} alt={block.data.caption || "Image"} className="w-1/3 h-auto" />
//                 <p className="whitespace-normal break-words">{block.data.caption}</p>
//               </div>
//             );
//           }
//           return null;
//         case "embed":
//           return (
//             <div className="video-wrapper">
//               <iframe
//                 width="100%"
//                 height="220"
//                 src={`https://www.youtube.com/embed/${extractVideoId(block.data.url)}?enablejsapi=1`}
//                 title={`YouTube video player ${index + 1}`}
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 ref={(el) => (iframeRefs.current[index] = el)}
//               ></iframe>
//             </div>
//           );
//         default:
//           return null;
//       }
//     });
//   };
//   const homeLink = Links.find(link => link.name === 'Home');
// const blogsLink = Links.find(link => link.name === 'Blogs');
//   return (
//     <div className="flex flex-col md:flex-row h-screen bg-bodybg">
//       <div className="fixed z-20">
//         <Sidebar Links={Links} className="flex-none w-full md:w-auto" />
//       </div>
//       <div className="flex-1 flex flex-col overflow-hidden sm:ml-8">
       
//       {loading ? 
//         <Progress
//         size="sm"
//         isIndeterminate
//         aria-label="Loading..."
//         // className="w-screen"
//       /> : null  }
//         <Header />
//         <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:ml-20">
//         <div className="flex flex-col flex-wrap gap-4 my-2">
//         <Breadcrumbs key='solid' variant='solid'>
//           <BreadcrumbItem  href={homeLink.href} startContent={ homeLink && <homeLink.icon className="home-icon" />}>Home</BreadcrumbItem>
//           <BreadcrumbItem href={blogsLink.href} startContent={blogsLink && <blogsLink.icon className="blogs-icon" />}>Blogs</BreadcrumbItem>
//         </Breadcrumbs>
     
//     </div>
//     {loading ? 
//     // <div className="h-28 w-28 flex items-center justify-center mx-auto"> 
//     // <Button className="bg-bodybg"  isLoading></Button>
//     // </div>
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//     {Array.from({ length: 24 }).map((_, index) => (
//       <div key={index} className="col-span-1">
//         <Card shadow="none" className="relative w-full h-72 flex flex-col">
//           <CardHeader>
//             <Skeleton className="w-4/5 rounded-lg">
//               <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
//             </Skeleton>
//           </CardHeader>
//           <CardBody className="flex-1 bg-red-200 overflow-y-auto">
//             <Skeleton className="rounded-lg">
//               <div className="h-48 rounded-lg bg-default-300"></div>
//             </Skeleton>
//           </CardBody>
//           <CardFooter className="flex justify-between items-center p-4">
//             <Skeleton className="w-3/5 rounded-lg">
//               <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
//             </Skeleton>
//           </CardFooter>
//         </Card>
//       </div>
//     ))}
//   </div>
//      : 

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          
//             {content.blogs.map((blog, index) => (
              
//               <div key={index} className="col-span-1">
          
//                 <Card shadow="none" className="relative w-full h-72 flex flex-col">
//                   <CardHeader>
//                     Title:  <b>{blog.title}</b>
//                   </CardHeader>
//                   <CardBody className="flex-1 bg-red-200 overflow-y-auto">
//                     <div className="p-4 mb-6 bg-neutral-200 rounded-lg">
//                       <i>
//                         <b>Blog Description: </b>
//                       </i>{" "}
//                       {renderDescription(blog.description)}
//                     </div>
//                   </CardBody>
//                   <CardFooter className="flex justify-between items-center p-4">
//                     <div className="flex items-center">
//                       <IoPersonSharp className="w-7 h-7 mr-3" />
//                       <h2 className="text-lg">
//                       <i>{blog.authorName ? blog.authorName : "User"}</i>
//                       </h2>
//                     </div>
//                     <div>
//                       <Button
//                         className="text-white cursor-pointer"
//                         color="success"
//                         onClick={() => handleSeeMore(blog)}
//                       >
//                         Open
//                       </Button>
//                     </div>
//                   </CardFooter>
//                 </Card>
        
//               </div>
//             ))}
//           </div>
// }
//           <div>
//             {user ? 
            
//             <Button
//               onClick={() => router.push("/blogs/addBlog")}
//               className="fixed bg-primary text-white bottom-8 right-8 z-11"
//             >
//               Add Blog!
//             </Button> :
//             <LoginLink postLoginRedirectURL="/blogs/addBlog">
//               <Button
//               // onClick={() => router.push("/blogs/addBlog")}
//               className="fixed bg-primary text-white bottom-8 right-8 z-11"
//             >
//               Add Blog!
//             </Button>
//             </LoginLink>
//           }
//           </div>
//         </div>
//       </div>
//       <Modal
//         size="5xl"
//         isOpen={isOpen}
//         scrollBehavior="inside"
//         onOpenChange={onOpenChange}
//         placement="center"
//         backdrop="blur"
//       >
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">
//                 <h1>
//                   <b>{selectedContent.title}</b>
//                 </h1>
//               </ModalHeader>
//               <ModalBody className="flex-1 overflow-y-auto">
//                 <div className="flex flex-col whitespace-normal break-words p-4 bg-slate-200 rounded-lg">
//                   {selectedDesc}
//                 </div>
//               </ModalBody>
//               <ModalFooter className="flex justify-end p-4">
//                 <Button className="text-white" color="success" onPress={onClose}>
//                   Send
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// };

// const extractVideoId = (url) => {
//   if (!url) {
//     return null;
//   }
//   const videoIdMatch =
//     url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*v=([^&]+)/) ||
//     url.match(/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^&]+)/);
//   return videoIdMatch ? videoIdMatch[1] : null;
// };

// export default blogs;
