import React, { useEffect, useState } from "react";

import PrimaryButton from "../../components/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import Banner from "../../components/Banner";
import axios from "axios";
import { openDB } from "idb";
import Loading from "../../components/Loading";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleRegistration = async () => {
    try {
      setIsLoading(true);
      await axios
        .get(`${backendUrl}/common/registration-available`)
        .then((res) => {
          if (!res.data.success) {
            setIsLoading(false);
            navigate("/reg-not-open");
          } else {
            setIsLoading(false);
            navigate("/check-selection");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const availableToken = sessionStorage.getItem("token");
    if (availableToken) {
      navigate("/user-dashboard");
    }
  }, []);
  useEffect(() => {
    const clearIndexedDBFiles = async () => {
      const dbName = "fileDB";
      const db = await openDB(dbName, 1);

      if (!db.objectStoreNames.contains("files")) {
        console.warn("No 'files' store found in IndexedDB.");
        return;
      }

      const tx = db.transaction("files", "readwrite");
      const store = tx.objectStore("files");

      const clearRequest = store.clear();

      clearRequest.onsuccess = () => {
        console.log("All files cleared from IndexedDB 'files' store.");
      };

      clearRequest.onerror = (event) => {
        console.error("Error clearing IndexedDB files:", event.target.error);
      };
    };
    const removeLocalStorage = () => {
      localStorage.removeItem("regDetails");
      localStorage.removeItem("student");
    };
    const removeSessionStorage = () => {
      sessionStorage.removeItem("formData");
      sessionStorage.removeItem("Email");
    };
    removeSessionStorage();
    removeLocalStorage();
    clearIndexedDBFiles();
  }, []);
  return (
    <div className="h-screen flex flex-col gap-3 sm:gap-5 justify-center items-center">
      {isLoading && <Loading />}
      <Banner />
      <div className="bg-white p-8 sm:p-14 rounded-3xl flex flex-col items-center gap-5 sm:gap-8 shadow-2xl">
        {/* <Link to="check-selection"> */}
        <PrimaryButton
          text="PROCEED TO REGISTRATION"
          onClick={handleRegistration}
        />
        {/* </Link> */}
        <Link to="/login">
          <PrimaryButton text="LOGIN TO YOUR ACCOUNT" />
        </Link>
      </div>
    </div>
  );
}

export default Home;
