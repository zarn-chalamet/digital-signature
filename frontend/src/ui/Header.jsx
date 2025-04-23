/* eslint-disable react/prop-types */
import { ChevronsLeft } from 'lucide-react';
import ThemeToggleBtn from './btns/ThemeToggleBtn'
import { cn } from '@/utils/cn';
import Avatar from './Avatar';
import Modal from './modals/Modal';
import ProfileModal from './modals/ProfileModal';

export default function Header({ collapsed, setCollapsed }) {

    return (
        <>
            <header className={cn('relative dark:bg-slate-900 dark:border-b dark:border-slate-700 h-[70px] flex z-10 items-center justify-between bg-white px-6 shadow-md transition-colors',)}>
                <div className='flex items-center gap-x-3'>
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className={cn('flex items-center justify-center flex-shrink-0 h-10 p-2 transition-colors rounded-lg gap-x-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 size-10 dark:hover:bg-blue-950 dark:hover:text-slate-200')}>
                        <ChevronsLeft className={`${collapsed && 'rotate-180'}`} />
                    </button>
                </div>
                <Modal>
                    <div className="flex items-center gap-x-2">
                        <ThemeToggleBtn />

                        <Modal.Open opens={'logout'}>
                            <div>
                                <Avatar />
                            </div>
                        </Modal.Open>

                        <Modal.Window name={'logout'} padding={false}>
                            <ProfileModal />
                        </Modal.Window>
                    </div>
                </Modal>
            </header>
        </>
    );
}