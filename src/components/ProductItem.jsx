import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addProduct } from "../feature/cart/cartSilce";
import { ToastContainer, toast } from "react-toastify";

function ProductItem({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addToCart = () => {
    toast.success("Product added to cart!", {
      position: "top-center",
      autoClose: 1000,
    });
    dispatch(addProduct(product));
  };

  return (
    // product item
    <section className="hover:cursor-pointer">
      <ToastContainer />
      <div className="bg-white flex flex-col justify-between h-96 product-card rounded-xl overflow-hidden">
        <img
          onClick={() => navigate(`/product/${product.id}`)}
          className="h-64 w-72  hover:scale-105 transition"
          src={product.thumbnail}
          alt={product.title}
        />
        <div className="bg-black py-2.5 text-white text-center">
          <p>{product.title}</p>
          <i className="block my-2 text-xs font-normal">${product.price} </i>

          {/* add to cart feature */}
          <button
            onClick={addToCart}
            className="bg-white text-sm text-black px-2.5 py-1.5 rounded-full hover:cursor-pointer hover:scale-105 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductItem;
