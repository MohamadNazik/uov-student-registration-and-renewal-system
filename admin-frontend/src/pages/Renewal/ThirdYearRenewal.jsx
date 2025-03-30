import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import PrimaryButton from "../../components/PrimaryButton";
import Pay_slip from "../../assets/slip.jpeg";
import axios from "axios";
import Swal from "sweetalert2";

function ThirdYearRenewal() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("information-technology");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRenewals = async () => {
      try {
        setLoading(true);
        const [renewalsResponse, usersResponse] = await Promise.all([
          axios.get("http://localhost:8080/api/admin/get-renewals"),
          axios.get("http://localhost:8080/api/admin/get-registered-students"),
        ]);

        if (renewalsResponse.data.success && usersResponse.data.success) {
          const secondYearStudents = renewalsResponse.data.renewals.filter(
            (st) =>
              st.current_year_of_study === 3 && st.renewal_approved === false
          );
          let filteredStudents = [];
          switch (activeTab) {
            case "information-technology":
              filteredStudents = secondYearStudents.filter(
                (st) => st.course === "IT"
              );
              break;
            case "computer-science":
              filteredStudents = secondYearStudents.filter(
                (st) => st.course === "CS" || st.course === "AMC"
              );
              break;
            case "environmental-science":
              filteredStudents = secondYearStudents.filter(
                (st) => st.course === "Bio"
              );
              break;
            default:
              filteredStudents = secondYearStudents;
          }

          const userMap = new Map(
            usersResponse.data.data.map((user) => [
              user.Enrollment_Number,
              user,
            ])
          );

          const formattedStudents = filteredStudents.map((student) => {
            const userData = userMap.get(student.Enrollment_Number) || {};
            return {
              id: student._id,
              name:
                userData.Name_denoted_by_Initials || student.Enrollment_Number,
              regNo: student.Enrollment_Number,
              department: student.department,
              year: `YEAR ${student.current_year_of_study}`,
              course: student.course,
              paymentSlip: student.receipt?.path || Pay_slip, // Ensure fallback works
              paymentDate: student.payment_date,
              receiptNumber: student.receipt_number,
            };
          });

          setStudents(formattedStudents);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRenewals();
  }, [activeTab]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setSelectedStudent(null);
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  const handleApprove = () => {
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
          setLoading(true);

          axios
            .post("http://localhost:8080/api/admin/approve-renewal", {
              Enrollment_Number: selectedStudent.regNo,
            })
            .then((response) => {
              if (response.data.success) {
                swalWithBootstrapButtons.fire({
                  title: "Approved!",
                  text: "The student has been approved.",
                  icon: "success",
                });
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
    <div>
      <Header title="RENEWAL SUBMISSIONS" />

      <div className="p-4">
        {/* Department tabs and dashboard button in one row */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-wrap gap-2">
            <PrimaryButton
              text="INFORMATION TECHNOLOGY"
              onClick={() => handleTabChange("information-technology")}
              className={`${
                activeTab === "information-technology"
                  ? "bg-blue-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            />

            <PrimaryButton
              text="COMPUTER SCIENCE / AMC"
              onClick={() => handleTabChange("computer-science")}
              className={`${
                activeTab === "computer-science"
                  ? "bg-blue-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            />

            <PrimaryButton
              text="ENVIRONMENTAL SCIENCE"
              onClick={() => handleTabChange("environmental-science")}
              className={`${
                activeTab === "environmental-science"
                  ? "bg-blue-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            />
          </div>

          <div>
            <PrimaryButton
              text="GO TO DASHBOARD"
              onClick={() => navigate("/renewal-dashboard")}
            />
          </div>
        </div>

        {/* Student list and details section */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Student list */}
          <div className="bg-white rounded-lg shadow-md p-4 md:w-1/2">
            <h2 className="text-lg font-semibold mb-4">
              STUDENT LIST(THIRD YEAR)
            </h2>

            {loading ? (
              <div className="p-4 text-center">Loading students...</div>
            ) : students.length > 0 ? (
              <div className="space-y-2">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className={`p-3 rounded-md cursor-pointer ${
                      selectedStudent?.id === student.id
                        ? "bg-blue-100 border-l-4 border-blue-500"
                        : "bg-blue-50 hover:bg-blue-100"
                    }`}
                    onClick={() => handleStudentClick(student)}
                  >
                    <p className="font-semibold">{student.name}</p>
                    <p className="text-sm text-gray-600">
                      REG NO: {student.regNo}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                No students found in this department.
              </div>
            )}
          </div>

          {/* Student details */}
          {selectedStudent ? (
            <div className="bg-white rounded-lg shadow-md p-4 md:w-1/2">
              <h2 className="text-lg font-semibold mb-4">
                STUDENT LIST(THIRD YEAR)
              </h2>

              <div className="mb-6">
                <h3 className="text-sm font-bold mb-2">PERSONAL INFORMATION</h3>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="mb-1">
                    <span className="font-medium">NAME: </span>
                    {selectedStudent.name}
                  </p>
                  <p className="mb-1">
                    <span className="font-medium">REG NO: </span>
                    {selectedStudent.regNo}
                  </p>
                  <p className="mb-1">
                    <span className="font-medium">DEPARTMENT: </span>
                    {selectedStudent.department}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-bold mb-2">PAYMENT INFORMATION</h3>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="mb-1">
                    <span className="font-medium">PAYMENT SLIP NO: </span>
                    P12345
                  </p>
                  <p className="mb-1">
                    <span className="font-medium">PAYMENT DATE: </span>
                    12/03/2023
                  </p>
                  <p className="mb-1">
                    <span className="font-medium">DEGREE - DEPARTMENT: </span>
                    {selectedStudent.department}
                  </p>
                  <p className="mb-1">
                    <span className="font-medium">YEAR: </span>
                    {selectedStudent.year}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-bold mb-2">PAYMENT SLIP</h3>
                <div className="bg-gray-50 p-3 rounded-md flex items-center">
                  <div className="bg-white border p-2 flex-grow">
                    {/* Payment slip image container */}
                    <div className="h-24 w-full bg-gray-200 flex items-center justify-center">
                      <img
                        src={Pay_slip}
                        alt="Payment Slip"
                        className="h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="ml-3 text-green-600 font-semibold">
                    VERIFIED
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                  onClick={handleApprove}
                >
                  APPROVE
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-4 md:w-1/2 flex items-center justify-center">
              <p className="text-gray-500">Select a student to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ThirdYearRenewal;
