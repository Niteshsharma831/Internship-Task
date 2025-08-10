import React from "react";
export default function AutoSaveToast({ status }) {
  if (!status) return null;
  return <div className="autosave">{status}</div>;
}
