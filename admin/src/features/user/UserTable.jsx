import { tableHeaders } from "../../constants";
import { cn } from "../../utils/cn";

export default function UserTable() {
    return (
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
                                    <td className="table-cell">{moment(user?.date).format('L') || 'N/A'}</td>
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
    )
}
