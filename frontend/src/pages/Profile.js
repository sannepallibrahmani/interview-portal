import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const role = localStorage.getItem("role");

      if (role === "candidate") {
        const res = await api.get("/candidate/profile");
        setProfile(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!profile) {
    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex bg-[#050505] text-white min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <div className="card-dark p-8 orange-glow">

            <div className="flex items-center gap-6 mb-8">

              <img
                src="https://i.pravatar.cc/150"
                alt="profile"
                className="w-28 h-28 rounded-full border-4 border-orange-500"
              />

              <div>
                <h1 className="text-4xl font-bold">
                  {profile.name}
                </h1>

                <p className="text-zinc-400 mt-2">
                  {profile.email}
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="card-dark p-5">
                <h3 className="text-xl font-bold mb-2">
                  Status
                </h3>

                <p className="text-orange-500">
                  {profile.status}
                </p>
              </div>

              <div className="card-dark p-5">
                <h3 className="text-xl font-bold mb-2">
                  Interview Date
                </h3>

                <p className="text-zinc-400">
                  {profile.interviewDate || "Not Scheduled"}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;