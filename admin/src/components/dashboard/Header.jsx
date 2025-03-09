/* eslint-disable react/prop-types */
import { ChevronsLeft } from 'lucide-react'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import defaultImage from '../../assets/defautl.jpg'

export default function Header({ collapsed, setCollapsed }) {
    const { dispatch } = useAuth()
    const navigate = useNavigate()

    const onHandleLogout = () => {
        dispatch({ type: 'auth/logout' })
        navigate('/login')
    }

    return (
        <header className='relative h-[70px] flex z-10 items-center justify-between bg-white px-4 shadow-md transition-colors'>
            <div className='flex items-center gap-x-3'>
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className='btn-ghost size-10'>
                    <ChevronsLeft className={`${collapsed && 'rotate-180'} text-black`} />
                </button>
            </div>
            <div className="flex items-center gap-x-3">
                <img src={defaultImage} alt="" className='rounded-full w-9 h-9'/>
                <button
                    onClick={onHandleLogout}
                    className="px-4 py-2 text-sm text-white rounded-full bg-primary rouned-full" type='button'>
                    Logout
                </button>
            </div>
        </header>
    )
}
