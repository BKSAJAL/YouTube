import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { formatCompact, timeAgo } from "../utils/helper";

function ChannelPage() {
  const [channelData, setChannelData] = useState(null);
  const { token } = useSelector((state) => state.user);
  const videos = useSelector((state) => state.videos.videos);

  const getChannel = async () => {
    try {
      const res = await axios.get("https://youtube-node.onrender.com/api/v1/channel/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data) setChannelData(res.data);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  useEffect(() => {
    getChannel();
  }, []);
  return (
    <div className="mx-8">
      {/* banner */}
      <img
        src={channelData?.channelBanner}
        className="w-full h-80 rounded-2xl object-cover"
      />

      {/* channel info */}
      <div className="flex gap-4 mt-10 items-start">
        <div className="w-26 h-26 flex items-center justify-center capitalize bg-blue-500 text-white text-5xl rounded-full">
          {channelData?.channelName[0]}
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold">{channelData?.channelName}</p>
          <p>
            {formatCompact(channelData?.subscribers) + " Subscribers"}
            <span className="font-semibold"> · </span> 3 videos
          </p>
          <p>{channelData?.description}</p>
        </div>
      </div>

      {/* Video cards */}
      <div className="flex gap-8 mt-10 mb-20 flex-wrap">
        {videos.slice(0, 3)?.map((ele) => (
          <div key={ele._id}>
            <div className="flex flex-col max-w-96">
              <img
                className="rounded-xl"
                src={ele.thumbnailUrl}
                alt={ele.title}
              />

              <div className="mt-3">
                <p className="font-semibold">{ele.title}</p>
                <p>
                  {formatCompact(ele.views)} views
                  <span className="font-semibold"> · </span>
                  {timeAgo(ele.uploadDate)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChannelPage;
