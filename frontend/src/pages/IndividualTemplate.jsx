import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context-api/AppContext';
import PdfViewer from '../components/PdfViewer';

export default function IndividualTemplate() {
    const {id} = useParams();

    const {templateById,getTemplateById} = useContext(AppContext)

    useEffect(()=>{
        getTemplateById(id);
    },[id])
  return (
    <div>
        <div className='flex flex-row justify-between'>
            <h2>{templateById.title}</h2>
            <p>{templateById.isPublic ? 'public':'private'}</p>
        </div>
        <PdfViewer pdfFile={`http://localhost:5001/files/${templateById.filePath}`}/>
    </div>
  )
}
