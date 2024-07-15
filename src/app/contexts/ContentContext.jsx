'use client';
import { createContext, useContext, useState, useEffect, useRef } from 'react';

const ContentContext = createContext();

const initialFakeData = {
  blogs: [],
  articles: [],
  videos: [],
  user: null,
};

export const ContentProvider = ({ children, user }) => {
const [content, setContent] = useState(initialFakeData);
const [num, setNum] = useState(1);
const [selected, setSelected] = useState("blog");
const [loading, setLoading] = useState(false);
const [searchTerm, setSearchTerm] = useState("");
const [results, setResults] = useState([]);
const iframeRefs = useRef([]);


  useEffect(() => {
    if (user) {
      setContent((prevContent) => ({ ...prevContent, user: user }));

      // API call to check if user exists and update or create the user
      const checkAndUpdateUser = async () => {
        try {
          const response = await fetch('/api/check-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user.email, name: user.given_name, userId: user.id, picture: user.picture}),
          });

          if (!response.ok) {
            throw new Error('Failed to check or update user', response);
          }

          const result = await response.json();
          console.log('User check/update result:', result);
        } catch (error) {
          console.error('Error checking/updating user:', error);
        }
      };
      if(num === 1){
        checkAndUpdateUser();
        setNum(num+1);
      }
    }
  }, [user]);

  const renderDescription = (blocks, height) => {
    if (!blocks || !Array.isArray(blocks)) {
      return null; // Return null or a fallback UI when blocks is undefined or not an array
    }
    return blocks.map((block, index) => {
      switch (block.type) {
        case "header":
          return (
            <h2 className="whitespace-normal break-words" key={index}>
              {block.data.text}
            </h2>
          );
        case "paragraph":
          return (
            <p className="whitespace-normal break-words" key={index}>
              {block.data.text}
            </p>
          );
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
                <img
                  src={block.data.url}
                  alt={block.data.caption || "Image"}
                  className="w-1/3 h-auto"
                />
                <p className="whitespace-normal break-words">
                  {block.data.caption}
                </p>
              </div>
            );
          }
          return null;
        case "urlImage":
          if (block.data.url) {
            return (
              <div key={index}>
                <img
                  src={block.data.url}
                  alt={block.data.caption || "Image"}
                  className="w-1/3 h-auto"
                />
                <p className="whitespace-normal break-words">
                  {block.data.caption}
                </p>
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
                src={`https://www.youtube.com/embed/${extractVideoId(
                  block.data.url
                )}?enablejsapi=1`}
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
  const extractVideoId = (url) => {
    if (!url) {
      return null;
    }
    const videoIdMatch =
      url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*v=([^&]+)/) ||
      url.match(/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^&]+)/);
    return videoIdMatch ? videoIdMatch[1] : null;
  };
  const setBlogs = (blogs) => {
    setContent(prevContent => ({
      ...prevContent,
      blogs: blogs,
    }));
  };
  const setVideos = (videos) => {
    setContent(prevContent => ({
      ...prevContent,
      videos: videos,
    }));
  };
  const setArticles = (articles) => {
    setContent(prevContent => ({
      ...prevContent,
      articles: articles,
    }));
  };
  const addBlog = async (newBlog) => {
    setContent((prevContent) => ({
      ...prevContent,
      blogs: [...prevContent.blogs, newBlog],
    }));
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlog),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create blog');
      }

      const result = await response.json();
      setContent(prevContent => ({
        ...prevContent,
        blogs: [...prevContent.blogs, result.data]
      }));
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  const removeBlog = (blogId) => {
    setContent((prevContent) => ({
      ...prevContent,
      blogs: prevContent.blogs.filter((blog) => blog.id !== blogId),
    }));
  };

  const addArticle = async (newArticle) => {
    setContent((prevContent) => ({
      ...prevContent,
      articles: [...prevContent.articles, newArticle],
    }));
    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newArticle),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create article');
      }

      const result = await response.json();
      setContent(prevContent => ({
        ...prevContent,
        articles: [...prevContent.articles, result.data]
      }));
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  const removeArticle = (articleId) => {
    setContent((prevContent) => ({
      ...prevContent,
      articles: prevContent.articles.filter((article) => article.id !== articleId),
    }));
  };

  const addVideo = async (newVideo) => {
    // setContent((prevContent) => ({
    //   ...prevContent,
    //   videos: [...prevContent.videos, newVideo],
    // }));
    try {
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVideo),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create article');
      }

      const result = await response.json();
      setContent(prevContent => ({
        ...prevContent,
        videos: [...prevContent.videos, result.data]
      }));
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  const removeVideo = (videoId) => {
    setContent((prevContent) => ({
      ...prevContent,
      videos: prevContent.videos.filter((video) => video.id !== videoId),
    }));
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        setBlogs,
        setArticles,
        setVideos,
        addBlog,
        removeBlog,
        addArticle,
        removeArticle,
        addVideo,
        removeVideo,
        user,
        selected,
        setSelected,
        searchTerm,
        setSearchTerm,
        results,
        setResults,
        loading,
        setLoading,
        renderDescription,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);



// 'use client';
// // context/ContentContext.js

// import { createContext, useContext, useState, useEffect } from 'react';

// const ContentContext = createContext();

// const initialFakeData = {
//   blogs: [],
//   articles: [],
//   videos: [],
//   user: null, // Add user to the initial state
// };

// export const ContentProvider = ({ children, user }) => {
//   // const localNotes = JSON.parse(localStorage.getItem('content'));
//   // const [content, setContent] = useState(localNotes ? localNotes : initialFakeData);
//   const [content, setContent] = useState(initialFakeData);
//   useEffect(() => {
//     if (user) {
//       setContent(prevContent => ({ ...prevContent, user: user }));
//     }
//   }, [user]);

//   // useEffect(() => {
//   //   try {
//   //     // localStorage.setItem('content', JSON.stringify(content));
//   //     console.log(user);
//   //   } catch (e) {
//   //     if (isQuotaExceeded(e)) {
//   //       handleQuotaExceeded();
//   //       // localStorage.setItem('content', JSON.stringify(content));
//   //     }
//   //   }
//   // }, [content]);

//   // const isQuotaExceeded = (e) => {
//   //   return e && e.code === 22;
//   // };

//   // const handleQuotaExceeded = () => {
//   //   const { blogs, articles, videos } = content;

//   //   if (blogs.length > 0) {
//   //     blogs.shift();
//   //   } else if (articles.length > 0) {
//   //     articles.shift();
//   //   } else if (videos.length > 0) {
//   //     videos.shift();
//   //   }

//   //   setContent({ blogs, articles, videos });
//   // };

//   const addBlog = (newBlog) => {
//     setContent(prevContent => ({
//       ...prevContent,
//       blogs: [...prevContent.blogs, newBlog]
//     }));
//   };

//   const removeBlog = (blogId) => {
//     setContent(prevContent => ({
//       ...prevContent,
//       blogs: prevContent.blogs.filter(blog => blog.id !== blogId)
//     }));
//   };

//   const addArticle = (newArticle) => {
//     setContent(prevContent => ({
//       ...prevContent,
//       articles: [...prevContent.articles, newArticle]
//     }));
//   };

//   const removeArticle = (articleId) => {
//     setContent(prevContent => ({
//       ...prevContent,
//       articles: prevContent.articles.filter(article => article.id !== articleId)
//     }));
//   };

//   const addVideo = (newVideo) => {
//     setContent(prevContent => ({
//       ...prevContent,
//       videos: [...prevContent.videos, newVideo]
//     }));
//   };

//   const removeVideo = (videoId) => {
//     setContent(prevContent => ({
//       ...prevContent,
//       videos: prevContent.videos.filter(video => video.id !== videoId)
//     }));
//   };

//   return (
//     <ContentContext.Provider value={{
//       content,
//       addBlog,
//       removeBlog,
//       addArticle,
//       removeArticle,
//       addVideo,
//       removeVideo,
//       user
//     }}>
//       {children}
//     </ContentContext.Provider>
//   );
// };

// export const useContent = () => useContext(ContentContext);





