import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context-api/AppContext'

export default function History() {

  const { requests, getRequests, myRequests, getMyRequests,
    requestsByOthers, getRequestsByOthers } = useContext(AppContext);
  const [filteredRequests, setFilteredRequests] = useState([]);

  useEffect(() => {
    getRequests();
    getMyRequests();
    getRequestsByOthers();
  }, [])

  useEffect(() => {
    if (requests) {
      setFilteredRequests(requests);
    }
  }, [requests]);

  return (
    <div>
      <div className='flex flex-row justify-between'>
        <h2>History {console.log(myRequests)} {console.log(requestsByOthers)}</h2>
        <div className='flex flex-row justify-evenly'>
          <p className='px-2 cursor-pointer' onClick={() => { setFilteredRequests(requests) }}>All</p>
          <p className='px-2 cursor-pointer' onClick={() => { setFilteredRequests(myRequests) }}>My Request </p>
          <p className='px-2 cursor-pointer' onClick={() => { setFilteredRequests(requestsByOthers) }}>Request by other </p>
          <p className='px-2 cursor-pointer' onClick={() => { }}>Downloads</p>
        </div>
      </div>
      <div>
        {/* Requests Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">My Requests</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 border">No</th>
                  <th className="p-3 border">Title</th>
                  <th className="p-3 border">Approvers</th>
                  <th className="p-3 border">Date</th>
                  <th className="p-3 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests && filteredRequests.length > 0 ? (
                  filteredRequests.map((request, index) => (
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
                      <td className="p-3 border">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3 border">
                        <span
                          className={`px-3 py-1 rounded-full text-white ${request.status === "pending"
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
      </div>
    </div>
  )
}
