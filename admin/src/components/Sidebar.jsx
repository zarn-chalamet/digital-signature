import { useNavigate } from 'react-router-dom'

export default function Sidebar() {
    const navigate = useNavigate();
  return (
    <div className='h-40 bg-blue-300 max-w-20'>
        <div onClick={() => navigate("/")}>
          <p >User</p>
        </div>
        <div onClick={() => navigate("/template")}>Template</div>
        <div onClick={() => navigate("/report")}>Report</div>
    </div>
  )
}
