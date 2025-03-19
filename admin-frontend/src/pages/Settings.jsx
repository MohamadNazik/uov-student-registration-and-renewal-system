import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import axios from "axios";
import { Link } from "react-router-dom";

const Settings = () => {
  // State for user role - this should be fetched from authentication or context
  const [userRole, setUserRole] = useState(""); // "SAR", "DR", or "FAR"

  // Settings states
  const [academicYear, setAcademicYear] = useState("2024/2026");
  const [semester, setSemester] = useState("SEMESTER 4");
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [renewalOpen, setRenewalOpen] = useState(false);
  const [registrationDeadline, setRegistrationDeadline] = useState("2025/04/20");
  const [renewalDeadline, setRenewalDeadline] = useState("2025/03/20");
  const [isSaving, setIsSaving] = useState(false);

  // Simulate fetching user role on component mount
  useEffect(() => {
    // This should be replaced with your actual authentication logic
    const fetchUserRole = async () => {
      try {
        // Simulating API call to get user role
        // Replace this with your actual authentication check
        // const response = await axios.get('/api/user/role');
        // setUserRole(response.data.role);

        // For demonstration, we'll use a timeout to simulate API call
        setTimeout(() => {
          // This should come from your authentication system
          // You could use context, redux, or a direct API call
          setUserRole("FAR"); // Setting to "DR" as requested
        }, 500);
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  const saveSettings = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert("Settings saved successfully!");
    }, 1000);
  };

  // Render appropriate title based on role
  const renderRoleTitle = () => {
    switch (userRole) {
      case "SAR":
        return "SENIOR ASSISTANT REGISTRAR (SAR)";
      case "DR":
        return "DEPUTY REGISTRAR (DR)";
      case "FAR":
        return "FACULTY ASSISTANT REGISTRAR (FAR)";
      default:
        return "Loading...";
    }
  };

  return (
    <div>
      {/* Header */}
      <Header title="System Setting" />

      <div className="flex justify-between px-4 sm:px-[100px] mt-5 xl:mt-10 mb-10">
        <Link to="/dashboard">
          <PrimaryButton text="Go Back To Dashboard" />
        </Link>
        <PrimaryButton
          text={isSaving ? "SAVING..." : "SAVE SETTINGS"}
          onClick={saveSettings}
          disabled={isSaving}
        />
      </div>

      {/* Content Area - Show based on user role */}
      <div className="flex justify-center w-full px-4 sm:px-[100px] my-8">
        <div className="bg-white px-10 py-3 w-full max-w-5xl rounded-2xl shadow-lg">
          <div className="p-6 text-left">
            {/* Senior Assistant Registrar Content */}
            {userRole === "SAR" && (
              <div className="space-y-6">
                <h2 className="text-sm md:text-xl font-bold text-[#391031]">{renderRoleTitle()}</h2>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="registrationOpen"
                      checked={registrationOpen}
                      onChange={() => setRegistrationOpen(!registrationOpen)}
                      className="h-3 w-3 md:h-5 md:w-5 rounded border-gray-300 text-[#391031] focus:ring-[#391031]"
                    />
                    <label htmlFor="registrationOpen" className="ml-2 text-xs md:text-sm font-medium">
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
                      <label className="mr-2 text-[10px] md:text-sm font-medium">ACADEMIC YEAR:</label>
                      <div className="relative">
                        <select
                          value={academicYear}
                          onChange={(e) => setAcademicYear(e.target.value)}
                          className="block w-18 text-xs lg:text-sm md:w-40 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#391031] sm:text-sm sm:leading-6 bg-pink-100"
                        >
                          <option>2024/2025</option>
                          <option>2023/2024</option>
                          <option>2024/2026</option>
                          <option>2025/2026</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h3 className=" text-sm lg:text-lg font-medium text-[#391031]">ADVANCED SETTINGS</h3>

                    <div className="mt-4 flex items-center">
                      <label className="mr-2 text-[10px] md:text-sm font-medium">REGISTRATION DEADLINE:</label>
                      <input
                        type="date"
                        value={registrationDeadline.split('/').reverse().join('-')}
                        onChange={(e) => {
                          const date = new Date(e.target.value);
                          const formattedDate = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
                          setRegistrationDeadline(formattedDate);
                        }}
                        className="block w-18 text-[10px] lg:text-sm md:w-40  rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#391031]  sm:text-sm sm:leading-6 bg-pink-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Deputy Registrar Content */}
            {userRole === "DR" && (
              <div className="space-y-6">
                <h2 className=" text-sm md:text-xl font-bold text-[#391031]">{renderRoleTitle()}</h2>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="registrationOpenDR"
                      checked={registrationOpen}
                      onChange={() => setRegistrationOpen(!registrationOpen)}
                      className="h-3 w-3 md:h-5 md:w-5 rounded border-gray-300 text-[#391031] focus:ring-[#391031]"
                    />
                    <label htmlFor="registrationOpenDR" className="ml-2  text-xs md:text-sm font-medium">
                      REGISTRATION OPEN
                    </label>
                  </div>

                  <div className="ml-6 text-[10px] md:text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="h-1.5 w-3 md:h-3  rounded-full border border-gray-300 mr-2 flex items-center justify-center">
                        <div className=" h-0.5 w-0.5  md:h-1  md:w-1 rounded-full bg-gray-500 "></div>
                      </div>
                      WHEN ENABLED, STUDENTS CAN REGISTER FOR COURSES
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center">
                        <label className="w-36 text-[10px] md:text-sm font-medium">ACADEMIC YEAR:</label>
                        <div className="relative">
                          <select
                            value={academicYear}
                            onChange={(e) => setAcademicYear(e.target.value)}
                            className="block w-18 text-[10px] lg:text-sm md:w-40 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#391031] sm:text-sm sm:leading-6 bg-pink-100"
                          >
                            <option>2024/2025</option>
                            <option>2023/2024</option>
                            <option>2024/2026</option>
                            <option>2025/2026</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <label className="w-36 text-[10px] md:text-sm font-medium">SEMESTER:</label>
                        <div className="relative">
                          <select
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
                            className="block w-18 text-[10px] lg:text-sm md:w-40 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#391031] sm:text-sm sm:leading-6 bg-pink-100"
                          >
                            <option>SEMESTER 1</option>
                            <option>SEMESTER 2</option>
                            <option>SEMESTER 3</option>
                            <option>SEMESTER 4</option>
                            <option>SEMESTER 5</option>
                            <option>SEMESTER 6</option>
                            <option>SEMESTER 7</option>
                            <option>SEMESTER 8</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Faculty Assistant Registrar Content */}
            {userRole === "FAR" && (
              <div className="space-y-6">
                <h2 className="text-sm md:text-xl font-bold text-[#391031]">{renderRoleTitle()}</h2>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="renewalOpen"
                      checked={renewalOpen}
                      onChange={() => setRenewalOpen(!renewalOpen)}
                      className="h-3 w-3 md:h-5 md:w-5 rounded border-gray-300 text-[#391031] focus:ring-[#391031]"
                    />
                    <label htmlFor="renewalOpen" className="ml-2 text-xs md:text-sm font-medium ">
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
                    <h3 className=" text-sm lg:text-lg font-medium text-[#391031]">FACULTY SPECIFIC SETTINGS</h3>

                    <div className="mt-4 flex items-center">
                      <label className="mr-2 text-[10px] md:text-sm  font-medium">RENEWAL SUBMISSION DEADLINE:</label>
                      <input
                        type="date"
                        value={renewalDeadline.split('/').reverse().join('-')}
                        onChange={(e) => {
                          const date = new Date(e.target.value);
                          const formattedDate = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
                          setRenewalDeadline(formattedDate);
                        }}
                        className="block  w-18 text-[10px] lg:text-sm md:w-40  rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#391031]  sm:text-sm sm:leading-6 bg-pink-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Loading state or error message if no role is set */}
            {!userRole && (
              <div className="text-center py-10">
                <div className="animate-pulse text-gray-500">Loading user role...</div>
              </div>
            )}
            <div className="bg-white p-4  text-xs md:text-sm text-center  text-gray-500 mt-10">
              VAVUNIYA@UNIVERSITY.EDU
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;