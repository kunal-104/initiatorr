import React, { useRef, useEffect, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import YoutubeEmbed from './YoutubeEmbed';
import { Button } from '@nextui-org/react';

const VideoEditor = ({videoEditorInstanceRef}) => {

  const videoEditorRef = useRef(null);
  // const videoEditorInstanceRef = useRef(null);
  const [videoData, setVideoData] = useState(null);
  const [showVideoEditor, setShowVideoEditor] = useState(false);


  
  const handleVideoButtonClick = () => {
    setShowVideoEditor(true);
    setTimeout(() => {
      if (!videoEditorInstanceRef.current) {
        videoEditorInstanceRef.current = new EditorJS({
          holder: videoEditorRef.current,
          tools: {
            embed: {
              class: YoutubeEmbed,
              config: {
                onChange: (data) => console.log('Embed data:', data),
              },
              inlineToolbar: false, // Disable inline toolbar
            },
          },
          data: {
            blocks: [
              {
                type: 'embed',
                data: {},
              },
            ],
          },
          onReady: () => {
            console.log('Video Editor.js is ready to work!');
          },
          autofocus: true,
        });
      }
    }, 0);
  };

  // const handleSave = async () => {
  //   if (videoEditorInstanceRef.current) {
  //     try {
  //       const outputData = await videoEditorInstanceRef.current.save();
  //       setVideoData(outputData);
  //       console.log('Video data: ', outputData);
  //     } catch (error) {
  //       console.error('Saving failed: ', error);
  //     }
  //   }
  // };
  
  return (
    <div>
    <Button onClick={handleVideoButtonClick}>Upload Video</Button>
    {showVideoEditor && <div ref={videoEditorRef}></div>}
  </div>
  );
};

export default VideoEditor;