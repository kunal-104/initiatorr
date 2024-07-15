class CustomURLImageTool {
    static get toolbox() {
      return {
        title: 'Image URL',
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M21 19v2H3v-2h18M19 4v11H5V4h14m2-2H3c-1.1 0-1.99.9-1.99 2L1 19c0 1.1.89 2 1.99 2H21c1.1 0 1.99-.9 1.99-2L23 4c0-1.1-.89-2-1.99-2zM11 10l2.03 2.71L15 10l4 5H5l4-5z"/></svg>'
      };
    }
  
    render() {
      const wrapper = document.createElement('div');
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Enter image URL';
      const button = document.createElement('button');
      button.innerText = 'Add Image';
  
      button.addEventListener('click', () => {
        const img = document.createElement('img');
        img.src = input.value;
        wrapper.appendChild(img);
      });
  
      wrapper.appendChild(input);
      wrapper.appendChild(button);
      return wrapper;
    }
  
    save(blockContent) {
      const img = blockContent.querySelector('img');
      return {
        url: img ? img.src : '',
      };
    }
  }
  
  export default CustomURLImageTool;
  