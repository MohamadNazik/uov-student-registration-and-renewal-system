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
