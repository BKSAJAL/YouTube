import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import NotFound from "./404NotFound";
import useFetch from "../hooks/useFetch";
import { useDispatch } from "react-redux";
import { addProduct } from "../feature/cart/cartSilce";
import { ToastContainer, toast } from "react-toastify";

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const { data, loading, error, refetch } = useFetch({
    method: "GET",
    url: "https://dummyjson.com/products",
  });

  const { id } = useParams();

  const addToCart = () => {
    toast.success("Product added to cart!", {
      position: "top-center",
      autoClose: 1000,
    });
    dispatch(addProduct(product));
  };

  useEffect(() => {
    if (data?.products) {
      const product = data?.products.find((ele) => ele.id == id);
      setProduct(product);
    }
  }, [data]);

  // show loading when fetching data
  if (loading) return <p className="text-center pt-20 text-4xl">Loading...</p>;
  // if any error in fetching show error message
  if (error)
    return <p className="text-center pt-20 text-4xl">Error: {error.message}</p>;
  if (!product) return <NotFound />;
  return (
    <>
      {/* show toast message */}
      <ToastContainer />

      {/* show product details */}
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6 gap-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-72 rounded-xl product-card bg-white"
        />
        <button
          onClick={addToCart}
          className="bg-gray-700 text-sm text-white px-2.5 py-1.5 rounded-full hover:cursor-pointer hover:scale-105 transition"
        >
          Add to Cart
        </button>
        <p className="text-3xl font-semibold">{product.title}</p>
        <i className="text-lg">${product.price}</i>
        <i className="text-center max-w-xl">{product.description}</i>
        <div className="flex items-center gap-2 text-lg">
          <span className="capitalize bg-gray-700 text-sm text-white px-3 py-1 rounded-full">
            {product.category}
          </span>
          <span>⭐ {product.rating}</span>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
