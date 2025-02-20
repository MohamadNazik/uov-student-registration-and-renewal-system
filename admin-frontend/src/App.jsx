import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/dashboard", element: <Dashboard /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
