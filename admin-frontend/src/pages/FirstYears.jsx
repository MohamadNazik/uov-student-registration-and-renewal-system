import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import StudentDetailsModal from "./../components/StudentDetailModal";

function FirstYears() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8080/api/admin/get-registered-students"
        );

        if (response.data.success) {
          const firstYearStudents = response.data.data.filter(
            (student) => student.year_of_study === 1
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

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
  };
  const logoutAdmin = () => {
    sessionStorage.removeItem("adminData");
    sessionStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div>
      <Header title="First Year Students" />
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
              <table className="w-full text-sm text-left text-black">
                <thead className="text-xs text-black uppercase bg-gray-200">
                  <tr>
                    <th className="px-6 py-3">Enrollment No.</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Course</th>
                    <th className="px-6 py-3">Year</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student._id} className="bg-white border-b">
                        <td className="px-6 py-4">
                          {student.Enrollment_Number}
                        </td>
                        <td className="px-6 py-4">
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
                          <button
                            onClick={() => handleViewDetails(student)}
                            className="text-blue-600 hover:underline"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
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
      {selectedStudent && (
        <StudentDetailsModal
          student={selectedStudent}
          show={!!selectedStudent} // Ensures show is true when a student is selected
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default FirstYears;
