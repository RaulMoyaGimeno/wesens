export function avisoSelWesen() {
  $.getScript("https://cdn.jsdelivr.net/npm/sweetalert2@11", function () {
    Swal.fire({
      icon: "error",
      text: "Debes sellecionar un wesen",
    });
  });
}

export function successMessage(mensaje) {
  $.getScript("https://cdn.jsdelivr.net/npm/sweetalert2@11", function () {
    Swal.fire({
      icon: "success",
      text: mensaje,
    });
  });
}