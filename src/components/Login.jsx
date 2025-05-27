import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { saveUser } from "../feature/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  //validate inputs and show errors based on condition
  const validate = () => {
    const newErrors = {};
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(form.username))
      newErrors.username =
        "Username must be 3-20 characters (letters, numbers, underscores).";

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email))
      newErrors.email = "Enter a valid email address.";

    if (!/^[A-Za-z\d@$!%*?&]{8,}$/.test(form.password))
      newErrors.password = "Password must be at least 8 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //handle form inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) login(form);
  };

  //login user
  const login = async (form) => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/login", {
        username: form.username.toLowerCase(),
        email: form.email.toLowerCase(),
        password: form.password,
      });
      if (res.data) {
        navigate("/", { replace: true });
        dispatch(
          saveUser({
            token: res.data?.token,
            username: res.data?.username,
            channels: res.data?.channels,
          })
        );
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
        <h2 className="text-2xl text-center font-normal">Login</h2>

        {/* Username */}
        <div>
          <label className="block text-sm">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md outline-none border-gray-300"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md outline-none border-gray-300"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md outline-none border-gray-300"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between my-2">
          <button
            type="submit"
            className="w-full mr-2 bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="w-full ml-2 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
