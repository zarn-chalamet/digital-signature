/* eslint-disable react/prop-types */
import { ChevronsLeft } from 'lucide-react';
import useTheme from '@/hooks/useTheme';
import ThemeToggleBtn from './btns/ThemeToggleBtn'
import { cn } from '@/utils/cn';
import Avatar from './Avatar';
import Modal from './modals/Modal';
import LogoutBtn from './btns/LogoutBtn'
import ConfrimLogout from './modals/ConfrimLogout';

export default function Header({ collapsed, setCollapsed }) {
    const { isDark } = useTheme();

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
                <Modal>
                    <div className="flex items-center gap-x-3">
                        <ThemeToggleBtn />
                        <Avatar />

                        <Modal.Open opens={'logout'}>
                            <div>
                                <LogoutBtn />
                            </div>
                        </Modal.Open>

                        <Modal.Window name={'logout'}>
                            <ConfrimLogout />
                        </Modal.Window>
                    </div>
                </Modal>
            </header>
        </>
    );
}