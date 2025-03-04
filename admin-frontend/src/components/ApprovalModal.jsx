import React from "react";
import Modal from "react-modal";
import checkmark from "../assets/icons/checkmark.png";
import axios from "axios";

Modal.setAppElement("#root");

const ApprovalModal = ({ show, onClose, student }) => {
  if (!show) return null;
  const token = sessionStorage.getItem("adminToken");

  const handleApprove = () => {
    if (!student || !student.Enrollment_Number) {
      alert("Invalid student data.");
      return;
    }

    const storedToken = sessionStorage.getItem("adminToken");
    const parsedToken = storedToken ? JSON.parse(storedToken).token : null;

    console.log("Token:", parsedToken); // Debugging to check the token

    if (!token) {
      alert("Admin is not authenticated.");
      return;
    }

    axios
      .post(
        "http://localhost:8080/api/admin/approve-student",
        { Enrollment_Number: student.Enrollment_Number }, // Data payload
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${parsedToken}`, // Ensure correct format
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          alert(response.data.message);
          onClose(); // Close the modal on success
        } else {
          alert(response.data.message || "Approval failed.");
        }
      })
      .catch((error) => {
        console.error("Error approving student:", error);

        if (error.response && error.response.status === 401) {
          alert("Session expired. Please log in again.");
        } else {
          alert("An error occurred while approving the student.");
        }
      });
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      contentLabel="Approval Modal"
      className="fixed top-0 left-0 right-0 flex items-start justify-center z-50"
      overlayClassName="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-md"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl w-full mt-4">
        <h2 className="text-lg font-semibold mb-4 uppercase text-[#391031]">
          Student details
        </h2>
        {student && (
          <>
            <div className="flex space-x-6 w-full">
              {/* Personal Information Column */}
              <div className="w-1/2">
                <h3 className="text-lg font-medium mt-3 uppercase">
                  Personal Information
                </h3>
                <div className="flex flex-row bg-gray-300 rounded-2xl p-3 mt-2 w-sm">
                  <div className="flex flex-col ">
                    <div className="flex flex-row">
                      <p className="font-bold uppercase">Name : </p>
                      <p className="ml-2">{student.Name_with_Initials}</p>
                    </div>
                    <div className="flex flex-row">
                      <p className="font-bold uppercase">Email : </p>
                      <p className="ml-2">{student.Address.Email}</p>
                    </div>
                    <div className="flex flex-row">
                      <p className="font-bold uppercase">Email : </p>
                      <p className="ml-2">{student.Address.Phone_Number}</p>
                    </div>
                    <div className="flex flex-row">
                      <p className="font-bold uppercase">Applied date : </p>
                      <p className="ml-2">{student.Enrollment_Date}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic Information Column */}
              <div className="w-1/2">
                <h3 className="text-lg font-medium mt-3 uppercase">
                  academic Information
                </h3>
                <div className="flex flex-row bg-gray-300 rounded-2xl p-3 mt-2 w-sm">
                  <div className="flex flex-col ">
                    <div className="flex flex-row">
                      <p className="font-bold uppercase">programme : </p>
                      <p className="ml-2">{student.course}</p>
                    </div>
                    <div className="flex flex-row">
                      <p className="font-bold uppercase">
                        Previous education :{" "}
                      </p>
                      <p className="ml-2">{student.Address.course}</p>
                    </div>
                    <div className="flex flex-row">
                      <p className="font-bold uppercase">Deaprtment : </p>
                      <p className="ml-2">{student.course}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <h3 className="text-lg font-medium mt-3 uppercase">
                submitted documents
              </h3>
              <div className="flex flex-row bg-gray-300 rounded-2xl p-3 mt-2 w-2xl justify-evenly ">
                <div className="w-1/2">
                  <ul className="list-none font-bold leading-9">
                    <li className="flex items-center uppercase">
                      <img
                        src={checkmark}
                        alt="Checkmark"
                        className="w-4 h-4 mr-2"
                      />
                      ugc letter
                    </li>
                    <li className="flex items-center uppercase">
                      <img
                        src={checkmark}
                        alt="Checkmark"
                        className="w-4 h-4 mr-2"
                      />
                      national identity card
                    </li>
                    <li className="flex items-center uppercase">
                      <img
                        src={checkmark}
                        alt="Checkmark"
                        className="w-4 h-4 mr-2"
                      />
                      alevel result sheet
                    </li>
                    <li className="flex items-center uppercase">
                      <img
                        src={checkmark}
                        alt="Checkmark"
                        className="w-4 h-4 mr-2"
                      />
                      A4 form
                    </li>
                    <li className="flex items-center uppercase">
                      <img
                        src={checkmark}
                        alt="Checkmark"
                        className="w-4 h-4 mr-2"
                      />
                      A6 form
                    </li>
                  </ul>
                </div>
                <div className="w-1/2">
                  <ul className="list-none font-bold leading-9">
                    <li className="flex items-center uppercase">
                      <img
                        src={checkmark}
                        alt="Checkmark"
                        className="w-4 h-4 mr-2"
                      />
                      birth certificate
                    </li>
                    <li className="flex items-center uppercase">
                      <img
                        src={checkmark}
                        alt="Checkmark"
                        className="w-4 h-4 mr-2"
                      />
                      olevel result sheet
                    </li>
                    <li className="flex items-center uppercase">
                      <img
                        src={checkmark}
                        alt="Checkmark"
                        className="w-4 h-4 mr-2"
                      />
                      a3 form
                    </li>
                    <li className="flex items-center uppercase">
                      <img
                        src={checkmark}
                        alt="Checkmark"
                        className="w-4 h-4 mr-2"
                      />
                      A5 form
                    </li>
                    <li className="flex items-center uppercase">
                      <img
                        src={checkmark}
                        alt="Checkmark"
                        className="w-4 h-4 mr-2"
                      />
                      attestation
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="flex justify-end space-x-3 mt-4">
          <button
            className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500"
            onClick={onClose}
          >
            Go Back
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            onClick={handleApprove}
          >
            Approve
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ApprovalModal;
