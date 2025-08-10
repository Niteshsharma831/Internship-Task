import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import AutoSaveToast from "../components/AutoSaveToast";

export default function SessionEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [jsonUrl, setJsonUrl] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const saveTimeout = useRef(null);
  const lastSavedId = useRef(id || null);

  // Fetch session data if editing
  useEffect(() => {
    if (id) {
      API.get(`/my-sessions/${id}`)
        .then((r) => {
          setTitle(r.data.title || "");
          setTags((r.data.tags || []).join(", "));
          setJsonUrl(r.data.json_file_url || "");
        })
        .catch(() => {});
    }
  }, [id]);

  // Auto-save after 5s inactivity
  useEffect(() => {
    setStatusMsg("");
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      handleSaveDraft();
    }, 5000);
    return () => clearTimeout(saveTimeout.current);
  }, [title, tags, jsonUrl]);

  const handleSaveDraft = async () => {
    try {
      setStatusMsg("Saving...");
      const payload = {
        id: lastSavedId.current,
        title,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        json_file_url: jsonUrl,
      };
      const res = await API.post("/my-sessions/save-draft", payload);
      lastSavedId.current = res.data._id;
      setStatusMsg("Draft saved");
      setTimeout(() => setStatusMsg(""), 2000);
    } catch {
      setStatusMsg("Auto-save failed");
    }
  };

  const handlePublish = async () => {
    try {
      const payload = {
        id: lastSavedId.current,
        title,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        json_file_url: jsonUrl,
      };
      await API.post("/my-sessions/publish", payload);
      alert("✅ Published successfully!");
      navigate("/my-sessions");
    } catch {
      alert("❌ Publish failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Sticky Save Status */}
      {statusMsg && (
        <div className="fixed top-4 right-4 bg-white shadow-lg px-4 py-2 rounded-lg border text-sm text-gray-700">
          {statusMsg}
        </div>
      )}

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {id ? "Edit Session" : "Create New Session"}
        </h2>

        <AutoSaveToast status={statusMsg} />

        <div className="space-y-5">
          <input
            type="text"
            placeholder="Session Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <input
            type="url"
            placeholder="JSON File URL (optional)"
            value={jsonUrl}
            onChange={(e) => setJsonUrl(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={handleSaveDraft}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-3 rounded-lg font-medium transition"
            >
              Save Draft
            </button>
            <button
              onClick={handlePublish}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-medium transition"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
