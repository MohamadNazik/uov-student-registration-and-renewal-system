import Swal from "sweetalert2";

export const logout = (confirmFunc) => {
  Swal.fire({
    title: "Do you want to Logout?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#391031",
    cancelButtonColor: "#d32f2f",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      confirmFunc();
    }
  });
};
