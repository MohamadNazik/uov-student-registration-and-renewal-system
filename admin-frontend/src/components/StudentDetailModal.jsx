import React from "react";
import Modal from "react-modal";
import checkmark from "../assets/icons/checkmark.png";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

Modal.setAppElement("#root");

const StudentDetailsModal = ({ student, onClose, show }) => {
  if (!show || !student) return null;

  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      contentLabel="Student Details Modal"
      className="fixed top-0 left-0 right-0 flex items-start justify-center z-50"
      overlayClassName="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-md"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl w-full mt-4">
        <h2 className="text-lg font-bold mb-4 uppercase text-[#391031]">
          Student Details
        </h2>

        <div className="flex space-x-6 w-full">
          {/* Personal Information */}
          <div className="w-1/2">
            <h3 className="text-lg font-medium mt-3 uppercase">
              Personal Information
            </h3>
            <div className="flex flex-row bg-gray-300 rounded-2xl p-3 mt-2 w-sm">
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <p className="font-bold uppercase">Name :</p>
                  <p className="ml-2">{student.Name_with_Initials}</p>
                </div>
                <div className="flex flex-row">
                  <p className="font-bold uppercase">Email :</p>
                  <p className="ml-2">{student.Address.Email}</p>
                </div>
                <div className="flex flex-row">
                  <p className="font-bold uppercase">Phone :</p>
                  <p className="ml-2">{student.Address.Phone_Number}</p>
                </div>
                <div className="flex flex-row">
                  <p className="font-bold uppercase">Applied date :</p>
                  <p className="ml-2">{student.Enrollment_Date}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="w-1/2">
            <h3 className="text-lg font-medium mt-3 uppercase">
              Academic Information
            </h3>
            <div className="flex flex-row bg-gray-300 rounded-2xl p-3 mt-2 w-sm">
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <p className="font-bold uppercase">Programme :</p>
                  <p className="ml-2">{student.course}</p>
                </div>
                <div className="flex flex-row">
                  <p className="font-bold uppercase">Department :</p>
                  <p className="ml-2">{student.course}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submitted Documents */}
        <div className="w-full mt-6">
          <h3 className="text-lg font-medium uppercase">Submitted Documents</h3>
          <div className="flex flex-row bg-gray-300 rounded-2xl p-3 mt-2 w-full justify-evenly">
            <div className="w-1/2">
              <ul className="list-none font-bold leading-9">
                {[
                  {
                    name: "UGC letter",
                    path: student.Documents.UGC_Letter.path,
                  },
                  {
                    name: "National identity card",
                    path: student.Documents.NIC.path,
                  },
                  {
                    name: "A-Level result sheet",
                    path: student.Documents.AL.path,
                  },
                  { name: "A4 FORM", path: student.Documents.A4.path },
                  { name: "A6 FORM", path: student.Documents.A6.path },
                ].map((doc, index) => (
                  <li key={index} className="flex items-center uppercase">
                    <img
                      src={checkmark}
                      alt="Checkmark"
                      className="w-4 h-4 mr-2"
                    />
                    <a
                      href={doc.path}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {doc.name}
                      <InsertLinkIcon className="mb-0.5 ml-2" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-1/2">
              <ul className="list-none font-bold leading-9">
                {[
                  {
                    name: "Birth certificate",
                    path: student.Documents.BC.path,
                  },
                  {
                    name: "O-Level result sheet",
                    path: student.Documents.OL.path,
                  },
                  { name: "A3 FORM", path: student.Documents.A3.path },
                  { name: "A5 FORM", path: student.Documents.A5.path },
                  {
                    name: "Attestation",
                    path: student.Documents.Attestation.path,
                  },
                ].map((doc, index) => (
                  <li key={index} className="flex items-center uppercase">
                    <img
                      src={checkmark}
                      alt="Checkmark"
                      className="w-4 h-4 mr-2"
                    />
                    <a
                      href={doc.path}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {doc.name}
                      <InsertLinkIcon className="mb-0.5 ml-2" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default StudentDetailsModal;
