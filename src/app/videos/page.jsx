"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Skeleton,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  useDisclosure,
  Breadcrumbs,
  BreadcrumbItem,
  Progress,
} from "@nextui-org/react";
import React, { useRef, useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import Links from "../SidebarLinksData";
import { useContent } from "../contexts/ContentContext";
import { IoPersonSharp } from "react-icons/io5";

import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
const Videos = () => {
  const {
    content,
    setVideos,
    user,
    setSelected,
    results,
    loading,
    setLoading,
    searchTerm,
    setSearchTerm,
  } = useContent();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedContent, setSelectedContent] = useState({});
  const [selectedDesc, setSelectedDesc] = useState([]);

  const router = useRouter();
  const players = useRef([]);
  const iframeRefs = useRef([]);
  const [videoLoading, setVideoLoading] = useState(false);
  // const [number, setNumber] = useState(1);

  useEffect(() => {
    setSearchTerm("");
  }, []);
  useEffect(() => {
    if (results.length !== 0) {
      setLoading(false);
      console.log("Search results", results);
    } else if (searchTerm && results.length === 0) {
      setLoading(false);
      alert("No results found");
    }
  }, [results]);
  useEffect(() => {
    setSelected("video");
    const fetchVideos = async () => {
      try {
        setVideoLoading(true);
        const response = await fetch("/api/videos");
        const result = await response.json();

        if (result.success) {
          setVideos(result.data);
        } else {
          console.error("Failed to fetch articles:", result.error);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setVideoLoading(false);
      }
    };
    if (content.videos.length === 0) {
      fetchVideos();
    }
  }, [setVideos]);

  const handleSeeMore = (video, index) => {
    setSelectedDesc(renderDescription(video.description, index, "320"));
    setSelectedContent(video);
    onOpen();
  };

  useEffect(() => {
    // Load YouTube iframe API script
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Create YouTube players when API is ready
    window.onYouTubeIframeAPIReady = () => {
      iframeRefs.current.forEach((iframe, index) => {
        if (iframe) {
          players.current[index] = new window.YT.Player(iframe, {
            events: {
              onStateChange: (event) => handleStateChange(event, index),
            },
          });
        }
      });
    };
  }, [content.videos.length]);

  // Load YouTube API
  // Load YouTube API
  //  useEffect(() => {
  //   const tag = document.createElement('script');
  //   tag.src = 'https://www.youtube.com/iframe_api';
  //   const firstScriptTag = document.getElementsByTagName('script')[0];
  //   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  //   window.onYouTubeIframeAPIReady = () => {
  //     initializePlayers();
  //   };
  // }, []);

  // // Initialize players when content.videos changes
  // useEffect(() => {
  //   if (window.YT && window.YT.Player) {
  //     initializePlayers();
  //   }
  // }, [content.videos]);

  // const initializePlayers = () => {
  //   iframeRefs.current.forEach((iframe, index) => {
  //     if (iframe) {
  //       players.current[index] = new window.YT.Player(iframe, {
  //         events: {
  //           onStateChange: (event) => handleStateChange(event, index),
  //         },
  //       });
  //     }
  //   });
  // };

  const handleStateChange = (event, index) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      players.current.forEach((player, playerIndex) => {
        if (
          playerIndex !== index &&
          player &&
          typeof player.pauseVideo === "function"
        ) {
          player.pauseVideo();
        }
      });
    }
  };

  const renderDescription = (blocks, index, height) => {
    return blocks.map((block, blockIndex) => {
      switch (block.type) {
        case "embed":
          return (
            <div className="video-wrapper" key={blockIndex}>
              <iframe
                width="100%"
                height={height || "auto"} // Use height prop if provided, otherwise auto
                src={`https://www.youtube.com/embed/${extractVideoId(
                  block.data.url
                )}?enablejsapi=1`}
                title={`YouTube video player ${blockIndex + 1}`}
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
  const homeLink = Links.find((link) => link.name === "Home");
  const videosLink = Links.find((link) => link.name === "Videos");
  return (
    <div className="flex flex-col md:flex-row h-screen bg-bodybg">
      <Sidebar Links={Links} className="flex-none w-full md:w-auto" />
      <div className="flex-1 flex flex-col overflow-hidden sm:ml-8">
        {videoLoading || loading ? (
          <Progress
            color="default"
            size="sm"
            isIndeterminate
            aria-label="Loading..."
            // className="w-screen"
          />
        ) : null}
        <Header />
        <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:ml-20">
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
              <BreadcrumbItem
                href={videosLink.href}
                startContent={
                  videosLink && <videosLink.icon className="videos-icon" />
                }
              >
                Videos
              </BreadcrumbItem>
            </Breadcrumbs>
          </div>
          {searchTerm ? (
            <div>
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {Array.from({ length: 9 }).map((_, index) => (
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
                              {renderDescription(video.description, index)}
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
            <div>
              {" "}
              {videoLoading ? (
                //  <div className="h-28 w-28 flex items-center justify-center mx-auto"> <Button className="bg-bodybg"  isLoading></Button></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {Array.from({ length: 9 }).map((_, index) => (
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
                  {content.videos.map((video, index) => (
                    <div key={index} className="col-span-1  flex flex-col">
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
                              {renderDescription(video.description, index)}
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
              )}{" "}
            </div>
          )}
          <div>
            {user ? (
              <Button
                onClick={() => {
                  router.push("/videos/addVideo");
                }}
                className="fixed  text-white bg-bodybg border border-white bottom-8 right-8 z-50"
              >
                Add Videos!
              </Button>
            ) : (
              <LoginLink postLoginRedirectURL="/videos/addVideo">
                <Button
                  //  onClick={() => {
                  //    router.push('/videos/addVideo');
                  //  }}
                  className="fixed  text-white bg-bodybg border border-white bottom-8 right-8 z-50"
                  color="default"
                >
                  Add Videos!
                </Button>
              </LoginLink>
            )}
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
                  {selectedContent.desc}
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-end p-4">
                {/* <Button className="text-white font-bold" color="default" onPress={onClose}>
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

export default Videos;
