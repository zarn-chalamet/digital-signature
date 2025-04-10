import { tableHeaders } from "@/utils/constants";
import Menus from "@/ui/Menus";
import Spinner from "@/ui/Spinner";
import Table from '@/ui/Table'
import UserRow from "./UserRow";
import useUserLists from './useUserLists'

export default function UserTable() {
    const { userLists, usersLoading } = useUserLists()

    if (usersLoading) return <Spinner />

    if (!userLists.length) return <h1>No</h1>

    return (
        <div className='card'>
            <div className="card-header">
                <p className='card-title'>Current Users</p>
            </div>
            <div className="p-0 card-body">
                <div className="relative min-h-[100px] max-h-[500px] w-full overflow-auto rounded-none [scrollbar-width:_thin]">
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
                                data={userLists}
                                render={(user, index) => (
                                    <UserRow key={index} user={user} index={index} />
                                )}
                            />
                        </Table>
                    </Menus>
                </div>
            </div>
        </div>
    )
}
