import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Common/Home";
import Login from "./pages/AlreadyStudent/Login";
import UserDashboard from "./pages/AlreadyStudent/UserDashboard";
import StudentID from "./pages/AlreadyStudent/StudentID";
import RecordBook from "./pages/AlreadyStudent/RecordBook";
import Renewal from "./pages/AlreadyStudent/Renewal";
import ChangePassword from "./pages/AlreadyStudent/ChangePassword";
import RenewalSuccess from "./pages/AlreadyStudent/RenewalSuccess";
import AlreadyRenewalSubmitted from "./pages/AlreadyStudent/AlreadyRenewalSubmitted";
import ForgotPassword from "./pages/AlreadyStudent/ForgotPassword";
import VerifyOTP from "./pages/AlreadyStudent/VerifyOTP";
import CheckSelection from "./pages/RegistrationProcess/CheckSelection";
import ConfirmSelection from "./pages/RegistrationProcess/ConfirmSelection";
import Instructions from "./pages/RegistrationProcess/Instructions";
import A1Form_Part01 from "./pages/RegistrationProcess/A1Form_Part01";
import A1Form_Part02 from "./pages/RegistrationProcess/A1Form_Part02";
import A1Form_Part03 from "./pages/RegistrationProcess/A1Form_Part03";
import UploadDocuments from "./pages/RegistrationProcess/UploadDocuments";
import VerifyID from "./pages/RegistrationProcess/VerifyID";
import RegSuccess from "./pages/RegistrationProcess/RegSuccess";
import AlreadyRegSubmitted from "./pages/RegistrationProcess/AlreadyRegSubmitted";
import { FormProvider } from "./utils/FormContext";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/user-dashboard", element: <UserDashboard /> },
  { path: "/student-id", element: <StudentID /> },
  { path: "/record-book", element: <RecordBook /> },
  { path: "/renewal", element: <Renewal /> },
  { path: "/change-password", element: <ChangePassword /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/verify-otp", element: <VerifyOTP /> },
  { path: "/re-success", element: <RenewalSuccess /> },
  { path: "/re-submitted", element: <AlreadyRenewalSubmitted /> },
  { path: "/check-selection", element: <CheckSelection /> },
  { path: "/confirm-selection", element: <ConfirmSelection /> },
  { path: "/instructions", element: <Instructions /> },
  { path: "/a1-from-part-1", element: <A1Form_Part01 /> },
  { path: "/a1-from-part-2", element: <A1Form_Part02 /> },
  { path: "/a1-from-part-3", element: <A1Form_Part03 /> },
  { path: "/upload-documents", element: <UploadDocuments /> },
  { path: "/verify-id", element: <VerifyID /> },
  { path: "/reg-success", element: <RegSuccess /> },
  { path: "/reg-submitted", element: <AlreadyRegSubmitted /> },
  { path: "/*", element: <Home /> },
]);

function App() {
  return (
    <>
      <FormProvider>
        <RouterProvider router={router} />
      </FormProvider>
    </>
  );
}

export default App;
