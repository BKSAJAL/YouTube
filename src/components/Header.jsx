import { logo, glassIcon, avatar, menu } from "../assets/index";
import { shorts, clock, history, home } from "../assets/index";
import { like, subscription, video, playlists } from "../assets/index";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { handleSidebar } from "../feature/showSidebarSlice";
import { handleSearch } from "../feature/searchSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import add from "../assets/add.png";
import { saveUser } from "../feature/authSlice";
import { useMediaQuery } from "react-responsive";

function Header() {
  const [search, setSearch] = useState("");
  const [isHome, setIsHome] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const { username, channels } = useSelector((state) => state.user.user);

  const showSidebar = useSelector((state) => state.showSidebar.showSidebar);

  const isMobile = useMediaQuery({ maxWidth: 650 });

  const searchVideos = () => {
    if (pathname === "/") {
      if (!search) return toast.error("Search field can't be empty");
      dispatch(handleSearch(search.toLowerCase()));
    }
  };

  useEffect(() => {
    if (pathname == "/") {
      setIsHome(true);
      dispatch(handleSidebar(true));
    } else {
      setIsHome(false);
      dispatch(handleSidebar(false));
    }
  }, [pathname]);

  return (
    <>
      {/* navigation bar */}
      <nav className="bg-white flex flex-wrap justify-start gap-4 sm:justify-between px-10 py-4 items-center sticky top-0 z-10">
        <div className="flex gap-8 items-center">
          <img
            onClick={() => {
              dispatch(handleSidebar(!showSidebar));
            }}
            className="hover:cursor-pointer w-7"
            src={menu}
            alt="menu"
          />
          <img
            onClick={() => navigate("/")}
            className="hover:scale-110 transition hover:cursor-pointer w-14"
            src={logo}
            alt="logo"
          />
        </div>

        {/* Search functionality */}
        <div className="flex">
          <input
            type="search"
            className="px-4 py-2 w-full lg:w-140 rounded-l-3xl border-2 border-gray-200 outline-none"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
          <div
            onClick={searchVideos}
            className="w-14 flex justify-center items-center hover:cursor-pointer bg-gray-200 rounded-r-3xl"
          >
            <img src={glassIcon} alt="glass-icon" className="w-6" />
          </div>
        </div>

        {/* sign-in */}
        {username ? (
          <div className="flex items-center gap-4">
            {!channels[0] && (
              <div
                className="flex items-center gap-1 hover:cursor-pointer"
                onClick={() => navigate("/CreateChannel")}
              >
                <div className="has-tooltip relative">
                  <span className="tooltip rounded shadow-lg p-1 bg-gray-100 top-10 sm:right-0 text-xs whitespace-nowrap">
                    Create Channel
                  </span>
                  <img src={add} className="w-8" />
                </div>
              </div>
            )}
            <div className="relative has-tooltip capitalize rounded-full bg-gray-500 text-white px-4 py-2 hover:cursor-pointer">
              {username[0]}
              <div
                className="text-black shadow-lg w-32 flex flex-col items-center gap-2 absolute tooltip rounded 
              hover:cursor-pointer bg-gray-100 top-11 text-xs sm:right-0 py-3"
              >
                {channels[0] && (
                  <span
                    onClick={() => navigate("/MyChannel")}
                    className="whitespace-nowrap block text-blue-500"
                  >
                    View your Channel
                  </span>
                )}
                <span
                  onClick={() => {
                    dispatch(saveUser({}));
                  }}
                >
                  Logout
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={() => navigate("/login")}
            className="flex gap-2 border-2 border-gray-200 rounded-full px-2 py-1 hover:cursor-pointer"
          >
            <img className="w-6" src={avatar} alt="avatar" />
            <span className="font-semibold" style={{ color: "#339AF0" }}>
              Sign in
            </span>
          </div>
        )}
      </nav>

      <div
        className={`${
          isHome
            ? showSidebar
              ? "sidebar-video-grid"
              : "minimize-sidebar"
            : "grid grid-cols-1"
        }`}
      >
        {/* Sidebar */}
        <div
          className={`pl-6 pr-2 bg-white h-screen z-0 pt-8 shadow ${
            !isHome ? (showSidebar ? "fixed" : "hidden") : "sticky top-22"
          }`}
        >
          <SideBarItem label="Home" icon={home} />
          <SideBarItem label="Shorts" icon={shorts} />
          <SideBarItem label="Subscriptions" icon={subscription} />
          {showSidebar && !isMobile && (
            <>
              <hr className="my-4" />
              <SideBarItem label="History" icon={history} />
              <SideBarItem label="Playlists" icon={playlists} />
              <SideBarItem label="Your videos" icon={video} />
              <SideBarItem label="Watch Later" icon={clock} />
              <SideBarItem label="Liked videos" icon={like} />
            </>
          )}
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Header;

function SideBarItem({ icon, label }) {
  const navigate = useNavigate();
  const showSidebar = useSelector((state) => state.showSidebar.showSidebar);
  const isMobile = useMediaQuery({ maxWidth: 650 });
  
  return (
    <div
      onClick={() => label == "Home" && navigate("/")}
      className="flex items-center mb-2 gap-8 hover:bg-gray-100 rounded-lg px-4 py-3 hover:cursor-pointer"
    >
      <img className="w-6" src={icon} alt={label} />
      {showSidebar && !isMobile && label}
    </div>
  );
}
