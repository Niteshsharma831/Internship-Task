import React, { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/sessions")
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
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-blue-600">Public Sessions</h2>
        <p className="text-gray-500 mt-2">
          Explore all public sessions shared by the community
        </p>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center text-gray-500 py-10">
          Loading sessions...
        </div>
      ) : sessions.length === 0 ? (
        <div className="text-center text-gray-500 bg-gray-100 p-8 rounded-lg shadow">
          No public sessions available at the moment.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((s) => (
            <div
              key={s._id}
              className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-xl hover:scale-[1.02] transform transition-all duration-300 p-5 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {s.title || "Untitled Session"}
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {s.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs font-medium border border-blue-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-gray-500 text-sm">
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      s.status === "published"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {s.status}
                  </span>
                </p>
              </div>
              <button className="mt-4 w-full bg-blue-500 text-white text-sm font-semibold py-2 rounded-lg hover:bg-blue-600 transition">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
