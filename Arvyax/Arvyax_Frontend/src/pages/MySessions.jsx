import React, { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function MySessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/my-sessions")
      .then((r) => {
        if (Array.isArray(r.data)) {
          setSessions(r.data);
        } else {
          setSessions([]);
        }
      })
      .catch(() => setSessions([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">My Sessions</h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage and edit your created sessions here.
          </p>
        </div>
        <Link
          to="/editor"
          className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          + New Session
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : sessions.length === 0 ? (
        <div className="text-center text-gray-500 bg-gray-100 p-8 rounded-lg shadow">
          No sessions available.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sessions.map((s) => (
            <Link
              key={s._id}
              to={`/editor/${s._id}`}
              className="border rounded-lg p-5 bg-white hover:shadow-xl hover:scale-[1.02] transform transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {s.title || "(untitled)"}
              </h3>
              <span
                className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                  s.status === "published"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                }`}
              >
                {s.status}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
