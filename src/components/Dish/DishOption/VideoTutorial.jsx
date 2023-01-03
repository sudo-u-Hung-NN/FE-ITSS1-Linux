import React from "react";

export default function VideoTutorial({ dishData }) {
  return (
    <div>
      <div className="video-toturial">
        <h3>Video tutorial</h3>
        <div>
          <iframe
            width="100%"
            height="500px"
            src={dishData?.data[0].videoUrl}
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
