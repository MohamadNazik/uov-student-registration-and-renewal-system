import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import NewRegistrations from "./pages/NewRegistrations";
import RegisteredStudents from "./pages/RegisteredStudents";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/dashboard", element: <Dashboard /> },
  {path:'/new-registrations',element:<NewRegistrations />},
  {path:'/new-registrations',element:<RegisteredStudents/>}
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
