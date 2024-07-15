




import React, { Component } from 'react';

class CustomImageTool {
  static get toolbox() {
    return {
      title: 'Image',
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>', // You can use any icon here
    };
  }

  constructor({ data, api }) {
    this.data = data;
    this.api = api;
    this.wrapper = null;
    this.fileInput = null;
  }

  render() {
      this.wrapper = document.createElement('div');
    this.wrapper.classList.add('custom-image-tool-wrapper');
    this.fileInput = document.createElement('input');
    this.fileInput.type = 'file';
    this.fileInput.accept = 'image/*';

    this.fileInput.addEventListener('change', this.onFileSelect.bind(this));
    
    this.wrapper.appendChild(this.fileInput);

    if (this.data && this.data.url) {
      this.appendImage(this.data.url);
    }

    return this.wrapper;
  }

  onFileSelect(event) {
    const file = event.target.files[0];
    if (!file) {
      return; // No file selected, exit the function
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      this.appendImage(e.target.result);
      this.data.url = e.target.result;
    };

    reader.readAsDataURL(file);
  }
  
  appendImage(url) {
    const existingImage = this.wrapper.querySelector('img');
    if (existingImage) {
        existingImage.remove();
    }

    const image = this.createImage(url);
    this.wrapper.appendChild(image);
    this.addResizeHandles(image);
  }

  createImage(url) {
    const image = document.createElement('img');
    image.src = url;
    image.classList.add('resizable-image');
    
    return image;
}

addResizeHandles(image) {
    const resizeHandles = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    resizeHandles.forEach(handle => {
      const handleDiv = document.createElement('div');
      handleDiv.classList.add('resize-handle', handle);
      this.wrapper.appendChild(handleDiv);
      
      handleDiv.addEventListener('mousedown', (event) => {
        this.initResize(event, image, handle);
    });
    });
}

initResize(event, image, handle) {
    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = parseInt(document.defaultView.getComputedStyle(image).width, 10);
    const startHeight = parseInt(document.defaultView.getComputedStyle(image).height, 10);

    const doDrag = (dragEvent) => {
      if (handle.includes('right')) {
          image.style.width = startWidth + dragEvent.clientX - startX + 'px';
      }
      if (handle.includes('left')) {
        image.style.width = startWidth - (dragEvent.clientX - startX) + 'px';
      }
      if (handle.includes('bottom')) {
          image.style.height = startHeight + dragEvent.clientY - startY + 'px';
        }
        if (handle.includes('top')) {
        image.style.height = startHeight - (dragEvent.clientY - startY) + 'px';
      }
    };

    const stopDrag = () => {
      window.removeEventListener('mousemove', doDrag);
      window.removeEventListener('mouseup', stopDrag);
    };

    window.addEventListener('mousemove', doDrag);
    window.addEventListener('mouseup', stopDrag);
}

save() {
    return {
        url: this.data.url,
    };
}
}

export default CustomImageTool;


// import React, { Component } from 'react';

// class CustomImageTool {
//   static get toolbox() {
//     return {
//       title: 'Image',
//       icon: '<svg>...</svg>', // You can use any icon here
//     };
//   }

//   constructor({ data, api }) {
//     this.data = data;
//     this.api = api;
//     this.wrapper = null;
//     this.fileInput = null;
//   }

//   render() {
//     this.wrapper = document.createElement('div');
//     this.fileInput = document.createElement('input');
//     this.fileInput.type = 'file';
//     this.fileInput.accept = 'image/*';

//     this.fileInput.addEventListener('change', this.onFileSelect.bind(this));

//     this.wrapper.appendChild(this.fileInput);

//     if (this.data && this.data.url) {
//       const image = this.createImage(this.data.url);
//       this.wrapper.appendChild(image);
//     }

//     return this.wrapper;
//   }

//   onFileSelect(event) {
//     const file = event.target.files[0];
//     if (!file) {
//       return; // No file selected, exit the function
//     }

//     const reader = new FileReader();

//     reader.onload = (e) => {
//       const image = this.createImage(e.target.result);

//       // Clear previous image if any
//       if (this.wrapper.querySelector('img')) {
//         this.wrapper.querySelector('img').remove();
//       }

//       this.wrapper.appendChild(image);
//       this.data.url = e.target.result;
//     };

//     reader.readAsDataURL(file);
//   }

//   createImage(url) {
//     const image = document.createElement('img');
//     image.src = url;
//     image.style.maxWidth = '100%'; // Make image responsive
//     image.style.maxHeight = '300px'; // Limit the max height
//     image.style.width = 'auto'; // Auto width
//     image.style.height = 'auto'; // Auto height

//     return image;
//   }

//   save() {
//     return {
//       url: this.data.url,
//     };
//   }
// }

// export default CustomImageTool;