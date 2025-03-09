import { userLists } from '../constants/index'

export default function DashboardPage() {

    return (
        <div className='flex flex-col gap-y-4'>
            <div className="flex items-center justify-between">
                <h1 className="title">Manage User</h1>
                <button className='px-4 py-2 text-white transition-colors duration-200 rounded bg-secondary hover:bg-blue-800' type='button'>
                    Create New User
                </button>
            </div>

            <div className="card ">
                <div className="card-header">
                    <p className="card-title">Current Users</p>
                </div>
                <div className="p-0 card-body">
                    <div className="relative h-[500px] flex-shrink-0 w-full overflow-auto rounded-none [scrollbar-width:_thin]">
                        <table className="table">
                            <thead className='table-header'>
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
                            <tbody className="table-body">
                                {userLists.map(user => (
                                    <tr key={user.id} className="table-row">
                                        <td className="table-cell">{user.number}</td>
                                        <td className="table-cell">{user.first_name}</td>
                                        <td className="table-cell">{user.last_name}</td>
                                        <td className="table-cell">{user.email}</td>
                                        <td className="table-cell">{user.password}</td>
                                        <td className="table-cell">{user.created_at}</td>
                                        <td className="table-cell">
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={user.status}
                                                    className="sr-only peer"
                                                />
                                                <div className="h-6 transition-all bg-gray-300 rounded-full w-11 peer-checked:bg-green-500 peer-focus:ring-0">
                                                    <div className="absolute w-4 h-4 transition-transform bg-white rounded-full left-1 top-1 peer-checked:translate-x-5"></div>
                                                </div>
                                            </label>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
