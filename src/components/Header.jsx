import logo from "../assets/logo.svg";
import cartIcon from "../assets/cart.png";
import { Link, Outlet, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Header() {
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    const totalQuantity = Object.values(cart).reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    setQuantity(totalQuantity);
  }, [cart]);

  return (
    <>
      {/* navigation bar */}
      <nav className="bg-white flex flex-wrap gap-4 justify-between px-10 py-3 items-center">
        <img
          onClick={() => navigate("/")}
          className="hover:scale-110 transition hover:cursor-pointer w-14"
          src={logo}
          alt="logo"
        />
        <div className="flex gap-6 flex-wrap items-center">
          <Link
            to="/"
            className="hover:cursor-pointer hover:scale-105 transition"
          >
            Home
          </Link>
          <div className="flex">
            <img
              onClick={() => navigate("/cart")}
              className="hover:scale-110 hover:cursor-pointer w-8 transition"
              src={cartIcon}
              alt="cart"
            />
            {quantity ? `(${quantity})` : ""}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Header;
