import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import axios from "axios";

function NewRegistrations() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/admin/get-not-approved-students"
        );

        if (response.data.success) {
          setStudents(response.data.students);
        } else {
          console.error("Failed to fetch students.");
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  console.log(students);

  return (
    <div>
      <Header title="New Registrations" />

      <div className="flex flex-col items-left gap-5 sm:gap-8 mt-8 sm:mt-12 m-10">
        <PrimaryButton text={"Go to Dashboard"} />

        <div className="bg-white px-10 py-3 w-full text-sm sm:text-xl font-semibold rounded-2xl shadow-lg">
          <div className="flex flex-col gap-2 sm:gap-5 xl:gap-14">
            <label className="text-sm text-[#391031] sm:text-lg xl:text-2xl font-medium">
              SUBMITTED STUDENTS REGISTRATIONS
            </label>
          </div>

          <div className="relative overflow-x-auto mt-5">
            <table className="w-full text-sm text-left text-black dark:text-gray-400">
              <thead className="text-xs text-black uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    course
                  </th>
                  <th scope="col" className="px-6 py-3">
                    applied date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    action
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map((student) => (
                    <tr
                      key={student._id}
                      className="bg-white border-b border-gray-300 dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4 font-medium text-black dark:text-white">
                        {student.Name_with_Initials}
                      </td>
                      <td className="px-6 py-4">{student.AcademicYear}</td>
                      <td className="px-6 py-4">{student.Enrollment_Date}</td>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
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
    </div>
  );
}

export default NewRegistrations;
