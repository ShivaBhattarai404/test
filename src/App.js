import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Pages/Root";
import Error from "./Pages/Error";
import Home from "./Pages/Home";
import NewLabel from "./Pages/NewLabel";
import Label, {action as labelAction} from "./Pages/Label";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "/new",
          element: <NewLabel />
        },
        {
          path: "/label/:labelId",
          element: <Label />,
          action: labelAction,
        }
      ]
    }
  ])
  return (
    <RouterProvider router={routes} />
  );
}

export default App;
