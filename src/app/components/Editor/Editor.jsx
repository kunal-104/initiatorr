
import React, { useRef, useEffect, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import Delimiter from '@editorjs/delimiter';
import CustomImageTool from './CustomImageTool';
import SimpleImage from "@editorjs/simple-image";
import './CustomImageTool.css';
import YoutubeEmbed from './YoutubeEmbed';
import CustomURLImageTool from './CustomURLImageTool ';
import './Editor.css';



const Editor = ({ editorInstanceRef }) => {
  
  const editorRef = useRef(null);
  // const editorInstanceRef = useRef(null);
  const [editorData, setEditorData] = useState(null);

  useEffect(() => {
    if (!editorInstanceRef.current) {
      editorInstanceRef.current = new EditorJS({
        holder: editorRef.current,
        placeholder: 'Let`s write an awesome story!',
        inlineToolbar: ['link', 'marker', 'bold', 'italic'],
        tools: {
          header: Header,
          // image: SimpleImage,
          paragraph: Paragraph,

          embed: {
            class: YoutubeEmbed,
            config: {
             onChange: (data) => console.log('Embed data:', data),
            },
          },
          delimiter: Delimiter,
          simpleImage: {
            class: SimpleImage,
            inlineToolbar: true,
          },
          image: CustomImageTool,
          urlImage: CustomURLImageTool,
           // Use the custom image tool
        },
        onReady: () => {
          console.log('Editor.js is ready to work!');
        },
        // autofocus: true,
      });
    }

    return () => {
      if (editorInstanceRef.current) {
        // editorInstanceRef.current.destroy();
        // editorInstanceRef.current = null;
      }
    };
  }, [editorInstanceRef]);

  // const handleSave = async () => {
  //   if (editorInstanceRef.current) {
  //     try {
  //       const outputData = await editorInstanceRef.current.save();
  //       setEditorData(outputData);
  //       console.log('Article data: ', outputData);
  //     } catch (error) {
  //       console.error('Saving failed: ', error);
  //     }
  //   }
  // };

  return (
    <div>
      <div className='bg-white p-4 ' ref={editorRef}></div>
      {/* <button onClick={handleSave}>Save</button> */}
      {/* {editorData && (
        <div>
          <h2>Saved Data:</h2>
          <pre>{JSON.stringify(editorData, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
};

export default Editor;

// import React, { useRef, useEffect, useState } from 'react';
// import EditorJS from '@editorjs/editorjs';
// import Header from '@editorjs/header';
// // import List from '@editorjs/list';
// import Paragraph from '@editorjs/paragraph';
// import Image from '@editorjs/image';
// // import Code from '@editorjs/code';
// // import Embeds from '@editorjs/embed';
// import Delimiter from '@editorjs/delimiter';
// import CustomImageTool from './CustomImageTool';
// import './CustomImageTool.css';
// import YoutubeEmbed from './YoutubeEmbed';
// const Editor = () => {

//   const blogEditorRef = useRef(null);  
//   const videoEditorRef = useRef(null);
//   const blogEditorInstanceRef = useRef(null);
//   const videoEditorInstanceRef = useRef(null);
//   const [editorData, setEditorData] = useState(null);
//   const [showVideoEditor, setShowVideoEditor] = useState(false);

//   useEffect(() => {
//     if (!blogEditorInstanceRef.current) {
//       blogEditorInstanceRef.current = new EditorJS({
//         holder: blogEditorRef.current,  
//         placeholder: 'Let`s write an awesome story!',
//         inlineToolbar: ['link', 'marker', 'bold', 'italic'],
//         tools: {
//           header: Header,  
//           paragraph: Paragraph,
//           embed: {
//             class: YoutubeEmbed,  
//             config: {
//               onChange: (data) => console.log('Embed data:', data),  
//             },
//           },
//           delimiter: Delimiter,
//           image: CustomImageTool, // Use the custom image tool
//         },
//         onReady: () => {
//           console.log('Blog Editor.js is ready to work!');  
//         },
//         autofocus: true,
//       });
//     }

//     return () => {
//       if (blogEditorInstanceRef.current) {
//         // Clean up blog editor instance if needed  
//         // blogEditorInstanceRef.current.destroy();
//         // blogEditorInstanceRef.current = null;
//       }
//     };
//   }, []);

//   const handleSave = async () => {
//     if (blogEditorInstanceRef.current) {
//       try {
//         const outputData = await blogEditorInstanceRef.current.save();  
//         setEditorData(outputData);
//         console.log('Article data: ', outputData);
//       } catch (error) {
//         console.error('Saving failed: ', error);  
//       }
//     }
//   };

//   const handleVideoButtonClick = () => {
//     setShowVideoEditor(true);  
//     setTimeout(() => {
//       if (!videoEditorInstanceRef.current) {
//         videoEditorInstanceRef.current = new EditorJS({
//           holder: videoEditorRef.current,  
//           tools: {
//             embed: {
//               class: YoutubeEmbed,  
//               config: {
//                 onChange: (data) => console.log('Embed data:', data),  
//               },
//             },
//           },
//           data: {
//             blocks: [
//               {
//                 type: 'embed',  
//                 data: {},
//               },
//             ],
//           },
//           onReady: () => {
//             console.log('Video Editor.js is ready to work!');  
//           },
//           autofocus: true,
//         });
//       }
//     }, 0);
//   };

//   return (
//     <div>  
//     <div ref={blogEditorRef}></div>
//     <button onClick={handleSave}>Save</button>
//     {editorData && (
//       <div>  
//         <h2>Saved Data:</h2>
//         <pre>{JSON.stringify(editorData, null, 2)}</pre>
//       </div>
//     )}
//     <button onClick={handleVideoButtonClick}>Upload Video</button>
//     {showVideoEditor && <div ref={videoEditorRef}></div>}
//   </div>
//   );
// };

// export default Editor;



