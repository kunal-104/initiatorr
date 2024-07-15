import React from "react";
class YoutubeEmbed {
  static get toolbox() {
    return {
      title: "YouTube",
      icon : '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="30" viewBox="-35.20005 -41.33325 305.0671 247.9995"><path d="M229.763 25.817c-2.699-10.162-10.65-18.165-20.748-20.881C190.716 0 117.333 0 117.333 0S43.951 0 25.651 4.936C15.553 7.652 7.6 15.655 4.903 25.817 0 44.236 0 82.667 0 82.667s0 38.429 4.903 56.85C7.6 149.68 15.553 157.681 25.65 160.4c18.3 4.934 91.682 4.934 91.682 4.934s73.383 0 91.682-4.934c10.098-2.718 18.049-10.72 20.748-20.882 4.904-18.421 4.904-56.85 4.904-56.85s0-38.431-4.904-56.85" fill="red"/><path d="M93.333 117.559l61.333-34.89-61.333-34.894z" fill="#fff"/></svg>',
    //   icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#FFF" d="M1.5 12c0-4.143 3.357-7.5 7.5-7.5h8.5C18.643 4.5 22.5 8.357 22.5 12c0 3.643-3.857 7.5-7.5 7.5H9c-4.143 0-7.5-3.857-7.5-7.5z"/><path d="M21.5 8c0-1.657-1.343-3-3-3V3a3 3 0 0 0-3-3H3a3 3 0 0 0-3 3v5c0 1.657 1.343 3 3 3h18.5zM12 17.5l5-6.25V12l-5 6.25z" fill="#FF0000" /></svg>',

 
    };
  }

  constructor({ data, api, config }) {
    this.api = api;
    this.config = config;
    this.data = data || { url: "" };

    this.wrapper = null;
    this.input = null;
  }

  render() {
    this.wrapper = document.createElement("div");
    this.input = document.createElement("input");

    this.input.placeholder = "Paste YouTube URL here...  https://youtu.be/4bKT7MrtRCk";
    this.input.value = this.data.url || ""; // Use empty string if data.url is undefined
    this.input.classList.add("cdx-input");
    this.input.addEventListener("input", (event) => {
      this._createIframe(event.target.value);
    });

    this.wrapper.appendChild(this.input);
    if (this.data.url) {
      this._createIframe(this.data.url);
    }

    return this.wrapper;
  }

  _createIframe(url) {
    const videoId = this._extractVideoId(url);
    if (!videoId) {
      return;
    }

    const iframe = document.createElement("iframe");
    iframe.width = "100%";
    iframe.height = "320";
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.frameBorder = "0";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    if (this.wrapper.childNodes.length > 1) {
      this.wrapper.removeChild(this.wrapper.childNodes[1]);
    }

    this.wrapper.appendChild(iframe);
    this.data.url = url;
  }

  _extractVideoId(url) {
    const videoIdMatch =
      url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*v=([^&]+)/) ||
      url.match(/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^&]+)/);
    return videoIdMatch ? videoIdMatch[1] : null;
  }

  save(blockContent) {
    return {
      url: this.data.url,
    };
  }

  validate(savedData) {
    if (!savedData.url.trim()) {
      return false;
    }
    return true;
  }

  static get pasteConfig() {
    return {
      tags: ["IFRAME"],
    };
  }

  static get isReadOnlySupported() {
    return true;
  }
}

export default YoutubeEmbed;
