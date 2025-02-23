import axios from "axios";

// For OL certificate
export const handleOlFile = async (
  e,
  setLoading,
  setError,
  setIsOl,
  formDataVerify,
  setFormDataVerify,
  updateNestedFormData
) => {
  const file = e.target.files[0];

  formDataVerify.append("pdf", file);

  setLoading("ol");
  setError("");
  setIsOl(false);

  await axios
    .post("http://localhost:8080/api/users/verify-ol", formDataVerify, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.data.success) {
        setIsOl(true);
        setError("");
        setLoading("");
        updateNestedFormData("Documents", "OL", file);
        setFormDataVerify(new FormData());
      } else {
        setIsOl(false);
        setError("ol");
        setLoading("");
        updateNestedFormData("Documents", "OL", null);
        setFormDataVerify(new FormData());
        e.target.value = "";
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading("");
      setFormDataVerify(new FormData());
    });
};

// For Birth Certificate
export const handleBirthCertificateFile = async (
  e,
  setLoading,
  setError,
  setIsBC,
  formDataVerify,
  setFormDataVerify,
  updateNestedFormData
) => {
  const file = e.target.files[0];

  formDataVerify.append("pdf", file);

  setLoading("bc");
  setError("");
  setIsBC(false);

  await axios
    .post("http://localhost:8080/api/users/verify-bc", formDataVerify, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.data.success) {
        setIsBC(true);
        setError("");
        setLoading("");
        updateNestedFormData("Documents", "BC", file);
        setFormDataVerify(new FormData());
      } else {
        setIsBC(false);
        setError("bc");
        setLoading("");
        updateNestedFormData("Documents", "BC", null);
        setFormDataVerify(new FormData());
        e.target.value = "";
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading("");
      setFormDataVerify(new FormData());
    });
};

// For NIC
export const handleNICFile = async (
  e,
  setLoading,
  setError,
  setIsNic,
  formDataVerify,
  setFormDataVerify,
  updateNestedFormData
) => {
  const file = e.target.files[0];

  formDataVerify.append("pdf", file);

  setLoading("nic");
  setError("");
  setIsNic(false);

  await axios
    .post("http://localhost:8080/api/users/verify-nic", formDataVerify, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.data.success) {
        setIsNic(true);
        setError("");
        setLoading("");
        updateNestedFormData("Documents", "NIC", file);
        setFormDataVerify(new FormData());
      } else {
        setIsNic(false);
        setError("nic");
        setLoading("");
        updateNestedFormData("Documents", "NIC", null);
        setFormDataVerify(new FormData());
        e.target.value = "";
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading("");
      setFormDataVerify(new FormData());
    });
};

// For AL certificate
export const handleAlFile = async (
  e,
  setLoading,
  setError,
  setIsAl,
  formDataVerify,
  setFormDataVerify,
  updateNestedFormData
) => {
  const file = e.target.files[0];

  formDataVerify.append("pdf", file);

  setLoading("al");
  setError("");
  setIsAl(false);

  await axios
    .post("http://localhost:8080/api/users/verify-al", formDataVerify, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.data.success) {
        setIsAl(true);
        setError("");
        setLoading("");
        updateNestedFormData("Documents", "AL", file);
        setFormDataVerify(new FormData());
      } else {
        setIsAl(false);
        setError("al");
        setLoading("");
        updateNestedFormData("Documents", "AL", null);
        setFormDataVerify(new FormData());
        e.target.value = "";
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading("");
      setFormDataVerify(new FormData());
    });
};

// For UGC letter
export const handleUGCLetterFile = async (
  e,
  setLoading,
  setError,
  setIsUgcLtr,
  formDataVerify,
  setFormDataVerify,
  updateNestedFormData
) => {
  const file = e.target.files[0];

  formDataVerify.append("pdf", file);

  setLoading("ugc-letter");
  setError("");
  setIsUgcLtr(false);

  await axios
    .post("http://localhost:8080/api/users/verify-ugc", formDataVerify, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.data.success) {
        setIsUgcLtr(true);
        setError("");
        setLoading("");
        setFormDataVerify(new FormData());
        updateNestedFormData("Documents", "UGC_Letter", file);
      } else {
        setIsUgcLtr(false);
        setError("ugc-letter");
        setLoading("");
        setFormDataVerify(new FormData());
        e.target.value = "";
        updateNestedFormData("Documents", "UGC_Letter", null);
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading("");
      setFormDataVerify(new FormData());
    });
};

// For a3form
export const handleA3formFile = async (
  e,
  setLoading,
  setError,
  setIsA3,
  formDataVerify,
  setFormDataVerify,
  updateNestedFormData
) => {
  const file = e.target.files[0];

  formDataVerify.append("pdf", file);

  setLoading("a3form");
  setError("");
  setIsA3(false);

  await axios
    .post("http://localhost:8080/api/users/verify-a3form", formDataVerify, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.data.success) {
        setIsA3(true);
        setError("");
        setLoading("");
        updateNestedFormData("Documents", "A3", file);
        setFormDataVerify(new FormData());
      } else {
        setIsA3(false);
        setError("a3form");
        setLoading("");
        updateNestedFormData("Documents", "A3", null);
        setFormDataVerify(new FormData());
        e.target.value = "";
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading("");
      setFormDataVerify(new FormData());
    });
};

// For a4form
export const handleA4formFile = async (
  e,
  setLoading,
  setError,
  setIsA4,
  formDataVerify,
  setFormDataVerify,
  updateNestedFormData
) => {
  const file = e.target.files[0];

  formDataVerify.append("pdf", file);

  setLoading("a4form");
  setError("");
  setIsA4(false);

  await axios
    .post("http://localhost:8080/api/users/verify-a4form", formDataVerify, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.data.success) {
        setIsA4(true);
        setError("");
        setLoading("");
        updateNestedFormData("Documents", "A4", file);
        setFormDataVerify(new FormData());
      } else {
        setIsA4(false);
        setError("a4form");
        setLoading("");
        updateNestedFormData("Documents", "A4", null);
        setFormDataVerify(new FormData());
        e.target.value = "";
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading("");
      setFormDataVerify(new FormData());
    });
};

// For a5form
export const handleA5formFile = async (
  e,
  setLoading,
  setError,
  setIsA5,
  formDataVerify,
  setFormDataVerify,
  updateNestedFormData
) => {
  const file = e.target.files[0];

  formDataVerify.append("pdf", file);

  setLoading("a5form");
  setError("");
  setIsA5(false);

  await axios
    .post("http://localhost:8080/api/users/verify-a5form", formDataVerify, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.data.success) {
        setIsA5(true);
        setError("");
        setLoading("");
        updateNestedFormData("Documents", "A5", file);
        setFormDataVerify(new FormData());
      } else {
        setIsA5(false);
        setError("a5form");
        setLoading("");
        updateNestedFormData("Documents", "A5", null);
        setFormDataVerify(new FormData());
        e.target.value = "";
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading("");
      setFormDataVerify(new FormData());
    });
};

// For a6form
export const handleA6formFile = async (
  e,
  setLoading,
  setError,
  setIsA6,
  formDataVerify,
  setFormDataVerify,
  updateNestedFormData
) => {
  const file = e.target.files[0];

  formDataVerify.append("pdf", file);

  setLoading("a6form");
  setError("");
  setIsA6(false);

  await axios
    .post("http://localhost:8080/api/users/verify-a6form", formDataVerify, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.data.success) {
        setIsA6(true);
        setError("");
        setLoading("");
        updateNestedFormData("Documents", "A6", file);
        setFormDataVerify(new FormData());
      } else {
        setIsA6(false);
        setError("a6form");
        setLoading("");
        updateNestedFormData("Documents", "A6", null);
        setFormDataVerify(new FormData());
        e.target.value = "";
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading("");
      setFormDataVerify(new FormData());
    });
};

// For Attestationform
export const handleAttestationformFile = async (
  e,
  setLoading,
  setError,
  setIsAttestation,
  formDataVerify,
  setFormDataVerify,
  updateNestedFormData
) => {
  const file = e.target.files[0];

  formDataVerify.append("pdf", file);

  setLoading("attestation");
  setError("");
  setIsAttestation(false);

  await axios
    .post(
      "http://localhost:8080/api/users/verify-attestation",
      formDataVerify,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((res) => {
      if (res.data.success) {
        setIsAttestation(true);
        setError("");
        setLoading("");
        updateNestedFormData("Documents", "Attestation", file);
        setFormDataVerify(new FormData());
      } else {
        setIsAttestation(false);
        setError("attestation");
        setLoading("");
        updateNestedFormData("Documents", "Attestation", null);
        setFormDataVerify(new FormData());
        e.target.value = "";
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading("");
      setFormDataVerify(new FormData());
    });
};
