import { useEffect, useState } from 'react';
import { tableHeaders } from '../constants/index';
import { cn } from '../utils/cn';
import { MoreVertical } from 'lucide-react';
import useTheme from '../hooks/useTheme';
import CreateBtn from '../components/dashboard/btns/CreateBtn';
import Title from '../components/dashboard/Title';
import StatusBtn from '../components/dashboard/btns/StatusBtn';
import MoreModal from '../components/dashboard/modals/MoreModal';
import api from '../utils/api';
import useAuth from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers, setUsers, updateUserStatus } from '../features/userSlice';
import moment from 'moment';

export default function DashboardPage() {
    const { isDark } = useTheme();
    const { accessToken } = useAuth()
    const users = useSelector(getUsers)
    const dispatch = useDispatch()
    const [openDropdown, setOpenDropdown] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await api.post('/api/admin/users-list', {}, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                console.log(data.users)
                dispatch(setUsers(data.users))
            }
            catch (err) {
                console.error(err.message)
            }
        }

        fetchData()
    }, [accessToken, dispatch])

    const toggleStatus = async (userId) => {
        //? clinet side update
        dispatch(updateUserStatus(userId))

        //? server update
        try {
            await api.post('/api/admin/toggle-restricted', { userId }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
        }
        catch (err) {
            console.error(err.message)
        }
    };

    const onDeleteUser = async (userId) => {
        //? Client side update
        dispatch(deleteUser(userId));

        //? client side update
        try {
            const res = await api.post(`/api/admin/delete-user/${userId}`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(res.data);
        } catch (err) {
            console.error("Delete user failed:", err);
        } finally {
            setOpenDropdown(null);
        }
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
                                {users?.map((user, index) => (
                                    <tr key={index} className={cn('table-row', isDark && 'border-slate-700')}>
                                        <td className="table-cell">{index + 1}</td>
                                        <td className="table-cell">{user.first_name}</td>
                                        <td className="table-cell">{user.last_name}</td>
                                        <td className="table-cell">{user.email}</td>
                                        <td className="table-cell">{user.password}</td>
                                        <td className="table-cell">{moment(user?.date).format('ll') || 'N/A'}</td>
                                        <td className="table-cell">
                                            <div className='relative flex items-center'>
                                                {/* Switch btn to toogle status */}
                                                <StatusBtn user={user} toggleStatus={toggleStatus} />

                                                <MoreVertical
                                                    className='ml-3 cursor-pointer'
                                                    onClick={() => setOpenDropdown(openDropdown === user._id ? null : user._id)}
                                                />

                                                {openDropdown === user._id && (
                                                    <MoreModal user={user} deleteUser={onDeleteUser} />
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