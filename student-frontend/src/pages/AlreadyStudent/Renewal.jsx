import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import holder_signature from "../../assets/signature.png";
import SecondaryButton from "../../components/SecondaryButton";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";
import { useRenewalContext } from "../../utils/RenewalContext";
import { toast, Bounce } from "react-toastify";
import { logout } from "../../utils/SwatAleart";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Renewal() {
  const { formData, updateFormData } = useRenewalContext();
  const navigate = useNavigate();
  const [academicYear, setAcademicYear] = useState("");
  const [student, setStudent] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitActive, setIsSubmitActive] = useState(true);
  const availableToken = sessionStorage.getItem("token");

  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    const handleRenewal = async () => {
      try {
        await axios
          .get(`${backendUrl}/common/renewal-available`)
          .then((res) => {
            // console.log(res.data.success);
            if (!res.data.success) {
              navigate("/renewal-not-open");
            } else {
              const AcademicYear = res.data.data[0].academicYear;
              setAcademicYear(AcademicYear);
            }
          })
          .catch((err) => {
            // console.log(err.response?.data.message);
            const message = err.response?.data.message;
            toast.error(message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            });
          });
      } catch (error) {}
    };

    const getStudentDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${backendUrl}/users/get-student-details`,
          {
            headers: { Authorization: `Bearer ${availableToken}` },
          }
        );

        // console.log(response.data.student);

        if (response.data.success) {
          setIsLoading(false);
          setStudent(response.data.student);
          // const student = {
          //   Enrollment_Number: response.data.student.Enrollment_Number,
          //   Year_of_Study: response.data.student.year_of_study,
          // };
          // sessionStorage.setItem("student", JSON.stringify(student));
        }
      } catch (error) {
        // console.error("Error fetching student details:", error);
        setIsLoading(false);

        if (error.response?.status === 401) {
          sessionStorage.removeItem("token");
          navigate("/login");
          setIsLoading(false);
        }
      }
    };

    handleRenewal();

    if (availableToken) {
      getStudentDetails();
    } else {
      navigate("/login");
    }
  }, [availableToken, navigate]);

  useEffect(() => {
    const checkSubmitActive = () => {
      if (
        formData.present_address !== "" &&
        formData.receipt_number !== "" &&
        formData.submission_date !== "" &&
        formData.payment_date !== "" &&
        receipt !== null
      ) {
        setIsSubmitActive(false);
      }
    };
    checkSubmitActive();
  }, [formData, receipt]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submissionData = new FormData();

      submissionData.append("Enrollment_Number", student?.Enrollment_Number);
      submissionData.append("current_year_of_study", student?.year_of_study);
      submissionData.append("course", student?.course);
      submissionData.append("department", student?.department);
      submissionData.append("renwal_academic_year", academicYear);
      // Append simple fields
      Object.entries(formData).forEach(([key, value]) => {
        submissionData.append(key, value);
      });
      // Append file
      if (receipt) {
        submissionData.append("pdf", receipt);
      }

      setIsLoading(true);
      const response = await axios.post(
        `${backendUrl}/users/submit-renewal`,
        submissionData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // console.log(response);
      if (response.data.success) {
        setIsLoading(false);
        sessionStorage.removeItem("formData");
        navigate("/re-success");
      }
    } catch (error) {
      // console.log(error.response.data);
      const message = error.response?.data.message;
      if (message === "Receipt number does not match") {
        toast.error(
          "Please check the receipt number & the receipt are correct",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          }
        );
      } else if (message === "You have already submitted the renewal") {
        toast.error(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        setIsLoading(false);
        navigate("/re-submitted");
      } else {
        toast.error(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        setIsLoading(false);
      }
      setIsLoading(false);
    }
  };

  const confirmFunc = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("Enrollment_Number");
    navigate("/login");
  };

  return (
    <>
      <Header
        title="Renewal of Registration"
        logOutFunc={() => logout(confirmFunc)}
      />
      <div className="bg-white m-2 sm:m-5 xl:m-8 p-4 sm:p-7 xl:p-10 rounded-lg flex justify-center relative h-full">
        {isLoading && <Loading />}
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col items-center gap-5"
        >
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 xl:gap-14">
            <div className="flex flex-col gap-2 xl:gap-4">
              {/* Academic Year */}
              <div className="flex justify-between items-center w-[255px] sm:w-[355px] xl:w-[650px]">
                <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                  Academic Year :
                </label>
                <input
                  type="text"
                  name="academic-year"
                  disabled
                  value={academicYear}
                  className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[145px] sm:w-[215px] xl:w-[465px] text-sm sm:text-lg xl:text-2xl py-1"
                />
              </div>
              {/* Faculty */}
              <div className="flex justify-between items-center w-[255px] sm:w-[355px] xl:w-[650px]">
                <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                  Faculty :
                </label>
                <input
                  type="text"
                  name="faculty"
                  value="Faculty of Applied Science"
                  disabled
                  className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[145px] sm:w-[215px] xl:w-[465px] text-sm sm:text-lg xl:text-2xl py-1"
                />
              </div>
              {/* Course */}
              <div className="flex justify-between items-center w-[255px] sm:w-[355px] xl:w-[650px]">
                <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                  Course :
                </label>
                <input
                  type="text"
                  name="course"
                  disabled
                  value={student?.course || ""}
                  className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[145px] sm:w-[215px] xl:w-[465px] text-sm sm:text-lg xl:text-2xl py-1"
                />
              </div>
              {/* Specialization */}
              <div className="flex justify-between items-center w-[255px] sm:w-[355px] xl:w-[650px]">
                <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                  Specialization :
                </label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={(e) =>
                    updateFormData(
                      "specialization",
                      e.target.value.toUpperCase()
                    )
                  }
                  className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[145px] sm:w-[215px] xl:w-[465px] text-sm sm:text-lg xl:text-2xl py-1"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 xl:gap-4">
              {/* Reg No */}
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center w-[255px] sm:w-[300px] xl:w-[410px]">
                  <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                    Reg No :
                  </label>
                  <input
                    type="text"
                    name="regno"
                    disabled
                    value={student?.Enrollment_Number || ""}
                    className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[145px] sm:w-[215px] xl:w-[300px] text-sm sm:text-lg xl:text-2xl py-1"
                  />
                </div>
              </div>

              {/* Year */}
              {/* <div className="flex items-start sm:flex-col sm:gap-0 gap-5 xl:gap-2 py-1">
                <p className="text-sm sm:text-lg xl:text-2xl font-medium">
                  Year :
                </p>
                <div className="flex flex-col mt-[2px] gap-1 xl:gap-3 justify-center">
                  <label className="flex justify-center items-center space-x-4">
                    <input
                      type="radio"
                      name="year"
                      value="second"
                      className="w-3 h-3 sm:w-[14px] sm:h-[14px] xl:w-[16px] xl:h-[16px] rounded-full accent-[#391031]"
                    />
                    <span className="text-sm sm:text-lg xl:text-2xl font-semibold">
                      Second
                    </span>
                  </label>

                  <label className="flex items-center space-x-4">
                    <input
                      type="radio"
                      name="year"
                      value="third"
                      className="w-3 h-3 sm:w-[14px] sm:h-[14px] xl:w-[16px] xl:h-[16px] rounded-full accent-[#391031]"
                    />
                    <span className="text-sm sm:text-lg xl:text-2xl font-semibold">
                      Third
                    </span>
                  </label>

                  <label className="flex items-center space-x-4">
                    <input
                      type="radio"
                      name="year"
                      value="fourth"
                      className="w-3 h-3 sm:w-[14px] sm:h-[14px] xl:w-[16px] xl:h-[16px] rounded-full accent-[#391031]"
                    />
                    <span className="text-sm sm:text-lg xl:text-2xl font-semibold">
                      Fourth
                    </span>
                  </label>
                </div>
              </div> */}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 sm:gap-3 xl:gap-5">
            {/* 1 */}
            <div className="flex flex-wrap gap-2 justify-between items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                1. (a) Name with initials :
              </label>
              <input
                type="text"
                name="name_with_initials"
                disabled
                value={student?.Name_with_Initials || ""}
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[285px] sm:w-[455px] xl:w-[825px] text-sm sm:text-lg xl:text-2xl py-1"
              />
            </div>
            <div className="flex flex-col items-center sm:flex-row gap-2 sm:gap-7 w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                &nbsp;&nbsp;&nbsp;(b) State whether :
              </label>
              <input
                type="text"
                name="title"
                disabled
                value={student?.Title || ""}
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[285px] sm:w-[455px] xl:w-[825px] text-sm sm:text-lg xl:text-2xl py-1"
              />
            </div>

            {/* 2 */}
            <div className="flex flex-wrap gap-2 justify-between items-center w-[255px] sm:w-[673px] xl:w-[1115px] mt-2">
              <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                2. National Identity Card(NIC) No :
              </label>
              <input
                type="text"
                name="nic"
                disabled
                value={student?.Address?.NIC || ""}
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[253px] sm:w-[375px] xl:w-[725px] text-sm sm:text-lg xl:text-2xl py-1"
              />
            </div>

            {/* 3 */}

            <div className="flex flex-wrap gap-2 justify-between items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                3. (a) Permanent residential address :
              </label>
              <input
                type="text"
                name="permanent-address"
                disabled
                value={student?.Address?.Permenant_Address || ""}
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[253px] sm:w-[355px] xl:w-[700px] text-sm sm:text-lg xl:text-2xl py-1"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-between items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                &nbsp;&nbsp;&nbsp;&nbsp;(b) Present address :
              </label>
              <input
                type="text"
                name="present-address"
                value={formData.present_address}
                onChange={(e) =>
                  updateFormData(
                    "present_address",
                    e.target.value.toUpperCase()
                  )
                }
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[253px] sm:w-[475px] xl:w-[855px] text-sm sm:text-lg xl:text-2xl py-1"
              />
            </div>

            {/* 4 */}
            <div className="flex flex-wrap gap-2 justify-between items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                4. Telephone (Mobile) No :
              </label>
              <input
                type="text"
                name="mobile-no"
                disabled
                value={student?.Address?.Phone_Number || ""}
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[253px] sm:w-[443px] xl:w-[810px] text-sm sm:text-lg xl:text-2xl py-1"
              />
            </div>

            {/* 5 */}
            <div className="flex flex-wrap gap-2 justify-between items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                5. Email address :
              </label>
              <input
                type="text"
                name="email"
                disabled
                value={student?.Address?.Email || ""}
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[253px] sm:w-[518px] xl:w-[910px] text-sm sm:text-lg xl:text-2xl py-1"
              />
            </div>

            {/* 6 */}
            <div className="flex flex-wrap gap-2 justify-between items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                6. Renewal of registration fee and Medical fee should be paid.
              </label>
            </div>

            <div className="flex flex-col gap-2 sm:gap-4 ml-8">
              <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
                <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                  (i). Receipt No :
                </label>
                <input
                  type="text"
                  name="receipt-no"
                  value={formData.receipt_number}
                  onChange={(e) => {
                    updateFormData("receipt_number", e.target.value);
                  }}
                  className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[140px] sm:w-[200px] xl:w-[300px] text-sm sm:text-lg xl:text-2xl py-1"
                />
              </div>
              <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[288px] sm:w-[673px] xl:w-[1115px]">
                <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                  (ii). Date of payment :
                </label>
                <input
                  type="date"
                  name="dop"
                  value={formData.payment_date}
                  onChange={(e) =>
                    updateFormData("payment_date", e.target.value)
                  }
                  className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[100px] sm:w-[200px] xl:w-[300px] text-sm sm:text-lg xl:text-2xl py-1"
                />
              </div>
              <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
                <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                  (iii). Upload payment slip :
                </label>
                <input
                  type="file"
                  name="slip"
                  onChange={(e) => setReceipt(e.target.files[0])}
                  className="ml-3 sm:ml-0 border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[240px] sm:w-[350px] xl:w-[550px] text-sm sm:text-lg xl:text-2xl py-1"
                />
                <span className="text-[12px] sm:text-[15px] xl:text-[18px] font-normal sm:font-medium text-gray-600 italic -mt-1 ml-4 sm:ml-[245px] xl:-mt-0 xl:ml-0">
                  jpeg, jpg, png, pdf
                </span>
              </div>
              <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[265px] sm:w-[675px] xl:w-[1075px] mt-2">
                <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                  (a) I under take to inform the Asst. Registrar of the Faculty
                  in writing of any change of address and in the event of
                  obtaining employment.
                </label>
              </div>
              <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[265px] sm:w-[675px] xl:w-[1075px] mt-2">
                <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                  (b) I declare that the information furnished herein are true
                  and correct to the best of my knowledge.
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-56 xl:gap-[480px]  w-[255px] sm:w-[673px] xl:w-[1115px] mt-6">
              <div className="flex flex-wrap gap-2 xl:gap-4 items-center">
                <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                  Date :
                </label>
                <input
                  type="date"
                  name="submission_date"
                  value={formData.submission_date}
                  onChange={(e) =>
                    updateFormData("submission_date", e.target.value)
                  }
                  className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[140px] sm:w-[200px] xl:w-[300px] text-sm sm:text-lg xl:text-2xl py-1"
                />
              </div>
              <div className="flex flex-wrap gap-2 xl:gap-4 items-center mt-5 sm:mt-0">
                <div className="flex flex-col items-center">
                  <img
                    src={student?.signature || holder_signature}
                    alt="holder_signature"
                    className="w-20 sm:w-32"
                  />
                  <p className="text-[18px] -mt-2 sm:text-[25px] sm:-mt-2">
                    ...........................................
                  </p>
                  <h2 className="text-[12px] font-bold sm:text-[20px]">
                    Signature of student
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-8 mt-2 sm:gap-20 sm:mt-8">
            <SecondaryButton
              text="Submit"
              color="bg-green-700"
              isDisabled={isSubmitActive}
              type="submit"
              hoverColor="hover:bg-green-800"
            />
            <Link to="/user-dashboard">
              <SecondaryButton
                text="Cancel"
                color="bg-red-700"
                hoverColor="hover:bg-red-800"
              />
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Renewal;
