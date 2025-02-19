import { useState } from "react";
import { Document, Page } from "react-pdf";
import { ChevronLeft, ChevronRight, PenTool } from "lucide-react";

function PlaceSign({ pdfFile, signatures,setSignatures }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
//   const [signatures, setSignatures] = useState([]); // Stores signature positions

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function handlePdfClick(event) {
    // Get click position relative to the page
    const rect = event.target.getBoundingClientRect();
    const scaleX = event.target.offsetWidth / rect.width;
    const scaleY = event.target.offsetHeight / rect.height;

    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    console.log(x)
    console.log(y)
    console.log(pageNumber);

    // Store the signature position
    setSignatures([...signatures, { x, y, page: pageNumber }]);
    console.log("Signatures");
    console.log(signatures);
  }

  return (
    <div className="flex bg-gray-100 h-200 w-400 p-6">
      {/* Main PDF Viewer */}
      <div className="relative flex flex-col items-center bg-white shadow-lg rounded-lg p-4 w-4/5">
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="border border-gray-300 shadow-md rounded-md relative"
            onClick={handlePdfClick} // Capture click
          />
        </Document>

        {/* Render Signature Markers */}
        {signatures && signatures.filter((sig) => sig.page === pageNumber)
          .map((sig, index) => (
            <div
              key={index}
              className="absolute bg-blue-500 text-white text-xs font-bold p-1 rounded"
              style={{
                left: `${sig.x}px`,
                top: `${sig.y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <PenTool size={14} />
            </div>
          ))}

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4 w-full">
          <button
            className={`p-2 rounded-full ${
              pageNumber <= 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            disabled={pageNumber <= 1}
          >
            <ChevronLeft size={20} />
          </button>

          <p className="text-gray-700 text-lg">
            Page <span className="font-bold">{pageNumber}</span> of{" "}
            <span className="font-bold">{numPages}</span>
          </p>

          <button
            className={`p-2 rounded-full ${
              pageNumber >= numPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            onClick={() =>
              setPageNumber((prev) => Math.min(prev + 1, numPages))
            }
            disabled={pageNumber >= numPages}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Sidebar with Page Thumbnails */}
      <div className="w-1/5 bg-white shadow-lg rounded-lg p-4 ml-4 overflow-y-auto max-h-[80vh]">
        <h3 className="text-center font-bold mb-2">Pages</h3>
        {Array.from(new Array(numPages), (el, index) => (
          <div
            key={index}
            className={`cursor-pointer mb-2 p-1 border rounded ${
              pageNumber === index + 1 ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => setPageNumber(index + 1)}
          >
            <Document file={pdfFile}>
              <Page
                pageNumber={index + 1}
                width={100} // Small thumbnail size
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaceSign;
