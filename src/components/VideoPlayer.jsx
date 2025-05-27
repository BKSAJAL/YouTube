import { useNavigate, useParams } from "react-router";
import { formatCompact, timeAgo } from "../utils/helper";
import { like, dislike } from "../assets/index";
import Comments from "./Comments";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function VideoPlayer() {
  const [video, setVideo] = useState(null);
  const videos = useSelector((state) => state.videos.videos);
  const navigate = useNavigate();
  const { id } = useParams();

  //fetch video based on dynamic route
  useEffect(() => {
    if (videos) {
      const filteredVideo = videos.find((ele) => ele._id == id);
      setVideo(filteredVideo);
    }
  }, [videos, id]);

  return (
    <>
      <div className="video-page">
        {/* video player */}

        <div className="flex flex-col gap-4">
          <div
            className="h-60 sm:h-96 rounded-2xl overflow-hidden xl:h-1/5"
            dangerouslySetInnerHTML={{ __html: video?.videoIframe }}
          />

          <p className="font-semibold">{video?.title}</p>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <img src={video?.thumbnailUrl} className="w-8 h-8 rounded-full" />
              <p>{video?.channelId}</p>
              <button className="bg-black text-white px-3 py-2 rounded-full">
                Subscribe
              </button>
            </div>

            <div className="flex">
              <div className="flex items-center gap-1 bg-gray-200 px-3 py-2 rounded-l-full">
                <img src={like} className="w-5" />
                {formatCompact(video?.likes)}
              </div>
              <div className="flex items-center gap-1 bg-gray-200 px-3 rounded-r-full">
                <img src={dislike} className="w-5 mt-2" />
                {formatCompact(video?.dislikes)}
              </div>
            </div>
          </div>

          <div className="bg-gray-200 rounded-lg p-4 min-h-32 mt-2">
            <p className="font-normal">
              {formatCompact(video?.views)} views
              <span className="font-semibold"> · </span>
              {video && timeAgo(video?.uploadDate)}
            </p>
            <p>{video?.description}</p>
          </div>

          {/* comments section */}
          <Comments video={video} />
        </div>

        {/* Recommended video list */}
        <div>
          {videos?.map((ele) => {
            return (
              <div
                key={ele._id}
                className="flex hover:bg-gray-200 gap-2 p-2 rounded-lg hover:cursor-pointer"
                onClick={() => {
                  navigate(`/Video/${ele._id}`);
                }}
              >
                <img src={ele.thumbnailUrl} className="w-32 h-24 rounded-lg" />
                <div className="flex flex-col">
                  <p className="font-semibold mb-1">{ele.title}</p>
                  <p className="capitalize">{ele.channelId}</p>
                  <p>
                    {formatCompact(ele.views)} views
                    <span className="font-semibold"> · </span>
                    {timeAgo(ele.uploadDate)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default VideoPlayer;
