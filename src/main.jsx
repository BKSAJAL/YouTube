import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import "./style.css";
import Header from "./components/Header.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { lazy, Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";

// lazy load not immediately required components
const ProductDetails = lazy(() => import("./components/ProductDetails.jsx"));
const Cart = lazy(() => import("./components/Cart.jsx"));
const NotFound = lazy(() => import("./components/404NotFound.jsx"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* show a fallback message till component is loading */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<Header />}>
              <Route path="/" element={<App />} />
              <Route path="/Product/:id" element={<ProductDetails />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
