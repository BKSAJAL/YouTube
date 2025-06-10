import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { saveUser } from "../feature/authSlice";

function CreateChannel() {
  const navigate = useNavigate();
  const { token, username } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    channelName: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createChannel(form);
  };

  const createChannel = async (form) => {
    try {
      const res = await axios.post(
        "https://youtube-node.onrender.com/api/v1/channel/create",
        {
          channelName: form.channelName,
          description: form.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data) {
        dispatch(saveUser({ username, token, channels: [form.channelName] }));
        navigate("/", { replace: true });
      }
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  return (
    <div className="min-h-150 flex items-center justify-center bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white flex flex-col gap-8 justify-evenly shadow-lg rounded-xl p-8 w-full max-w-md mx-10"
      >
        <h2 className="text-2xl text-center font-normal">Create Channel</h2>

        {/* Channel Name */}
        <div>
          <label className="block text-sm">Channel Name</label>
          <input
            type="text"
            name="channelName"
            value={form.channelName}
            onChange={handleChange}
            required
            minLength={3}
            maxLength={20}
            className="mt-1 block w-full px-3 py-2 border rounded-md outline-none border-gray-300"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm">Description</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            minLength={25}
            className="mt-1 block w-full px-3 py-2 border rounded-md outline-none border-gray-300"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between my-2">
          <button
            type="submit"
            className="w-full mr-2 bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateChannel;
