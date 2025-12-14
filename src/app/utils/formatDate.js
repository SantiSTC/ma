export function formatAppointment(dateStr, timeStr) {
  // dateStr viene como "2025-12-04"
  // timeStr como "20:35"

  const date = new Date(`${dateStr}T${timeStr}`);

  const formattedDate = date.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const formattedTime = timeStr.slice(0, 5); 

  return `${capitalizar(formattedDate)} - ${formattedTime} hs`;
}

function capitalizar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
