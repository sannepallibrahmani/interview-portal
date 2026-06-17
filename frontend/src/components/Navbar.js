import React, {
  useEffect,
  useRef,
  useState
} from "react";

import {
  FaBell,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaClock
} from "react-icons/fa";

import {
  useNavigate
} from "react-router-dom";

import api from "../services/api";

function Navbar() {
  const navigate =
    useNavigate();

  const role =
    localStorage.getItem(
      "role"
    );

  const [notifications,
    setNotifications] =
    useState([]);

  const [showNotif,
    setShowNotif] =
    useState(false);

  const [showProfile,
    setShowProfile] =
    useState(false);

  const [currentTime,
    setCurrentTime] =
    useState(
      new Date()
    );

  const notifRef =
    useRef(null);

  const profileRef =
    useRef(null);

  // Load notifications initially
  useEffect(() => {
    fetchNotifications();

    // Refresh every 10 seconds
    const interval =
      setInterval(() => {
        fetchNotifications();
      }, 10000);

    return () =>
      clearInterval(
        interval
      );
  }, []);

  // Live clock
  useEffect(() => {
    const timer =
      setInterval(() => {
        setCurrentTime(
          new Date()
        );
      }, 1000);

    return () =>
      clearInterval(
        timer
      );
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(
      event
    ) {
      if (
        notifRef.current &&
        !notifRef.current.contains(
          event.target
        )
      ) {
        setShowNotif(
          false
        );
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target
        )
      ) {
        setShowProfile(
          false
        );
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const fetchNotifications =
    async () => {
      try {
        // Only candidates receive notifications
        if (
          role !==
          "candidate"
        ) {
          return;
        }

        const res =
          await api.get(
            "/candidate/notifications"
          );

        setNotifications(
          res.data
        );
      } catch (
        error
      ) {
        console.log(
          error
        );
      }
    };

  const markAsRead =
    async (id) => {
      try {
        await api.put(
          `/candidate/notifications/${id}`
        );

        fetchNotifications();
      } catch (
        error
      ) {
        console.log(
          error
        );
      }
    };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const unreadCount =
    notifications.filter(
      (n) =>
        !n.isRead
    ).length;

  return (
    <nav className="sticky top-0 z-50 bg-black border-b border-zinc-800 px-8 py-5 flex justify-between items-center">

      {/* Left */}

      <div>

        <h1 className="text-3xl font-bold text-orange-500">
          ATS Portal
        </h1>

        <p className="text-zinc-500 text-sm">
          Smart Hiring Platform
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        {/* Clock */}

        <div className="hidden md:flex items-center gap-2 text-zinc-400">

          <FaClock />

          <span>
            {currentTime.toLocaleTimeString()}
          </span>

        </div>

        {/* Notifications */}

        <div
          className="relative"
          ref={notifRef}
        >

          <button
            onClick={() =>
              setShowNotif(
                !showNotif
              )
            }
            className="relative p-3 rounded-full bg-zinc-900 hover:bg-zinc-800 transition"
          >

            <FaBell
              size={18}
            />

            {unreadCount >
              0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {
                  unreadCount
                }
              </span>
            )}

          </button>

          {showNotif && (
            <div className="absolute right-0 mt-4 w-96 bg-zinc-900 rounded-3xl border border-zinc-700 shadow-2xl p-5 max-h-96 overflow-y-auto">

              <h3 className="text-xl font-bold mb-4">
                Notifications
              </h3>

              {notifications.length ===
              0 ? (
                <p className="text-zinc-500">
                  No notifications available
                </p>
              ) : (
                notifications.map(
                  (
                    notification
                  ) => (
                    <div
                      key={
                        notification._id
                      }
                      onClick={() =>
                        markAsRead(
                          notification._id
                        )
                      }
                      className={`p-4 rounded-2xl mb-3 cursor-pointer transition ${
                        notification.isRead
                          ? "bg-zinc-800"
                          : "bg-orange-500/10 border border-orange-500"
                      }`}
                    >

                      <p className="text-sm">
                        {
                          notification.message
                        }
                      </p>

                      <p className="text-xs text-zinc-500 mt-2">
                        {new Date(
                          notification.createdAt
                        ).toLocaleString()}
                      </p>

                    </div>
                  )
                )
              )}

            </div>
          )}

        </div>

        {/* Profile */}

        <div
          className="relative"
          ref={
            profileRef
          }
        >

          <div
            onClick={() =>
              setShowProfile(
                !showProfile
              )
            }
            className="flex items-center gap-3 cursor-pointer bg-zinc-900 px-3 py-2 rounded-2xl hover:bg-zinc-800 transition"
          >

            <img
              src="https://i.pravatar.cc/100"
              alt="profile"
              className="w-10 h-10 rounded-full border-2 border-orange-500"
            />

            <div className="hidden md:block">

              <p className="font-semibold">

                {role ===
                "candidate"
                  ? "Candidate"
                  : "Recruiter"}

              </p>

              <p className="text-xs text-zinc-500">
                Online
              </p>

            </div>

          </div>

          {showProfile && (
            <div className="absolute right-0 mt-4 w-64 bg-zinc-900 rounded-3xl border border-zinc-700 shadow-2xl p-3">

              <button
                onClick={() =>
                  navigate(
                    "/profile"
                  )
                }
                className="w-full text-left p-4 rounded-2xl hover:bg-zinc-800 flex items-center gap-3"
              >

                <FaUserCircle />

                My Profile

              </button>

              <button
                onClick={() =>
                  navigate(
                    "/settings"
                  )
                }
                className="w-full text-left p-4 rounded-2xl hover:bg-zinc-800 flex items-center gap-3"
              >

                <FaCog />

                Settings

              </button>

              <button
                onClick={
                  logout
                }
                className="w-full text-left p-4 rounded-2xl hover:bg-red-600 flex items-center gap-3"
              >

                <FaSignOutAlt />

                Logout

              </button>

            </div>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;