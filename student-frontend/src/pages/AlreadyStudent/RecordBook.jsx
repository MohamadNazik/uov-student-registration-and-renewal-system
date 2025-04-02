import React, { useEffect, useState } from "react";
import RecordBookComponent from "../../components/RecordBookComponent";
import Header from "../../components/Header";
import PrimaryButton from "../../components/PrimaryButton";
import download_icon from "../../assets/icons/download_icon.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from "../../utils/SwatAleart";
import Loading from "../../components/Loading";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function RecordBook() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const availableToken = sessionStorage.getItem("token");

  useEffect(() => {
    const getStudentDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${backendUrl}/users/get-student-details`,
          {
            headers: { Authorization: `Bearer ${availableToken}` },
          }
        );

        if (response.data.success) {
          setIsLoading(false);
          setStudent(response.data.student);
        }
      } catch (error) {
        // console.error("Error fetching student details:", error);
        setIsLoading(false);

        if (error.response?.status === 401) {
          sessionStorage.removeItem("token");
          navigate("/login");
          setIsLoading(false);
        }
      }
    };

    if (availableToken) {
      getStudentDetails();
    } else {
      navigate("/login");
    }
  }, [availableToken, navigate]);

  const confirmFunc = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <Header title="Record Book" logOutFunc={() => logout(confirmFunc)} />
      {isLoading && <Loading />}
      <div className="flex justify-between px-4 sm:px-[100px] mt-5 xl:mt-10">
        <Link to="/user-dashboard">
          <PrimaryButton text="Go Back To Dashboard" />
        </Link>
        <PrimaryButton text="Download" iconSrc={download_icon} />
      </div>
      <div className="flex w-full justify-center py-5 xl:py-16">
        <RecordBookComponent
          image={student?.profile_photo}
          Name_with_Initials={student?.Name_with_Initials}
          Name_denoted_by_Initials={student?.Name_denoted_by_Initials}
          Enrollment_Number={student?.Enrollment_Number}
          NIC={student?.Address.NIC}
          DOB={student?.Details_of_Citizen.birth_date}
          stSignature={student?.signature}
        />
      </div>
    </>
  );
}

export default RecordBook;
