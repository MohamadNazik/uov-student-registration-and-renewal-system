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
import { Link } from "react-router-dom";
import { useFormContext } from "../../utils/FormContext";

function UploadDocuments() {
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

  const { updateFile } = useFormContext();

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
                  updateFile
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
                  updateFile
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
                  updateFile
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
                  updateFile
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
                  updateFile
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
                  updateFile
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
                  updateFile
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
                  updateFile
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
                  updateFile
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
                  updateFile
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
