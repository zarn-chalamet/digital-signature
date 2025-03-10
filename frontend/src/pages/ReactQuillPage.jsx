import React, { useContext, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { PDFDocument, rgb } from "pdf-lib";
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../context-api/AppContext';

export default function ReactQuillPage() {

  const {backendUrl,getTemplatesByCurrentUser} = useContext(AppContext);
  
  const [content, setContent] = useState('');
  const [title,setTitle] = useState("");
  const [isPublic,setIsPublic] = useState(false);

  //here i will generate pdf and send to the create tmplate page
  const handleSave = async (e) => {
    e.preventDefault();
    alert("Document saved!" + content);

    try {
      // // Create a new PDF document
      // const pdfDoc = await PDFDocument.create();
      // const page = pdfDoc.addPage([600, 800]); // Page size

      // // Add text content
      // page.drawText(content.replace(/<[^>]+>/g, ""), {
      //   x: 50,
      //   y: 750,
      //   size: 14,
      //   color: rgb(0, 0, 0),
      // });

      // // Save as PDF Blob
      // const pdfBytes = await pdfDoc.save();
      // const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
      
      // console.log("pdf blob");
      // console.log(pdfBlob);

      // const formData = new FormData();

      // formData.append("pdf", pdfBlob, document.pdf);
      // formData.append("title",title);
      // formData.append("isPublic",isPublic);

      // axios.defaults.withCredentials = true;

      // const {data} = await axios.post(backendUrl + "/api/auth/upload-template" , formData)

      const {data} = await axios.post(backendUrl + "/api/auth/generate-pdf" , {title,isPublic,content})

      if(data.success){
        toast.success(data.message);
        getTemplatesByCurrentUser();
        setTitle("");
        setIsPublic(false);
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

  };

  return (
    <div>

      <label>Template Title</label>
      <input
        type="text"
        className="border p-2 w-full mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="is_public">Make this template public</label>
      <input type="checkbox" checked={isPublic}
      onChange={e => setIsPublic(e.target.checked)}  />

      <ReactQuill theme="snow" value={content} onChange={setContent} />
      <button onClick={handleSave}>Save</button>
    </div>
  )
}
