import React, { useState } from "react";
import Modal from "react-modal";
import checkmark from "../assets/icons/checkmark.png";
import axios from "axios";
import Loading from "./../../../admin-frontend/src/components/Loading";
import Swal from "sweetalert2";

Modal.setAppElement("#root");

const ApprovalModal = ({ show, onClose, student }) => {
  const [loading, setLoading] = useState(false);
  if (!show) return null;

  const token = sessionStorage.getItem("adminToken");

  const handleApprove = () => {
    if (!student || !student.Enrollment_Number) {
      alert("Invalid student data.");
      return;
    }

    const storedToken = sessionStorage.getItem("adminToken");
    const parsedToken = storedToken ? JSON.parse(storedToken).token : null;

    // SweetAlert2 configuration with custom button styles
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, approve it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          // Proceed with the approval request
          setLoading(true);

          if (!parsedToken) {
            alert("Admin is not authenticated.");
            return;
          }

          axios
            .post(
              "http://localhost:8080/api/admin/approve-student",
              { Enrollment_Number: student.Enrollment_Number },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${parsedToken}`,
                },
              }
            )
            .then((response) => {
              if (response.data.success) {
                swalWithBootstrapButtons.fire({
                  title: "Approved!",
                  text: "The student has been approved.",
                  icon: "success",
                });
                onClose(); // Close the modal after approval
              } else {
                swalWithBootstrapButtons.fire({
                  title: "Failed",
                  text: response.data.message || "Approval failed.",
                  icon: "error",
                });
              }
            })
            .catch((error) => {
              swalWithBootstrapButtons.fire({
                title: "Error",
                text: "An error occurred while approving the student.",
                icon: "error",
              });
              console.error("Error approving student:", error);
            })
            .finally(() => {
              setLoading(false);
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "The approval process has been cancelled.",
            icon: "error",
          });
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
        {loading ? (
          <Loading />
        ) : (
          student && (
            <>
              <div className="flex space-x-6 w-full">
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
                        <p className="font-bold uppercase">Phone : </p>
                        <p className="ml-2">{student.Address.Phone_Number}</p>
                      </div>
                      <div className="flex flex-row">
                        <p className="font-bold uppercase">Applied date : </p>
                        <p className="ml-2">{student.Enrollment_Date}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-1/2">
                  <h3 className="text-lg font-medium mt-3 uppercase">
                    Academic Information
                  </h3>
                  <div className="flex flex-row bg-gray-300 rounded-2xl p-3 mt-2 w-sm">
                    <div className="flex flex-col ">
                      <div className="flex flex-row">
                        <p className="font-bold uppercase">Programme : </p>
                        <p className="ml-2">{student.course}</p>
                      </div>
                      <div className="flex flex-row">
                        <p className="font-bold uppercase">
                          Previous education :{" "}
                        </p>
                        <p className="ml-2">{student.Address.course}</p>
                      </div>
                      <div className="flex flex-row">
                        <p className="font-bold uppercase">Department : </p>
                        <p className="ml-2">{student.course}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/2">
                <h3 className="text-lg font-medium mt-3 uppercase">
                  Submitted Documents
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
                        UGC letter
                      </li>
                      <li className="flex items-center uppercase">
                        <img
                          src={checkmark}
                          alt="Checkmark"
                          className="w-4 h-4 mr-2"
                        />
                        National identity card
                      </li>
                      <li className="flex items-center uppercase">
                        <img
                          src={checkmark}
                          alt="Checkmark"
                          className="w-4 h-4 mr-2"
                        />
                        A-Level result sheet
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
                        Birth certificate
                      </li>
                      <li className="flex items-center uppercase">
                        <img
                          src={checkmark}
                          alt="Checkmark"
                          className="w-4 h-4 mr-2"
                        />
                        O-Level result sheet
                      </li>
                      <li className="flex items-center uppercase">
                        <img
                          src={checkmark}
                          alt="Checkmark"
                          className="w-4 h-4 mr-2"
                        />
                        A3 form
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
                        Attestation
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )
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
