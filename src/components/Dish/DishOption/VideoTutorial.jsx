import React from "react";

export default function VideoTutorial() {
  return (
    <div>
      <div className="video-toturial">
        <h3>Video tutorial</h3>
        <div>
          <iframe
            width="100%"
            height="500px"
            src="https://www.youtube.com/embed/rxgfxWwRVos"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
