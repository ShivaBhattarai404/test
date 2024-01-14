import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root, {loader as routerLoader} from "./Pages/Root";
import Error from "./Pages/Error";
import Home, {loader as homeLoader} from "./Pages/Home";
import NewLabel, { action as newLabelAction, loader as addLabelLoader } from "./Pages/NewLabel";
import Label, { action as labelAction, loader as labelLoader } from "./Pages/Label";
import Login, { action as loginAction } from "./Pages/Login";
import SignUp, { action as signUpAction } from "./Pages/Signup";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      loader: routerLoader,
      children: [
        {
          index: true,
          element: <Home />,
          loader: homeLoader,
        },
        {
          path: "/new",
          element: <NewLabel />,
          action: newLabelAction,
          children: [
            {
              id: "editLabel",
              path: ":labelId",
              loader: addLabelLoader,
              action: newLabelAction,
              element: <NewLabel />,
            }
          ]
        },
        {
          path: "/label/:labelId",
          element: <Label />,
          action: labelAction,
          loader: labelLoader,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <Error />,
      action: loginAction,
    },
    {
      path: "/signup",
      element: <SignUp />,
      errorElement: <Error />,
      action: signUpAction,
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
