import React, { useContext, useEffect, useState } from 'react'
import Modal from "react-modal";
import { AppContext } from '../context-api/AppContext';
import {toast} from "react-toastify"
import axios from 'axios';
import PdfViewer from '../components/PdfViewer';

Modal.setAppElement("#root");

export default function Template() {

  const {backendUrl,templatesByCurrentUser,getTemplatesByCurrentUser} = useContext(AppContext)

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title,setTitle] = useState("");
  const [file,setFile] = useState(null);
  const [isPublic,setIsPublic] = useState(false);

  const [pdfToOpen, setPdfToOpen] = useState(null);
  
  const uploadNewTemplate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("pdf",file);
      formData.append("title",title);
      formData.append("isPublic",isPublic);

      console.log(file)
      console.log(title)
      console.log(isPublic)

      axios.defaults.withCredentials = true;

      const {data} = await axios.post(backendUrl + "/api/auth/upload-template" , formData)

      if(data.success){
        toast.success(data.message);
        setModalIsOpen(false); // Close modal after successful upload
        setTitle("");
        setFile(null);
        setIsPublic(false);
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const showPdf = (pdf) => {
    // window.open(`http://localhost:5001/files/${pdf}`,"_blank","noreferrer");
    setPdfToOpen(`http://localhost:5001/files/${pdf}`)
  }

  useEffect(()=>{
    getTemplatesByCurrentUser();
    console.log(templatesByCurrentUser)
  },[])
  return (
    <div>
      <div>
        {/* my template and upload button */}
        <div>
          <h2>My Template</h2>
          <button onClick={() => setModalIsOpen(true)}>+ Upload</button>
        </div>
        {/* Templates */}
        <div>
          {
            templatesByCurrentUser && templatesByCurrentUser.map((template,index)=>(
              <div key={index}>
                <p>{template.title}</p>
                <button onClick={()=>{showPdf(template.filePath)}}>Show Pdf</button>
              </div>
            ))
          }
        </div>
        {/* Modal for create new useer*/}
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Create New User"
                className="bg-white p-5 rounded-lg shadow-lg max-w-md mx-auto mt-20"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
              >
                <h2 className="text-xl font-bold">Upload new template</h2>
                <form className="mt-4">

                <label>Template Title</label>
                <input
                  type="text"
                  className="border p-2 w-full mb-3"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
        
                <label htmlFor="file_upload">Choose file</label>
                <input
                  type="file"
                  id='file_upload'
                  className="border p-2 w-full mb-3"
                  accept='application/pdf'
                  required
                  onChange={e=>setFile(e.target.files[0])}
                />

                <label htmlFor="is_public">Make this template public</label>
                <input type="checkbox" checked={isPublic}
                onChange={e => setIsPublic(e.target.checked)}  />
                  <button type="submit" onClick={uploadNewTemplate} className="px-4 py-2 bg-blue-500 text-white rounded">
                    Add user
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalIsOpen(false)}
                    className="ml-3 px-4 py-2 bg-gray-500 text-white rounded"
                  >
                    Close
                  </button>
                </form>
              </Modal>
      </div>
      <div>
        <PdfViewer pdfFile={pdfToOpen}/>
      </div>
    </div>
  )
}
