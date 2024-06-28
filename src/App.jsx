import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Verify from "./pages/Verify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "verify/:authString",
    element: <Verify />,
  },
  {
    path: "verify/",
    element: <h1>Verify page</h1>,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
