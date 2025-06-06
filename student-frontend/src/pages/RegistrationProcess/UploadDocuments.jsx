import { CircularProgress } from "@mui/material";
import axios from "axios";
import { MdVerified } from "react-icons/md";
import React, { useEffect, useState } from "react";
import {
  handleA3formFile,
  handleA4formFile,
  handleA5formFile,
  handleA6formFile,
  handleAlFile,
  handleAttestationformFile,
  handleBirthCertificateFile,
  handleNICFile,
  handleOlFile,
  handleUGCLetterFile,
} from "../../utils/VerifyDocumentFunctions";
import SecondaryButton from "../../components/SecondaryButton";
import { Link, useNavigate } from "react-router-dom";
import { useFormContext } from "../../utils/FormContext";
import PdfContainer from "../../components/PdfContainer";
import { openDB } from "idb";

function UploadDocuments() {
  const dbPromise = openDB("fileDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("files")) {
        db.createObjectStore("files");
      }
    },
  });

  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [formDataVerify, setFormDataverify] = useState(new FormData());

  const [isUgcLtr, setIsUgcLtr] = useState(false);
  const [isBC, setIsBC] = useState(false);
  // const [isSclLeaving, setIsSclLeaving] = useState(false);
  const [isNic, setIsNic] = useState(false);
  const [isOl, setIsOl] = useState(false);
  const [isAl, setIsAl] = useState(false);
  // const [isBankSlip, setIsBankSlip] = useState(false);
  const [isA3, setIsA3] = useState(false);
  const [isA4, setIsA4] = useState(false);
  const [isA5, setIsA5] = useState(false);
  const [isA6, setIsA6] = useState(false);
  const [isAttestation, setIsAttestation] = useState(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);

  const [documentURLs, setDocumentURLs] = useState({});

  const { updateDocumentFile, formData } = useFormContext();

  const navigate = useNavigate();

  useEffect(() => {
    const handleNextButton = () => {
      if (
        isUgcLtr &&
        isBC &&
        isNic &&
        isOl &&
        isAl &&
        isA3 &&
        isA4 &&
        isA5 &&
        isA6 &&
        isAttestation &&
        error == ""
      ) {
        setNextButtonDisabled(false);
      } else {
        setNextButtonDisabled(true);
      }
    };
    handleNextButton();
  }, [
    isUgcLtr,
    isBC,
    isNic,
    isOl,
    isAl,
    isA3,
    isA4,
    isA5,
    isA6,
    isAttestation,
  ]);

  useEffect(() => {
    const loadDocuments = async () => {
      const updatedURLs = {};
      const db = await dbPromise;
      const ugcLtrFile = await db.get("files", "UGC_Letter");
      if (ugcLtrFile) {
        setIsUgcLtr(true);
        updatedURLs["UGC_Letter"] = URL.createObjectURL(ugcLtrFile);
      }

      const bcFile = await db.get("files", "BC");
      if (bcFile) {
        setIsBC(true);
        updatedURLs["BC"] = URL.createObjectURL(bcFile);
      }

      const nicFile = await db.get("files", "NIC");
      if (nicFile) {
        setIsNic(true);
        updatedURLs["NIC"] = URL.createObjectURL(nicFile);
      }

      const olFile = await db.get("files", "OL");
      if (olFile) {
        setIsOl(true);
        updatedURLs["OL"] = URL.createObjectURL(olFile);
      }

      const alFile = await db.get("files", "AL");
      if (alFile) {
        setIsAl(true);
        updatedURLs["AL"] = URL.createObjectURL(alFile);
      }

      const a3File = await db.get("files", "A3");
      if (a3File) {
        setIsA3(true);
        updatedURLs["A3"] = URL.createObjectURL(a3File);
      }

      const a4File = await db.get("files", "A4");
      if (a4File) {
        setIsA4(true);
        updatedURLs["A4"] = URL.createObjectURL(a4File);
      }

      const a5File = await db.get("files", "A5");
      if (a5File) {
        setIsA5(true);
        updatedURLs["A5"] = URL.createObjectURL(a5File);
      }

      const a6File = await db.get("files", "A6");
      if (a6File) {
        setIsA6(true);
        updatedURLs["A6"] = URL.createObjectURL(a6File);
      }

      const attestationFile = await db.get("files", "Attestation");
      if (attestationFile) {
        setIsAttestation(true);
        updatedURLs["Attestation"] = URL.createObjectURL(attestationFile);
      }

      // for (const key of documentKeys) {
      //   const file = await db.get("files", key);
      //   if (file) {
      //     const fileURL = URL.createObjectURL(file);
      //     updatedURLs[key] = fileURL;
      //   }
      // }
      setDocumentURLs((prev) => ({ ...prev, ...updatedURLs }));
    };
    loadDocuments();
  }, [formData.Documents]);

  useEffect(() => {
    const loadProfilePhoto = async () => {
      const db = await dbPromise;
      const storedProfile = await db.get("files", "profile_photo");

      if (!storedProfile) {
        navigate("/a1-form-part-1");
      }
    };
    const loadSignature = async () => {
      const db = await dbPromise;
      const storedSignature = await db.get("files", "signature");

      if (!storedSignature) {
        navigate("/a1-form-part-1");
      }
    };
    if (
      formData.Details_of_Parents_or_Guardians.Name === "" ||
      formData.Details_of_Parents_or_Guardians.Occupation === "" ||
      formData.Details_of_Parents_or_Guardians.Phone_Number === "" ||
      formData.Emergency_Person.Name === "" ||
      formData.Emergency_Person.Relationship === "" ||
      formData.Emergency_Person.Address === "" ||
      formData.Emergency_Person.Phone_Number === ""
    ) {
      navigate("/a1-form-part-3");
    } else if (
      formData.Educational_Qualifications.AL_year === "" ||
      formData.Educational_Qualifications.Index_AL === "" ||
      formData.Educational_Qualifications.Zscore === "" ||
      formData.Educational_Qualifications.AL_result.Subject1.Name === "" ||
      formData.Educational_Qualifications.AL_result.Subject1.Result === "" ||
      formData.Educational_Qualifications.AL_result.Subject2.Name === "" ||
      formData.Educational_Qualifications.AL_result.Subject2.Result === "" ||
      formData.Educational_Qualifications.AL_result.Subject3.Name === "" ||
      formData.Educational_Qualifications.AL_result.Subject3.Result === "" ||
      formData.Details_of_Citizen.race === "" ||
      formData.Details_of_Citizen.PI === "" ||
      formData.Details_of_Citizen.country === "" ||
      formData.Details_of_Citizen.gender === "" ||
      formData.Details_of_Citizen.civil_status === "" ||
      formData.Details_of_Citizen.religion === "" ||
      formData.Details_of_Citizen.birth_date === "" ||
      formData.Details_of_Citizen.age === "" ||
      formData.Details_of_Citizen.citizenship === ""
    ) {
      navigate("/a1-form-part-2");
    } else if (formData.Details_of_Citizen.citizenship === "SRILANKAN") {
      if (formData.Details_of_Citizen.citizenship_from === "") {
        navigate("/a1-form-part-2");
      }
    } else if (
      formData.Enrollment_Number === "" ||
      formData.Name_with_Initials === "" ||
      formData.Name_denoted_by_Initials === "" ||
      formData.Address.Permenant_Address === "" ||
      formData.Address.Province === "" ||
      formData.Address.District === "" ||
      formData.Address.Divisional_Secretarial === "" ||
      formData.Address.NIC === "" ||
      formData.Address.Phone_Number === "" ||
      formData.Address.Email === "" ||
      formData.Title === ""
    ) {
      navigate("/a1-form-part-1");
    }
    loadProfilePhoto();
    loadSignature();
  }, []);

  return (
    <>
      <div className="bg-white m-2 sm:m-5 xl:m-8 p-4 sm:p-7 xl:p-10 rounded-lg flex flex-col justify-start gap-3 xl:gap-5">
        <h3 className="text-md sm:text-lg xl:text-2xl font-semibold">
          8. Upload the scanned documents
        </h3>
        <p className="text-xs sm:text-sm xl:text-lg font-medium text-red-600 ml-4">
          Please make sure that all the documents are clear, scanned using a
          scanner and in the pdf format.
        </p>

        {/* UGC Letter */}
        <div className="flex flex-col gap-3 xl:gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm xl:text-lg ml-4">
            <p className="font-medium">i. Admission Letter sent by UGC :-</p>
            <input
              type="file"
              name="UGC_Letter"
              onChange={(e) => {
                handleUGCLetterFile(
                  e,
                  setLoading,
                  setError,
                  setIsUgcLtr,
                  formDataVerify,
                  setFormDataverify,
                  updateDocumentFile
                );
              }}
              accept="application/pdf"
              required
              disabled={loading === "" ? false : true}
              className="border border-black p-1 rounded-md"
            />
            <div className="flex gap-1 items-center">
              {loading && loading === "ugc-letter" ? (
                <>
                  <CircularProgress size="15px" color="#ffff" />
                  <p>Identifying...</p>
                </>
              ) : (
                <></>
              )}

              {error && error === "ugc-letter" ? (
                <span className="-mt-2 sm:-mt-0 sm:text-sm xl:text-lg ml-1 text-xs font-medium text-red-600">
                  * Wrong document / Not clear
                </span>
              ) : (
                <></>
              )}
              {isUgcLtr ? (
                <div className="-mt-2 sm:-mt-0 sm:text-sm xl:text-lg ml-1 text-xs font-medium text-green-600 flex items-center gap-1">
                  <MdVerified />
                  <p>Identified</p>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>

          {/* Birth Certificate */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm xl:text-lg ml-4">
            <p className="font-medium">ii. Birth Certificate :-</p>
            <input
              type="file"
              name="birth-certificate"
              onChange={(e) =>
                handleBirthCertificateFile(
                  e,
                  setLoading,
                  setError,
                  setIsBC,
                  formDataVerify,
                  setFormDataverify,
                  updateDocumentFile
                )
              }
              accept="application/pdf"
              required
              disabled={loading === "" ? false : true}
              className="border border-black p-1 rounded-md"
            />
            <div className="flex gap-1 items-center">
              {loading && loading === "bc" ? (
                <>
                  <CircularProgress size="15px" color="#ffff" />
                  <p>Identifying...</p>
                </>
              ) : (
                <></>
              )}

              {error && error === "bc" ? (
                <span className="-mt-2 sm:-mt-0 sm:text-sm xl:text-lg ml-1 text-xs font-medium text-red-600">
                  * Wrong document / Not clear
                </span>
              ) : (
                <></>
              )}
              {isBC ? (
                <div className="-mt-2 sm:-mt-0 sm:text-sm xl:text-lg ml-1 text-xs font-medium text-green-600 flex items-center gap-1">
                  <MdVerified />
                  <p>Identified</p>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>

          {/* School Leaving */}
          {/* <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm xl:text-lg ml-4">
            <p className="font-medium">iii. School Leaving Certificate :-</p>
            <input
              type="file"
              name="school-leaving"
              onChange={() => {}}
              accept="application/pdf"
              required
              disabled={loading === "" ? false : true}
              className="border border-black p-1 rounded-md"
            />
          </div> */}

          {/* NIC */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm xl:text-lg ml-4">
            <p className="font-medium">
              iii. National Identity Card – Both side :-
            </p>
            <input
              type="file"
              name="nic"
              onChange={(e) =>
                handleNICFile(
                  e,
                  setLoading,
                  setError,
                  setIsNic,
                  formDataVerify,
                  setFormDataverify,
                  updateDocumentFile
                )
              }
              accept="application/pdf"
              required
              disabled={loading === "" ? false : true}
              className="border border-black p-1 rounded-md"
            />
            <div className="flex gap-1 items-center">
              {loading && loading === "nic" ? (
                <>
                  <CircularProgress size="15px" color="#ffff" />
                  <p>Identifying...</p>
                </>
              ) : (
                <></>
              )}

              {error && error === "nic" ? (
                <span className="-mt-2 sm:-mt-0 sm:text-sm xl:text-lg ml-1 text-xs font-medium text-red-600">
                  * Wrong document / Not clear
                </span>
              ) : (
                <></>
              )}
              {isNic ? (
                <div className="-mt-2 sm:-mt-0 sm:text-sm xl:text-lg ml-1 text-xs font-medium text-green-600 flex items-center gap-1">
                  <MdVerified />
                  <p>Identified</p>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>

          {/* OL Certificate */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm xl:text-lg ml-4">
            <p className="font-medium">iv. G.C.E. (O/L) Result Sheet :-</p>
            <input
              type="file"
              name="ol-certificate"
              onChange={(e) =>
                handleOlFile(
                  e,
                  setLoading,
                  setError,
                  setIsOl,
                  formDataVerify,
                  setFormDataverify,
                  updateDocumentFile
                )
              }
              accept="application/pdf"
              required
              disabled={loading === "" ? false : true}
              className="border border-black p-1 rounded-md"
            />
            <div className="flex gap-1 items-center">
              {loading && loading === "ol" ? (
                <>
                  <CircularProgress size="15px" color="#ffff" />
                  <p>Identifying...</p>
                </>
              ) : (
                <></>
              )}

              {error && error === "ol" ? (
                <span className="-mt-2 sm:-mt-0 sm:text-sm xl:text-lg ml-1 text-xs font-medium text-red-600">
                  * Wrong document / Not clear
                </span>
              ) : (
                <></>
              )}
              {isOl ? (
                <div className="-mt-2 sm:-mt-0 sm:text-sm xl:text-lg ml-1 text-xs font-medium text-green-600 flex items-center gap-1">
                  <MdVerified />
                  <p>Identified</p>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>

          {/* AL Certificate */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm xl:text-lg ml-4">
            <p className="font-medium">v. G.C.E. (A/L) Result Sheet :-</p>
            <input
              type="file"
              name="al-certificate"
              onChange={(e) =>
                handleAlFile(
                  e,
                  setLoading,
                  setError,
                  setIsAl,
                  formDataVerify,
                  setFormDataverify,
                  updateDocumentFile
                )
              }
              accept="application/pdf"
              required
              disabled={loading === "" ? false : true}
              className="border border-black p-1 rounded-md"
            />
            <div className="flex gap-1 items-center">
              {loading && loading === "al" ? (
                <>
                  <CircularProgress size="15px" color="#ffff" />
                  <p>Identifying...</p>
                </>
              ) : (
                <></>
              )}

              {error && error === "al" ? (
                <span className="-mt-2 sm:-mt-0 sm:text-sm xl:text-lg ml-1 text-xs font-medium text-red-600">
                  * Wrong document / Not clear
                </span>
              ) : (
                <></>
              )}
              {isAl ? (
                <div className="-mt-2 sm:-mt-0 sm:text-sm xl:text-lg ml-1 text-xs font-medium text-green-600 flex items-center gap-1">
                  <MdVerified />
                  <p>Identified</p>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>

          {/* Bank Slip */}
          {/* <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm xl:text-lg ml-4">
            <p className="font-medium">vii. Bank Slip :-</p>
            <input
              type="file"
              name="bank-slip"
              onChange={() => {}}
              accept="application/pdf"
              required
              disabled={loading === "" ? false : true}
              className="border border-black p-1 rounded-md"
            />
          </div> */}

          {/* A3 form */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm xl:text-lg ml-4">
            <p className="font-medium">vi. A3 Form :-</p>
            <input
              type="file"
              name="a3-form"
              onChange={(e) =>
                handleA3formFile(
                  e,
                  setLoading,
                  setError,
                  setIsA3,
                  formDataVerify,
                  setFormDataverify,
                  updateDocumentFile
                )
              }
              accept="application/pdf"
              required
              disabled={loading === "" ? false : true}
              className="border border-black p-1 rounded-md"
            />
            <div className="flex gap-1 items-center">
              {loading && loading === "a3form" ? (
                <>
                  <CircularProgress size="15px" color="#ffff" />
                  <p>Identifying...</p>
                </>
              ) : (
                <></>
              )}

              {error && error === "a3form" ? (
                <span className="-mt-2 sm:-mt-0 sm:text-sm xl:text-lg ml-1 text-xs font-medium text-red-600">
                  * Wrong document / Not clear
                </span>
              ) : (
                <></>
              )}
              {isA3 ? (
                <div className="-mt-2 sm:-mt-0 sm:text-sm xl:text-lg ml-1 text-xs font-medium text-green-600 flex items-center gap-1">
                  <MdVerified />
                  <p>Identified</p>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>

          {/* A4 form */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm xl:text-lg ml-4">
            <p className="font-medium">vii. A4 Form :-</p>
            <input
              type="file"
              name="a4-form"
              onChange={(e) =>
                handleA4formFile(
                  e,
                  setLoading,
                  setError,
                  setIsA4,
                  formDataVerify,
                  setFormDataverify,
                  updateDocumentFile
                )
              }
              accept="application/pdf"
              required
              disabled={loading === "" ? false : true}
              className="border border-black p-1 rounded-md"
            />
            <div className="flex gap-1 items-center">
              {loading && loading === "a4form" ? (
                <>
                  <CircularProgress size="15px" color="#ffff" />
                  <p>Identifying...</p>
                </>
              ) : (
                <></>
              )}

              {error && error === "a4form" ? (
                <span className="-mt-2 sm:-mt-0 sm:text-sm xl:text-lg ml-1 text-xs font-medium text-red-600">
                  * Wrong document / Not clear
                </span>
              ) : (
                <></>
              )}
              {isA4 ? (
                <div className="-mt-2 sm:-mt-0 sm:text-sm xl:text-lg ml-1 text-xs font-medium text-green-600 flex items-center gap-1">
                  <MdVerified />
                  <p>Identified</p>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>

          {/* A5 form */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm xl:text-lg ml-4">
            <p className="font-medium">viii. A5 Form :-</p>
            <input
              type="file"
              name="a5-form"
              onChange={(e) =>
                handleA5formFile(
                  e,
                  setLoading,
                  setError,
                  setIsA5,
                  formDataVerify,
                  setFormDataverify,
                  updateDocumentFile
                )
              }
              accept="application/pdf"
              required
              disabled={loading === "" ? false : true}
              className="border border-black p-1 rounded-md"
            />
            <div className="flex gap-1 items-center">
              {loading && loading === "a5form" ? (
                <>
                  <CircularProgress size="15px" color="#ffff" />
                  <p>Identifying...</p>
                </>
              ) : (
                <></>
              )}

              {error && error === "a5form" ? (
                <span className="-mt-2 sm:-mt-0 sm:text-sm xl:text-lg ml-1 text-xs font-medium text-red-600">
                  * Wrong document / Not clear
                </span>
              ) : (
                <></>
              )}
              {isA5 ? (
                <div className="-mt-2 sm:-mt-0 sm:text-sm xl:text-lg ml-1 text-xs font-medium text-green-600 flex items-center gap-1">
                  <MdVerified />
                  <p>Identified</p>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>

          {/* A6 form */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm xl:text-lg ml-4">
            <p className="font-medium">ix. A6 Form :-</p>
            <input
              type="file"
              name="a6-form"
              onChange={(e) =>
                handleA6formFile(
                  e,
                  setLoading,
                  setError,
                  setIsA6,
                  formDataVerify,
                  setFormDataverify,
                  updateDocumentFile
                )
              }
              accept="application/pdf"
              required
              disabled={loading === "" ? false : true}
              className="border border-black p-1 rounded-md"
            />
            <div className="flex gap-1 items-center">
              {loading && loading === "a6form" ? (
                <>
                  <CircularProgress size="15px" color="#ffff" />
                  <p>Identifying...</p>
                </>
              ) : (
                <></>
              )}

              {error && error === "a6form" ? (
                <span className="-mt-2 sm:-mt-0 sm:text-sm xl:text-lg ml-1 text-xs font-medium text-red-600">
                  * Wrong document / Not clear
                </span>
              ) : (
                <></>
              )}
              {isA6 ? (
                <div className="-mt-2 sm:-mt-0 sm:text-sm xl:text-lg ml-1 text-xs font-medium text-green-600 flex items-center gap-1">
                  <MdVerified />
                  <p>Identified</p>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>

          {/* Attestation form */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm xl:text-lg ml-4">
            <p className="font-medium">x. Attestation Form :-</p>
            <input
              type="file"
              name="attestation"
              onChange={(e) =>
                handleAttestationformFile(
                  e,
                  setLoading,
                  setError,
                  setIsAttestation,
                  formDataVerify,
                  setFormDataverify,
                  updateDocumentFile
                )
              }
              accept="application/pdf"
              required
              disabled={loading === "" ? false : true}
              className="border border-black p-1 rounded-md"
            />
            <div className="flex gap-1 items-center">
              {loading && loading === "attestation" ? (
                <>
                  <CircularProgress size="15px" color="#ffff" />
                  <p>Identifying...</p>
                </>
              ) : (
                <></>
              )}

              {error && error === "attestation" ? (
                <span className="-mt-2 sm:-mt-0 sm:text-sm xl:text-lg ml-1 text-xs font-medium text-red-600">
                  * Wrong document / Not clear
                </span>
              ) : (
                <></>
              )}
              {isAttestation ? (
                <div className="-mt-2 sm:-mt-0 sm:text-sm xl:text-lg ml-1 text-xs font-medium text-green-600 flex items-center gap-1">
                  <MdVerified />
                  <p>Identified</p>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div>
          <p className="text-lg font-medium text-black mt-8 mb-6">
            Documents that you are going to submit. Pleace check wheather all
            documents are correct.
            <br />
            <span className="text-red-600">Click the document to view</span>
          </p>
          <div className="flex flex-col gap-5">
            {Object.entries(documentURLs).map(([key, fileURL], index) =>
              fileURL ? (
                <div key={key} className="flex items-center">
                  <span className="font-semibold mr-4">{index + 1}.</span>
                  <a href={fileURL} target="_blank" className="block">
                    <PdfContainer text={key} />
                  </a>
                  <div className="-mt-2 sm:-mt-0 sm:text-sm xl:text-lg ml-1 text-xs font-medium text-green-600 flex items-center gap-1">
                    <MdVerified />
                    <p>Identified</p>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
        <div className="flex gap-8 mt-2 sm:gap-20 sm:mt-8 justify-end">
          <Link to="/verify-id">
            <SecondaryButton
              text="Next"
              color="bg-green-700"
              hoverColor="hover:bg-green-800"
              isDisabled={nextButtonDisabled}
            />
          </Link>
        </div>
      </div>
    </>
  );
}

export default UploadDocuments;
