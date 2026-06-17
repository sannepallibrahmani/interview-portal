import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Settings() {
  const [darkMode, setDarkMode] =
    useState(true);

  return (
    <div className="flex bg-[#050505] text-white min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <div className="card-dark p-8">

            <h1 className="text-4xl font-bold mb-8">
              Settings
            </h1>

            <div className="space-y-6">

              <div className="flex justify-between items-center">

                <span className="text-lg">
                  Dark Mode
                </span>

                <button
                  className="pro-btn"
                  onClick={() =>
                    setDarkMode(
                      !darkMode
                    )
                  }
                >
                  {darkMode
                    ? "Enabled"
                    : "Disabled"}
                </button>

              </div>

              <div className="border-t border-zinc-700 pt-6">

                <h3 className="text-xl font-bold mb-3">
                  Account
                </h3>

                <p className="text-zinc-400">
                  More settings like change password and profile picture will be added later.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;