import React, {
  useEffect,
  useState
} from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import LoadingSpinner from "../components/LoadingSpinner";
import StatusBadge from "../components/StatusBadge";

function CandidateDashboard() {
  const navigate = useNavigate();

  const [profile, setProfile] =
    useState(null);

  const [file, setFile] =
    useState(null);

  const [uploading,
    setUploading] =
    useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile =
    async () => {
      try {
        const res =
          await api.get(
            "/candidate/profile"
          );

        setProfile(
          res.data
        );
      } catch (error) {
        console.log(error);
        alert(
          "Failed to load profile"
        );
      }
    };

  const uploadResume =
    async () => {
      if (!file) {
        alert(
          "Please select a resume"
        );
        return;
      }

      try {
        setUploading(true);

        const formData =
          new FormData();

        formData.append(
          "resume",
          file
        );

        await api.post(
          "/candidate/upload-resume",
          formData
        );

        alert(
          "Resume uploaded successfully"
        );

        loadProfile();
      } catch (error) {
        console.log(error);
        alert(
          "Upload failed"
        );
      } finally {
        setUploading(false);
      }
    };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!profile) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex bg-[#050505] text-white min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          {/* Header */}

          <div className="flex justify-between items-center mb-8">

            <div>
              <h1 className="text-4xl font-bold">
                Candidate Dashboard
              </h1>

              <p className="text-zinc-400 mt-2">
                Track your application
                status and interviews
              </p>
            </div>

            <button
              className="pro-btn"
              onClick={logout}
            >
              🚪 Logout
            </button>

          </div>

          {/* Profile Card */}

          <div className="card-dark p-8 orange-glow">

            <div className="flex items-center gap-6 mb-8">

              <img
                src="https://i.pravatar.cc/120"
                alt="profile"
                className="w-24 h-24 rounded-full border-4 border-orange-500"
              />

              <div>

                <h2 className="text-3xl font-bold">
                  {profile.name}
                </h2>

                <p className="text-zinc-400">
                  {profile.email}
                </p>

              </div>

            </div>

            {/* Candidate Details */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="card-dark p-5">

                <h3 className="text-lg font-semibold mb-3">
                  Application Status
                </h3>

                <StatusBadge
                  status={
                    profile.status
                  }
                />

              </div>

              <div className="card-dark p-5">

                <h3 className="text-lg font-semibold mb-3">
                  Interview Date
                </h3>

                <p className="text-zinc-400">
                  {profile.interviewDate ||
                    "Not Scheduled"}
                </p>

              </div>

            </div>

            {/* Resume Section */}

            <div className="mt-10">

              <h3 className="text-2xl font-bold mb-5">
                Resume
              </h3>

              {profile.resume ? (

                <div className="mb-6">

                  <a
                    href={`http://localhost:5000/uploads/${profile.resume}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange-500 hover:underline"
                  >
                    📄 View Uploaded Resume
                  </a>

                </div>

              ) : (

                <p className="text-zinc-500 mb-4">
                  No resume uploaded
                </p>

              )}

              <input
                type="file"
                className="input-dark"
                onChange={(e) =>
                  setFile(
                    e.target.files[0]
                  )
                }
              />

              <button
                className="pro-btn mt-4"
                onClick={
                  uploadResume
                }
                disabled={
                  uploading
                }
              >
                {uploading
                  ? "Uploading..."
                  : "📄 Upload Resume"}
              </button>

            </div>

            {/* Timeline */}

            <div className="mt-12">

              <h3 className="text-2xl font-bold mb-5">
                Application Timeline
              </h3>

              <div className="space-y-4">

                <div className="flex items-center gap-3">

                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>

                  <p>
                    Application Submitted
                  </p>

                </div>

                <div className="flex items-center gap-3">

                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>

                  <p>
                    Resume Screening
                  </p>

                </div>

                <div className="flex items-center gap-3">

                  <div className="w-3 h-3 rounded-full bg-green-500"></div>

                  <p>
                    Interview Stage
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CandidateDashboard;