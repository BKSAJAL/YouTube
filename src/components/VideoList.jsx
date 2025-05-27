import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import VideoItem from "./VideoItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { handleVideos } from "../feature/videosSlice";

function VideoList() {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState();
  const searchKey = useSelector((state) => state.search.search);
  const dispatch = useDispatch();

  const { data, loading, error, refetch } = useFetch({
    method: "GET",
    url: "http://localhost:3000/api/v1/videos",
  });

  //Filter videos based on categories
  const filterByCategory = (category) => {
    const filteredVideo = data?.filter((ele) =>
      ele.category.includes(category)
    );
    setVideos(filteredVideo);
  };

  useEffect(() => {
    if (data) {
      setVideos(data);
      const categories = [...new Set(data?.map((ele) => ele.category))];
      setCategories(categories);
      dispatch(handleVideos(data));
    }
  }, [data]);

  useEffect(() => {
    if (searchKey) {
      const filteredVideos = data.filter((ele) =>
        ele.title.toLowerCase().includes(searchKey)
      );
      setVideos(filteredVideos);
    }
  }, [searchKey]);

  if (loading) return <p className="text-center pt-20 text-4xl">Loading...</p>;
  if (error)
    return <p className="text-center pt-20 text-4xl">Error: {error.message}</p>;
  return (
    <div>
      {/* categories chips */}
      <div className="category flex gap-4 m-4 sm:m-8 whitespace-nowrap overflow-x-auto">
        {categories?.map((ele) => {
          return (
            <div
              key={ele}
              onClick={() => filterByCategory(ele)}
              className="bg-black/40 text-white px-3 py-1 rounded-full hover:cursor-pointer"
            >
              {ele}
            </div>
          );
        })}
      </div>

      {/* Video list */}
      {videos[0] ? (
        <div className="flex px-4 sm:px-8 gap-8 flex-wrap justify-evenly xl:justify-start">
          {videos?.map((ele) => (
            <VideoItem key={ele._id} video={ele} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-700 h-64 gap-2">
          <p className="text-4xl font-normal">No Videos Found</p>
          <p>Try a different title.</p>
        </div>
      )}
    </div>
  );
}

export default VideoList;
