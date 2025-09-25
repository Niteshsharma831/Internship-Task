import React from "react";

function TalentDetails({
  reqs,
  client,
  handleJobSelect,
  handleTalentToggle,
  handleTalentField,
  addReq,
  removeReq,
  errors,
  poType,
  currencies = ["USD", "INR", "EUR"],
}) {
  return (
    <div className="mt-4">
      {/* Section Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-2 gap-2">
        <h6 className="mb-2 mb-md-0">Talent Detail</h6>
        {poType && (
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={addReq}
          >
            + Add Another
          </button>
        )}
      </div>

      {/* Loop through each requirement */}
      {reqs.map((req, i) => {
        const matchedReq = client?.reqs.find((r) => r.title === req.jobTitle);

        return (
          <div key={i} className="card p-3 mt-3 border">
            <div className="row g-3">
              {/* Job Title Dropdown */}
              <div className="col-12 col-md-6">
                <label className="form-label">Job Title/REQ Name *</label>
                <select
                  className="form-select"
                  value={req.jobTitle}
                  onChange={(e) => handleJobSelect(i, e.target.value)}
                >
                  <option value="">Select Job</option>
                  {client?.reqs.map((r) => (
                    <option key={r.id} value={r.title}>
                      {r.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Job ID Field */}
              <div className="col-12 col-md-6 d-flex align-items-end flex-wrap gap-2">
                <div className="flex-grow-1">
                  <label className="form-label">Job ID/REQ ID *</label>
                  <input className="form-control" value={req.reqId} readOnly />
                </div>
                {reqs.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-light text-danger align-self-end"
                    onClick={() => removeReq(i)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                )}
              </div>
            </div>

            {/* Talent List */}
            <div className="mt-3">
              {matchedReq?.talents.map((talent) => {
                const selected = req.talents.find((t) => t.id === talent.id);
                return (
                  <div key={talent.id} className="card p-3 mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={!!selected}
                        onChange={() => handleTalentToggle(i, talent)}
                      />
                      <label className="form-check-label fw-bold">
                        {talent.name}
                      </label>
                    </div>

                    {selected && (
                      <div className="row g-2 mt-2">
                        {/* Contract Duration */}
                        <div className="col-12 col-sm-6 col-md-2">
                          <label className="form-label">
                            Contract Duration
                          </label>
                          <div className="input-group">
                            <input
                              type="number"
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
                          {errors[`talent_${i}_${talent.id}_duration`] && (
                            <div className="text-danger small">
                              {errors[`talent_${i}_${talent.id}_duration`]}
                            </div>
                          )}
                        </div>

                        {/* Standard Time BR */}
                        <div className="col-12 col-sm-6 col-md-2">
                          <label className="form-label">Standard Time BR</label>
                          <div className="input-group">
                            <input
                              type="number"
                              className="form-control"
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
                          {errors[`talent_${i}_${talent.id}_std`] && (
                            <div className="text-danger small">
                              {errors[`talent_${i}_${talent.id}_std`]}
                            </div>
                          )}
                        </div>

                        {/* Over Time BR */}
                        <div className="col-12 col-sm-6 col-md-2">
                          <label className="form-label">Over Time BR</label>
                          <div className="input-group">
                            <input
                              type="number"
                              className="form-control"
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
                          {errors[`talent_${i}_${talent.id}_ot`] && (
                            <div className="text-danger small">
                              {errors[`talent_${i}_${talent.id}_ot`]}
                            </div>
                          )}
                        </div>

                        {/* Bill Rate */}
                        <div className="col-12 col-sm-6 col-md-2">
                          <label className="form-label">Bill Rate</label>
                          <div className="input-group">
                            <input
                              type="number"
                              className="form-control"
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
                          {errors[`talent_${i}_${talent.id}_rate`] && (
                            <div className="text-danger small">
                              {errors[`talent_${i}_${talent.id}_rate`]}
                            </div>
                          )}
                        </div>

                        {/* Currency */}
                        <div className="col-12 col-sm-6 col-md-2">
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
                            {currencies.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
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
  );
}

export default TalentDetails;
