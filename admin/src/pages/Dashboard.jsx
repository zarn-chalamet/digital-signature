import { useState } from 'react';
import { dummyUsers, tableHeaders } from '../constants/index';
import { cn } from '../utils/cn';
import { MoreVertical } from 'lucide-react';
import useTheme from '../hooks/useTheme';
import CreateBtn from '../components/dashboard/btns/CreateBtn';
import Title from '../components/dashboard/Title';
import StatusBtn from '../components/dashboard/btns/StatusBtn';
import MoreModal from '../components/dashboard/modals/MoreModal';

export default function DashboardPage() {
    const { isDark } = useTheme();
    const [userLists, setUserLists] = useState(dummyUsers);
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleStatus = (userId) => {
        setUserLists(prevUsers =>
            prevUsers.map(user =>
                user.id === userId ? { ...user, status: !user.status } : user
            )
        );
    };

    const deleteUser = (userId) => {
        setUserLists(prevUsers => prevUsers.filter(user => user.id !== userId));
        setOpenDropdown(null);
    };

    return (
        <section className='flex flex-col gap-y-4'>
            <div className="flex items-center justify-between">
                <Title />
                <CreateBtn />
            </div>

            <div className={cn('card', isDark && 'bg-slate-900 border-slate-700')}>
                <div className="card-header">
                    <p className={cn('card-title', isDark && 'text-slate-50')}>Current Users</p>
                </div>
                <div className="p-0 card-body">
                    <div className="relative h-[500px] flex-shrink-0 w-full overflow-auto rounded-none [scrollbar-width:_thin]">
                        <table className="table">
                            <thead className={cn('table-header', isDark && 'bg-slate-800 text-slate-50')}>
                                <tr className="table-row">
                                    {
                                        tableHeaders.map((header, index) => (
                                            <th key={index} className="table-head">{header}</th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody className={cn('table-body', isDark && 'text-slate-50')}>
                                {userLists.map((user, index) => (
                                    <tr key={index} className={cn('table-row', isDark && 'border-slate-700')}>
                                        <td className="table-cell">{index + 1}</td>
                                        <td className="table-cell">{user.first_name}</td>
                                        <td className="table-cell">{user.last_name}</td>
                                        <td className="table-cell">{user.email}</td>
                                        <td className="table-cell">{user.password}</td>
                                        <td className="table-cell">{user.created_at}</td>
                                        <td className="table-cell">
                                            <div className='relative flex items-center'>
                                                {/* Switch btn to toogle status */}
                                                <StatusBtn user={user} toggleStatus={toggleStatus} />

                                                <MoreVertical
                                                    className='ml-3 cursor-pointer'
                                                    onClick={() => setOpenDropdown(openDropdown === user.id ? null : user.id)}
                                                />

                                                {openDropdown === user.id && (
                                                    <MoreModal user={user} deleteUser={deleteUser} />
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}