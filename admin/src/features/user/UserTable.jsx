import { tableHeaders } from "@/utils/constants";
import Menus from "@/ui/Menus";
import Spinner from "@/ui/Spinner";
import Table from '@/ui/Table'
import UserRow from "./UserRow";
import useUserLists from './useUserLists'
import Pagination from "@/ui/Pagination";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export default function UserTable() {
    const { userLists, usersLoading } = useUserLists()
    const [searchParams] = useSearchParams()

    //? pagination
    const currentPage = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))
    const from = (currentPage - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE
    const paginateUsers = userLists.slice(from, to)

    if (usersLoading) return <Spinner />

    if (!userLists.length) return <h1>No</h1>

    return (
        <>
            <div className='card'>
                <div className="card-header">
                    <p className='card-title'>Current Users</p>
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
                                        <UserRow key={index} user={user} index={index} />
                                    )}
                                />
                            </Table>
                            <Pagination count={userLists.length} />
                        </Menus>
                    </div>
                </div>
            </div>

        </>
    )
}
