import { useState } from 'react';
import { dummyUsers } from '../constants/index';
import { cn } from '../utils/cn';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import useTheme from '../hooks/useTheme';

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
        <div className='flex flex-col gap-y-4'>
            <div className="flex items-center justify-between">
                <h1 className={cn('title', isDark && 'text-slate-50')}>Manage User</h1>
                <button className='px-4 py-2 text-white transition-colors duration-200 rounded-md bg-secondary hover:bg-blue-800' type='button'>
                    Create New User
                </button>
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
                                    <th className="table-head">#</th>
                                    <th className="table-head">First Name</th>
                                    <th className="table-head">Last Name</th>
                                    <th className="table-head">Email</th>
                                    <th className="table-head">Password</th>
                                    <th className="table-head">Created Date</th>
                                    <th className="table-head">Status</th>
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
                                                {/* Toggle Switch */}
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={user.status}
                                                        className="sr-only peer"
                                                        onChange={() => toggleStatus(user.id)}
                                                    />
                                                    <div className="h-6 transition-all bg-gray-300 rounded-full w-11 peer-checked:bg-green-500 peer-focus:ring-0">
                                                        <div className={cn("absolute w-4 h-4 transition-transform bg-white rounded-full top-1", user.status ? 'translate-x-6' : 'translate-x-0 left-1')}></div>
                                                    </div>
                                                </label>

                                                
                                                <MoreVertical
                                                    className='ml-3 cursor-pointer'
                                                    onClick={() => setOpenDropdown(openDropdown === user.id ? null : user.id)}
                                                />

                                                {openDropdown === user.id && (
                                                    <div className="absolute right-0 z-10 w-32 bg-white border rounded-md shadow-md top-8">
                                                        <button className="flex items-center w-full gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                            <Edit size={16} />
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => deleteUser(user.id)}
                                                            className="flex items-center w-full gap-2 px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                        >
                                                            <Trash2 size={16} />
                                                            Delete
                                                        </button>
                                                    </div>
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
        </div>
    );
}