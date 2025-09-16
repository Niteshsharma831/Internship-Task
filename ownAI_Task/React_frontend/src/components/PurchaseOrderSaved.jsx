import React from "react";
import { useLocation, Link } from "react-router-dom";

const PurchaseOrderSaved = () => {
  const location = useLocation();
  const { formData } = location.state || {};

  if (!formData) {
    return (
      <div className="card p-4 shadow-sm text-center">
        <h5 className="text-danger">Error: No data found.</h5>
        <p>Please go back and save a purchase order.</p>
        <Link to="/" className="btn btn-primary">
          Go to Form
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h5 className="text-success mb-4">
          ✅ Purchase Order Saved Successfully!
        </h5>
        <div className="mb-3">
          <p>
            <strong>Client ID:</strong> {formData.clientId}
          </p>
          <p>
            <strong>PO Type:</strong> {formData.poType}
          </p>
          <p>
            <strong>PO Number:</strong> {formData.poNumber}
          </p>
          <p>
            <strong>Received On:</strong> {formData.receivedOn}
          </p>
          <p>
            <strong>Received From:</strong> {formData.receivedFrom} (
            {formData.receivedFromEmail})
          </p>
          <p>
            <strong>Dates:</strong> {formData.startDate} &rarr;{" "}
            {formData.endDate}
          </p>
          <p>
            <strong>Budget:</strong> {formData.budget} {formData.currency}
          </p>
        </div>
        <h6>Talent Details</h6>
        <div className="row g-3">
          {formData.reqs.map((r, i) => (
            <div key={i} className="col-md-6 mb-3">
              <div className="card bg-light p-3">
                <p className="mb-1">
                  <strong>Job Title:</strong> {r.jobTitle}
                </p>
                <p className="mb-2">
                  <strong>REQ ID:</strong> {r.reqId}
                </p>
                <h6>Talents</h6>
                <ul className="list-group list-group-flush">
                  {r.talents.map((t) => (
                    <li key={t.id} className="list-group-item bg-light">
                      <p className="mb-0">
                        <strong>Name:</strong> {t.name}
                      </p>
                      <p className="mb-0">
                        <strong>Bill Rate:</strong> {t.rate} {t.currency}/hr
                      </p>
                      <p className="mb-0">
                        <strong>Contract Duration:</strong> {t.duration} months
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link to="/" className="btn btn-secondary">
            Go Back to Form
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderSaved;
