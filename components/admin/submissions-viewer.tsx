"use client";

import { Card, CardHeader, CardTitle } from "../ui/card";
import Badge from "../ui/badge";

type SubmissionsData = {
  enquiries: Array<{
    id?: string;
    name?: string;
    email?: string;
    company?: string;
    service?: string;
    budget?: string;
    message?: string;
    createdAt?: string;
  }>;
  subscribers: Array<{
    id?: string;
    email?: string;
    createdAt?: string;
  }>;
};

export default function SubmissionsViewer({
  submissions,
}: {
  submissions: SubmissionsData;
}) {
  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>Client Inquiries & Newsletter Subscribers</h1>
          <p>Real-time inbox of submitted project requests and audience subscriptions.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Project Inquiries <Badge variant="purple">{submissions.enquiries.length}</Badge>
          </CardTitle>
        </CardHeader>
        {submissions.enquiries.length === 0 ? (
          <p style={{ color: "#64748b", fontSize: "13px" }}>
            No client project enquiries received yet.
          </p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Client</th>
                  <th>Email</th>
                  <th>Service</th>
                  <th>Company</th>
                  <th>Budget</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {submissions.enquiries.map((enq, idx) => (
                  <tr key={enq.id || idx}>
                    <td style={{ whiteSpace: "nowrap" }}>
                      {enq.createdAt
                        ? new Date(enq.createdAt).toLocaleDateString()
                        : "Recent"}
                    </td>
                    <td>
                      <strong>{enq.name || "N/A"}</strong>
                    </td>
                    <td>
                      <a
                        href={`mailto:${enq.email}`}
                        style={{ color: "#a855f7" }}
                      >
                        {enq.email}
                      </a>
                    </td>
                    <td>{enq.service || "General"}</td>
                    <td>{enq.company || "—"}</td>
                    <td>{enq.budget || "—"}</td>
                    <td style={{ maxWidth: "300px" }}>{enq.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Newsletter Subscribers <Badge variant="default">{submissions.subscribers.length}</Badge>
          </CardTitle>
        </CardHeader>
        {submissions.subscribers.length === 0 ? (
          <p style={{ color: "#64748b", fontSize: "13px" }}>
            No newsletter subscribers yet.
          </p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Email Address</th>
                  <th>Subscribed Date</th>
                </tr>
              </thead>
              <tbody>
                {submissions.subscribers.map((sub, idx) => (
                  <tr key={sub.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{sub.email}</td>
                    <td>
                      {sub.createdAt
                        ? new Date(sub.createdAt).toLocaleDateString()
                        : "Recent"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
