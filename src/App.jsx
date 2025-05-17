import banner from "./assets/banner.jpg";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div>
      {/* welcome message */}
      <section
        className="bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="h-96 flex flex-col justify-center items-center text-shadow-lg text-shadow-white">
          <h1 className="text-3xl sm:text-4xl">
            🛒 Welcome to <span className="font-normal">ShoppyGlobe</span>
          </h1>
          <p className="text-sm sm:text-base">
            Discover the best deals, curated just for you. Shop smart, shop
            happy!
          </p>
        </div>
      </section>

      {/* product list */}
      <div className="bg-gry-200">
        <ProductList />
      </div>
    </div>
  );
}

export default App;
