/* eslint-disable react/prop-types */
import { useState } from 'react';
import { ChevronsLeft } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

import useTheme from '../../hooks/useTheme';
import { cn } from '../../utils/cn';
import LogoutModal from './modals/LogoutModal';
import LogoutBtn from './btns/LogoutBtn';
import ThemeToggleBtn from './btns/ThemeToggleBtn';
import Avatar from './Avatar';

export default function Header({ collapsed, setCollapsed }) {

    const { isDark } = useTheme();
    const { dispatch } = useAuth();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const onHandleLogout = () => {
        dispatch({ type: 'auth/logout' });
        navigate('/login', { replace: true });
    };

    return (
        <>
            <header className={cn('relative h-[70px] flex z-10 items-center justify-between bg-white px-4 shadow-md transition-colors',
                isDark && 'bg-slate-900 border-b border-slate-700')}>
                <div className='flex items-center gap-x-3'>
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className={cn('flex items-center justify-center flex-shrink-0 h-10 p-2 transition-colors rounded-lg gap-x-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500  size-10', isDark && 'hover:bg-blue-950 hover:text-slate-200')}>
                        <ChevronsLeft className={`${collapsed && 'rotate-180'}`} />
                    </button>
                </div>
                <div className="flex items-center gap-x-3">
                    <ThemeToggleBtn />
                    <Avatar />
                    <LogoutBtn setShowModal={setShowModal} />
                </div>
            </header>

            {showModal && <LogoutModal setShowModal={setShowModal} onHandleLogout={onHandleLogout} />}
        </>
    );
}