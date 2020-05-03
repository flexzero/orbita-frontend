import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import createRootReducer from "../reducers";
import rootSaga from "../sagas";
import loadingMiddleware from "../middlewares/loadingMiddleware";

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const loaderMiddleware = loadingMiddleware("loading");

export default function configureStore(preloadedStore) {
  const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware, loaderMiddleware)
  );

  const store = createStore(
    createRootReducer(history),
    preloadedStore,
    enhancer
  );

  store.runSaga = sagaMiddleware.run(rootSaga);
  return store;

  // const middleware = applyMiddleware(
  //   routerMiddleware(history),
  //   sagaMiddleware
  // );

  // return {
  //   ...createStore(createRootReducer(history), compose(middleware)),
  //   runSaga: sagaMiddleware.run(rootSaga),
  //   history,
  // };
}
