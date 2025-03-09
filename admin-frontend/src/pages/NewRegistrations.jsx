import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import axios from "axios";
import ApprovalModal from "../components/ApprovalModal";
import { Link } from "react-router-dom";

function NewRegistrations() {
  const [students, setStudents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

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
  }, [students]);

  const handleOpenModal = (student) => {
    setSelectedStudent(student);
    setOpenModal(true);
  };

  return (
    <div>
      <Header title="New Registrations" />

      <div className="flex flex-col items-left gap-5 sm:gap-8 mt-8 sm:mt-12 m-10">
        <Link to="/dashboard">
          <PrimaryButton text={"Go to Dashboard"} />
        </Link>

        <div className="bg-white px-10 py-3 w-full text-sm sm:text-xl font-semibold rounded-2xl shadow-lg">
          <div className="flex flex-col gap-2 sm:gap-5 xl:gap-14">
            <label className="text-sm text-[#391031] sm:text-lg xl:text-2xl font-medium">
              SUBMITTED STUDENTS REGISTRATIONS
            </label>
          </div>

          <div className="relative overflow-x-auto mt-5">
            <table className="w-full text-sm text-left text-black">
              <thead className="text-xs text-black uppercase bg-gray-200">
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
                      className="bg-white border-b border-gray-300"
                    >
                      <td className="px-6 py-4 font-medium text-black">
                        {student.Name_with_Initials}
                      </td>
                      <td className="px-6 py-4">{student.course}</td>
                      <td className="px-6 py-4">{student.Enrollment_Date}</td>
                      <td className="px-6 py-4">
                        <button
                          className="gap-2 px-[15px] sm:px-[22px] w-fit py-[8px] sm:py-[3px] rounded-2xl text-white text-[10px] sm:text-[14px] font-semibold bg-[#391031] hover:bg-[#4a1340] flex items-center justify-center tracking-wider uppercase"
                          onClick={() => handleOpenModal(student)}
                        >
                          View Details
                        </button>
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
      {openModal && (
        <ApprovalModal
          show={openModal}
          onClose={() => setOpenModal(false)}
          student={selectedStudent}
        />
      )}
    </div>
  );
}

export default NewRegistrations;
