import React, {
  useEffect,
  useState
} from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import LoadingSpinner from "../components/LoadingSpinner";
import StatusBadge from "../components/StatusBadge";
import api from "../services/api";

function Interviews() {
  const role =
    localStorage.getItem(
      "role"
    );

  const [loading,
    setLoading] =
    useState(true);

  const [interviews,
    setInterviews] =
    useState([]);

  useEffect(() => {
    loadInterviews();
  }, []);

  const loadInterviews =
    async () => {
      try {
        setLoading(true);

        if (
          role ===
          "candidate"
        ) {
          const res =
            await api.get(
              "/candidate/profile"
            );

          if (
            res.data
              .interviewDate
          ) {
            setInterviews([
              res.data,
            ]);
          }
        } else {
          const res =
            await api.get(
              "/recruiter/candidates"
            );

          const filtered =
            res.data.filter(
              (
                candidate
              ) =>
                candidate.interviewDate
            );

          setInterviews(
            filtered
          );
        }
      } catch (error) {
        console.log(
          error
        );
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <div className="flex bg-[#050505] text-white min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <div className="mb-8">

            <h1 className="text-4xl font-bold">

              Interviews

            </h1>

            <p className="text-zinc-400 mt-2">

              {role ===
              "candidate"
                ? "Track your interview schedule"
                : "Manage scheduled interviews"}

            </p>

          </div>

          {interviews
            .length ===
          0 ? (
            <div className="card-dark p-10 text-center">

              <h2 className="text-2xl font-semibold">

                No Interviews Scheduled

              </h2>

              <p className="text-zinc-500 mt-3">

                Interviews will appear here.

              </p>

            </div>
          ) : (
            <div className="grid gap-6">

              {interviews.map(
                (
                  interview
                ) => (
                  <div
                    key={
                      interview._id
                    }
                    className="card-dark p-6 hover:border hover:border-orange-500 transition-all duration-300"
                  >

                    <div className="flex justify-between items-start">

                      <div>

                        <h2 className="text-2xl font-bold">

                          {role ===
                          "candidate"
                            ? "Your Interview"
                            : interview.name}

                        </h2>

                        {role ===
                          "recruiter" && (
                          <p className="text-zinc-400 mt-1">

                            {
                              interview.email
                            }

                          </p>
                        )}

                      </div>

                      <StatusBadge
                        status={
                          interview.status
                        }
                      />

                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                      <div className="bg-zinc-900 rounded-2xl p-5">

                        <h3 className="text-zinc-400 mb-2">

                          Interview Date & Time

                        </h3>

                        <p className="text-xl font-semibold text-orange-500">

                          {new Date(
                            interview.interviewDate
                          ).toLocaleString()}

                        </p>

                      </div>

                      <div className="bg-zinc-900 rounded-2xl p-5">

                        <h3 className="text-zinc-400 mb-2">

                          Current Status

                        </h3>

                        <StatusBadge
                          status={
                            interview.status
                          }
                        />

                      </div>

                    </div>

                    {role ===
                      "candidate" && (
                      <div className="mt-6 bg-orange-500/10 border border-orange-500 rounded-2xl p-4">

                        <p className="text-sm">

                          Please join your interview on time. Keep your resume and required documents ready.

                        </p>

                      </div>
                    )}

                  </div>
                )
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Interviews;