import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context-api/AppContext';
import PdfViewer from '../components/PdfViewer';
import Modal from "react-modal";
import SignPad from "../components/SignPad";

export default function SignPdf() {
  const { id } = useParams();
  const { requestById, getRequestById } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getRequestById(id);
  }, [id]); // Removed `getRequestById` from dependency array to avoid infinite re-renders

  // Prevent rendering until data is available
  if (!requestById || !requestById.templateId) {
    return <p>Loading...</p>; // Show a loading message instead of crashing
  }

  return (
    <div>
      <h2>Sign Pdf 1</h2>
      <button onClick={() => setIsModalOpen(true)}>Sign here</button>
      <div>
        <PdfViewer pdfFile={`http://localhost:5001/files/${requestById.templateId.filePath}`} />
      </div>

      {/* Modal for signing */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Sign PDF"
        className="bg-white p-5 rounded-lg shadow-lg mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <SignPad request={requestById} setIsModalOpen={setIsModalOpen}/>
      </Modal>

      {/* show many pdf versions */}
      {
        console.log(requestById.pdfVersions)
      }
      {
        requestById.pdfVersions && requestById.pdfVersions.map((pdf,index) => (
          <div key={index}>
            <h2>Version - {pdf.version}</h2>
            <p>Signed By - {pdf.signedBy.userId.first_name + " " + pdf.signedBy.userId.last_name}</p>
            <iframe
              src={`http://localhost:5001/files/${pdf.filePath}`}
              width="100%"
              height="1200px"
              style={{ border: "none" }}
            ></iframe>
          </div>
        ))
      }
    </div>
  );
}
