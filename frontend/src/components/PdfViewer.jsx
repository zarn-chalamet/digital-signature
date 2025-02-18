import { useState } from "react";
import { Document, Page } from "react-pdf";
import { ChevronLeft, ChevronRight } from "lucide-react";

function PdfViewer({ pdfFile }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-4">
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="border border-gray-300 shadow-md rounded-md"
          />
        </Document>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
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
    </div>
  );
}

export default PdfViewer;
