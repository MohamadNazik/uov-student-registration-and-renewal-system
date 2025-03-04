import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import NewRegistrations from "./pages/NewRegistrations";
import RegisteredStudents from "./pages/RegisteredStudents";
import FirstYear from "./pages/FirstYear";  
import SecondYear from "./pages/SecondYear";  
import ThirdYear from "./pages/ThirdYear";
import FourthYear from "./pages/FourthYear";  

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path:'/new-registrations',element:<NewRegistrations />},
  { path:'/registered-students',element:<RegisteredStudents />},
  { path: "/first-year", element: <FirstYear /> },
  { path: "/second-year", element: <SecondYear /> },
  { path: "/third-year", element: <ThirdYear /> },
  { path: "/fourth-year", element: <FourthYear /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
