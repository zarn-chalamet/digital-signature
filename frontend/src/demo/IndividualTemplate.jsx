import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context-api/AppContext';
import PdfViewer from './PdfViewer';
import SignPad from './SignPad';

export default function IndividualTemplate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { templateById, getTemplateById } = useContext(AppContext)

  useEffect(() => {
    getTemplateById(id);
  }, [id])
  return (
    <div>
      <div className='flex flex-row justify-between'>
        <h2>{templateById.title}</h2>
        <p>{templateById.isPublic ? 'public' : 'private'}</p>
      </div>
      <div>
        <button onClick={() => navigate("/create-request", { state: { templateId: id, filePath: templateById.filePath } })}>Use Template</button>
      </div>
      <PdfViewer pdfFile={`http://localhost:5001/files/${templateById.filePath}`} />
      {/* <PdfViewer pdfFile={templateById.filePath}/> */}

      <div>
        <iframe
          src={`http://localhost:5001/files/${templateById.filePath}`}
          width="100%"
          height="1200px"
          style={{ border: "none" }}
        ></iframe>
      </div>

      <div>
        <SignPad pdfFile={`http://localhost:5001/files/${templateById.filePath}`} />
      </div>
    </div>
  )
}
