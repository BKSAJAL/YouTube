import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { addProduct, removeProduct } from "../feature/cart/cartSilce";
import { ToastContainer, toast } from "react-toastify";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = Object.values(useSelector((state) => state.cart.cart));

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  //handle add to cart feature and show notification
  const handleAdd = (product) => {
    toast.success("Product added to cart!", {
      position: "top-center",
      autoClose: 1000,
    });
    dispatch(addProduct(product));
  };

  //handle remove item feature and show notification
  const handleRemove = (product) => {
    toast.success("Product removed from cart!", {
      position: "top-center",
      autoClose: 1000,
    });
    dispatch(removeProduct(product));
  };

  // show message if not item in the carts
  if (cartItems.length === 0)
    return <p className="text-center pt-40 text-4xl">Your cart is empty.</p>;

  return (
    <>
      {/* Toast  */}
      <ToastContainer />

      {/* show all the cart items list */}
      <div className="cart-container bg-gray-100">
        <div className="flex gap-8 flex-wrap justify-center md:justify-start">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onAdd={handleAdd}
              onRemove={handleRemove}
            />
          ))}
        </div>

        {/* show minified products list and total price and quantity */}
        <div className="text-center h-fit">
          <hr />
          {cartItems.map((item) => (
            <div
              className="flex justify-between p-2 items-center border-b border-black/20"
              key={item.id}
            >
              <img className="w-20" src={item.product.thumbnail} />
              <p>{item.quantity}</p>
              <p>${(item.quantity * item.product.price).toFixed(2)}</p>
            </div>
          ))}
          <p className="mt-5">Total Quantity: {totalQuantity}</p>
          <p className="mb-5">Total Price: ${totalPrice.toFixed(2)}</p>
          <hr />
        </div>
      </div>
    </>
  );
}

export default Cart;
