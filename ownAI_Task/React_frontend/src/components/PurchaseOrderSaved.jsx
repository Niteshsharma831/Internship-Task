import React from "react";
import { useLocation, Link } from "react-router-dom";

const PurchaseOrderSaved = () => {
  const location = useLocation();
  const { formData } = location.state || {};

  if (!formData) {
    return (
      <div className="container mt-5 d-flex justify-content-center">
        <div className="card p-4 shadow-sm text-center w-100 w-md-50">
          <h5 className="text-danger">Error: No data found.</h5>
          <p>Please go back and save a purchase order.</p>
          <Link to="/" className="btn btn-primary">
            Go to Form
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h5 className="text-success mb-4 text-center">
          ✅ Purchase Order Saved Successfully!
        </h5>

        {/* PO Details */}
        <div className="row row-cols-1 row-cols-md-2 g-3 mb-4">
          <div className="col">
            <p>
              <strong>Client ID:</strong> {formData.clientId}
            </p>
          </div>
          <div className="col">
            <p>
              <strong>PO Type:</strong> {formData.poType}
            </p>
          </div>
          <div className="col">
            <p>
              <strong>PO Number:</strong> {formData.poNumber}
            </p>
          </div>
          <div className="col">
            <p>
              <strong>Received On:</strong> {formData.receivedOn}
            </p>
          </div>
          <div className="col">
            <p>
              <strong>Received From:</strong> {formData.receivedFrom} (
              {formData.receivedFromEmail})
            </p>
          </div>
          <div className="col">
            <p>
              <strong>Dates:</strong> {formData.startDate} → {formData.endDate}
            </p>
          </div>
          <div className="col">
            <p>
              <strong>Budget:</strong> {formData.budget} {formData.currency}
            </p>
          </div>
        </div>

        {/* Talent Details */}
        <h6 className="mb-3">Talent Details</h6>
        <div className="row row-cols-1 row-cols-md-2 g-3">
          {formData.reqs.map((req, i) => (
            <div key={i} className="col">
              <div className="card p-3 bg-light h-100">
                <p>
                  <strong>Job Title:</strong> {req.jobTitle}
                </p>
                <p>
                  <strong>REQ ID:</strong> {req.reqId}
                </p>

                {req.talents.length > 0 && (
                  <ul className="list-group list-group-flush">
                    {req.talents.map((t) => (
                      <li key={t.id} className="list-group-item bg-light">
                        <p className="mb-0">
                          <strong>Name:</strong> {t.name}
                        </p>
                        <p className="mb-0">
                          <strong>Bill Rate:</strong> {t.rate} {t.currency}/hr
                        </p>
                        <p className="mb-0">
                          <strong>Contract Duration:</strong> {t.duration}{" "}
                          months
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
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
