import React, { useContext, useEffect, useState } from "react";
import { PDFDocument } from "pdf-lib";
import SignaturePad from "./SignaturePad";
import { AppContext } from "../context-api/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function SignPad({ request ,setIsModalOpen}) {
  const [showPad, setShowPad] = useState(false);
  const { backendUrl,signature, setSignature, userData, getUserData } = useContext(AppContext);
  const [currentPdfVersion, setCurrentPdfVersion] = useState(null);

  useEffect(() => {
      if (request) {
  
        if (request.pdfVersions && request.pdfVersions.length > 0) {
          const latestVersion = request.pdfVersions.sort((a, b) => b.version - a.version)[0];
          setCurrentPdfVersion(latestVersion);
        } else {
          // If no versions exist, use the templateId file path
          setCurrentPdfVersion({
            filePath: request.templateId.filePath,
            // version: 1, // Mark this as the first version
          });
        }
      }
    }, [request]);

  useEffect(() => {
    getUserData();
    console.log(request)
  }, []);

  const handleSaveSignature = (signatureDataUrl) => {
    setSignature(signatureDataUrl);
    setShowPad(false);
    localStorage.setItem("savedSignature", signatureDataUrl);
  };

  const addSignatureToPDF = async () => {
    if (!signature) return alert("No signature found!");
    if (!request || !request.templateId || !request.templateId.filePath) {
      return alert("Invalid request data!");
    }

    try {
      // Fetch and load the PDF document
      const pdfBytes = await fetch(`http://localhost:5001/files/${currentPdfVersion.filePath}`).then((res) => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const sigImage = await pdfDoc.embedPng(signature);
      const pages = pdfDoc.getPages();

      let signed = false; // Track if any signature was added

      // Loop through recipients and apply signatures if user matches
      request.recipients.forEach((recipient) => {
        console.log(recipient.userId)
        console.log(userData)
        console.log(userData._id)
        if (recipient.userId === userData._id) {
          console.log("this run")
          recipient.signaturePositions.forEach(({ page, x, y }) => {
            if (pages[page - 1]) { // Ensure the page exists
              const pageIndex = Math.max(0, page - 1);
              const pdfPage = pages[pageIndex];
              const pdfHeight = pdfPage.getHeight();
              pdfPage.drawImage(sigImage, {
                x,
                y: pdfHeight - y,
                width: 150,
                height: 50,
              });
              signed = true;
            }
          });
        }
      });

      if (!signed) return alert("No matching signature positions found for this user.");

      // Save and generate a new PDF URL
      const signedPdfBytes = await pdfDoc.save();
      const signedPdfBlob = new Blob([signedPdfBytes], { type: "application/pdf" });
      // const signedPdfUrl = URL.createObjectURL(signedPdfBlob);
      setIsModalOpen(false)
      // Open or download the signed PDF
      // window.open(signedPdfUrl);

      // Create FormData to send the signed PDF to the backend
      const formData = new FormData();
      formData.append("pdf", signedPdfBlob, signed-document.pdf);
      formData.append("requestId", request._id);

      axios.defaults.withCredentials = true;
      const {data} = await axios.post(backendUrl + "/api/auth/signed-by-user",formData)
      if(data.success){
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.error("Error signing PDF:", error);
    }
  };

  return (
    <div>
      <button onClick={() => setShowPad(true)} className="px-4 py-2 bg-blue-500 text-white rounded">
        Sign
      </button>
      <button onClick={addSignatureToPDF} className="px-4 py-2 bg-green-500 text-white ml-2">
        Apply Signature
      </button>

      {showPad && <SignaturePad onSave={handleSaveSignature} onClose={() => setShowPad(false)} />}

      {signature && (
        <div>
          <img src={signature} alt="User signature" />
        </div>
      )}
    </div>
  );
}
