import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import clients from "../data/clients.json";
import TalentDetails from "../components/TalentDetailSection";

// Helper to create a new requirement
const createReq = () => ({
  jobTitle: "",
  reqId: "",
  talents: [],
});

function PurchaseOrderForm() {
  const navigate = useNavigate();

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

  const client = clients.find((c) => c.id === form.clientId);

  // --- Handlers ---
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleJobSelect = (reqIndex, title) => {
    const selectedReq = client?.reqs.find((r) => r.title === title);
    const newReqs = [...form.reqs];
    newReqs[reqIndex].jobTitle = title;
    newReqs[reqIndex].reqId = selectedReq?.id || "";
    setForm({ ...form, reqs: newReqs });
  };

  const addReq = () => setForm({ ...form, reqs: [...form.reqs, createReq()] });

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
        overTimeBR: "",
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

    if (!form.receivedFromEmail) e.receivedFromEmail = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.receivedFromEmail))
      e.receivedFromEmail = "Enter a valid email address";

    if (!form.startDate) e.startDate = "Start Date is required";
    if (!form.endDate) e.endDate = "End Date is required";
    if (form.startDate && form.endDate && form.endDate < form.startDate)
      e.endDate = "End Date must be after Start Date";

    if (!form.budget) e.budget = "Budget is required";
    else if (!/^[0-9]{1,5}$/.test(form.budget))
      e.budget = "Budget must be max 5 digits";

    const totalSelected = form.reqs.reduce(
      (sum, r) => sum + r.talents.length,
      0
    );

    if (form.poType === "Individual" && totalSelected !== 1)
      e.talents = "Individual PO requires exactly 1 talent";
    if (form.poType === "Group" && totalSelected < 2)
      e.talents = "Group PO requires at least 2 talents";

    form.reqs.forEach((req, idx) =>
      req.talents.forEach((talent) => {
        if (!talent.duration)
          e[`talent_${idx}_${talent.id}_duration`] = "Duration required";
        if (!talent.rate)
          e[`talent_${idx}_${talent.id}_rate`] = "Bill Rate required";
        if (!talent.standardTimeBR)
          e[`talent_${idx}_${talent.id}_std`] = "Standard Time BR required";
        if (!talent.overTimeBR)
          e[`talent_${idx}_${talent.id}_ot`] = "Overtime BR required";
      })
    );

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const resetForm = () => {
    setForm(initialFormState);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/saved", { state: { formData: form } });
    }
  };

  return (
    <div className="container-fluid mt-4">
      <h2 className="mb-4 text-center text-md-start">Purchase Order | New</h2>
      <form className="card p-3 p-md-4 shadow-sm" onSubmit={handleSubmit}>
        {/* Top Section */}
        <div className="row g-3">
          {/** Client */}
          <div className="col-12 col-sm-6 col-md-3">
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

          {/** PO Type */}
          <div className="col-12 col-sm-6 col-md-3">
            <label className="form-label">PO Type *</label>
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

          {/** PO Number */}
          <div className="col-12 col-sm-6 col-md-3">
            <label className="form-label">PO Number *</label>
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

          {/** Received On */}
          <div className="col-12 col-sm-6 col-md-3">
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

        {/* Other Fields */}
        <div className="row g-3 mt-3">
          <div className="col-12 col-sm-6 col-md-3">
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

          <div className="col-12 col-sm-6 col-md-3">
            <label className="form-label">Received From Email *</label>
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

          <div className="col-12 col-sm-6 col-md-3">
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

          <div className="col-12 col-sm-6 col-md-3">
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

          {/** Budget */}
          <div className="col-12 col-sm-6 col-md-3 mt-3">
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

        {/* Talent Details */}
        <TalentDetails
          reqs={form.reqs}
          client={client}
          handleJobSelect={handleJobSelect}
          handleTalentToggle={handleTalentToggle}
          handleTalentField={handleTalentField}
          addReq={addReq}
          removeReq={removeReq}
          errors={errors}
          poType={form.poType}
        />

        {/* Buttons */}
        <div className="mt-4 d-flex flex-column flex-md-row justify-content-end gap-2">
          <button type="button" className="btn btn-light" onClick={resetForm}>
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

export default PurchaseOrderForm;
