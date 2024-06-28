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
    path: "/verify/:authString",
    element: <Verify />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
