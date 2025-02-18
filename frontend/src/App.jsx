import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { useContext } from "react"
import { AppContext } from "./context-api/AppContext"
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();


function App() {

  const {isLoggedIn} = useContext(AppContext);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Sidebar and Main Content */}
      <div className="flex flex-1">
        <div className="">
          {isLoggedIn && <Sidebar />}
        </div>
        <div className="flex-1 p-6 bg-white shadow-inner overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App
