/* eslint-disable react/prop-types */
import { useState } from 'react';
import { ChevronsLeft, Moon, Sun } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../assets/defautl.jpg';
import useTheme from '../../hooks/useTheme';
import { cn } from '../../utils/cn';

export default function Header({ collapsed, setCollapsed }) {
    const { theme, isDark, changeTheme } = useTheme();
    const { dispatch } = useAuth();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const onHandleLogout = () => {
        dispatch({ type: 'auth/logout' });
        navigate('/login');
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
                    <button
                        onClick={() => changeTheme(theme === "light" ? "dark" : "light")}
                        className={cn('flex items-center justify-center flex-shrink-0 h-10 p-2 transition-colors rounded-lg gap-x-2 text-slate-500 hover:bg-slate-100 hover:text-slate-500  size-10', isDark && 'hover:bg-blue-950 hover:text-slate-200')}>
                        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <img src={defaultImage} alt="" className='rounded-full w-9 h-9' />
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-4 py-2 text-sm text-white rounded-full bg-primary" type='button'>
                        Logout
                    </button>
                </div>
            </header>

            {showModal && (
                <div className="fixed z-[100] inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-xs animate-fadeIn">
                    <div className="p-6 bg-white rounded-lg shadow-lg w-96 animate-slideUp">
                        <h2 className="text-lg font-semibold text-gray-900">Are you sure you want to log out?</h2>
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-gray-600 transition-all duration-200 bg-gray-200 rounded-md hover:bg-gray-300">
                                Cancel
                            </button>
                            <button
                                onClick={onHandleLogout}
                                className="px-4 py-2 text-white transition-all duration-200 bg-red-600 rounded-md hover:bg-red-700">
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}