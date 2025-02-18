import React, { useContext, useEffect } from "react";
import { AppContext } from "../context-api/AppContext";

export default function Request() {
  const { myRequests, getMyRequests, requestsByOthers, getRequestsByOthers } =
    useContext(AppContext);

  useEffect(() => {
    getMyRequests();
    getRequestsByOthers();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* My Requests Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">My Requests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">No</th>
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Approvers</th>
                <th className="p-3 border">Step</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {myRequests && myRequests.length > 0 ? (
                myRequests.map((request, index) => (
                  <tr key={index} className="text-center border">
                    <td className="p-3 border">{index + 1}</td>
                    <td className="p-3 border">{request.title}</td>
                    <td className="p-3 border">
                      {request.recipients.map((recipient, index) => (
                        <span key={index} className="text-blue-500">
                          {recipient.userId.first_name} {recipient.userId.last_name}
                          {index !== request.recipients.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </td>
                      {/* need to update data */}
                    <td className="p-3 border">
                      0/2
                    </td>
                    <td className="p-3 border">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 border">
                      <span
                        className={`px-3 py-1 rounded-full text-white ${
                          request.status === "pending"
                            ? "bg-yellow-500"
                            : request.status === "approved"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-3 text-center text-gray-500">
                    No requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Requests By Others Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Requests By Others</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">No</th>
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Sender</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {requestsByOthers && requestsByOthers.length > 0 ? (
                requestsByOthers.map((request, index) => (
                  <tr key={index} className="text-center border">
                    <td className="p-3 border">{index + 1}</td>
                    <td className="p-3 border">{request.title}</td>
                    <td className="p-3 border">
                      {request.senderId.first_name} {request.senderId.last_name}
                    </td>
                    <td className="p-3 border">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 border">
                      <button className="border border-black px-2 hover:bg-blue-400"> action </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-3 text-center text-gray-500">
                    No received requests.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
