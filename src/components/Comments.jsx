import React, { useState } from "react";
import { timeAgo } from "../utils/helper";
import { avatar } from "../assets";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { handleVideos } from "../feature/videosSlice";
import axios from "axios";
import { toast } from "react-toastify";

function Comments({ video }) {
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [showCommentBtn, setShowCommentBtn] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [editedComment, setEditedComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const { username, token } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const toggleOptions = (id) => {
    setActiveCommentId((prev) => (prev === id ? null : id));
  };

  const handleEditComment = (id) => {
    setEditCommentId((prev) => (prev === id ? null : id));
  };

  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/videos");
      if (res.data) dispatch(handleVideos(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  //handle add comment for logged in user
  const addComment = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/comment/addComment/${video._id}`,
        {
          commentId: uuid(),
          userId: `@${username}`,
          text: newComment,
          timestamp: new Date().toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data) {
        fetchVideos();
        setNewComment("");
        setShowCommentBtn(false);
      }
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  //handle delete comment
  const deleteComment = async (commentId) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/comment/deleteComment/${video._id}`,
        {
          data: { commentId },
        }
      );
      if (res.data) fetchVideos();
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const updateComment = async (commentId) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/comment/updateComment/${video._id}`,
        {
          commentId,
          text: editedComment,
        }
      );
      if (res.data) {
        fetchVideos();
        handleEditComment(commentId);
      }
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  return (
    <>
      <div className="font-semibold my-4">
        {video?.comments.length + " "}
        {video?.comments.length == 1 ? "Comment" : "Comments"}
      </div>

      {username && (
        <div className="flex gap-2 items-center mt-4">
          {/* temp need to change image */}
          {/* <img src={avatar} alt="avatar" className="w-6" /> */}
          <div className="capitalize rounded-full bg-blue-500 font-normal text-white px-3 py-1">
            {username[0]}
          </div>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onFocus={() => setShowCommentBtn(true)}
            className="border-b w-full outline-none px-2 pb-1"
            placeholder="Add a comment..."
          />
        </div>
      )}

      {/* add comment section */}
      {showCommentBtn && (
        <div className="flex justify-end gap-8">
          <button
            onClick={() => {
              setShowCommentBtn(false);
              setNewComment("");
            }}
          >
            Cancel
          </button>
          <button
            disabled={!newComment}
            onClick={addComment}
            className={`text-white bg-blue-500 px-3 py-2 rounded-full ${
              !newComment && "bg-gray-500"
            }`}
          >
            Comment
          </button>
        </div>
      )}

      {/* comment list */}
      {username && <br />}
      {video?.comments.map((ele) => {
        return (
          <div key={ele?.commentId} className="mb-2">
            <div className="flex justify-between">
              <p>
                <span className="mr-2 font-normal">{ele?.userId}</span>
                {timeAgo(ele?.timestamp)}
              </p>
              <div className="relative">
                <p
                  className="rotate-90 font-semibold hover:cursor-pointer"
                  onClick={() => toggleOptions(ele?.commentId)}
                >
                  . . .
                </p>
                {activeCommentId == ele?.commentId && (
                  <div className="z-10 mt-2 rounded-xl w-32 flex flex-col gap-2 items-center absolute p-2 bg-black/90 text-white">
                    <p
                      onClick={() => {
                        handleEditComment(ele?.commentId);
                        toggleOptions(ele?.commentId);
                        setEditedComment(ele?.text);
                      }}
                      className="hover:cursor-pointer"
                    >
                      Edit
                    </p>
                    <p
                      onClick={() => deleteComment(ele?.commentId)}
                      className="hover:cursor-pointer"
                    >
                      Delete
                    </p>
                  </div>
                )}
              </div>
            </div>
            {editCommentId == ele?.commentId ? (
              <div>
                <input
                  type="text"
                  value={editedComment}
                  className="outline-none bg-gray-200 w-full px-3 py-2 mt-2 rounded-full"
                  onChange={(e) => setEditedComment(e.target.value)}
                />
                <div className="flex items-center justify-end gap-4 mr-2 mt-2">
                  <p
                    onClick={() => handleEditComment(ele?.commentId)}
                    className="hover:cursor-pointer"
                  >
                    Cancel
                  </p>
                  <button
                    onClick={() => updateComment(ele?.commentId)}
                    className={`px-3 py-2 bg-blue-500 rounded-full text-white  
                      ${!editedComment && "bg-gray-500"}`}
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <p className="font-normal">{ele?.text}</p>
            )}
          </div>
        );
      })}
    </>
  );
}

export default Comments;
