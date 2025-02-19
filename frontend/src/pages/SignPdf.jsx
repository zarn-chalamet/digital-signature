import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context-api/AppContext';
import PdfViewer from '../components/PdfViewer';
import Modal from "react-modal";
import SignPad from "../components/SignPad"

export default function SignPdf() {

  const {id} = useParams();
  const {requestById,getRequestById} = useContext(AppContext)

  const [isModalOpen,setIsModalOpen] = useState(false);

  useEffect(()=>{
    getRequestById(id);
  },[])
  return (
    <div>
      <h2>Sign Pdf {console.log(requestById)}</h2>
      <button onClick={()=>setIsModalOpen(true)}>Sign here</button>
      <div>
          <PdfViewer pdfFile={`http://localhost:5001/files/${requestById.templateId.filePath}`}/>
      </div>

      {/* Modal for create new useer*/}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={()=>{setIsModalOpen(false)}}
        contentLabel="Create New User"
        className="bg-white p-5 rounded-lg shadow-lg  mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <SignPad pdfFile={`http://localhost:5001/files/${requestById.templateId.filePath}`}/>
      </Modal>
    </div>
  )
}
