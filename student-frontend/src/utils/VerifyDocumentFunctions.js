import axios from "axios";

// For OL certificate
export const handleOlFile = async (
  e,
  setLoading,
  setError,
  setIsOl,
  formData,
  setFormData
) => {
  const file = e.target.files[0];

  formData.append("pdf", file);

  setLoading("ol");
  setError("");
  setIsOl(false);

  await axios
    .post("http://localhost:8080/api/users/verify-ol", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.data.success) {
        setIsOl(true);
        setError("");
        setLoading("");
        setFormData(new FormData());
      } else {
        setIsOl(false);
        setError("ol");
        setLoading("");
        setFormData(new FormData());
        e.target.value = "";
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading("");
      setFormData(new FormData());
    });
};

// For Birth Certificate
export const handleBirthCertificateFile = async (
  e,
  setLoading,
  setError,
  setIsBC,
  formData,
  setFormData
) => {
  const file = e.target.files[0];

  formData.append("pdf", file);

  setLoading("bc");
  setError("");
  setIsBC(false);

  await axios
    .post("http://localhost:8080/api/users/verify-bc", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.data.success) {
        setIsBC(true);
        setError("");
        setLoading("");
        setFormData(new FormData());
      } else {
        setIsBC(false);
        setError("bc");
        setLoading("");
        setFormData(new FormData());
        e.target.value = "";
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading("");
      setFormData(new FormData());
    });
};

// For NIC
export const handleNICFile = async (
  e,
  setLoading,
  setError,
  setIsNic,
  formData,
  setFormData
) => {
  const file = e.target.files[0];

  formData.append("pdf", file);

  setLoading("nic");
  setError("");
  setIsNic(false);

  await axios
    .post("http://localhost:8080/api/users/verify-nic", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.data.success) {
        setIsNic(true);
        setError("");
        setLoading("");
        setFormData(new FormData());
      } else {
        setIsNic(false);
        setError("nic");
        setLoading("");
        setFormData(new FormData());
        e.target.value = "";
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading("");
      setFormData(new FormData());
    });
};

// For AL certificate
export const handleAlFile = async (
  e,
  setLoading,
  setError,
  setIsAl,
  formData,
  setFormData
) => {
  const file = e.target.files[0];

  formData.append("pdf", file);

  setLoading("al");
  setError("");
  setIsAl(false);

  await axios
    .post("http://localhost:8080/api/users/verify-al", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.data.success) {
        setIsAl(true);
        setError("");
        setLoading("");
        setFormData(new FormData());
      } else {
        setIsAl(false);
        setError("al");
        setLoading("");
        setFormData(new FormData());
        e.target.value = "";
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading("");
      setFormData(new FormData());
    });
};

// For UGC letter
export const handleUGCLetterFile = async (
  e,
  setLoading,
  setError,
  setIsUgcLtr,
  formData,
  setFormData
) => {
  const file = e.target.files[0];

  formData.append("pdf", file);

  setLoading("ugc-letter");
  setError("");
  setIsUgcLtr(false);

  await axios
    .post("http://localhost:8080/api/users/verify-ugc", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.data.success) {
        setIsUgcLtr(true);
        setError("");
        setLoading("");
        setFormData(new FormData());
      } else {
        setIsUgcLtr(false);
        setError("ugc-letter");
        setLoading("");
        setFormData(new FormData());
        e.target.value = "";
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading("");
      setFormData(new FormData());
    });
};

// For a3form
export const handleA3formFile = async (
  e,
  setLoading,
  setError,
  setIsA3,
  formData,
  setFormData
) => {
  const file = e.target.files[0];

  formData.append("pdf", file);

  setLoading("a3form");
  setError("");
  setIsA3(false);

  await axios
    .post("http://localhost:8080/api/users/verify-a3form", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.data.success) {
        setIsA3(true);
        setError("");
        setLoading("");
        setFormData(new FormData());
      } else {
        setIsA3(false);
        setError("a3form");
        setLoading("");
        setFormData(new FormData());
        e.target.value = "";
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading("");
      setFormData(new FormData());
    });
};

// For a4form
export const handleA4formFile = async (
  e,
  setLoading,
  setError,
  setIsA4,
  formData,
  setFormData
) => {
  const file = e.target.files[0];

  formData.append("pdf", file);

  setLoading("a4form");
  setError("");
  setIsA4(false);

  await axios
    .post("http://localhost:8080/api/users/verify-a4form", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.data.success) {
        setIsA4(true);
        setError("");
        setLoading("");
        setFormData(new FormData());
        s;
      } else {
        setIsA4(false);
        setError("a4form");
        setLoading("");
        setFormData(new FormData());
        e.target.value = "";
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading("");
      setFormData(new FormData());
    });
};

// For a5form
export const handleA5formFile = async (
  e,
  setLoading,
  setError,
  setIsA5,
  formData,
  setFormData
) => {
  const file = e.target.files[0];

  formData.append("pdf", file);

  setLoading("a5form");
  setError("");
  setIsA5(false);

  await axios
    .post("http://localhost:8080/api/users/verify-a5form", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.data.success) {
        setIsA5(true);
        setError("");
        setLoading("");
        setFormData(new FormData());
        s;
      } else {
        setIsA5(false);
        setError("a5form");
        setLoading("");
        setFormData(new FormData());
        e.target.value = "";
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading("");
      setFormData(new FormData());
    });
};

// For a6form
export const handleA6formFile = async (
  e,
  setLoading,
  setError,
  setIsA6,
  formData,
  setFormData
) => {
  const file = e.target.files[0];

  formData.append("pdf", file);

  setLoading("a6form");
  setError("");
  setIsA6(false);

  await axios
    .post("http://localhost:8080/api/users/verify-a6form", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.data.success) {
        setIsA6(true);
        setError("");
        setLoading("");
        setFormData(new FormData());
        s;
      } else {
        setIsA6(false);
        setError("a6form");
        setLoading("");
        setFormData(new FormData());
        e.target.value = "";
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading("");
      setFormData(new FormData());
    });
};

// For Attestationform
export const handleAttestationformFile = async (
  e,
  setLoading,
  setError,
  setIsAttestation,
  formData,
  setFormData
) => {
  const file = e.target.files[0];

  formData.append("pdf", file);

  setLoading("attestation");
  setError("");
  setIsAttestation(false);

  await axios
    .post("http://localhost:8080/api/users/verify-attestation", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.data.success) {
        setIsAttestation(true);
        setError("");
        setLoading("");
        setFormData(new FormData());
        s;
      } else {
        setIsAttestation(false);
        setError("attestation");
        setLoading("");
        setFormData(new FormData());
        e.target.value = "";
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading("");
      setFormData(new FormData());
    });
};
