import { createBrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./common/view/DefaultLayout";
import { Home } from "./feature/Home/view";
import { Map } from "./feature/Map/view";

const APP_ROUTES = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/map",
    element: <Map />,
  },
];

const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <DefaultLayout>
        <Routes>
          {APP_ROUTES.map(({ element, path }) => (
            <Route element={element} path={path} key={path} />
          ))}
        </Routes>
      </DefaultLayout>
    ),
  },
]);

export { router };
