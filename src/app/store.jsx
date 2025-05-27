import showSidebarReducer from "../feature/showSidebarSlice";
import searchReducer from "../feature/searchSlice";
import videosReducer from "../feature/videosSlice";
import authReducer from "../feature/authSlice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  showSidebar: showSidebarReducer,
  search: searchReducer,
  videos: videosReducer,
  user: authReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["videos", "user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // 👇 Ignore these redux-persist action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
