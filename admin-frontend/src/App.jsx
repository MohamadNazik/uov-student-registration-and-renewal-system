import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import NewRegistrations from "./pages/NewRegistrations";
import RegisteredStudents from "./pages/RegisteredStudents";
import FirstYears from "./pages/FirstYears";
import SecondYears from "./pages/SecondYears";
import ThirdYears from "./pages/ThirdYears";
import FourthYears from "./pages/FourthYears";
import Settings from "./pages/Settings";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import RenewalDashboard from "./pages/RenewalDashboard";
import SecondYearRenewal from "./pages/Renewal/SecondYearRenewal";
import ThirdYearRenewal from "./pages/Renewal/ThirdYearRenewal";
import FourthYearRenewal from "./pages/Renewal/FourthYearRenewal";
import StaffManagement from "./pages/Staff/StaffManagement";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/new-registrations", element: <NewRegistrations /> },
  { path: "/registered-students", element: <RegisteredStudents /> },
  { path: "/first-year", element: <FirstYears /> },
  { path: "/second-year", element: <SecondYears /> },
  { path: "/third-year", element: <ThirdYears /> },
  { path: "/fourth-year", element: <FourthYears /> },
  { path: "/system-settings", element: <Settings /> },
  { path: "/change-password", element: <ChangePassword /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/verify-otp", element: <VerifyOTP /> },
  { path: "/renewal-dashboard", element: <RenewalDashboard /> },
  { path: "/second-year-renewal", element: <SecondYearRenewal /> },
  { path: "/third-year-renewal", element: <ThirdYearRenewal /> },
  { path: "/fourth-year-renewal", element: <FourthYearRenewal /> },
  { path: "/staff-management", element: <StaffManagement /> },

]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
