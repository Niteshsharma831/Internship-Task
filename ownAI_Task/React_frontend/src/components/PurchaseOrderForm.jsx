import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import clients from "../data/clients.json";

// Function to create an empty REQ block
const createReq = () => ({
  jobTitle: "",
  reqId: "",
  talents: [],
});

export default function PurchaseOrderForm() {
  const navigate = useNavigate();

  // Define the initial state for the form so we can easily reset to it
  const initialFormState = {
    clientId: "",
    poType: "",
    poNumber: "",
    receivedOn: "",
    receivedFrom: "",
    receivedFromEmail: "",
    startDate: "",
    endDate: "",
    budget: "",
    currency: "USD",
    reqs: [createReq()],
  };

  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  // --- Handlers ---
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReqChange = (index, field, value) => {
    const newReqs = [...form.reqs];
    newReqs[index][field] = value;
    setForm({ ...form, reqs: newReqs });
  };

  const addReq = () => {
    setForm({ ...form, reqs: [...form.reqs, createReq()] });
  };

  const removeReq = (index) => {
    const newReqs = form.reqs.filter((_, i) => i !== index);
    setForm({ ...form, reqs: newReqs.length ? newReqs : [createReq()] });
  };

  const handleTalentToggle = (reqIndex, talent) => {
    const newReqs = [...form.reqs];
    const exists = newReqs[reqIndex].talents.find((t) => t.id === talent.id);
    if (exists) {
      newReqs[reqIndex].talents = newReqs[reqIndex].talents.filter(
        (t) => t.id !== talent.id
      );
    } else {
      newReqs[reqIndex].talents.push({
        ...talent,
        duration: "",
        rate: "",
        currency: "USD",
        standardTimeBR: "",
        standardTimeBR_currency: "USD",
        overTimeBR: "",
        overTimeBR_currency: "USD",
      });
    }
    setForm({ ...form, reqs: newReqs });
  };

  const handleTalentField = (reqIndex, talentId, field, value) => {
    const newReqs = [...form.reqs];
    newReqs[reqIndex].talents = newReqs[reqIndex].talents.map((t) =>
      t.id === talentId ? { ...t, [field]: value } : t
    );
    setForm({ ...form, reqs: newReqs });
  };

  // --- Validation ---
  const validate = () => {
    const e = {};
    if (!form.clientId) e.clientId = "Client is required";
    if (!form.poType) e.poType = "PO Type is required";
    if (!form.poNumber) e.poNumber = "PO Number is required";
    if (!form.receivedOn) e.receivedOn = "Received On is required";
    if (!form.receivedFrom) e.receivedFrom = "Received From is required";
    if (!form.receivedFromEmail)
      e.receivedFromEmail = "Received From Email is required";
    if (!form.startDate) e.startDate = "Start Date is required";
    if (!form.endDate) e.endDate = "End Date is required";
    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      e.endDate = "End Date must be after Start Date";
    }
    if (!form.budget) e.budget = "Budget is required";
    else if (!/^[0-9]{1,5}$/.test(form.budget)) {
      e.budget = "Budget must be max 5 digits";
    }

    const totalSelected = form.reqs.reduce(
      (sum, r) => sum + r.talents.length,
      0
    );
    if (form.poType === "Individual" && totalSelected !== 1) {
      e.talents = "Individual PO requires exactly 1 talent";
    }
    if (form.poType === "Group" && totalSelected < 2) {
      e.talents = "Group PO requires at least 2 talents";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // --- Reset Function ---
  const resetForm = () => {
    setForm(initialFormState);
    setErrors({});
  };

  // --- Submit ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/saved", { state: { formData: form } });
    }
  };

  // A better way is to find the selected client first.
  const client = clients.find((c) => c.id === form.clientId);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Purchase Order | New</h2>
      <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
        {/* PO Top Section */}
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label">Client Name *</label>
            <select
              className="form-select"
              name="clientId"
              value={form.clientId}
              onChange={handleChange}
            >
              <option value="">Select Client</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.clientId && (
              <div className="text-danger small">{errors.clientId}</div>
            )}
          </div>
          <div className="col-md-3">
            <label className="form-label">Purchase Order Type *</label>
            <select
              className="form-select"
              name="poType"
              value={form.poType}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Group">Group PO</option>
              <option value="Individual">Individual PO</option>
            </select>
            {errors.poType && (
              <div className="text-danger small">{errors.poType}</div>
            )}
          </div>
          <div className="col-md-3">
            <label className="form-label">Purchase Order No *</label>
            <input
              className="form-control"
              name="poNumber"
              value={form.poNumber}
              onChange={handleChange}
            />
            {errors.poNumber && (
              <div className="text-danger small">{errors.poNumber}</div>
            )}
          </div>
          <div className="col-md-3">
            <label className="form-label">Received On *</label>
            <input
              type="date"
              className="form-control"
              name="receivedOn"
              value={form.receivedOn}
              onChange={handleChange}
            />
            {errors.receivedOn && (
              <div className="text-danger small">{errors.receivedOn}</div>
            )}
          </div>
        </div>
        <div className="row g-3 mt-3">
          <div className="col-md-3">
            <label className="form-label">Received From *</label>
            <input
              className="form-control"
              name="receivedFrom"
              value={form.receivedFrom}
              onChange={handleChange}
            />
            {errors.receivedFrom && (
              <div className="text-danger small">{errors.receivedFrom}</div>
            )}
          </div>
          <div className="col-md-3">
            <label className="form-label">Received From Email ID *</label>
            <input
              type="email"
              className="form-control"
              name="receivedFromEmail"
              value={form.receivedFromEmail}
              onChange={handleChange}
            />
            {errors.receivedFromEmail && (
              <div className="text-danger small">
                {errors.receivedFromEmail}
              </div>
            )}
          </div>
          <div className="col-md-3">
            <label className="form-label">PO Start Date *</label>
            <input
              type="date"
              className="form-control"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
            />
            {errors.startDate && (
              <div className="text-danger small">{errors.startDate}</div>
            )}
          </div>
          <div className="col-md-3">
            <label className="form-label">PO End Date *</label>
            <input
              type="date"
              className="form-control"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
            />
            {errors.endDate && (
              <div className="text-danger small">{errors.endDate}</div>
            )}
          </div>
          <div className="col-md-3">
            <label className="form-label">Budget *</label>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                name="budget"
                value={form.budget}
                onChange={handleChange}
              />
              <select
                className="form-select"
                name="currency"
                value={form.currency}
                onChange={handleChange}
              >
                <option value="USD">USD</option>
                <option value="INR">INR</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
            {errors.budget && (
              <div className="text-danger small">{errors.budget}</div>
            )}
          </div>
        </div>
        {/* REQ Section */}
        <div className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6>Talent Detail</h6>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={addReq}
            >
              + Add Another
            </button>
          </div>
          {form.reqs.map((req, i) => {
            // Find the correct REQ from the selected client
            const matchedReq = client?.reqs.find(
              (r) => r.title === req.jobTitle
            );
            return (
              <div key={i} className="card p-3 mt-3 border">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Job Title/REQ Name *</label>
                    <select
                      className="form-select"
                      value={req.jobTitle}
                      onChange={(e) =>
                        handleReqChange(i, "jobTitle", e.target.value)
                      }
                    >
                      <option value="">Select Job</option>
                      {/* Populate options from the selected client's reqs */}
                      {client?.reqs.map((r) => (
                        <option key={r.id} value={r.title}>
                          {r.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 d-flex align-items-end">
                    <div className="w-100">
                      <label className="form-label">Job ID/REQ ID *</label>
                      <input
                        className="form-control"
                        value={req.reqId}
                        onChange={(e) =>
                          handleReqChange(i, "reqId", e.target.value)
                        }
                      />
                    </div>
                    {form.reqs.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-light ms-2 text-danger"
                        onClick={() => removeReq(i)}
                        aria-label="Remove REQ"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    )}
                  </div>
                </div>
                {/* Talents */}
                <div className="mt-3">
                  {matchedReq?.talents.map((talent) => {
                    const selected = req.talents.find(
                      (t) => t.id === talent.id
                    );
                    return (
                      <div key={talent.id} className="border rounded p-3 mb-2">
                        <div className="form-check mb-2">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={!!selected}
                            onChange={() => handleTalentToggle(i, talent)}
                          />
                          <label className="form-check-label">
                            <strong>{talent.name}</strong>
                          </label>
                        </div>
                        {selected && (
                          <div className="row g-2">
                            <div className="col-md-2">
                              <label className="form-label">
                                Contract Duration
                              </label>
                              <div className="input-group">
                                <input
                                  className="form-control"
                                  placeholder="Duration"
                                  value={selected.duration}
                                  onChange={(e) =>
                                    handleTalentField(
                                      i,
                                      talent.id,
                                      "duration",
                                      e.target.value
                                    )
                                  }
                                />
                                <span className="input-group-text">Months</span>
                              </div>
                            </div>
                            <div className="col-md-2">
                              <label className="form-label">Bill Rate</label>
                              <div className="input-group">
                                <input
                                  className="form-control"
                                  placeholder="Bill Rate"
                                  value={selected.rate}
                                  onChange={(e) =>
                                    handleTalentField(
                                      i,
                                      talent.id,
                                      "rate",
                                      e.target.value
                                    )
                                  }
                                />
                                <span className="input-group-text">/hr</span>
                              </div>
                            </div>
                            <div className="col-md-2">
                              <label className="form-label">Currency</label>
                              <select
                                className="form-select"
                                value={selected.currency}
                                onChange={(e) =>
                                  handleTalentField(
                                    i,
                                    talent.id,
                                    "currency",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="USD">USD</option>
                                <option value="INR">INR</option>
                                <option value="EUR">EUR</option>
                              </select>
                            </div>
                            <div className="col-md-2">
                              <label className="form-label">
                                Standard Time BR
                              </label>
                              <div className="input-group">
                                <input
                                  className="form-control"
                                  placeholder="Std. Time BR"
                                  value={selected.standardTimeBR}
                                  onChange={(e) =>
                                    handleTalentField(
                                      i,
                                      talent.id,
                                      "standardTimeBR",
                                      e.target.value
                                    )
                                  }
                                />
                                <span className="input-group-text">/hr</span>
                              </div>
                            </div>
                            <div className="col-md-2">
                              <label className="form-label">Currency</label>
                              <select
                                className="form-select"
                                value={selected.standardTimeBR_currency}
                                onChange={(e) =>
                                  handleTalentField(
                                    i,
                                    talent.id,
                                    "standardTimeBR_currency",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="USD">USD</option>
                                <option value="INR">INR</option>
                                <option value="EUR">EUR</option>
                              </select>
                            </div>
                            <div className="col-md-2">
                              <label className="form-label">Over Time BR</label>
                              <div className="input-group">
                                <input
                                  className="form-control"
                                  placeholder="Over Time BR"
                                  value={selected.overTimeBR}
                                  onChange={(e) =>
                                    handleTalentField(
                                      i,
                                      talent.id,
                                      "overTimeBR",
                                      e.target.value
                                    )
                                  }
                                />
                                <span className="input-group-text">/hr</span>
                              </div>
                            </div>
                            <div className="col-md-2">
                              <label className="form-label">Currency</label>
                              <select
                                className="form-select"
                                value={selected.overTimeBR_currency}
                                onChange={(e) =>
                                  handleTalentField(
                                    i,
                                    talent.id,
                                    "overTimeBR_currency",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="USD">USD</option>
                                <option value="INR">INR</option>
                                <option value="EUR">EUR</option>
                              </select>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          {errors.talents && (
            <div className="text-danger small mt-2">{errors.talents}</div>
          )}
        </div>
        {/* Actions */}
        <div className="mt-4 d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={resetForm}
          >
            Reset
          </button>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
