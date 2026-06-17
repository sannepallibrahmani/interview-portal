import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import StatusBadge from "../components/StatusBadge";
import LoadingSpinner from "../components/LoadingSpinner";
import InterviewScheduler from "../components/InterviewScheduler";

function RecruiterDashboard() {
  const navigate = useNavigate();

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] =
    useState(null);

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        "/recruiter/candidates"
      );

      setCandidates(res.data);
    } catch (error) {
      console.log(error);
      alert(
        "Failed to load candidates"
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      await api.put(
        `/recruiter/status/${id}`,
        {
          status
        }
      );

      loadCandidates();
    } catch (error) {
      console.log(error);
      alert(
        "Status update failed"
      );
    }
  };

  const openScheduleModal = (
    id
  ) => {
    setSelectedCandidateId(id);
    setModalOpen(true);
  };

  const saveInterview = async (
    date
  ) => {
    try {
      await api.put(
        `/recruiter/status/${selectedCandidateId}`,
        {
          status:
            "Interview Scheduled",
          interviewDate:
            date
        }
      );

      setModalOpen(false);

      loadCandidates();
    } catch (error) {
      console.log(error);
      alert(
        "Interview scheduling failed"
      );
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const totalCount =
    candidates.length;

  const selectedCount =
    candidates.filter(
      (c) =>
        c.status ===
        "Selected"
    ).length;

  const rejectedCount =
    candidates.filter(
      (c) =>
        c.status ===
        "Rejected"
    ).length;

  const interviewCount =
    candidates.filter(
      (c) =>
        c.status ===
        "Interview Scheduled"
    ).length;

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
                Recruiter Dashboard
              </h1>

              <p className="text-zinc-400 mt-2">
                Manage candidates and interviews
              </p>
            </div>

            <button
              className="pro-btn"
              onClick={logout}
            >
              🚪 Logout
            </button>

          </div>

          {/* Statistics */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

            <StatsCard
              title="Total Candidates"
              value={totalCount}
            />

            <StatsCard
              title="Selected"
              value={selectedCount}
            />

            <StatsCard
              title="Rejected"
              value={rejectedCount}
            />

            <StatsCard
              title="Interviews"
              value={interviewCount}
            />

          </div>

          {/* Search */}

          <div className="card-dark p-5 mb-8">

            <input
              type="text"
              placeholder="Search candidates..."
              className="input-dark"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

          {/* Table */}

          <div className="card-dark p-6 overflow-x-auto">

            <table className="w-full table-fixed">

            <thead>
  <tr className="border-b border-zinc-700">
    <th className="w-[18%] p-4 text-left">Name</th>
    <th className="w-[22%] p-4 text-left">Email</th>
    <th className="w-[15%] p-4 text-left">Status</th>
    <th className="w-[18%] p-4 text-left">Interview</th>
    <th className="w-[12%] p-4 text-left">Resume</th>
    <th className="w-[15%] p-4 text-left">Actions</th>
  </tr>
</thead>

              <tbody>

                {candidates
                  .filter((candidate) =>
                    candidate.name
                      ?.toLowerCase()
                      .includes(
                        search.toLowerCase()
                      )
                  )
                  .map((candidate) => (

                    <tr
                      key={
                        candidate._id
                      }
                      className="border-b border-zinc-800 hover:bg-zinc-900 transition"
                    >

                      <td className="p-4">
                        {candidate.name}
                      </td>

                      <td className="p-4">
                        {candidate.email}
                      </td>

                      <td className="p-4">
                        <StatusBadge
                          status={
                            candidate.status
                          }
                        />
                      </td>

                    <td className="p-4 text-zinc-400">
                    {candidate.interviewDate
                    ? new Date(
                     candidate.interviewDate
                      ).toLocaleString()
                       : "-"}
                      </td>

                      <td className="p-4">

                        {candidate.resume ? (
                          <a
                            href={`http://localhost:5000/uploads/${candidate.resume}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-orange-500 hover:underline"
                          >
                            View Resume
                          </a>
                        ) : (
                          <span className="text-zinc-500">
                            No Resume
                          </span>
                        )}

                      </td>

                      <td className="p-4">

                        <div className="flex flex-wrap gap-2">

                          <button
                            className="pro-btn action-btn"
                            onClick={() =>
                              openScheduleModal(
                                candidate._id
                              )
                            }
                          >
                            📅 Schedule
                          </button>

                          <button
                           className="pro-btn action-btn"
                            onClick={() =>
                              updateStatus(
                                candidate._id,
                                "Selected"
                              )
                            }
                          >
                            ✓ Select
                          </button>

                          <button
                            className="pro-btn action-btn"
                            onClick={() =>
                              updateStatus(
                                candidate._id,
                                "Rejected"
                              )
                            }
                          >
                            ✕ Reject
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

     <InterviewScheduler
  isOpen={modalOpen}
  onClose={() =>
    setModalOpen(false)
  }
  candidateId={
    selectedCandidateId
  }
  onSuccess={
    loadCandidates
  }
/>

    </div>
  );
}

export default RecruiterDashboard;