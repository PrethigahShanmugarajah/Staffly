// Client / src / utils / attendanceUtils.js

export function getDayTypeDisplay(record) {
  if (record.dayType) {
    const map = {
      "Full Day": "bg-green-50 text-green-700 ring-1 ring-green-600/10",
      "Three Quarter Day": "bg-sky-100 text-sky-700",
      "Half Day": "bg-orange-50 text-orange-700 ring-1 ring-orange-600/10",
      "Short Day": "bg-red-50 text-red-700 ring-1 ring-red-600/10",
    };
    return {
      label: record.dayType,
      className: map[record.dayType] || "bg-gray-100 text-gray-600",
    };
  }
  if (record.checkIn && !record.checkOut) {
    return { label: "In Progress", className: "bg-teal-100 text-teal-700" };
  }
  return { label: "—", className: "" };
}

export function getWorkingHoursDisplay(record) {
  if (record.workingHours != null) {
    const hrs = Math.floor(record.workingHours);
    const mins = Math.round((record.workingHours - hrs) * 60);
    return `${hrs}h ${mins}m`;
  }

  /* -------- If still checked in (no checkout), compute live hours -------- */
  if (record.checkIn && !record.checkOut) {
    const diffMs = Date.now() - new Date(record.checkIn).getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    const hrs = Math.floor(diffHours);
    const mins = Math.round((diffHours - hrs) * 60);
    return `${hrs}h ${mins}m (ongoing)`;
  }
  return "—";
}
