import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import SecondaryButton from "./../../../student-frontend/src/components/SecondaryButton";
import Swal from "sweetalert2";
import Loading from "./../../../admin-frontend/src/components/Loading";

function Settings() {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [updateType, setUpdateType] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [idCardIssueDate, setIdCardIssueDate] = useState("");
  const [enrollmentDate, setEnrollmentDate] = useState("");
  const [semester, setSemester] = useState("SEMESTER 4");
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [renewalOpen, setRenewalOpen] = useState(false);
  const [registrationDeadline, setRegistrationDeadline] = useState("");
  const [renewalDeadline, setRenewalDeadline] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const storedToken = sessionStorage.getItem("adminToken");
  const parsedToken = storedToken ? JSON.parse(storedToken).token : null;

  useEffect(() => {
    const adminData = sessionStorage.getItem("adminData");
    if (adminData) {
      try {
      } catch (error) {
        console.error("Error parsing adminData:", error);
      }
    } else {
      console.log("No admin role found, redirecting to login...");
      navigate("/");
    }
    setIsLoading(false);
  }, [navigate]);

  useEffect(() => {
    const fetchAdmin = async () => {
      setIsLoading(true);
      await axios
        .get("http://localhost:8080/api/admin/get-admin-details", {
          headers: {
            Authorization: `Bearer ${parsedToken}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            setAdminId(response.data.admin._id);
          }
        })
        .catch((error) => console.error("Error fetching admin ID:", error))
        .finally(() => setIsLoading(false));
    };
    fetchAdmin();
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      const adminData = sessionStorage.getItem("adminData");
      if (adminData) {
        try {
          const parsedData = JSON.parse(adminData);
          if (
            parsedData.admin.role === "sar" ||
            parsedData.admin.role === "dr"
          ) {
            try {
              const response = await axios.get(
                "http://localhost:8080/api/admin/get-registration-post"
              );
              if (response.data.success) {
                setPost(response.data.data[0]);
              } else {
                console.error("Failed to fetch registration post.");
              }
            } catch (error) {
              console.error("Error fetching registration post:", error);
            }
          } else {
            try {
              const response = await axios.get(
                "http://localhost:8080/api/admin/get-renewal-post"
              );
              if (response.data.success) {
                setPost(response.data.data[0]);
              } else {
                console.error("Failed to fetch renewal post.");
              }
            } catch (error) {
              console.error("Error fetching renewal post:", error);
            }
          }
          setUserRole(parsedData.admin.role);
        } catch (error) {
          console.error("Error parsing adminData:", error);
        }
      }
      setIsLoading(false);
    };

    fetchPost();
  }, []);

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        try {
          const response = await axios.delete(
            "http://localhost:8080/api/admin/delete-registration-post",
            {
              headers: { "Content-Type": "application/json" },
              data: { id: post._id },
            }
          );

          Swal.fire("Deleted!", "Your post has been deleted.", "success").then(
            (result) => {
              if (result.isConfirmed) {
                setPost((prev) => !prev);
              }
            }
          );

          console.log(response.data);
        } catch (error) {
          Swal.fire("Error!", "Something went wrong.", "error");
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    });
  };

  const handleSubmit = async () => {
    if (!adminId) {
      console.error("Admin ID not available!");
      return;
    }
    setIsSaving(true);
    setIsLoading(true);

    if (userRole === "sar" || userRole === "dr") {
      const payload = {
        adminId,
        updateType: "Registration",
        expireDate: registrationDeadline,
        enrollmentDate,
        idCardIssueDate,
        academicYear,
      };

      await axios
        .post("http://localhost:8080/api/admin/registration-post", payload)
        .then((res) => {
          console.log(res.data);
          setIsSaving(false);
        })
        .catch((error) => {
          console.error(error);
          setIsSaving(false);
        })
        .finally(() => setIsLoading(false));
    } else {
      const payload = {
        adminId,
        updateType: "Renewal",
        expireDate: renewalDeadline,
        academicYear,
      };
      await axios
        .post("http://localhost:8080/api/admin/create-renewal-post", payload)
        .then((res) => {
          console.log(res.data);
          setIsSaving(false);
        })
        .catch((error) => {
          console.error(error);
          setIsSaving(false);
        })
        .finally(() => setIsLoading(false));
    }
  };

  const renderRoleTitle = () => {
    switch (userRole) {
      case "sar":
        return "SENIOR ASSISTANT REGISTRAR (SAR)";
      case "dr":
        return "DEPUTY REGISTRAR (DR)";
      case "far":
        return "FACULTY ASSISTANT REGISTRAR (FAR)";
      default:
        return "Loading...";
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {/* Header */}
      <Header title="Admin Updates" />

      <div className="flex justify-between px-4 sm:px-[100px] mt-5 xl:mt-10 mb-10">
        <Link to="/dashboard">
          <PrimaryButton text="Go Back To Dashboard" />
        </Link>
      </div>

      {/* Content Area - Show based on user role */}
      <div className="flex flex-col items-center justify-center w-full px-4 sm:px-[100px] my-8">
        {post ? (
          <>
            <div className="flex justify-center w-full px-4 sm:px-[100px] my-8">
              <div className="bg-white px-10 py-3 ml-9 w-full max-w-full rounded-2xl shadow-lg">
                <div className="flex flex-col justify-center w-full px-4 sm:px-[100px] my-8">
                  <div className="text-center text-[#391031] text-lg font-bold">
                    {post.updateType} Available
                  </div>
                  <div className="text-center text-[10px] md:text-sm text-black-500">
                    {post.updateType} is available for the academic year :{" "}
                    {post.academicYear}
                  </div>
                </div>
                <div className="flex justify-end items-end space-x-4">
                  <SecondaryButton
                    text="Delete"
                    color="bg-red-700"
                    onClick={handleDelete}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="bg-white px-10 py-3 w-full max-w-5xl rounded-2xl shadow-lg">
          <div className="p-6 text-left">
            {/* Senior Assistant Registrar Content */}
            {userRole === "sar" && (
              <div className="space-y-6">
                <h2 className="text-sm md:text-xl font-bold text-[#391031]">
                  {renderRoleTitle()}
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="registrationOpen"
                      checked={registrationOpen}
                      onChange={() => setRegistrationOpen(!registrationOpen)}
                      className="h-3 w-3 md:h-5 md:w-5 rounded border-gray-300 text-[#391031] focus:ring-[#391031]"
                    />
                    <label
                      htmlFor="registrationOpen"
                      className="ml-2 text-xs md:text-sm font-medium"
                    >
                      REGISTRATION OPEN
                    </label>
                  </div>

                  <div className="ml-6 text-[10px] md:text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="h-1.5 w-3 md:h-3 rounded-full border border-gray-300 mr-2 flex items-center justify-center">
                        <div className=" h-0.5 w-0.5  md:h-1  md:w-1 rounded-full bg-gray-500"></div>
                      </div>
                      WHEN ENABLED, STUDENTS CAN REGISTER FOR COURSES
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center">
                      <label className="mr-2 text-[10px] md:text-sm font-medium">
                        ACADEMIC YEAR:
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={academicYear}
                          onChange={(e) => {
                            let value = e.target.value;

                            if (!/^\d{0,2}\/?\d{0,2}$/.test(value)) {
                              return;
                            }

                            if (value.length === 2 && !value.includes("/")) {
                              value += "/";
                            }

                            setAcademicYear(value);
                          }}
                          placeholder="e.g., 23/24"
                          maxLength={5}
                          className="block w-18 text-xs lg:text-sm md:w-40 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#391031] sm:text-sm sm:leading-6 bg-pink-100"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h3 className=" text-sm lg:text-lg font-medium text-[#391031]">
                      ADVANCED SETTINGS
                    </h3>

                    <div className="mt-4 flex items-center">
                      <label className="mr-2 text-[10px] md:text-sm font-medium">
                        REGISTRATION DEADLINE:
                      </label>
                      <input
                        type="date"
                        value={registrationDeadline}
                        onChange={(e) => {
                          setRegistrationDeadline(e.target.value);
                        }}
                        className="block w-18 text-[10px] lg:text-sm md:w-40  rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#391031]  sm:text-sm sm:leading-6 bg-pink-100"
                      />
                    </div>
                    <div className="mt-4 flex items-center">
                      <label className="mr-2 text-[10px] md:text-sm font-medium">
                        ID CARD ISSUE DATE:
                      </label>
                      <input
                        type="date"
                        value={idCardIssueDate.split("/").reverse().join("-")}
                        onChange={(e) => {
                          setIdCardIssueDate(e.target.value);
                        }}
                        className="block w-18 text-[10px] lg:text-sm md:w-40  rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#391031]  sm:text-sm sm:leading-6 bg-pink-100"
                      />
                    </div>
                    <div className="mt-4 flex items-center">
                      <label className="mr-2 text-[10px] md:text-sm font-medium">
                        ENROLLMENT DATE:
                      </label>
                      <input
                        type="date"
                        value={enrollmentDate.split("/").reverse().join("-")}
                        onChange={(e) => {
                          setEnrollmentDate(e.target.value);
                        }}
                        className="block w-18 text-[10px] lg:text-sm md:w-40  rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#391031]  sm:text-sm sm:leading-6 bg-pink-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Deputy Registrar Content */}
            {userRole === "dr" && (
              <div className="space-y-6">
                <h2 className=" text-sm md:text-xl font-bold text-[#391031]">
                  {renderRoleTitle()}
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="registrationOpen"
                      checked={registrationOpen}
                      onChange={() => setRegistrationOpen(!registrationOpen)}
                      className="h-3 w-3 md:h-5 md:w-5 rounded border-gray-300 text-[#391031] focus:ring-[#391031]"
                    />
                    <label
                      htmlFor="registrationOpen"
                      className="ml-2 text-xs md:text-sm font-medium"
                    >
                      REGISTRATION OPEN
                    </label>
                  </div>

                  <div className="ml-6 text-[10px] md:text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="h-1.5 w-3 md:h-3 rounded-full border border-gray-300 mr-2 flex items-center justify-center">
                        <div className=" h-0.5 w-0.5  md:h-1  md:w-1 rounded-full bg-gray-500"></div>
                      </div>
                      WHEN ENABLED, STUDENTS CAN REGISTER FOR COURSES
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center">
                      <label className="mr-2 text-[10px] md:text-sm font-medium">
                        ACADEMIC YEAR:
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={academicYear}
                          onChange={(e) => {
                            let value = e.target.value;

                            if (!/^\d{0,2}\/?\d{0,2}$/.test(value)) {
                              return;
                            }

                            if (value.length === 2 && !value.includes("/")) {
                              value += "/";
                            }

                            setAcademicYear(value);
                          }}
                          placeholder="e.g., 23/24"
                          maxLength={5}
                          className="block w-18 text-xs lg:text-sm md:w-40 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#391031] sm:text-sm sm:leading-6 bg-pink-100"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h3 className=" text-sm lg:text-lg font-medium text-[#391031]">
                      ADVANCED SETTINGS
                    </h3>

                    <div className="mt-4 flex items-center">
                      <label className="mr-2 text-[10px] md:text-sm font-medium">
                        REGISTRATION DEADLINE:
                      </label>
                      <input
                        type="date"
                        value={registrationDeadline}
                        onChange={(e) => {
                          setRegistrationDeadline(e.target.value);
                        }}
                        className="block w-18 text-[10px] lg:text-sm md:w-40  rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#391031]  sm:text-sm sm:leading-6 bg-pink-100"
                      />
                    </div>
                    <div className="mt-4 flex items-center">
                      <label className="mr-2 text-[10px] md:text-sm font-medium">
                        ID CARD ISSUE DATE:
                      </label>
                      <input
                        type="date"
                        value={idCardIssueDate.split("/").reverse().join("-")}
                        onChange={(e) => {
                          setIdCardIssueDate(e.target.value);
                        }}
                        className="block w-18 text-[10px] lg:text-sm md:w-40  rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#391031]  sm:text-sm sm:leading-6 bg-pink-100"
                      />
                    </div>
                    <div className="mt-4 flex items-center">
                      <label className="mr-2 text-[10px] md:text-sm font-medium">
                        ENROLLMENT DATE:
                      </label>
                      <input
                        type="date"
                        value={enrollmentDate.split("/").reverse().join("-")}
                        onChange={(e) => {
                          setEnrollmentDate(e.target.value);
                        }}
                        className="block w-18 text-[10px] lg:text-sm md:w-40  rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#391031]  sm:text-sm sm:leading-6 bg-pink-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Faculty Assistant Registrar Content */}
            {userRole === "far" && (
              <div className="space-y-6">
                <h2 className="text-sm md:text-xl font-bold text-[#391031]">
                  {renderRoleTitle()}
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="renewalOpen"
                      checked={renewalOpen}
                      onChange={() => setRenewalOpen(!renewalOpen)}
                      className="h-3 w-3 md:h-5 md:w-5 rounded border-gray-300 text-[#391031] focus:ring-[#391031]"
                    />
                    <label
                      htmlFor="renewalOpen"
                      className="ml-2 text-xs md:text-sm font-medium "
                    >
                      RENEWAL APPLICATION OPEN
                    </label>
                  </div>

                  <div className="ml-6 text-[10px] md:text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="h-1.5 w-2.5 md:h-3  rounded-full border border-gray-300 mr-2 flex items-center justify-center">
                        <div className="h-0.5 w-0.5  md:h-1  md:w-1 rounded-full bg-gray-500"></div>
                      </div>
                      WHEN ENABLED, STUDENTS CAN SUBMIT RENEWAL APPLICATION
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h3 className=" text-sm lg:text-lg font-medium text-[#391031]">
                      FACULTY SPECIFIC SETTINGS
                    </h3>
                    <div className="flex items-center">
                      <label className="mr-2 text-[10px] md:text-sm font-medium">
                        ACADEMIC YEAR:
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={academicYear}
                          onChange={(e) => {
                            let value = e.target.value;

                            if (!/^\d{0,2}\/?\d{0,2}$/.test(value)) {
                              return;
                            }

                            if (value.length === 2 && !value.includes("/")) {
                              value += "/";
                            }

                            setAcademicYear(value);
                          }}
                          placeholder="e.g., 23/24"
                          maxLength={5}
                          className="block w-18 text-xs lg:text-sm md:w-40 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#391031] sm:text-sm sm:leading-6 bg-pink-100"
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center">
                      <label className="mr-2 text-[10px] md:text-sm  font-medium">
                        RENEWAL SUBMISSION DEADLINE:
                      </label>
                      <input
                        type="date"
                        value={registrationDeadline}
                        onChange={(e) => {
                          setRenewalDeadline(e.target.value);
                        }}
                        className="block w-18 text-[10px] lg:text-sm md:w-40  rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#391031]  sm:text-sm sm:leading-6 bg-pink-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Loading state or error message if no role is set */}
            {!userRole && (
              <div className="text-center py-10">
                <div className="animate-pulse text-gray-500">
                  Loading user role...
                </div>
              </div>
            )}
            <div className="flex justify-end mt-10">
              <PrimaryButton
                text={isSaving ? "POST..." : "POST"}
                onClick={handleSubmit}
                disabled={isSaving}
              />
            </div>

            <div className="bg-white p-4  text-xs md:text-sm text-center  text-gray-500 mt-10">
              VAVUNIYA@UNIVERSITY.EDU
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
