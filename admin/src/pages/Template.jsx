import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context-api/AppContext'
import { useEffect } from 'react';
import pdfPhoto from "../assets/pdf.jpg"
import Modal from "react-modal";
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Template() {
  const {token,templates,getAllTemplates,backendUrl} = useContext(AppContext);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title,setTitle] = useState("");
  const [file,setFile] = useState(null);
  const [isPublic,setIsPublic] = useState(false);

  const [modalRenameIsOpen,setModalRenameIsOpen] = useState(false);
  const [newTitle,setNewTitle] = useState("");
  const [templateIdToRename, setTemplateIdToRename] = useState(null);

  const uploadNewTemplate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("pdf",file);
      formData.append("title",title);
      formData.append("isPublic",isPublic);
      console.log(formData);

      const {data} = await axios.post(backendUrl + "/api/admin/upload-template" , formData,{headers:{token}})

      if(data.success){
        toast.success(data.message);
        getAllTemplates();
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

  const deleteTemplate = async (templateId) => {
    try {
      
      const {data} = await axios.post(backendUrl + "/api/admin/delete-template" ,{
        templateId
      },{headers:{token}})

      if(data.success){
        toast.success(data.message);
        getAllTemplates();
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const updateNewTitle = async () => {
    if (!newTitle || !templateIdToRename) {
      toast.error("Template ID or new title is missing");
      return;
    }
    try {

      const { data } = await axios.post(backendUrl + "/api/admin/rename-template", {
        templateId: templateIdToRename,
        newTitle
      },{headers:{token}});

      if (data.success) {
        toast.success(data.message);
        setModalRenameIsOpen(false); // Close the modal after renaming
        getAllTemplates();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    getAllTemplates()
  },[])

  return (
    <>
      <div>Template</div>
      <button className='bg-blue-400 px-2 py-1 rounded-md' onClick={() => setModalIsOpen(true)}>+ Upload</button>
      {/* Templates */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {templates &&
          templates.map((template, index) => (
            <div key={index} className="border rounded-lg shadow-md p-3 text-center">
              {/* Template Image */}
              <div className="h-40 flex justify-center items-center bg-gray-100 rounded">
                {template.filePath ? (
                  <img 
                    src={pdfPhoto} 
                    alt={template.title} 
                    className="h-full object-cover"
                  />
                ) : (
                  <p className="text-gray-500">No Preview</p>
                )}
              </div>

              {/* Template Title */}
              <p className="mt-2 font-semibold">{template.title}</p>

              {/* Buttons */}
              <div className="mt-2 flex justify-between">
                <button
                  onClick={()=>{}}
                  // onClick={() => showPdf(template.filePath)}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                >
                  View
                </button>
                <button
                  onClick={() => {
                    setTemplateIdToRename(template._id);
                    setNewTitle(template.title);
                    setModalRenameIsOpen(true);
                  }}
                  className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
                >
                  Rename
                </button>
                <button
                  onClick={() => deleteTemplate(template._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
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
            Add template
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

      {/* modal for file rename */}
      <Modal
        isOpen={modalRenameIsOpen}
        onRequestClose={() => setModalRenameIsOpen(false)}
        contentLabel="Create New User"
        className="bg-white p-5 rounded-lg shadow-lg max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold">File Rename</h2>
        <form className="mt-4">

        <label>Enter new name</label>
        <input
          type="text"
          className="border p-2 w-full mb-3"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />


          <button type="submit" onClick={ updateNewTitle} className="px-4 py-2 bg-blue-500 text-white rounded">
            Save
          </button>
          <button
            type="button"
            onClick={() => setModalRenameIsOpen(false)}
            className="ml-3 px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        </form>
      </Modal>
    </>
    
  )
}
