import axios from "axios";

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
