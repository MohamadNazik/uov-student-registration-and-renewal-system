import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

function FourthYears() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8080/api/admin/get-registered-students"
        );

        if (response.data.success) {
          const firstYearStudents = response.data.data.filter(
            (student) => student.year_of_study === 4
          );
          setStudents(firstYearStudents);
          setFilteredStudents(firstYearStudents);
        } else {
          console.error("Failed to fetch students.");
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const courses = [...new Set(students.map((student) => student.course))];

  useEffect(() => {
    let result = students;

    if (searchTerm) {
      result = result.filter(
        (student) =>
          student.Name_with_Initials?.toLowerCase().includes(
            searchTerm.toLowerCase()
          ) ||
          student.Enrollment_Number?.toLowerCase().includes(
            searchTerm.toLowerCase()
          ) ||
          student.Address?.Email?.toLowerCase().includes(
            searchTerm.toLowerCase()
          )
      );
    }

    if (selectedCourse) {
      result = result.filter((student) => student.course === selectedCourse);
    }

    setFilteredStudents(result);
  }, [searchTerm, selectedCourse, students]);

  const logoutAdmin = () => {
    sessionStorage.removeItem("adminData");
    sessionStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div>
      <Header title="Fourth Year Students" logOutFunc={logoutAdmin} />
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="flex flex-col items-left gap-5 sm:gap-8 mt-8 sm:mt-12 m-10">
          <Link to="/registered-students">
            <PrimaryButton text={"Go Back"} />
          </Link>
          <div className="bg-white px-10 py-3 w-full text-sm sm:text-xl font-semibold rounded-2xl shadow-lg">
            <div className="flex flex-col gap-2 sm:gap-5 xl:gap-14">
              <label className="text-sm text-[#391031] sm:text-lg xl:text-2xl font-medium">
                STUDENTS DIRECTORY
              </label>

              <div className="flex gap-4 mb-4">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search by Name, Enrollment No. or Email"
                    className="w-full p-2 rounded-lg text-sm bg-[#ECE6F0]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>

                <select
                  className="p-2 rounded-lg text-sm bg-[#ECE6F0]"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="">All Courses</option>
                  {courses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="relative overflow-x-auto mt-5">
              <table className="w-full text-sm text-left text-black dark:text-gray-400">
                <thead className="text-xs text-black uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Enrollment No.
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Course
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Year
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr
                        key={student._id}
                        className="bg-white border-b border-gray-300 dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="px-6 py-4 font-medium text-black dark:text-white">
                          {student.Enrollment_Number}
                        </td>
                        <td className="px-6 py-4 font-medium text-black dark:text-white">
                          {student.Name_with_Initials}
                        </td>
                        <td className="px-6 py-4">{student.course}</td>
                        <td className="px-6 py-4">{student.year_of_study}</td>
                        <td className="px-6 py-4 text-green-600">
                          {student.registration_approval
                            ? "APPROVED"
                            : "PENDING"}
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            to={`/student/${student._id}`}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-4 border-b border-gray-300"
                      >
                        No registrations found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FourthYears;
