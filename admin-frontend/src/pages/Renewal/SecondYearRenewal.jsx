import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import PrimaryButton from "../../components/PrimaryButton";
import Pay_slip from "../../assets/slip.jpeg";

function SecondYearRenewal() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("information-technology");
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);

    // Simulated data - replace with actual API calls
    useEffect(() => {
        setLoading(true);
        // Reset selected student when changing tabs
        setSelectedStudent(null);
        
        // Simulate API fetch with different students based on the active tab
        setTimeout(() => {
            if (activeTab === "information-technology") {
                setStudents([
                    {
                        id: "1",
                        name: "JOHN DOE",
                        regNo: "2020ICT01",
                        department: "PHYSICAL SCIENCE",
                        year: "SECOND YEAR"
                    },
                    {
                        id: "2",
                        name: "ALICE SMITH",
                        regNo: "2020ICT02",
                        department: "PHYSICAL SCIENCE",
                        year: "SECOND YEAR"
                    },
                    {
                        id: "3",
                        name: "PETER HARIS",
                        regNo: "2020ICT03",
                        department: "PHYSICAL SCIENCE",
                        year: "SECOND YEAR"
                    }
                ]);
            } else if (activeTab === "computer-science") {
                setStudents([
                    {
                        id: "4",
                        name: "MICHAEL JOHNSON",
                        regNo: "2020CS01",
                        department: "PHYSICAL SCIENCE",
                        year: "SECOND YEAR"
                    },
                    {
                        id: "5",
                        name: "SARAH WILLIAMS",
                        regNo: "2020CS02",
                        department: "PHYSICAL SCIENCE",
                        year: "SECOND YEAR"
                    },
                    {
                        id: "6",
                        name: "DAVID BROWN",
                        regNo: "2020ASP01",
                        department: "PHYSICAL SCIENCE",
                        year: "SECOND YEAR"
                    }
                ]);
            } else if (activeTab === "environmental-science") {
                setStudents([
                    {
                        id: "7",
                        name: "EMMA DAVIS",
                        regNo: "2020ASB01",
                        department: "BIOLOGICAL",
                        year: "SECOND YEAR"
                    },
                    {
                        id: "8",
                        name: "JAMES WILSON",
                        regNo: "2020ASB02",
                        department: "BIOLOGICAL SCIENCE",
                        year: "SECOND YEAR"
                    },
                    {
                        id: "9",
                        name: "OLIVIA TAYLOR",
                        regNo: "2020ASB03",
                        department: "BIOLOGICAL SCIENCE",
                        year: "SECOND YEAR"
                    }
                ]);
            }
            setLoading(false);
        }, 500);
    }, [activeTab]);

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    const handleStudentClick = (student) => {
        setSelectedStudent(student);
    };

    const handleApprove = () => {
        // Handle approval logic
        alert(`Student ${selectedStudent.name} approved successfully!`);
        setSelectedStudent(null);
        // Here you would also call your API to update the approval status
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
                            className={`${activeTab === "information-technology" ? "bg-blue-600" : "bg-blue-500 hover:bg-blue-600"}`}
                        />

                        <PrimaryButton
                            text="COMPUTER SCIENCE / AMC"
                            onClick={() => handleTabChange("computer-science")}
                            className={`${activeTab === "computer-science" ? "bg-blue-600" : "bg-blue-500 hover:bg-blue-600"}`}
                        />

                        <PrimaryButton
                            text="ENVIRONMENTAL SCIENCE"
                            onClick={() => handleTabChange("environmental-science")}
                            className={`${activeTab === "environmental-science" ? "bg-blue-600" : "bg-blue-500 hover:bg-blue-600"}`}
                        />
                    </div>

                    <div>
                        <PrimaryButton text="GO TO DASHBOARD" onClick={() => navigate("/renewal-dashboard")} />
                    </div>
                </div>

                {/* Student list and details section */}
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Student list */}
                    <div className="bg-white rounded-lg shadow-md p-4 md:w-1/2">
                        <h2 className="text-lg font-semibold mb-4">STUDENT LIST(SECOND YEAR)</h2>

                        {loading ? (
                            <div className="p-4 text-center">Loading students...</div>
                        ) : students.length > 0 ? (
                            <div className="space-y-2">
                                {students.map(student => (
                                    <div
                                        key={student.id}
                                        className={`p-3 rounded-md cursor-pointer ${selectedStudent?.id === student.id
                                                ? "bg-blue-100 border-l-4 border-blue-500"
                                                : "bg-blue-50 hover:bg-blue-100"
                                            }`}
                                        onClick={() => handleStudentClick(student)}
                                    >
                                        <p className="font-semibold">{student.name}</p>
                                        <p className="text-sm text-gray-600">REG NO: {student.regNo}</p>
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
                            <h2 className="text-lg font-semibold mb-4">STUDENT LIST(SECOND YEAR)</h2>

                            <div className="mb-6">
                                <h3 className="text-sm font-bold mb-2">PERSONAL INFORMATION</h3>
                                <div className="bg-gray-50 p-3 rounded-md">
                                    <p className="mb-1"><span className="font-medium">NAME: </span>{selectedStudent.name}</p>
                                    <p className="mb-1"><span className="font-medium">REG NO: </span>{selectedStudent.regNo}</p>
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
                                            <img src={Pay_slip} alt="Payment Slip" className="h-full object-contain" />
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

export default SecondYearRenewal;