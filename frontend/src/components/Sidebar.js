import React from "react";

import {
  FaCalendarAlt,
  FaUser,
  FaCog,
  FaChevronRight
} from "react-icons/fa";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const location =
    useLocation();

  const role =
    localStorage.getItem(
      "role"
    );

  const menuItems = [
    {
      title:
        "Interviews",

      icon:
        <FaCalendarAlt />,

      path:
        "/interviews",
    },

    {
      title:
        "Profile",

      icon:
        <FaUser />,

      path:
        "/profile",
    },

    {
      title:
        "Settings",

      icon:
        <FaCog />,

      path:
        "/settings",
    },
  ];

  return (
    <div className="w-72 bg-black border-r border-zinc-800 min-h-screen flex flex-col justify-between">

      {/* Logo */}

      <div>

        <div className="p-8 border-b border-zinc-800">

          <h1 className="text-4xl font-bold text-orange-500">

            ATS

          </h1>

          <p className="text-zinc-500 mt-2 text-sm">

            Applicant Tracking
            System

          </p>

        </div>

        {/* Navigation */}

        <div className="p-5">

          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4">

            Navigation

          </p>

          <div className="space-y-3">

            {menuItems.map(
              (item) => {

                const active =
                  location.pathname ===
                  item.path;

                return (
                  <button
                    key={
                      item.title
                    }

                    onClick={() =>
                      navigate(
                        item.path
                      )
                    }

                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                      active
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20"
                        : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
                    }`}
                  >

                    <div className="flex items-center gap-4">

                      <span className="text-lg">

                        {
                          item.icon
                        }

                      </span>

                      <span className="font-medium">

                        {
                          item.title
                        }

                      </span>

                    </div>

                    <FaChevronRight
                      size={
                        12
                      }
                    />

                  </button>
                );
              }
            )}

          </div>

        </div>

      </div>

      {/* User Card */}

      <div className="p-5 border-t border-zinc-800">

        <div className="bg-zinc-900 rounded-2xl p-3 border border-zinc-800">

          <div className="flex items-center gap-4">

            <img
              src="https://i.pravatar.cc/100"
              alt="profile"
              className="w-12 h-12 rounded-full border-2 border-orange-500"
            />

            <div>

              <h3 className="font-semibold">

                {role ===
                "candidate"
                  ? "Candidate"
                  : "Recruiter"}

              </h3>

              <p className="text-zinc-500 text-sm">

                Active Session

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Sidebar;