import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import ProductItem from "./ProductItem";

function ProductList() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const { data, loading, error, refetch } = useFetch({
    method: "GET",
    url: "https://dummyjson.com/products",
  });

  const handleSearch = () => {
    if (!search) return alert("Search field can't be empty");
    const products = data?.products?.filter((ele) =>
      ele.title.toLowerCase().includes(search)
    );
    setProducts(products || []);
  };

  useEffect(() => {
    if (data?.products) setProducts(data?.products);
  }, [data]);

  if (loading) return <p className="text-center pt-20 text-4xl">Loading...</p>;
  if (error)
    return <p className="text-center pt-20 text-4xl">Error: {error.message}</p>;
  return (
    <>
      {/* search feature */}
      <div className="text-center py-10">
        <input
          type="search"
          className="bg-gray-100 px-4 py-2 w-60 rounded-3xl outline-none"
          placeholder="Search Product"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        <button
          onClick={handleSearch}
          className="hover:cursor-pointer ml-2 bg-gray-700 text-white px-4 py-2 rounded-3xl"
        >
          Search
        </button>
      </div>

      {/* product list */}
      {products[0] ? (
        <div className="flex bg-gray-100 justify-center p-10 gap-12 flex-wrap">
          {products?.map((ele) => (
            <ProductItem key={ele.id} product={ele} />
          ))}
        </div>
      ) : (
        <div className="flex bg-gray-100 flex-col items-center justify-center text-gray-700 h-64 gap-2">
          <p className="text-4xl font-normal">No Products Found</p>
          <p>Try a different keyword.</p>
        </div>
      )}
    </>
  );
}

export default ProductList;
