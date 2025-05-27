import { useSelector } from "react-redux";
import { formatCompact, timeAgo } from "../utils/helper";
import { useNavigate } from "react-router";

function VideoItem({ video }) {
  const showSidebar = useSelector((state) => state.showSidebar.showSidebar);
  const navigate = useNavigate();
  return (
    //video card
    <section
      className="hover:cursor-pointer"
      onClick={() => {
        navigate(`/Video/${video._id}`);
      }}
    >
      <div
        className={`flex flex-col ${showSidebar ? "max-w-96" : "max-w-100"}`}
      >
        <img
          // className={`${showSidebar ? "h-64" : "h-72"} rounded-xl`}
          className="rounded-xl"
          src={video.thumbnailUrl}
          alt={video.title}
        />

        {/* Video info */}
        <div className="flex gap-2 mt-3">
          <img src={video.thumbnailUrl} className="w-8 h-8 rounded-full" />
          <div>
            <p className="font-semibold">{video.title}</p>
            <p>{video.channelId}</p>
            <p>
              {formatCompact(video.views)} views
              <span className="font-semibold"> · </span>
              {timeAgo(video.uploadDate)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoItem;
