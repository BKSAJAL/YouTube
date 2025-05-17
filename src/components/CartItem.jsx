const CartItem = ({ item, onAdd, onRemove }) => {
  const { product, quantity } = item;

  return (
    // handles each cart items
    <div className="bg-white flex flex-col justify-between h-96 product-card rounded-xl overflow-hidden">
      <img
        className="h-64 w-72 hover:scale-105 transition"
        src={product.thumbnail}
        alt={product.title}
      />
      <div className="bg-black py-2.5 text-white text-center">
        <p>{product.title}</p>
        <i className="my-2 text-xs font-nomal">${product.price} </i>
        <div className="flex justify-center gap-8 items-center">
          <button
            onClick={() => onAdd(product)}
            className="text-white scale-150 hover:cursor-pointer select-none"
          >
            +
          </button>
          <p>{quantity}</p>
          <button
            className="text-white scale-200 hover:cursor-pointer select-none"
            onClick={() => onRemove(product)}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
