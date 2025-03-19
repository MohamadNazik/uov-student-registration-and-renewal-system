import React, { useEffect } from "react";

import PrimaryButton from "../../components/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import Banner from "../../components/Banner";
import axios from "axios";
import { openDB } from "idb";

function Home() {
  const navigate = useNavigate();
  const handleRegistration = async () => {
    try {
      await axios
        .get("http://localhost:8080/api/common/registration-available")
        .then((res) => {
          if (!res.data.success) {
            navigate("/reg-not-open");
          } else {
            navigate("/check-selection");
          }
        });
    } catch (error) {}
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
    };
    removeSessionStorage();
    removeLocalStorage();
    clearIndexedDBFiles();
  }, []);
  return (
    <div className="h-screen flex flex-col gap-3 sm:gap-5 justify-center items-center">
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
