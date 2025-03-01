import React, { useEffect, useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Banner from "../../components/Banner";
import Loading from "../../components/Loading";
import SecondaryButton from "../../components/SecondaryButton";

function CheckSelection() {
  const [nic, setNic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleRegistration = async () => {
      try {
        await axios
          .get("http://localhost:8080/api/common/registration-available")
          .then((res) => {
            if (!res.data.success) {
              navigate("/reg-not-open");
            } else {
              // console.log(res.data.data[0]);

              const EnrollmentDate = new Date(res.data.data[0].enrollmentDate);

              // Extract day, month, and year
              const Eday = String(EnrollmentDate.getDate()).padStart(2, "0");
              const Emonth = String(EnrollmentDate.getMonth() + 1).padStart(
                2,
                "0"
              ); // Months are 0-indexed
              const Eyear = EnrollmentDate.getFullYear();

              const formattedEnrollmentDate = `${Eday}/${Emonth}/${Eyear}`;

              const IdIssueDate = new Date(res.data.data[0].idCardIssueDate);

              // Extract day, month, and year
              const Iday = String(IdIssueDate.getDate()).padStart(2, "0");
              const Imonth = String(IdIssueDate.getMonth() + 1).padStart(
                2,
                "0"
              ); // Months are 0-indexed
              const Iyear = IdIssueDate.getFullYear();

              const formattedIDDate = `${Iday}/${Imonth}/${Iyear}`;

              const regDetails = {
                EnrollmentDate: formattedEnrollmentDate,
                ID_IssueDate: formattedIDDate,
                AcademicYear: res.data.data[0].academicYear[0],
              };

              localStorage.setItem("regDetails", JSON.stringify(regDetails));
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {}
    };
    const checkAlreadyVerify = () => {
      const student = localStorage.getItem("student");
      if (student) {
        navigate("/confirm-selection");
      }
    };

    handleRegistration();

    checkAlreadyVerify();
  }, [navigate]);

  const checkSelection = async () => {
    if (nic === "") {
      alert("Please enter your NIC");
      return;
    }
    try {
      setIsLoading(true);
      setErr(false);
      const res = await axios.post(
        "http://localhost:8080/api/users/verifyStudent",
        {
          NIC: nic,
        }
      );
      if (res.data.success) {
        setIsLoading(false);
        setErr(false);
        const student = {
          NIC: res.data.data.NIC,
          Enrollment_No: res.data.data.RegNo,
          course: res.data.data.course,
          department: res.data.data.department,
        };
        localStorage.setItem("student", JSON.stringify(student));
        navigate("/confirm-selection");
      } else {
        setIsLoading(false);
        navigate("/already-reg-submitted");
      }
    } catch (error) {
      setErr(true);
      setIsLoading(false);
    }
  };

  const handleGoHome = () => {
    localStorage.removeItem("regDetails");
    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col gap-3 sm:gap-5 justify-center items-center">
      <Banner />
      <div className="bg-white p-8 sm:p-8 rounded-3xl flex flex-col items-center gap-5 sm:gap-8 shadow-2xl">
        <h2 className="text-sm w-60 sm:w-96 sm:text-lg font-medium text-center">
          Check whether you have selected for the University.
        </h2>
        <div className="relative">
          <input
            type="text"
            id="nic"
            className="block px-2 pb-2 sm:px-2.5 sm:pb-2.5 pt-4 w-[14rem] sm:w-[20rem] text-xs sm:text-lg font-medium text-gray-900 bg-transparent outline outline-2 outline-gray-300 rounded-md peer focus:outline focus:outline-2 focus:outline-black"
            placeholder=" "
            value={nic}
            onChange={(e) => setNic(e.target.value)}
          />
          <label
            htmlFor="nic"
            className="absolute text-xs sm:text-lg text-gray-500 duration-300 transform -translate-y-4 sm:-translate-y-5 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 sm:peer-focus:-translate-y-5 start-1 cursor-text"
          >
            NIC Number
          </label>
        </div>
        {err && (
          <p className="text-xs font-medium text-red-600 text-center">
            Sorry!
            <br />
            You are not selected for the University of Vavuniya.
          </p>
        )}

        <PrimaryButton text="Check" onClick={checkSelection} />
      </div>

      <div className="mt-7">
        <SecondaryButton
          text="Go Back to Home"
          color="bg-red-700"
          hoverColor="hover:bg-red-800"
          onClick={handleGoHome}
        />
      </div>

      {isLoading && <Loading />}
    </div>
  );
}

export default CheckSelection;
