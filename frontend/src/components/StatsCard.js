import React from "react";

function StatsCard({
  title,
  value
}) {
  return (
    <div className="card-dark orange-glow p-6">

      <h3 className="text-zinc-400">
        {title}
      </h3>

      <h1 className="text-4xl mt-3 font-bold text-orange-500">
        {value}
      </h1>

    </div>
  );
}

export default StatsCard;