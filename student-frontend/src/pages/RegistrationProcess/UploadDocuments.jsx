import { CircularProgress } from "@mui/material";
import axios from "axios";
import { MdVerified } from "react-icons/md";
import React, { useState } from "react";
import { handleOlFile } from "../../utils/VerifyDocumentFunctions";

function UploadDocuments() {
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(new FormData());

  const [isUgcLtr, setIsUgcLtr] = useState(false);
  const [isBirth, setIsBirth] = useState(false);
  const [isSclLeaving, setIsSclLeaving] = useState(false);
  const [isNic, setIsNic] = useState(false);
  const [isOl, setIsOl] = useState(false);
  const [isAl, setIsAl] = useState(false);
  const [isBankSlip, setIsBankSlip] = useState(false);
  const [isA3, setIsA3] = useState(false);
  const [isA4, setIsA4] = useState(false);
  const [isA5, setIsA5] = useState(false);
  const [isA6, setIsA6] = useState(false);
  const [isAttestation, setIsAttestation] = useState(false);

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
              name="ugc-letter"
              onChange={() => {}}
              accept="application/pdf"
              required
              className="border border-black p-1 rounded-md"
            />
          </div>

          {/* Birth Certificate */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm xl:text-lg ml-4">
            <p className="font-medium">ii. Birth Certificate :-</p>
            <input
              type="file"
              name="birth-certificate"
              onChange={() => {}}
              accept="application/pdf"
              required
              className="border border-black p-1 rounded-md"
            />
          </div>

          {/* School Leaving */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm xl:text-lg ml-4">
            <p className="font-medium">iii. School Leaving Certificate :-</p>
            <input
              type="file"
              name="school-leaving"
              onChange={() => {}}
              accept="application/pdf"
              required
              className="border border-black p-1 rounded-md"
            />
          </div>

          {/* NIC */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm xl:text-lg ml-4">
            <p className="font-medium">
              iv. National Identity Card – Both side :-
            </p>
            <input
              type="file"
              name="nic"
              onChange={() => {}}
              accept="application/pdf"
              required
              className="border border-black p-1 rounded-md"
            />
          </div>

          {/* OL Certificate */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm xl:text-lg ml-4">
            <p className="font-medium">v. G.C.E. (O/L) Result Sheet :-</p>
            <input
              type="file"
              name="ol-certificate"
              onChange={(e) =>
                handleOlFile(
                  e,
                  setLoading,
                  setError,
                  setIsOl,
                  formData,
                  setFormData
                )
              }
              accept="application/pdf"
              required
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
            <p className="font-medium">vi. G.C.E. (A/L) Result Sheet :-</p>
            <input
              type="file"
              name="al-certificate"
              onChange={() => {}}
              accept="application/pdf"
              required
              className="border border-black p-1 rounded-md"
            />
          </div>

          {/* Bank Slip */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm xl:text-lg ml-4">
            <p className="font-medium">vii. Bank Slip :-</p>
            <input
              type="file"
              name="bank-slip"
              onChange={() => {}}
              accept="application/pdf"
              required
              className="border border-black p-1 rounded-md"
            />
          </div>

          {/* A3 form */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm xl:text-lg ml-4">
            <p className="font-medium">viii. A3 Form :-</p>
            <input
              type="file"
              name="a3-form"
              onChange={() => {}}
              accept="application/pdf"
              required
              className="border border-black p-1 rounded-md"
            />
          </div>

          {/* A4 form */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm xl:text-lg ml-4">
            <p className="font-medium">ix. A4 Form :-</p>
            <input
              type="file"
              name="a4-form"
              onChange={() => {}}
              accept="application/pdf"
              required
              className="border border-black p-1 rounded-md"
            />
          </div>

          {/* A5 form */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm xl:text-lg ml-4">
            <p className="font-medium">x. A5 Form :-</p>
            <input
              type="file"
              name="a5-form"
              onChange={() => {}}
              accept="application/pdf"
              required
              className="border border-black p-1 rounded-md"
            />
          </div>

          {/* A6 form */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm xl:text-lg ml-4">
            <p className="font-medium">xi. A6 Form :-</p>
            <input
              type="file"
              name="a6-form"
              onChange={() => {}}
              accept="application/pdf"
              required
              className="border border-black p-1 rounded-md"
            />
          </div>

          {/* Attestation form */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm xl:text-lg ml-4">
            <p className="font-medium">xii. Attestation Form :-</p>
            <input
              type="file"
              name="attestation"
              onChange={() => {}}
              accept="application/pdf"
              required
              className="border border-black p-1 rounded-md"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadDocuments;
