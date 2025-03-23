import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

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
import RegNotOpen from "./pages/RegistrationProcess/RegNotOpen";
import RenNotOpen from "./pages/AlreadyStudent/RenNotOpen";
import { RenewalProvider } from "./utils/RenewalContext";

const router = createBrowserRouter(
  [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/user-dashboard", element: <UserDashboard /> },
    { path: "/student-id", element: <StudentID /> },
    { path: "/record-book", element: <RecordBook /> },
    {
      path: "/renewal",
      element: (
        <RenewalProvider>
          <Renewal />
        </RenewalProvider>
      ),
    },
    { path: "/change-password", element: <ChangePassword /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/verify-otp", element: <VerifyOTP /> },
    { path: "/re-success", element: <RenewalSuccess /> },
    { path: "/re-submitted", element: <AlreadyRenewalSubmitted /> },
    { path: "/check-selection", element: <CheckSelection /> },
    { path: "/confirm-selection", element: <ConfirmSelection /> },
    { path: "/instructions", element: <Instructions /> },
    {
      path: "/a1-form-part-1",
      element: (
        <FormProvider>
          <A1Form_Part01 />
        </FormProvider>
      ),
    },
    {
      path: "/a1-form-part-2",
      element: (
        <FormProvider>
          <A1Form_Part02 />
        </FormProvider>
      ),
    },
    {
      path: "/a1-form-part-3",
      element: (
        <FormProvider>
          <A1Form_Part03 />
        </FormProvider>
      ),
    },
    {
      path: "/upload-documents",
      element: (
        <FormProvider>
          <UploadDocuments />
        </FormProvider>
      ),
    },
    {
      path: "/verify-id",
      element: (
        <FormProvider>
          <VerifyID />
        </FormProvider>
      ),
    },
    { path: "/reg-success", element: <RegSuccess /> },
    { path: "/already-reg-submitted", element: <AlreadyRegSubmitted /> },
    { path: "/reg-not-open", element: <RegNotOpen /> },
    { path: "/renewal-not-open", element: <RenNotOpen /> },
    { path: "/*", element: <Home /> },
  ],
  {
    future: {
      v7_skipActionErrorRevalidation: true,
    },
  }
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
