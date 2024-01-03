import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Pages/Root";
import Error from "./Pages/Error";
import Home from "./Pages/Home";
import NewLabel, { action as newLabelAction } from "./Pages/NewLabel";
import Label, { action as labelAction } from "./Pages/Label";
import Login, { action as loginAction } from "./Pages/Login";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/new",
          element: <NewLabel />,
          action: newLabelAction,
        },
        {
          path: "/label/:labelId",
          element: <Label />,
          action: labelAction,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <Error />,
      action: loginAction,
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
