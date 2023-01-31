import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import storage from "redux-persist/lib/storage/session";

const rootPersistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["auth", "app"],
  //  blacklist: ['auth','app']
};
  
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = createStore(persistedReducer, {}, applyMiddleware(thunk));

const persister = persistStore(store);

export { store, persister };
