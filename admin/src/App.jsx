import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { useContext } from "react"
import { AppContext } from "./context-api/AppContext"


function App() {

  const {token} = useContext(AppContext);
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Sidebar and Main Content */}
      <div className="flex flex-1">
        <div className="">
          { token && <Sidebar />}
        </div>
        <div className="flex-1 p-6 overflow-y-auto bg-white shadow-inner">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App