import { tableHeaders } from "@/utils/constants";
import Menus from "@/ui/Menus";
import Spinner from "@/ui/Spinner";
import Table from '@/ui/Table'
import UserRow from "./UserRow";
import useUserLists from './useUserLists'
import Pagination from "@/ui/Pagination";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import UserTableOperation from "./UserTableOperation";

export default function UserTable() {
    const { userLists, usersLoading } = useUserLists()
    const [searchParams] = useSearchParams()

    //? status
    const status = searchParams.get('status') ?? 'all'

    let filteredUsers;
    if (status === 'all') filteredUsers = userLists
    if (status === 'true') filteredUsers = userLists?.filter(user => user.isRestricted)
    if (status === 'false') filteredUsers = userLists?.filter(user => !user.isRestricted)

    //? sortby
    const sortBy = searchParams.get('sortBy') || 'start-asc'
    const [field, direction] = sortBy.split('-')
    const modifier = direction === 'asc' ? 1 : -1
    const sortedUsers = filteredUsers?.sort((a, b) => {
        if (typeof a[field] === 'number' && typeof b[field] === 'number') {
            return (a[field] - b[field]) * modifier;
        }
        if (typeof a[field] === 'string' && typeof b[field] === 'string') {
            return a[field].localeCompare(b[field]) * modifier;
        }
        return 0;
    });

    //? pagination
    const currentPage = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))
    const from = (currentPage - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE
    const paginateUsers = sortedUsers?.slice(from, to)

    if (usersLoading) return <Spinner />

    if (!userLists.length) return <h1>No</h1>

    return (
        <>
            <div className='card'>
                <div className="flex flex-col justify-between gap-2 md:items-center md:flex-row">
                    <div className="card-header">
                        <p className='card-title'>Current Users</p>
                    </div>
                    <UserTableOperation />
                </div>
                <div className="p-0 card-body">
                    <div className="relative w-full overflow-auto rounded-none [scrollbar-width:_thin]">
                        <Menus>
                            <Table>
                                <Table.Header>
                                    <Table.Row>
                                        {
                                            tableHeaders.map((header, index) => (
                                                <Table.Head key={index}>{header}</Table.Head>
                                            ))
                                        }
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body
                                    data={paginateUsers}
                                    render={(user, index) => (
                                        <UserRow key={index} user={user} />
                                    )}
                                />
                            </Table>
                            <Pagination count={sortedUsers.length} />
                        </Menus>
                    </div>
                </div>
            </div>

        </>
    )
}
