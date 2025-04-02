import React from "react";

function StudentDetailsModal({ student, onClose }) {
  if (!student) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Student Details</h2>
        <p>
          <strong>Enrollment No:</strong> {student.Enrollment_Number}
        </p>
        <p>
          <strong>Name:</strong> {student.Name_with_Initials}
        </p>
        <p>
          <strong>Course:</strong> {student.course}
        </p>
        <p>
          <strong>Year:</strong> {student.year_of_study}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={
              student.registration_approval ? "text-green-600" : "text-red-600"
            }
          >
            {student.registration_approval ? "APPROVED" : "PENDING"}
          </span>
        </p>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default StudentDetailsModal;
