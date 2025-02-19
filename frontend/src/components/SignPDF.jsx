import React, { useContext, useState } from "react";
// import { PDFDocument, rgb } from "pdf-lib";
import SignaturePad from "../components/SignaturePad";
import { AppContext } from "../context-api/AppContext";

export default function SignPDF({ pdfFile }) {
  const [showPad, setShowPad] = useState(false);
  
  const {signature, setSignature} = useContext(AppContext)

  const handleSaveSignature = (signatureDataUrl) => {
    setSignature(signatureDataUrl);
    setShowPad(false);
    localStorage.setItem("savedSignature", signatureDataUrl); // Save for future use
  };

  const addSignatureToPDF = async () => {
    if (!signature) return alert("No signature found!");

    // const pdfBytes = await fetch(pdfFile).then(res => res.arrayBuffer());
    // const pdfDoc = await PDFDocument.load(pdfBytes);
    // const page = pdfDoc.getPage(0);

    // // Convert signature image to pdf-lib format
    // const sigImage = await pdfDoc.embedPng(signature);
    // page.drawImage(sigImage, {
    //   x: 200, // Adjust as needed
    //   y: 100, // Adjust as needed
    //   width: 150,
    //   height: 50,
    // });

    // const signedPdfBytes = await pdfDoc.save();
    // const signedPdfBlob = new Blob([signedPdfBytes], { type: "application/pdf" });
    // const signedPdfUrl = URL.createObjectURL(signedPdfBlob);

    // window.open(signedPdfUrl); // Opens the signed PDF
  };

  return (
    <div>
      <button onClick={() => setShowPad(true)} className="px-4 py-2 bg-blue-500 text-white rounded">Sign</button>
      <button onClick={addSignatureToPDF} className="px-4 py-2 bg-green-500 text-white ml-2">Apply Signature</button>
      
      {showPad && <SignaturePad onSave={handleSaveSignature} onClose={() => setShowPad(false)} />}

        <div>
            <img src={signature} alt="" />
        </div>
    </div>
  );
}
