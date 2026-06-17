import React from "react";

function StatusBadge({
  status
}) {
  let color =
    "bg-gray-500";

  if (status === "Selected")
    color =
      "bg-green-600";

  if (status === "Rejected")
    color = "bg-red-600";

  if (
    status ===
    "Interview Scheduled"
  )
    color =
      "bg-yellow-600";

  return (
    <span
      className={`${color} px-3 py-1 rounded-full text-sm`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;