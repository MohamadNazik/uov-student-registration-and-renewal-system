import Swal from "sweetalert2";

export const logout = (confirmFunc) => {
  Swal.fire({
    title: "Do you want to logout?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      confirmFunc();
    }
  });
};
