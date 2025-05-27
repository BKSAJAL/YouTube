import { StrictMode, useLayoutEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import "./style.css";
import Header from "./components/Header.jsx";
import { store, persistor } from "./app/store.jsx";
import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProtectedPublicRoute from "./components/ProtectedPublicRoute.jsx";
import ProtectPrivateRoute from "./components/ProtectPrivateRoute.jsx";

// lazy loading page to optimize performance
const VideoPlayer = lazy(() => import("./components/VideoPlayer.jsx"));
const NotFound = lazy(() => import("./components/404NotFound.jsx"));
const Login = lazy(() => import("./components/Login.jsx"));
const Register = lazy(() => import("./components/Register.jsx"));
const CreateChannel = lazy(() => import("./components/CreateChannel.jsx"));
const ChannelPage = lazy(() => import("./components/ChannelPage.jsx"));

function PageWrapper({ children }) {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0); // happens before paint
  }, [pathname]);

  return (
    <>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        draggable
      />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <PageWrapper>
            {/* show a fallback message till component is loading */}
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route element={<Header />}>
                  <Route path="/" element={<App />} />

                  <Route
                    path="/Login"
                    element={
                      <ProtectedPublicRoute>
                        <Login />
                      </ProtectedPublicRoute>
                    }
                  />
                  <Route
                    path="/Register"
                    element={
                      <ProtectedPublicRoute>
                        <Register />
                      </ProtectedPublicRoute>
                    }
                  />
                  <Route
                    path="/CreateChannel"
                    element={
                      <ProtectPrivateRoute>
                        <CreateChannel />
                      </ProtectPrivateRoute>
                    }
                  />
                  <Route
                    path="/MyChannel"
                    element={
                      <ProtectPrivateRoute>
                        <ChannelPage />
                      </ProtectPrivateRoute>
                    }
                  />
                  <Route path="/Video/:id" element={<VideoPlayer />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
          </PageWrapper>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
