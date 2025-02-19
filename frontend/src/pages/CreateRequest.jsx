import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context-api/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import PlaceSign from "../components/PlaceSign";
import Modal from "react-modal";

export default function CreateRequest() {
  const location = useLocation();
  const templateId = location.state?.templateId;
  const filePath = location.state?.filePath;

  const navigate = useNavigate();

  const { backendUrl, otherUsers, getOtherUsersList } = useContext(AppContext);

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [recipients, setRecipients] = useState([]);

  const[currentRecipient,setCurrentRecipient] = useState(null);

  const [isPlaceSignModalOpen,setIsPlaceSignModalOpen] = useState(false);
  const [signaturesForRecipient, setSignaturesForRecipient] = useState([]);

  useEffect(() => {
    getOtherUsersList();
  }, []);

  useEffect(() => {
    // Filter users based on search term
    if (searchTerm) {
      const filtered = otherUsers.filter((user) =>
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  }, [searchTerm, otherUsers]);

  // Add recipient when a user is clicked
  const addRecipient = (user) => {
    if (!recipients.some((r) => r._id === user._id)) {
      setRecipients([...recipients, user]);
    }
    setSearchTerm(""); // Clear search input after selecting
  };

  const closeModalAndAddSignatureToTheRecipient = () => {
    //close the modal
    setIsPlaceSignModalOpen(false);
    console.log(currentRecipient)

    //add the signatures to the current recipient
    setRecipients((prevRecipients) =>
      prevRecipients.map((recipient) => {
        
        console.log(recipient._id)
        return recipient._id === currentRecipient._id
          ? { ...recipient, signaturePositions: signaturesForRecipient }
          : recipient
  })
    );
    console.log("signatures for current recipient")
    console.log(signaturesForRecipient)

    //clear the signatures place
    setSignaturesForRecipient([]);

    console.log("recipients")
    console.log(recipients)

  }

  // Remove recipient from the list
  const removeRecipient = (id) => {
    setRecipients(recipients.filter((user) => user._id !== id));
  };

  const createNewRequest =  async () => {
    try {

        if (!recipients.length || !subject || !message || !title) {
            toast.error("Please fill in all fields before submitting.");
            return;
        }


        const formattedRecipients = recipients.map((user) => ({
          userId: user._id,
          signed: false,
          signaturePositions: user.signaturePositions || [],
        }));

        console.log(formattedRecipients)

        const {data} = await axios.post(backendUrl + "/api/auth/create-request",{
            recipients: formattedRecipients,
            emailSubject: subject,
            emailMessage: message,
            templateId,
            title
        })

        if(data.success){
            toast.success(data.message)
            navigate("/request")
        }else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.message)
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Create Request for Template {templateId}</h2>

      {/* Recipients Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Add Recipients</h3>
        <input
          type="text"
          className="border p-2 w-full rounded mt-2"
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Search Results */}
        {filteredUsers && filteredUsers.length > 0 && (
          <div className="border mt-2 rounded shadow-lg max-h-40 overflow-auto">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="p-2 hover:bg-gray-200 cursor-pointer flex justify-between"
                onClick={() => addRecipient(user)}
              >
                <span>{user.first_name} {user.last_name} ({user.email})</span>
              </div>
            ))}
          </div>
        )}

        {/* Selected Recipients */}
        {recipients.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold">Selected Recipients:</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {recipients && recipients.map((user) => (
                <div key={user._id} className="flex items-center bg-gray-300 px-3 py-1 rounded-full">
                  <span>{user.first_name} {user.last_name}</span>
                  <button 
                    className="ml-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={()=>{
                      setCurrentRecipient(user)
                      setIsPlaceSignModalOpen(true); 
                    }}>
                    place sign
                  </button>
                  <button
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={() => removeRecipient(user._id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <label className="block mt-2">Title</label>
        <input
          type="text"
          className="border p-2 w-full rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

      {/* Email Message Section */}
      <div>
        <h3 className="text-lg font-semibold">Add Message</h3>
        <label className="block mt-2">Email Subject</label>
        <input
          type="text"
          className="border p-2 w-full rounded"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <label className="block mt-2">Email Message</label>
        <textarea
          className="border p-2 w-full rounded"
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <button onClick={createNewRequest}>Create</button>

      {/* Modal for create new useer*/}
      <Modal
        isOpen={isPlaceSignModalOpen}
        onRequestClose={closeModalAndAddSignatureToTheRecipient}
        contentLabel="Create New User"
        className="bg-white p-5 rounded-lg shadow-lg  mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold">Place Signature</h2>
        <PlaceSign pdfFile={`http://localhost:5001/files/${filePath}`} setSignatures={setSignaturesForRecipient} signatures={signaturesForRecipient}/>
      </Modal>
    </div>
  );
}
