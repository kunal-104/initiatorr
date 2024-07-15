// components/EditorComponent.js

import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import SimpleImage from '@editorjs/simple-image';
import Paragraph from '@editorjs/paragraph';
import Embed from '@editorjs/embed';

const EditorComponent = () => {
  const editorRef = useRef(null);
  const editorInstanceRef = useRef(null);

  useEffect(() => {
    if (!editorInstanceRef.current && editorRef.current) {
      editorInstanceRef.current = new EditorJS({
        holder: editorRef.current,
        tools: {
          header: Header,
          image: SimpleImage,
          paragraph: Paragraph,
          embed: Embed,
        },
        autofocus: true,
        onReady: () => {
          console.log('Editor.js is ready to work!');
        },
        onChange: () => {
          console.log('Content changed!');
        },
      });
    }

    return () => {
      if (editorInstanceRef.current) {
        // editorInstanceRef.current.destroy();
        editorInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <div id="editorjs" ref={editorRef} style={{ minHeight: '300px' }}>
        {/* Editor.js will be injected here */}
      </div>
    </div>
  );
};

export default EditorComponent;
